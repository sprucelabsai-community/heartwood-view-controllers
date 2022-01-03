import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const toolNotFoundSchema: SpruceErrors.HeartwoodViewControllers.ToolNotFoundSchema  = {
	id: 'toolNotFound',
	namespace: 'HeartwoodViewControllers',
	name: 'Tool not found',
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

SchemaRegistry.getInstance().trackSchema(toolNotFoundSchema)

export default toolNotFoundSchema
