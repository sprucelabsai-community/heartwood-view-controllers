import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import receiptHeaderSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/receiptHeader.schema'
import receiptSectionSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/receiptSection.schema'
import receiptTotalSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/receiptTotal.schema'

const receiptSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSchema  = {
	id: 'receipt',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Receipt',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'header': {
	                type: 'schema',
	                options: {schema: receiptHeaderSchema_v2021_02_11,}
	            },
	            /** . */
	            'sections': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: receiptSectionSchema_v2021_02_11,}
	            },
	            /** . */
	            'totals': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: receiptTotalSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(receiptSchema)

export default receiptSchema
