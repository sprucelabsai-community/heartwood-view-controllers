import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const buttonNotFoundSchema: SpruceErrors.HeartwoodViewControllers.ButtonNotFoundSchema  = {
	id: 'buttonNotFound',
	namespace: 'HeartwoodViewControllers',
	name: 'button not found',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(buttonNotFoundSchema)

export default buttonNotFoundSchema
