import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const statusIndicatorSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorSchema  = {
	id: 'statusIndicator',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Status indicator',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Status. */
	            'status': {
	                label: 'Status',
	                type: 'select',
	                options: {choices: [{"value":1,"label":"Status 1"},{"value":2,"label":"Status 2"},{"value":3,"label":"Status 3"},{"value":4,"label":"Status 4"},{"value":5,"label":"Status 5"}],}
	            },
	            /** Hint. */
	            'hint': {
	                label: 'Hint',
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(statusIndicatorSchema)

export default statusIndicatorSchema
