import { Schema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import { FormViewController } from '../../types/heartwood.types'
import introspectionUtil from '../../utilities/introspection.utility'
import { SimpleRow, SimpleSection } from './EditBuilderSection.vc'
import FormBuilderViewController from './FormBuilder.vc'

export type FieldBuilder = FormBuilderViewController['buildField']

export type AddSectionOptions = Partial<SimpleSection> & {
	atIndex?: number
}

export interface FormBuilderPageViewControllerEnhancements {
	addSection(options?: AddSectionOptions): void
	updateSection(sectionIdx: number, section: AddSectionOptions): void
	addField(
		sectionIdx: number,
		options?: { name?: string; type?: string; label?: string }
	): void
	getIndex(): number
	getTitle(): string
	setTitle(string: string): void
}

export type FormBuilderPageViewController = Omit<
	FormViewController<Schema>,
	keyof FormBuilderPageViewControllerEnhancements
> &
	FormBuilderPageViewControllerEnhancements

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

	public addField(
		sectionIdx: number,
		options?: { name?: string; type?: string; label?: string }
	): void {
		const totalFields = this.getTotalFields()
		const fieldName = options?.name ?? this.buildNextFieldName(totalFields)

		const fieldDefinition = { ...this.fieldBuilder(totalFields) }

		for (const key of Object.keys(options ?? {})) {
			//@ts-ignore
			if (options[key]) {
				//@ts-ignore
				fieldDefinition[key] = options[key]
			}
		}

		this.formVc.addFields({
			sectionIdx,
			//@ts-ignore
			fields: {
				[fieldName]: fieldDefinition,
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

	public updateSection(sectionIdx: number, section: SimpleSection) {
		const { title, fields, text, ...rest } = section

		let updatedSection: SpruceSchemas.Heartwood.v2021_02_11.FormSection = {
			title,
			...rest,
		}

		if (text) {
			updatedSection.text = { content: text }
		}

		this.formVc.updateSection(sectionIdx, updatedSection)
		this.addFieldsToSection(sectionIdx, fields ?? [])
	}

	public addSection(options?: AddSectionOptions) {
		let {
			title = `Section ${this.formVc.getTotalSections() + 1}`,
			fields = [{}],
			text,
			type,
			...rest
		} = options ?? {}

		if (type === 'text') {
			fields = []
		} else {
			text = undefined
		}

		this.formVc.addSection({
			title,
			text: text ? { content: text } : undefined,
			...rest,
		})

		this.addFieldsToSection(this.formVc.getTotalSections() - 1, fields as any)
	}

	private addFieldsToSection(sectionIdx: number, fields: SimpleRow[]) {
		for (const field of fields) {
			let fieldName = field.fieldLabel
				? namesUtil.toCamel(field.fieldLabel)
				: undefined

			//@ts-ignore
			let type = field.fieldType ?? 'text'

			this.addField(sectionIdx, {
				name: fieldName,
				type,
				//@ts-ignore
				label: field.fieldLabel,
			})
		}
	}
}
