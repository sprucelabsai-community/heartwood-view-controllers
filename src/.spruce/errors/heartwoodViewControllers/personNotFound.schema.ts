import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const personNotFoundSchema: SpruceErrors.HeartwoodViewControllers.PersonNotFoundSchema  = {
	id: 'personNotFound',
	namespace: 'HeartwoodViewControllers',
	name: 'Person not found',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'personId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(personNotFoundSchema)

export default personNotFoundSchema
