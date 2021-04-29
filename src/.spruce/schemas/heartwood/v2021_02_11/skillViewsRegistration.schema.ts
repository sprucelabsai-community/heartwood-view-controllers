import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const skillViewsRegistrationSchema: SpruceSchemas.Heartwood.v2021_02_11.SkillViewsRegistrationSchema  = {
	id: 'skillViewsRegistration',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Skill views registration',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'namespace': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'ids': {
	                type: 'text',
	                isRequired: true,
	                isArray: true,
	                options: undefined
	            },
	            /** . */
	            'source': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(skillViewsRegistrationSchema)

export default skillViewsRegistrationSchema
