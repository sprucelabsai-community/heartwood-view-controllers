import { buildSchema } from '@sprucelabs/schema'
import {
	buildLocalTypesImport,
	buildRemoteTypesImport,
} from '../../utilities/importBuilder'

export default buildSchema({
	id: 'formSection',
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	importsWhenLocal: buildLocalTypesImport(),
	importsWhenRemote: buildRemoteTypesImport(),
	fields: {
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
			hint: 'Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name.',
			options: {
				valueType:
					'SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>',
			},
		},
	},
})
