import { buildSchema, SchemaValues } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import buildForm from '../../builders/buildForm'
import {
	FormViewController,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import CardViewController from '../Card.vc'
import ListViewController, { ListRow } from '../list/List.vc'

const addSectionSchema = buildSchema({
	id: 'addSection',
	fields: {
		title: {
			type: 'text',
			label: 'Title',
			isRequired: true,
		},
		type: {
			type: 'select',
			label: 'Form or instructions',
			defaultValue: 'form',
			isRequired: true,
			options: {
				choices: [
					{
						label: 'Form',
						value: 'form',
					} as const,
					{
						label: 'Instructions',
						value: 'text',
					} as const,
				],
			},
		},
		shouldRenderAsGrid: {
			type: 'boolean',
			label: 'Render as grid',
		},
		text: {
			type: 'text',
			label: 'Instructions',
		},
	},
})
export type AddFormBuilderSectionSchema = typeof addSectionSchema
type AddFormBuilder = SchemaValues<AddFormBuilderSectionSchema>

type Section =
	SpruceSchemas.Heartwood.v2021_02_11.FormSection<AddFormBuilderSectionSchema>

export default class FormBuilderAddSectionViewController extends CardViewController {
	private formVc: FormViewController<AddFormBuilderSectionSchema>
	private fieldListVc: ListViewController

	public constructor(
		options: ViewControllerOptions & { values: Partial<AddFormBuilder> }
	) {
		super(options)

		this.fieldListVc = this.vcFactory.Controller('list', {
			rows: [
				{
					cells: [],
				},
			],
		})

		this.formVc = this.vcFactory.Controller(
			'form',
			buildForm({
				values: {
					...options.values,
				},
				schema: addSectionSchema,
				shouldShowCancelButton: false,
				submitButtonLabel: 'Done',
				sections: this.buildSections('form'),
				footer: this.buildFooter('form'),
				onChange: this.handleFormChange.bind(this),
			})
		)

		this.model.header = {
			title: 'Add section',
			...this.model.header,
		}
	}

	private buildSections(forType?: AddFormBuilder['type']): Section[] {
		const type = forType ?? this.formVc.getValue('type')

		const sections: Section[] = [
			{
				fields: ['title', 'type'],
			},
		]

		if (type === 'form') {
			sections.push(
				{
					title: 'Display Settings',
					fields: [{ name: 'shouldRenderAsGrid' }],
				},
				{
					title: 'Fields',
					list: this.fieldListVc.render(),
				}
			)
		} else {
			sections.push({
				title: 'Instructions',
				fields: [{ name: 'text', renderAs: 'textarea' }],
			})
		}

		return sections
	}

	private buildFooter(
		forType?: AddFormBuilder['type']
	): SpruceSchemas.Heartwood.v2021_02_11.CardFooter | undefined {
		const type = forType ?? this.formVc.getValue('type')

		if (type === 'text') {
			return undefined
		}

		return {
			buttons: [
				{
					label: 'Add field',
					onClick: () => {
						this.addField()
					},
				},
			],
		}
	}

	public getFormVc() {
		return this.formVc
	}

	private addField() {
		this.fieldListVc.addRow(this.buildFieldRow())
	}

	private buildFieldRow(): ListRow {
		return {
			cells: [
				{
					textInput: {
						name: 'fieldName',
						isRequired: true,
						value: 'New field',
					},
				},
				{
					selectInput: {
						name: 'fieldType',
						isRequired: true,
						value: 'text',
						choices: [
							{
								label: 'Text',
								value: 'text',
							},
						],
					},
				},
			],
		}
	}

	private handleFormChange() {
		this.formVc.updateSections(this.buildSections())
		this.formVc.updateFooter(this.buildFooter())
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.Card {
		const model = super.render()

		model.body = {
			sections: [
				{
					form: this.formVc.render() as any,
				},
			],
		}

		return model
	}
}
