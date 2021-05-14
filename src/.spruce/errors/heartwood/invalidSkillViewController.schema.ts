import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const invalidSkillViewControllerSchema: SpruceErrors.Heartwood.InvalidSkillViewControllerSchema  = {
	id: 'invalidSkillViewController',
	namespace: 'Heartwood',
	name: 'Invalid skill view',
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
