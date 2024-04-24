import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const rowDeletedSchema: SpruceErrors.HeartwoodViewControllers.RowDeletedSchema  = {
	id: 'rowDeleted',
	namespace: 'HeartwoodViewControllers',
	name: 'row deleted',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'row': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(rowDeletedSchema)

export default rowDeletedSchema
