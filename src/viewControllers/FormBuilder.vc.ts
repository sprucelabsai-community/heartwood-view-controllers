import { Schema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
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

interface PageViewControllerEnhancements {
	addSection(): void
	addField(sectionIdx: number): void
}

export type PageViewController = FormViewController<Schema> &
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
			{ label: 'Add page', onClick: this.addPage.bind(this) },
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

	private buildNewSlide(): {
		title: string
		form: SpruceSchemas.Heartwood.v2021_02_11.Form<Schema>
	} {
		return {
			title: this.buildNextPageTitle(),
			form: this.renderNewForm(),
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

	public async addPage(idx?: number) {
		let destination = idx
		if (typeof idx === 'number') {
			this.swipeVc.addSlideAtIndex(idx, this.buildNewSlide())
		} else {
			this.swipeVc.addSlide(this.buildNewSlide())
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
		const formVc = this.swipeVc.getSlide(idx).form?.controller
		if (!formVc) {
			throw new Error(`Form not set for page ${idx}`)
		}

		return new PageViewContollerImpl({
			formVc,
			fieldBuilder: this.buildField.bind(this),
		}) as any
	}

	public getPresentPage(): number {
		return this.swipeVc.getPresentSlide()
	}

	public async jumpToPage(idx: number) {
		await this.swipeVc.jumpToSlide(idx)
	}

	public render(): Card {
		return { ...this.swipeVc.render(), controller: this as any }
	}
}

class PageViewContollerImpl implements PageViewControllerEnhancements {
	private formVc: FormViewController<Schema>
	private fieldBuilder: FieldBuilder

	public constructor(options: {
		formVc: FormViewController<Schema>
		fieldBuilder: FieldBuilder
	}) {
		const { formVc, fieldBuilder } = options

		this.formVc = formVc
		this.fieldBuilder = fieldBuilder
		introspectionUtil.delegateFunctionCalls(this, formVc)
	}

	public addField(sectionIdx: number): void {
		const section = this.formVc.getSection(sectionIdx)
		const fieldName = this.buildNextFieldName(sectionIdx)

		// @ts-ignore
		section.fields.push({ name: fieldName })

		const schema = this.formVc.getSchema()

		//@ts-ignore
		schema.fields = {
			...schema.fields,
			[fieldName]: this.fieldBuilder(section.fields.length - 1),
		}
	}

	private buildNextFieldName(sectionIdx: number): string {
		return `field${this.formVc.getSections()[sectionIdx].fields.length + 1}`
	}

	public addSection() {
		const sectionTitle = `Section ${this.formVc.getSections().length + 1}`
		return this.formVc.addSection({
			title: sectionTitle,
			//@ts-ignore
			fields: [{ name: 'field1' }],
		})
	}
}
