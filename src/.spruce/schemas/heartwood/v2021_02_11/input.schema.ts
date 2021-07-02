import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const inputSchema: SpruceSchemas.Heartwood.v2021_02_11.InputSchema  = {
	id: 'input',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Input wrapper',
	description: 'Wraps all inputs in form with things like labels, hints, and error messages.',
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
	                type: 'raw',
	                isPrivate: true,
	                options: {valueType: `any`,}
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
	            /** On change handle. */
	            'onChange': {
	                label: 'On change handle',
	                type: 'raw',
	                options: {valueType: `(value?: string) => void | Promise<void>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(inputSchema)

export default inputSchema
