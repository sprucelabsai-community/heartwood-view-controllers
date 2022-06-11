import {
	Schema,
	buildSchema,
	FieldDefinitions,
	SchemaError,
	SchemaValues,
} from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import buildForm from '../../builders/buildForm'
import { fieldTypeChoices, formBuilderFieldTypes } from '../../constants'
import {
	FieldRenderOptions,
	FormBuilderFieldType,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import CardViewController from '../card/Card.vc'
import FormViewController from '../form/Form.vc'

export interface EditFormBuilderFieldOptions {
	name: string
	label: string
	type: FormBuilderFieldType
	options: Omit<FieldDefinitions, 'type'>
	onDone: (
		fieldDefinition: FieldDefinitions & FieldRenderOptions<Schema>
	) => void | Promise<void>
}
const editFieldFormSchema = buildSchema({
	id: 'editFieldForm',
	fields: {
		name: {
			type: 'text',
			label: 'Name',
			// isRequired: true,
			hint: 'This is how the name is saved in the database, you can usually ignore this.',
		},
		label: {
			type: 'text',
			label: 'Label',
			// isRequired: true,
			hint: 'This is what people will see when filling out the form.',
		},
		isRequired: {
			type: 'boolean',
			label: 'Required',
		},
		type: {
			type: 'select',
			label: 'Type',
			isRequired: true,
			options: {
				choices: fieldTypeChoices,
			},
		},
		selectOptions: {
			type: 'text',
			label: 'Dropdown options',
			// isRequired: true,
			hint: "Put each choice on it's own line!",
		},
	},
})

type EditFieldFormSchema = typeof editFieldFormSchema

export class EditFormBuilderFieldCardViewController extends CardViewController {
	private formVc: FormViewController<EditFieldFormSchema>
	public constructor(
		options: ViewControllerOptions & EditFormBuilderFieldOptions
	) {
		super(options)

		this.assertRequiredParameters(options)
		this.assertSupportedFieldType(options)

		const values: Partial<SchemaValues<EditFieldFormSchema>> =
			this.optionsToFormValues(options)

		this.formVc = this.Controller(
			'form',
			buildForm({
				schema: editFieldFormSchema,
				onChange: this.handleFormChange.bind(this),
				shouldShowCancelButton: false,
				submitButtonLabel: 'Save',
				values,
				onSubmit: async ({ values }) => {
					this.formValuesToOptions(values, options)

					//@ts-ignore
					await options.onDone(values)
				},
				sections: this.buildSections(options.type),
			})
		)
	}

	private formValuesToOptions(
		values: Record<string, any>,
		options: Record<string, any>
	) {
		const fieldOptions = options.options

		if (values.selectOptions) {
			//@ts-ignore
			values.options = {
				//@ts-ignore
				choices: values.selectOptions.split('\n').map((label) => ({
					label,
					value: namesUtil.toCamel(label),
				})),
			}
		}

		values.options = { ...values.options, ...fieldOptions }
		delete values.selectOptions
	}

	private optionsToFormValues(
		options: ViewControllerOptions & EditFormBuilderFieldOptions
	) {
		const fieldOptions = options.options
		const values: Partial<SchemaValues<EditFieldFormSchema>> = {}

		Object.keys(editFieldFormSchema.fields).forEach((name) => {
			//@ts-ignore
			values[name] = options[name]
		})

		//@ts-ignore
		if (fieldOptions.choices) {
			//@ts-ignore
			const selectOptions = fieldOptions.choices.map((c) => c.label).join('\n')

			values.selectOptions = selectOptions
		}
		return values
	}

	private assertSupportedFieldType(
		options: ViewControllerOptions & EditFormBuilderFieldOptions
	) {
		const types = Object.keys(formBuilderFieldTypes)

		if (!types.includes(options.type)) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['type'],
				friendlyMessage: `Field type must be one of the following:\n\n${types.join(
					'\n'
				)}`,
			})
		}
	}

	private assertRequiredParameters(
		options: ViewControllerOptions & EditFormBuilderFieldOptions
	) {
		const missing: string[] = []

		if (!options.name) {
			missing.unshift('name')
		}

		if (!options.label) {
			missing.push('label')
		}

		if (!options.type) {
			missing.push('type')
		}

		if (!options.options) {
			missing.push('options')
		}

		if (!options.onDone) {
			missing.push('onDone')
		}

		if (missing.length > 0) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: missing,
			})
		}
	}

	public handleFormChange() {
		const sections = this.buildSections(this.formVc.getValue('type') as any)
		this.formVc.setSections(sections)
	}

	private buildSections(forType: EditFormBuilderFieldOptions['type']) {
		const sections: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<EditFieldFormSchema>[] =
			[
				{
					fields: [
						{ name: 'name' },
						{ name: 'label' },
						{ name: 'isRequired' },
						{ name: 'type' },
					],
				},
			]

		const type = forType
		if (type === 'select') {
			sections.push({
				fields: [
					{
						name: 'selectOptions',
						placeholder: 'Option 1\nOption 2',
						renderAs: 'textarea',
					},
				],
			})
		}
		return sections
	}

	public getFormVc() {
		return this.formVc
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
		return {
			...super.model,
			header: {
				title: 'Edit field',
			},
			controller: this,
			body: {
				sections: [
					{
						form: this.formVc.render() as any,
					},
				],
			},
		}
	}
}
