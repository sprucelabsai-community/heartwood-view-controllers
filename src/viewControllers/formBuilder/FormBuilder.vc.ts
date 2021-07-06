import { Schema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import buildForm from '../../builders/buildForm'
import { ViewControllerOptions } from '../../types/heartwood.types'
import introspectionUtil from '../../utilities/introspection.utility'
import AbstractViewController from '../Abstract.vc'
import SwipeViewController from '../Swipe.vc'
import EditFormBuilderSectionViewController, {
	EditBuilderSectionOptions,
	SimpleSection,
} from './EditFormBuilderSection.vc'
import {
	FormBuilderPageViewController,
	FormBuilderPageViewControllerImpl,
} from './FormBuilderPage.vc'
import ManagePageTitlesCardViewController from './ManagePageTitlesCard.vc'

type Card = SpruceSchemas.Heartwood.v2021_02_11.Card
type Footer = SpruceSchemas.Heartwood.v2021_02_11.CardFooter
type Button = SpruceSchemas.Heartwood.v2021_02_11.Button

export interface FormBuilderViewControllerOptions {
	header?: Card['header']
}

export default class FormBuilderViewController extends AbstractViewController<Card> {
	private swipeVc: SwipeViewController
	public constructor(
		options: FormBuilderViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this.swipeVc = this.vcFactory.Controller('swipe', {
			header: {
				title: 'Building your form',
				...options.header,
			},
			slides: [this.buildNewSlide()],
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
		})
	}

	private buildFooter(): Footer {
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

	private buildNewSlide(options?: { title?: string }): {
		title: string
		form: SpruceSchemas.Heartwood.v2021_02_11.Form<Schema>
	} {
		return {
			title: this.buildNextPageTitle(),
			form: this.renderNewForm(),
			...options,
		}
	}

	private renderNewForm(): SpruceSchemas.Heartwood.v2021_02_11.Form<Schema> {
		return this.vcFactory
			.Controller('form', {
				shouldShowSubmitControls: false,
				schema: {
					id: 'tmp',
					fields: {
						field1: this.buildField(0),
					},
				},
				sections: [
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

	public async addPage(options?: { atIndex?: number; title?: string }) {
		const { atIndex: idx } = options ?? {}

		let destination = idx
		if (typeof idx === 'number') {
			this.swipeVc.addSlideAtIndex(idx, this.buildNewSlide(options))
		} else {
			this.swipeVc.addSlide(this.buildNewSlide(options))
			destination = this.getTotalPages() - 1
		}

		this.swipeVc.updateFooter(this.buildFooter())

		await this.waitForRender()

		await this.swipeVc.jumpToSlide(destination as number)
	}

	public async removePage(idx: number) {
		this.swipeVc.removeSlide(idx)
		this.swipeVc.updateFooter(this.buildFooter())
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
			subtitle: `This cannot be undone!`,
			message: `Delete ${this.getPresentPageVc().getTitle()}?`,
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
		return { ...this.swipeVc.render(), controller: this as any }
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

	public handleClickEditSection(clickedSectionIdx: number) {
		const pageVc = this.getPresentPageVc()
		const section = pageVc.getSection(clickedSectionIdx)

		const vc = this.EditSectionVc({
			editingSection: section,

			onDone: async (section) => {
				void dialog.hide()
				const pageVc = this.getPresentPageVc()
				pageVc.updateSection(clickedSectionIdx, section)
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
		onDone: EditBuilderSectionOptions['onDone']
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
}
