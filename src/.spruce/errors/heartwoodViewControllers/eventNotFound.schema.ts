import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const eventNotFoundSchema: SpruceErrors.HeartwoodViewControllers.EventNotFoundSchema  = {
	id: 'eventNotFound',
	namespace: 'HeartwoodViewControllers',
	name: 'Event not found',
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

SchemaRegistry.getInstance().trackSchema(eventNotFoundSchema)

export default eventNotFoundSchema
