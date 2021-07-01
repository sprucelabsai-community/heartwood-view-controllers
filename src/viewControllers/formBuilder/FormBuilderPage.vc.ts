import { Schema } from '@sprucelabs/schema'
import { FormViewController } from '../../types/heartwood.types'
import introspectionUtil from '../../utilities/introspection.utility'
import {
	FormBuilderPageViewControllerEnhancements,
	FieldBuilder,
	AddSectionOptions,
} from './FormBuilder.vc'

export class FormBuilderPageViewControllerImpl
	implements FormBuilderPageViewControllerEnhancements
{
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
		const totalFields = this.getTotalFields()
		const fieldName = this.buildNextFieldName(totalFields)

		this.formVc.addFields({
			sectionIdx,
			//@ts-ignore
			fields: {
				[fieldName]: this.fieldBuilder(totalFields),
			},
		})
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
