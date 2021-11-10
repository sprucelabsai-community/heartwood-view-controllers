import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const viewAlreadyDestroyedSchema: SpruceErrors.HeartwoodViewControllers.ViewAlreadyDestroyedSchema  = {
	id: 'viewAlreadyDestroyed',
	namespace: 'HeartwoodViewControllers',
	name: 'View already destroyed',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'viewId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(viewAlreadyDestroyedSchema)

export default viewAlreadyDestroyedSchema
