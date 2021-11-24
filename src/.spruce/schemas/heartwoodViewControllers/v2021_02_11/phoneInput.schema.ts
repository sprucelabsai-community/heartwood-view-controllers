import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const phoneInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PhoneInputSchema  = {
	id: 'phoneInput',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Phone input',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
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
	            /** On change handler. */
	            'onChange': {
	                label: 'On change handler',
	                type: 'raw',
	                options: {valueType: `(value?: string) => void | boolean | Promise<void | boolean>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(phoneInputSchema)

export default phoneInputSchema
