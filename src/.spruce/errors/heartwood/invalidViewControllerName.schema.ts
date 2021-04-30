import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidViewControllerNameSchema: SpruceErrors.Heartwood.InvalidViewControllerNameSchema  = {
	id: 'invalidViewControllerName',
	namespace: 'Heartwood',
	name: 'Invalid view controller name',
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
