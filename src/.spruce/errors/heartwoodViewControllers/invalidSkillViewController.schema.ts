import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidSkillViewControllerSchema: SpruceErrors.HeartwoodViewControllers.InvalidSkillViewControllerSchema  = {
	id: 'invalidSkillViewController',
	namespace: 'HeartwoodViewControllers',
	name: 'Invalid skill view',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(invalidSkillViewControllerSchema)

export default invalidSkillViewControllerSchema
