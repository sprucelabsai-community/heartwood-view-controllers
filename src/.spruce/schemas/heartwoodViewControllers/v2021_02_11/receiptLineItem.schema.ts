import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const receiptLineItemSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptLineItemSchema  = {
	id: 'receiptLineItem',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'name': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'description': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'quantity': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'totalPrice': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(receiptLineItemSchema)

export default receiptLineItemSchema
