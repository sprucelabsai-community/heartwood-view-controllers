import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const textInputSchema: SpruceSchemas.Heartwood.v2021_02_11.TextInputSchema  = {
	id: 'textInput',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Text input',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'name': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'value': {
	                type: 'text',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Label. */
	            'label': {
	                label: 'Label',
	                type: 'text',
	                options: undefined
	            },
	            /** Hint. */
	            'hint': {
	                label: 'Hint',
	                type: 'text',
	                options: undefined
	            },
	            /** Required. */
	            'isRequired': {
	                label: 'Required',
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(textInputSchema)

export default textInputSchema
