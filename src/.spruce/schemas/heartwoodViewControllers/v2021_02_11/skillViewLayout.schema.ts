import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import cardSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'

const skillViewLayoutSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayoutSchema  = {
	id: 'skillViewLayout',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Layout',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'headerCard': {
	                type: 'schema',
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'leftCards': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'rightCards': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'topCards': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'cards': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'bottomCards': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'style': {
	                type: 'select',
	                options: {choices: [{"value":"one-col","label":"One column"},{"value":"two-col","label":"Two columns"},{"value":"three-col","label":"Three columns"},{"value":"big-left","label":"Big left"},{"value":"big-right","label":"Big right"},{"value":"big-top","label":"Big top"},{"value":"big-top-left","label":"Big top left"},{"value":"grid","label":"Grid"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(skillViewLayoutSchema)

export default skillViewLayoutSchema
