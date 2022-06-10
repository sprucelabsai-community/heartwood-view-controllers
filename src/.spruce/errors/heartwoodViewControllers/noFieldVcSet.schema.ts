import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const noFieldVcSetSchema: SpruceErrors.HeartwoodViewControllers.NoFieldVcSetSchema  = {
	id: 'noFieldVcSet',
	namespace: 'HeartwoodViewControllers',
	name: 'No field vc set',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'fieldName': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(noFieldVcSetSchema)

export default noFieldVcSetSchema
