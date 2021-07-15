import { Schema, SpruceError, validateSchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import buildForm from '../../builders/buildForm'
import { ViewControllerOptions } from '../../types/heartwood.types'
import introspectionUtil from '../../utilities/introspection.utility'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import renderUtil from '../../utilities/render.utility'
import AbstractViewController from '../Abstract.vc'
import SwipeViewController from '../Swipe.vc'
import { EditFormBuilderFieldViewController } from './EditFormBuilderField.vc'
import EditFormBuilderSectionViewController, {
	EditFormBuilderSectionOptions,
	SimpleSection,
} from './EditFormBuilderSection.vc'
import {
	FormBuilderPageViewController,
	FormBuilderPageViewControllerImpl,
} from './FormBuilderPage.vc'
import ManagePageTitlesCardViewController from './ManagePageTitlesCard.vc'

type Card = SpruceSchemas.Heartwood.v2021_02_11.Card & {
	shouldAllowEditing?: boolean
}
type Footer = SpruceSchemas.Heartwood.v2021_02_11.CardFooter
type Button = SpruceSchemas.Heartwood.v2021_02_11.Button
export type FormBuilderImportExportObject =
	SpruceSchemas.Heartwood.v2021_02_11.FormBuilderImportExportObject
type Page = SpruceSchemas.Heartwood.v2021_02_11.BuilderImportExportPage

export interface FormBuilderViewControllerOptions {
	header?: Card['header']
	footer?: Card['footer']
	shouldAllowEditing?: boolean
}

export default class FormBuilderViewController extends AbstractViewController<Card> {
	private swipeVc: SwipeViewController
	private footerOverride?:
		| SpruceSchemas.Heartwood.v2021_02_11.CardFooter
		| null
		| undefined

	private shouldAllowEditing?: boolean

	public constructor(
		options: FormBuilderViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this.footerOverride = options.footer
		this.shouldAllowEditing = options.shouldAllowEditing ?? true

		this.swipeVc = this.vcFactory.Controller('swipe', {
			header: {
				title: 'Building your form',
				...options.header,
			},
			slides: [this.buildSlideForNewPage()],
			footer: this.buildFooter(),
		})

		introspectionUtil.delegateFunctionCalls(this, this.swipeVc)

		this.swipeVc.triggerRender = () => {
			this.triggerRender()
		}

		this.vcFactory.mixinControllers({
			//@ts-ignore
			editFormBuilderSection: EditFormBuilderSectionViewController,
			//@ts-ignore
			managePageTitles: ManagePageTitlesCardViewController,
			//@ts-ignore
			editFormBuilderField: EditFormBuilderFieldViewController,
		})
	}

	private buildFooter(): Footer {
		if (this.footerOverride) {
			return this.footerOverride
		}

		const buttons: Button[] = [
			{ label: 'Add page', onClick: this.handleClickAddPage.bind(this) },
		]

		if (this.getTotalPages() > 1) {
			buttons.push({
				label: 'Remove page',
				onClick: this.removePresentPage.bind(this),
			})
		}

		return {
			buttons,
		}
	}

	private buildSlideForNewPage(options?: Partial<Page>): {
		title: string
		form: SpruceSchemas.Heartwood.v2021_02_11.Form<Schema>
	} {
		return {
			title: this.buildNextPageTitle(),
			form: this.renderNewForm(options),
			...options,
		}
	}

	private renderNewForm(
		options?: Partial<Page>
	): SpruceSchemas.Heartwood.v2021_02_11.Form<Schema> {
		return this.vcFactory
			.Controller('form', {
				shouldShowSubmitControls: false,
				schema: options?.schema ?? {
					id: `formBuilder${this.getTotalPages() + 1}`,
					fields: {
						field1: this.buildField(0),
					},
				},
				//@ts-ignore
				sections: options?.sections ?? [
					{
						title: 'Section 1',
						fields: [{ name: 'field1' }],
					},
				],
			})
			.render()
	}

	public buildField(fieldIdx: number) {
		return {
			type: 'text',
			label: `Field ${fieldIdx + 1}`,
		}
	}

	private buildNextPageTitle(): string {
		return `Page ${this.getTotalPages() + 1}`
	}

	public getTotalPages() {
		//swipe vc may not be instantiated yet
		return this.swipeVc?.getSlides()?.length ?? 0
	}

	public setHeaderTitle(title: string) {
		this.swipeVc.setHeaderTitle(title)
	}

	public async addPage(
		options?: { atIndex?: number; title?: string } & Partial<Page>
	) {
		const { atIndex: idx } = options ?? {}

		if (typeof idx === 'number') {
			this.swipeVc.addSlideAtIndex(idx, this.buildSlideForNewPage(options))
		} else {
			this.swipeVc.addSlide(this.buildSlideForNewPage(options))
		}

		this.swipeVc.setFooter(this.buildFooter())
	}

	public async removePage(idx: number) {
		this.swipeVc.removeSlide(idx)
		this.swipeVc.setFooter(this.buildFooter())
		await this.swipeVc.jumpToSlide(Math.max(idx - 1, 0))
	}

	public async removePresentPage() {
		const idx = this.getPresentPage()
		await this.removePage(idx)
	}

	public getPageVc(idx: number): FormBuilderPageViewController {
		const slide = this.swipeVc.getSlide(idx)
		const formVc = slide.form?.controller

		if (!formVc) {
			throw new Error(`Form not set for page ${idx}`)
		}

		return new FormBuilderPageViewControllerImpl({
			formVc,
			setTitleHandler: (title) => {
				slide.title = title
				this.triggerRender()
			},
			title: slide.title ?? '**MISSING**',
			index: idx,
			fieldBuilder: this.buildField.bind(this),
			schema: formVc.getSchema(),
		}) as any
	}

	public getPresentPage(): number {
		return this.swipeVc.getPresentSlide()
	}

	public getPresentPageVc() {
		return this.getPageVc(this.getPresentPage())
	}

	public async jumpToPage(idx: number) {
		await this.swipeVc.jumpToSlide(idx)
	}

	public getPageVcs() {
		return (
			this.swipeVc.getSlides()?.map((_, idx) => {
				return this.getPageVc(idx)
			}) ?? []
		)
	}

	public async handleClickDeletePage() {
		const confirm = await this.confirm({
			title: 'Are you sure?',
			isDestructive: true,
		})

		if (confirm) {
			await this.removePresentPage()
		}
	}

	public async handleClickAddPage() {
		const addPageForm = this.vcFactory.Controller(
			'form',
			buildForm({
				id: 'addPageForm',
				schema: {
					id: 'addPage',
					fields: {
						title: {
							label: 'Page name',
							type: 'text',
							isRequired: true,
						},
					},
				},
				sections: [
					{
						fields: [{ name: 'title', placeholder: this.buildNextPageTitle() }],
					},
				],
				shouldShowCancelButton: false,
				submitButtonLabel: 'Add page',
				onSubmit: async ({ values }) => {
					if (values.title) {
						void dialog.hide()
						await this.addPage({
							title: values.title,
						})
					}
				},
			})
		)

		const dialog = this.renderInDialog({
			header: { title: 'Add page' },
			body: { sections: [{ form: addPageForm.render() }] },
		})
	}

	public render(): Card {
		return {
			...this.swipeVc.render(),
			controller: this as any,
			shouldAllowEditing: this.shouldAllowEditing,
		}
	}

	public handleClickAddSection(clickedSectionIdx: number) {
		this.getPresentPageVc().getSection(clickedSectionIdx)

		const vc = this.EditSectionVc({
			onDone: async (section) => {
				void dialog.hide()
				const pageVc = this.getPresentPageVc()
				pageVc.addSection({ ...section, atIndex: clickedSectionIdx + 1 })
			},
		})
		const dialog = this.renderInDialog(vc.render())
	}

	public setShouldAllowEditing(shouldAllow: boolean) {
		this.shouldAllowEditing = shouldAllow
	}
	public getShouldAllowEditing() {
		return this.shouldAllowEditing ?? true
	}

	public handleClickEditSection(clickedSectionIdx: number) {
		const pageVc = this.getPresentPageVc()
		const section = { ...pageVc.getSection(clickedSectionIdx) }

		const fields = normalizeFormSectionFieldNamesUtil
			.toNames(section.fields ?? [])
			.map((f) => pageVc.getField(f).compiledOptions)

		//@ts-ignore
		section.fields = fields

		const vc = this.EditSectionVc({
			editingSection: section,
			onDone: async (section) => {
				void dialog.hide()
				const pageVc = this.getPresentPageVc()
				pageVc.setSection(clickedSectionIdx, section)
			},
		})
		const dialog = this.renderInDialog(vc.render())
	}

	public handleClickPageTitles() {
		const vc = this.vcFactory.Controller('managePageTitles', {
			onDone: () => {
				void dialog.hide()
			},
			formBuilderVc: this,
		})

		const dialog = this.renderInDialog({ ...vc.render() })
	}

	public EditSectionVc(options: {
		onDone: EditFormBuilderSectionOptions['onDone']
		editingSection?: SimpleSection
	}) {
		const { onDone, editingSection } = options

		const editSectionVc = this.vcFactory.Controller(
			'editFormBuilderSection' as any,
			{
				onDone,
				pageSchema: this.getPresentPageVc().getSchema(),
				editSection: editingSection,
				defaultTitle: `Section ${
					this.getPresentPageVc().getTotalSections() + 1
				}`,
			}
		) as EditFormBuilderSectionViewController

		return editSectionVc
	}

	public handleClickEditField(fieldName: string) {
		const pageVc = this.getPresentPageVc()

		//@ts-ignore
		const { compiledOptions } = pageVc.getField(fieldName)

		const vc = this.vcFactory.Controller('editFormBuilderField', {
			...compiledOptions,
			//@ts-ignore
			options: {
				...compiledOptions.options,
			},
			onDone: (options) => {
				const { name, ...fieldDefinition } = options
				void dialog.hide()
				//@ts-ignore
				pageVc.setField(fieldName, {
					newName: name,
					fieldDefinition,
				})
			},
		})

		const dialog = this.renderInDialog({ ...vc.render() })
	}

	public toObject(): FormBuilderImportExportObject {
		const object = renderUtil.render(this, {
			shouldStripControllers: true,
			shouldStripFunctions: true,
			shouldStripPrivateFields: true,
		})

		return {
			title: object.header?.title ?? 'MISSING',
			subtitle: object.header?.subtitle,
			pages:
				object.body?.sections?.map((s) => {
					return {
						title: s.title as string,
						schema: s.form?.schema as Schema,
						sections: s.form?.sections ?? [],
					}
				}) ?? [],
		}
	}

	public async importObject(imported: FormBuilderImportExportObject) {
		const { default: formBuilderImportExportObjectSchema } = await import(
			'../../.spruce/schemas/heartwood/v2021_02_11/formBuilderImportExportObject.schema'
		)

		validateSchemaValues(formBuilderImportExportObjectSchema as any, imported)
		this.swipeVc.setHeaderTitle(imported.title)
		imported.subtitle && this.swipeVc.setHeaderSubtitle(imported.subtitle)
		this.swipeVc.setSections([])

		for (const page of imported.pages) {
			await this.addPage(page)
		}
	}

	public getValues() {
		return this.getPageVcs().map((vc) => vc.getValues())
	}

	public setValues(values: Record<string, any>[]): any {
		if (!Array.isArray(values)) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['values'],
				friendlyMessage: 'Values must be an array!',
			})
		}

		for (let idx = 0; idx < values.length; idx++) {
			this.getPageVc(idx).setValues(values[idx])
		}
	}
}
