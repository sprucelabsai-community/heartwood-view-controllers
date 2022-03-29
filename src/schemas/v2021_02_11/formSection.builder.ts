import { buildSchema } from '@sprucelabs/schema'
import {
	buildLocalTypesImport,
	buildRemoteTypesImport,
} from '../../utilities/importBuilder'
import listBuilder from './list.builder'
import textBuilder from './text.builder'

export default buildSchema({
	id: 'formSection',
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	importsWhenLocal: buildLocalTypesImport(),
	importsWhenRemote: buildRemoteTypesImport(),
	fields: {
		id: {
			type: 'id',
		},
		className: {
			type: 'text',
			isPrivate: true,
		},
		title: {
			type: 'text',
			label: 'Title',
		},
		text: {
			type: 'schema',
			label: 'Text',
			options: {
				schema: textBuilder,
			},
		},
		shouldRenderAsGrid: {
			type: 'boolean',
			label: 'Grid',
		},
		list: {
			type: 'schema',
			label: 'List',
			options: {
				schema: listBuilder,
			},
		},
		fields: {
			type: 'raw',
			isArray: true,
			label: 'Form fields',
			hint: 'Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name.',
			options: {
				valueType:
					'SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>',
			},
		},
	},
})
