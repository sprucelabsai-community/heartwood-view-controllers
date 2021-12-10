import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const progressSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressSchema  = {
	id: 'progress',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Progress',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Title. Rendered in the center of the circle indicator! */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                hint: 'Rendered in the center of the circle indicator!',
	                options: undefined
	            },
	            /** Percent complete. A number from zero to 1 */
	            'percentComplete': {
	                label: 'Percent complete',
	                type: 'number',
	                hint: 'A number from zero to 1',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(progressSchema)

export default progressSchema
