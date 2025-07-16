import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import progressDetailsSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/progressDetails.schema'

const progressSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressSchema  = {
	id: 'progress',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Progress',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** Title. Rendered in the center of the circle indicator! */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                hint: 'Rendered in the center of the circle indicator!',
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ProgressViewController`,}
	            },
	            /** Percent complete. A number from zero to 1 */
	            'percentComplete': {
	                label: 'Percent complete',
	                type: 'number',
	                hint: 'A number from zero to 1',
	                options: undefined
	            },
	            /** Details. */
	            'details': {
	                label: 'Details',
	                type: 'schema',
	                options: {schema: progressDetailsSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(progressSchema)

export default progressSchema
