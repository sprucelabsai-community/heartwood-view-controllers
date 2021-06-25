import { Schema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import {
	FormViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import SwipeViewController from './Swipe.vc'

type Card = SpruceSchemas.Heartwood.v2021_02_11.Card
export interface FormBuilderViewControllerOptions {}
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
			},
			slides: [this.buildNewSlide()],
			footer: {
				buttons: [{ label: 'Add page', onClick: this.addPage.bind(this) }],
			},
		})
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

	public addPage(idx?: number) {
		if (typeof idx !== 'undefined') {
			this.swipeVc.addSlideAtIndex(idx, this.buildNewSlide())
		} else {
			this.swipeVc.addSlide(this.buildNewSlide())
		}
	}

	public removePage(idx: number) {
		this.swipeVc.removeSlide(idx)
	}

	public render(): Card {
		return this.swipeVc.render()
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

		const props = getAllFuncs(this.formVc)
		for (const prop of props) {
			//@ts-ignore
			if (!this[prop]) {
				//@ts-ignore
				this[prop] = (...args: []) => {
					//@ts-ignore
					return this.formVc[prop](...args)
				}
			}
		}
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

function getAllFuncs(toCheck: any) {
	const props = []
	let obj = toCheck
	do {
		props.push(...Object.getOwnPropertyNames(obj))
	} while ((obj = Object.getPrototypeOf(obj)))

	return props.sort().filter((e: any, i: any, arr: any) => {
		return e != arr[i + 1] && typeof toCheck[e] == 'function'
	})
}
