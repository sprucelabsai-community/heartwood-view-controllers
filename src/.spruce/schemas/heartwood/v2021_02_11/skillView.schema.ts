import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import layoutSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/layout.schema'

const skillViewSchema: SpruceSchemas.Heartwood.v2021_02_11.SkillViewSchema  = {
	id: 'skillView',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Skill view',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Center vertically. */
	            'shouldCenterVertically': {
	                label: 'Center vertically',
	                type: 'boolean',
	                defaultValue: false,
	                options: undefined
	            },
	            /** Layout. */
	            'layouts': {
	                label: 'Layout',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: layoutSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(skillViewSchema)

export default skillViewSchema
