import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const exportFailedSchema: SpruceErrors.Heartwood.ExportFailedSchema  = {
	id: 'exportFailed',
	namespace: 'Heartwood',
	name: 'Export failed',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(exportFailedSchema)

export default exportFailedSchema
