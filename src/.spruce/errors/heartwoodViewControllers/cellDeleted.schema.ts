import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const cellDeletedSchema: SpruceErrors.HeartwoodViewControllers.CellDeletedSchema  = {
	id: 'cellDeleted',
	namespace: 'HeartwoodViewControllers',
	name: 'Cell deleted',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(cellDeletedSchema)

export default cellDeletedSchema
