import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const exportFailedSchema: SpruceErrors.HeartwoodViewControllers.ExportFailedSchema  = {
	id: 'exportFailed',
	namespace: 'HeartwoodViewControllers',
	name: 'Export failed',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	    }
}

SchemaRegistry.getInstance().trackSchema(exportFailedSchema)

export default exportFailedSchema
