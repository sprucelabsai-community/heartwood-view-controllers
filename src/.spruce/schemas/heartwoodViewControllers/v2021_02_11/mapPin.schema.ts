import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import buttonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/button.schema'

const mapPinSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapPinSchema  = {
	id: 'mapPin',
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
	            'subtitle': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'address': {
	                type: 'address',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'buttons': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: buttonSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(mapPinSchema)

export default mapPinSchema
