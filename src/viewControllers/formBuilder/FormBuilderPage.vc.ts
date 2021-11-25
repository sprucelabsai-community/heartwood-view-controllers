import { Schema } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import {
	functionDelegationUtil,
	namesUtil,
} from '@sprucelabs/spruce-skill-utils'
import { FormViewController } from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import { SimpleRow, SimpleSection } from './EditFormBuilderSection.vc'
import FormBuilderCardViewController from './FormBuilderCard.vc'

export type FieldBuilder = FormBuilderCardViewController['buildField']

export type AddSectionOptions = Partial<SimpleSection> & {
	atIndex?: number
}

export interface FormBuilderPageViewControllerEnhancements {
	addSection(options?: AddSectionOptions): void
	setSection(sectionIdx: number, section: SimpleSection): void
	addField(
		sectionIdx: number,
		options?: { name?: string; type?: string; label?: string }
	): void
	getIndex(): number
	getTitle(): string
	setTitle(string: string): void
	getSection(sectionIdx: number): SimpleSection
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
	private schema: Schema

	public constructor(options: {
		formVc: FormViewController<Schema>
		index: number
		title: string
		fieldBuilder: FieldBuilder
		setTitleHandler: (title: string) => void
		schema: Schema
	}) {
		const { formVc, fieldBuilder, index, setTitleHandler, title, schema } =
			options

		this.formVc = formVc
		this.index = index
		this.title = title
		this.schema = schema
		this.setTitleHandler = setTitleHandler
		this.fieldBuilder = fieldBuilder
		functionDelegationUtil.delegateFunctionCalls(this, formVc)
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

	public setSection(sectionIdx: number, section: SimpleSection) {
		const { title, fields, text, ...rest } = section

		//@ts-ignore
		delete rest.type

		let updatedSection: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection =
			{
				title,
				...rest,
			}

		if (text) {
			updatedSection.text = { content: text }
		}

		this.formVc.setSection(sectionIdx, updatedSection)
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

		const values: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection =
			{
				title,
				...rest,
			}

		if (type === 'text') {
			fields = []
			values.text = { content: text }
		}

		this.formVc.addSection(values)

		this.addFieldsToSection(this.formVc.getTotalSections() - 1, fields as any)
	}

	public getSection(sectionIdx: number): SimpleSection {
		const section = this.formVc.getSection(sectionIdx)

		const simpleSection: SimpleSection = {
			title: section.title ?? 'MISSING TITLE',
			type: section.text?.content ? 'text' : 'form',
			shouldRenderAsGrid: section.shouldRenderAsGrid ?? false,
		}

		const fields = normalizeFormSectionFieldNamesUtil.toObjects(
			section.fields ?? [],
			this.schema
		)

		if (simpleSection.type === 'text') {
			simpleSection.text = section.text?.content ?? ''
		}

		for (const field of fields) {
			if (!simpleSection.fields) {
				simpleSection.fields = []
			}

			//@ts-ignore
			simpleSection.fields.push({
				//@ts-ignore
				name: field.name,
				label: field.label ?? field.name,
				//@ts-ignore
				type: field.type,
			})
		}

		return simpleSection
	}

	private addFieldsToSection(sectionIdx: number, fields: SimpleRow[]) {
		for (const field of fields) {
			let fieldName = field.label ? namesUtil.toCamel(field.label) : field.name

			//@ts-ignore
			let type = field.type ?? 'text'

			this.addField(sectionIdx, {
				...field,
				type,
				name: fieldName,
			})
		}
	}
}
