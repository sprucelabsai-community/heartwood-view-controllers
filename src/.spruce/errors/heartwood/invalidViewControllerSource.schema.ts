import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidViewControllerSourceSchema: SpruceErrors.Heartwood.InvalidViewControllerSourceSchema  = {
	id: 'invalidViewControllerSource',
	namespace: 'Heartwood',
	name: 'Invalid view controller source',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidViewControllerSourceSchema)

export default invalidViewControllerSourceSchema
