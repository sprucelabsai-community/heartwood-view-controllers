import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import routerDestinationSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/routerDestination.schema'

const toastMessageSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToastMessageSchema  = {
	id: 'toastMessage',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Toast message',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Content. */
	            'content': {
	                label: 'Content',
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
	            /** . */
	            'destination': {
	                type: 'schema',
	                options: {schema: routerDestinationSchema_v2021_02_11,}
	            },
	            /** Click handler. */
	            'onClick': {
	                label: 'Click handler',
	                type: 'raw',
	                options: {valueType: `() => Promise<void> | void`,}
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
