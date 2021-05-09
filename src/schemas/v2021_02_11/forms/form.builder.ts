import { buildSchema } from '@sprucelabs/schema'
import { buildLocalFormImports } from '../../../utilities/buildLocalFormImports'

export default buildSchema({
	id: 'form',
	name: 'Form',
	importsWhenLocal: buildLocalFormImports(),
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	fields: {
		id: {
			type: 'text',
			isRequired: true,
		},
		className: {
			type: 'text',
			isPrivate: true,
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.FormViewController<S>',
			},
		},
		schema: {
			type: 'raw',
			isRequired: true,
			options: {
				valueType: 'S',
			},
		},
		onSubmit: {
			type: 'raw',
			label: 'Submit handler',
			options: {
				valueType: 'HeartwoodTypes.SubmitHandler<S>',
			},
		},
		onChange: {
			type: 'raw',
			label: 'Change handler',
			options: {
				valueType:
					'(options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void',
			},
		},
		values: {
			type: 'raw',
			label: 'Values',
			hint: 'The values you want the form to have. Control is given to the FormViewController after render.',
			options: {
				valueType: 'SpruceSchema.SchemaPartialValues<S>',
			},
		},
		errorsByField: {
			type: 'raw',
			label: 'Errors by field',
			options: {
				valueType: 'HeartwoodTypes.FormErrorsByField<S>',
			},
		},
		shouldShowSubmitControls: {
			type: 'boolean',
			label: 'Show submit controls',
			defaultValue: true,
		},
		shouldShowCancelButton: {
			type: 'boolean',
			label: 'Show cancel button',
			defaultValue: true,
		},
		isBusy: {
			type: 'boolean',
			label: 'Busy',
		},
		setValue: {
			type: 'raw',
			label: 'Set value handler',
			isPrivate: true,
			isRequired: true,
			options: {
				valueType:
					'(name: SpruceSchema.SchemaFieldNames<S>, value: any) => void',
			},
		},
		sections: {
			type: 'schema',
			label: 'Form sections',
			isRequired: true,
			isArray: true,
			options: {
				typeSuffix: '<S>',
				schema: buildSchema({
					id: 'formSection',
					typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
					fields: {
						schema: {
							type: 'raw',
							isPrivate: true,
							hint: 'Do not use directly, set by parent form.',
							options: {
								valueType: 'S',
							},
						},
						className: {
							type: 'text',
							isPrivate: true,
						},
						values: {
							type: 'raw',
							label: 'Initial values',
							isPrivate: true,
							options: {
								valueType: 'SpruceSchema.SchemaPartialValues<S>',
							},
						},
						title: {
							type: 'text',
							label: 'Title',
						},
						fields: {
							type: 'raw',
							isArray: true,
							label: 'Form fields',
							isRequired: true,
							hint: 'Put any fields from the schema you provided to be shown in this section.',
							options: {
								valueType: 'SpruceSchema.SchemaFieldNames<S>',
							},
						},
					},
				}),
			},
		},
	},
})
