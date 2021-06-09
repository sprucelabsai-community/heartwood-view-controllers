import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const formSectionSchema: SpruceSchemas.Heartwood.v2021_02_11.FormSectionSchema  = {
	id: 'formSection',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
	    fields: {
	            /** . */
	            'className': {
	                type: 'text',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Initial values. */
	            'values': {
	                label: 'Initial values',
	                type: 'raw',
	                isPrivate: true,
	                options: {valueType: `SpruceSchema.SchemaPartialValues<S>`,}
	            },
	            /** Title. */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                options: undefined
	            },
	            /** Form fields. Put any fields from the schema you provided to be shown in this section. */
	            'fields': {
	                label: 'Form fields',
	                type: 'raw',
	                isRequired: true,
	                hint: 'Put any fields from the schema you provided to be shown in this section.',
	                isArray: true,
	                options: {valueType: `SpruceSchema.SchemaFieldNames<S>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(formSectionSchema)

export default formSectionSchema
