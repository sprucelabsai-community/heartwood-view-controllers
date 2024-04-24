import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const duplicateEventIdSchema: SpruceErrors.HeartwoodViewControllers.DuplicateEventIdSchema  = {
	id: 'duplicateEventId',
	namespace: 'HeartwoodViewControllers',
	name: 'Duplicate event id',
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

SchemaRegistry.getInstance().trackSchema(duplicateEventIdSchema)

export default duplicateEventIdSchema
