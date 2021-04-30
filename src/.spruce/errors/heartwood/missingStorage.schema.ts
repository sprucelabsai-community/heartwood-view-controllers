import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const missingStorageSchema: SpruceErrors.Heartwood.MissingStorageSchema  = {
	id: 'missingStorage',
	namespace: 'Heartwood',
	name: 'Missing storage',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(missingStorageSchema)

export default missingStorageSchema
