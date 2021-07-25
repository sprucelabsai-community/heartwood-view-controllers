import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const duplicateRowIdSchema: SpruceErrors.HeartwoodViewControllers.DuplicateRowIdSchema  = {
	id: 'duplicateRowId',
	namespace: 'HeartwoodViewControllers',
	name: 'Duplicate row id',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'rowId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(duplicateRowIdSchema)

export default duplicateRowIdSchema
