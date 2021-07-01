import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listTextInputSchema: SpruceSchemas.Heartwood.v2021_02_11.ListTextInputSchema  = {
	id: 'listTextInput',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
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
	            /** . */
	            'setValue': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `(name: string, value: any) => void`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listTextInputSchema)

export default listTextInputSchema
