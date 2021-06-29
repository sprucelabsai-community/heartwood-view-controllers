import { Schema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import buildForm from '../builders/buildForm'
import {
	FormViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import introspectionUtil from '../utilities/introspection.utility'
import AbstractViewController from './Abstract.vc'
import SwipeViewController from './Swipe.vc'

type Card = SpruceSchemas.Heartwood.v2021_02_11.Card
type Footer = SpruceSchemas.Heartwood.v2021_02_11.CardFooter
type Button = SpruceSchemas.Heartwood.v2021_02_11.Button

export interface FormBuilderViewControllerOptions {
	header?: Card['header']
}

interface AddSectionOptions {
	type?: 'text' | 'form'
	title?: string
	text?: {
		content: string
	}
}

interface PageViewControllerEnhancements {
	addSection(options?: AddSectionOptions): void
	addField(sectionIdx: number): void
	getIndex(): number
	getTitle(): string
	setTitle(string: string): void
}

export type PageViewController = Omit<
	FormViewController<Schema>,
	keyof PageViewControllerEnhancements
> &
	PageViewControllerEnhancements

type FieldBuilder = FormBuilderViewController['buildField']

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

	public getPageVc(idx: number): PageViewController {
		const slide = this.swipeVc.getSlide(idx)
		const formVc = slide.form?.controller

		if (!formVc) {
			throw new Error(`Form not set for page ${idx}`)
		}

		return new PageViewContollerImpl({
			formVc,
			setTitleHandler: (title) => {
				slide.title = title
			},
			title: slide.title ?? '**MISSING**',
			index: idx,
			fieldBuilder: this.buildField.bind(this),
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
}

class PageViewContollerImpl implements PageViewControllerEnhancements {
	private formVc: FormViewController<Schema>
	private fieldBuilder: FieldBuilder
	public index: number
	private title: string
	private setTitleHandler: (title: string) => void

	public constructor(options: {
		formVc: FormViewController<Schema>
		index: number
		title: string
		fieldBuilder: FieldBuilder
		setTitleHandler: (title: string) => void
	}) {
		const { formVc, fieldBuilder, index, setTitleHandler, title } = options

		this.formVc = formVc
		this.index = index
		this.title = title
		this.setTitleHandler = setTitleHandler
		this.fieldBuilder = fieldBuilder
		introspectionUtil.delegateFunctionCalls(this, formVc)
	}

	public getTitle() {
		return this.title
	}

	public setTitle(title: string) {
		this.title = title
		this.setTitleHandler(title)
	}

	public addField(sectionIdx: number): void {
		const section = this.formVc.getSection(sectionIdx)
		const totalFields = this.getTotalFields()

		const fieldName = this.buildNextFieldName(totalFields)

		// @ts-ignore
		section.fields.push({ name: fieldName })

		const schema = this.formVc.getSchema()

		//@ts-ignore
		schema.fields = {
			...schema.fields,
			[fieldName]: this.fieldBuilder(totalFields),
		}
	}

	public getIndex() {
		return this.index
	}

	private getTotalFields() {
		return Object.keys(this.formVc.getSchema().fields ?? {}).length
	}

	private buildNextFieldName(totalFields: number): string {
		return `field${totalFields + 1}`
	}

	public addSection(options?: AddSectionOptions) {
		const sectionTitle = `Section ${this.formVc.getTotalSections() + 1}`

		this.formVc.addSection({
			title: sectionTitle,
			fields: [],
			...options,
		})

		if (options?.type !== 'text') {
			this.addField(this.formVc.getTotalSections() - 1)
		}
	}
}
