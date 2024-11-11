import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const appNotFoundSchema: SpruceErrors.HeartwoodViewControllers.AppNotFoundSchema  = {
	id: 'appNotFound',
	namespace: 'HeartwoodViewControllers',
	name: 'App not found',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'namespace': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(appNotFoundSchema)

export default appNotFoundSchema
