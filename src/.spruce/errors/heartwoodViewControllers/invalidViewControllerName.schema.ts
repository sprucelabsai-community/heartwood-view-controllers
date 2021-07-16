import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidViewControllerNameSchema: SpruceErrors.HeartwoodViewControllers.InvalidViewControllerNameSchema  = {
	id: 'invalidViewControllerName',
	namespace: 'HeartwoodViewControllers',
	name: 'Invalid view controller name',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Supplied name. */
	            'name': {
	                label: 'Supplied name',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Valid names. */
	            'validNames': {
	                label: 'Valid names',
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidViewControllerNameSchema)

export default invalidViewControllerNameSchema
