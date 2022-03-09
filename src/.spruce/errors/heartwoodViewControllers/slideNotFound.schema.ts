import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const slideNotFoundSchema: SpruceErrors.HeartwoodViewControllers.SlideNotFoundSchema  = {
	id: 'slideNotFound',
	namespace: 'HeartwoodViewControllers',
	name: 'Slide not found',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(slideNotFoundSchema)

export default slideNotFoundSchema
