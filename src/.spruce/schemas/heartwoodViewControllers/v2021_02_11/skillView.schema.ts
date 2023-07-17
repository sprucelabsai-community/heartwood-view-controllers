import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import layoutSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/layout.schema'
import cardSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'

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
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.SkillViewController`,}
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
	            /** . */
	            'title': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'subtitle': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'description': {
	                type: 'text',
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
	            /** . */
	            'leftCards': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'rightCards': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'topCards': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'bottomCards': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'topLeftCards': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'layout': {
	                type: 'select',
	                options: {choices: [{"value":"big-left","label":"Big left"},{"value":"big-right","label":"Big right"},{"value":"big-top","label":"Big top"},{"value":"big-top-left","label":"Big top left"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(skillViewSchema)

export default skillViewSchema
