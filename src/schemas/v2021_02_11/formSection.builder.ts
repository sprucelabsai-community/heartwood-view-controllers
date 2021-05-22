import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
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
})
