import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const missingStorageSchema: SpruceErrors.HeartwoodViewControllers.MissingStorageSchema  = {
	id: 'missingStorage',
	namespace: 'HeartwoodViewControllers',
	name: 'Missing storage',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(missingStorageSchema)

export default missingStorageSchema
