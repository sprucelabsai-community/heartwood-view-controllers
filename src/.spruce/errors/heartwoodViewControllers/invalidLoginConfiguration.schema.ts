import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidLoginConfigurationSchema: SpruceErrors.HeartwoodViewControllers.InvalidLoginConfigurationSchema  = {
	id: 'invalidLoginConfiguration',
	namespace: 'HeartwoodViewControllers',
	name: 'Invalid login configuration',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidLoginConfigurationSchema)

export default invalidLoginConfigurationSchema
