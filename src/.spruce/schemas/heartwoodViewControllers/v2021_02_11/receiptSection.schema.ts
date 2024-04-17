import { SchemaRegistry } from '@sprucelabs/schema'
import receiptLineItemSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/receiptLineItem.schema'
import { SpruceSchemas } from '../../schemas.types'

const receiptSectionSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSectionSchema =
    {
        id: 'receiptSection',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: '',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** . */
            title: {
                type: 'text',
                options: undefined,
            },
            /** . */
            lineItems: {
                type: 'schema',
                isArray: true,
                options: { schema: receiptLineItemSchema_v2021_02_11 },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(receiptSectionSchema)

export default receiptSectionSchema
