import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const toastMessageSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToastMessageSchema  = {
	id: 'toastMessage',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Toast message',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Message. */
	            'message': {
	                label: 'Message',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Style. */
	            'style': {
	                label: 'Style',
	                type: 'select',
	                options: {choices: [{"value":"info","label":"info"},{"value":"success","label":"success"},{"value":"warning","label":"warning"},{"value":"critical","label":"critical"}],}
	            },
	            /** Is Sticky. */
	            'isSticky': {
	                label: 'Is Sticky',
	                type: 'boolean',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(toastMessageSchema)

export default toastMessageSchema
