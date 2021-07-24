import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import textSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/text.schema'
import listSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/list.schema'

const formSectionSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSectionSchema  = {
	id: 'formSection',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'className': {
	                type: 'text',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Title. */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                options: undefined
	            },
	            /** Text. */
	            'text': {
	                label: 'Text',
	                type: 'schema',
	                options: {schema: textSchema_v2021_02_11,}
	            },
	            /** Grid. */
	            'shouldRenderAsGrid': {
	                label: 'Grid',
	                type: 'boolean',
	                options: undefined
	            },
	            /** List. */
	            'list': {
	                label: 'List',
	                type: 'schema',
	                options: {schema: listSchema_v2021_02_11,}
	            },
	            /** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
	            'fields': {
	                label: 'Form fields',
	                type: 'raw',
	                hint: 'Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name.',
	                isArray: true,
	                options: {valueType: `SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(formSectionSchema)

export default formSectionSchema
