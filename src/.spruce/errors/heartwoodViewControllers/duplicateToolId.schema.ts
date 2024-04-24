import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const duplicateToolIdSchema: SpruceErrors.HeartwoodViewControllers.DuplicateToolIdSchema  = {
	id: 'duplicateToolId',
	namespace: 'HeartwoodViewControllers',
	name: 'Dulicate tool id',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(duplicateToolIdSchema)

export default duplicateToolIdSchema
