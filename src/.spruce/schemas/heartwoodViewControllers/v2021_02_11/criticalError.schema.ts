import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import buttonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/button.schema'

const criticalErrorSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalErrorSchema  = {
	id: 'criticalError',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'title': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'message': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'buttons': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: buttonSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(criticalErrorSchema)

export default criticalErrorSchema
