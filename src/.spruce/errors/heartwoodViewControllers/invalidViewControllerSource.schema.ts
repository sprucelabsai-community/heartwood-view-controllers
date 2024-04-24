import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidViewControllerSourceSchema: SpruceErrors.HeartwoodViewControllers.InvalidViewControllerSourceSchema  = {
	id: 'invalidViewControllerSource',
	namespace: 'HeartwoodViewControllers',
	name: 'Invalid view controller source',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidViewControllerSourceSchema)

export default invalidViewControllerSourceSchema
