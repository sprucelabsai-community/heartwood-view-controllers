import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidAppControllerSchema: SpruceErrors.HeartwoodViewControllers.InvalidAppControllerSchema  = {
	id: 'invalidAppController',
	namespace: 'HeartwoodViewControllers',
	name: 'Invalid app controller',
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

SchemaRegistry.getInstance().trackSchema(invalidAppControllerSchema)

export default invalidAppControllerSchema
