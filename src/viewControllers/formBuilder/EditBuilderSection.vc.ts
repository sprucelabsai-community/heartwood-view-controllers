import { buildSchema, SchemaValues, SpruceError } from '@sprucelabs/schema'
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
export type EditSectionSectionSchema = typeof addSectionSchema
type AddFormBuilder = SchemaValues<EditSectionSectionSchema>

type Section =
	SpruceSchemas.Heartwood.v2021_02_11.FormSection<EditSectionSectionSchema>

const fieldTypes = {
	text: 'Text',
	number: 'Number',
	phone: 'Phone',
}

export interface EditBuilderSectionOptions {
	values: Partial<AddFormBuilder>
	onDone: () => void | Promise<void>
}

interface SimpleRow {
	fieldName: string
	fieldType: string
}

export default class EditBuilderSectionViewController extends CardViewController {
	private formVc: FormViewController<EditSectionSectionSchema>
	private fieldListVc: ListViewController
	private rows: SimpleRow[] = []

	public constructor(
		options: ViewControllerOptions & EditBuilderSectionOptions
	) {
		super(options)

		if (!options.onDone) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: ['onDone'],
			})
		}

		this.rows.push(this.buildNextSimpleRow())

		this.fieldListVc = this.vcFactory.Controller('list', {
			columnWidths: ['fill'],
			rows: this.buildRows(),
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
				sections: this.buildFormSections('form'),
				footer: this.buildFooter('form'),
				onChange: this.handleFormChange.bind(this),
			})
		)

		this.model.header = {
			title: 'Add section',
			...this.model.header,
		}
	}

	private buildNextSimpleRow(): { fieldName: string; fieldType: string } {
		return {
			fieldName: `Field ${this.rows.length + 1}`,
			fieldType: 'text',
		}
	}

	private buildFormSections(forType?: AddFormBuilder['type']): Section[] {
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
					type: 'secondary',
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

	public getFieldListVc() {
		return this.fieldListVc
	}

	public addField() {
		this.rows.push(this.buildNextSimpleRow())
		this.rebuildList()
	}

	private rebuildList() {
		this.fieldListVc.updateRows(this.buildRows())
	}

	private buildRows() {
		return this.rows.map((row, idx) => this.buildFieldRow({ ...row, idx }))
	}

	private buildFieldRow(options: SimpleRow & { idx: number }): ListRow {
		return {
			cells: [
				{
					textInput: {
						name: 'fieldName',
						isRequired: true,
						value: options.fieldName,
					},
				},
				{
					selectInput: {
						name: 'fieldType',
						isRequired: true,
						value: options.fieldType,
						choices: Object.keys(fieldTypes).map((key) => ({
							//@ts-ignore
							label: fieldTypes[key],
							value: key,
						})),
					},
				},
				{
					button: {
						lineIcon: 'delete',
						type: 'destructive',
						onClick: () => {
							this.rows.splice(options.idx, 1)
							this.rebuildList()
						},
					},
				},
			],
		}
	}

	private handleFormChange() {
		this.formVc.updateSections(this.buildFormSections())
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
