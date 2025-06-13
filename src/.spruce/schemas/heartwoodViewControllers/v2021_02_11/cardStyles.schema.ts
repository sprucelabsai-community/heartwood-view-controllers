import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import cardStyleSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardStyle.schema'

const cardStylesSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStylesSchema  = {
	id: 'cardStyles',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'informational': {
	                type: 'schema',
	                options: {schema: cardStyleSchema_v2021_02_11,}
	            },
	            /** . */
	            'graphical': {
	                type: 'schema',
	                options: {schema: cardStyleSchema_v2021_02_11,}
	            },
	            /** . */
	            'heading': {
	                type: 'schema',
	                options: {schema: cardStyleSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardStylesSchema)

export default cardStylesSchema
