import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const statsStatSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsStatSchema  = {
	id: 'statsStat',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'value': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'label': {
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(statsStatSchema)

export default statsStatSchema
