import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const stepNotCompleteSchema: SpruceErrors.HeartwoodViewControllers.StepNotCompleteSchema  = {
	id: 'stepNotComplete',
	namespace: 'HeartwoodViewControllers',
	name: ' Step not complete',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'stepId': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(stepNotCompleteSchema)

export default stepNotCompleteSchema
