import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import layoutSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/layout.schema'
import toolBeltSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/toolBelt.schema'

const skillViewSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewSchema  = {
	id: 'skillView',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Skill view',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
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
	            /** Full screen. */
	            'isFullScreen': {
	                label: 'Full screen',
	                type: 'boolean',
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
	            /** Tool belt. */
	            'toolBelt': {
	                label: 'Tool belt',
	                type: 'schema',
	                options: {schema: toolBeltSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(skillViewSchema)

export default skillViewSchema
