import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import skillViewLayoutSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/skillViewLayout.schema'

const lockScreenSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreenSchema  = {
	id: 'lockScreen',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'lock screen',
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
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreen>`,}
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
	            /** Width. */
	            'width': {
	                label: 'Width',
	                type: 'select',
	                defaultValue: "tight",
	                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
	            },
	            /** Layout. */
	            'layouts': {
	                label: 'Layout',
	                type: 'schema',
	                isArray: true,
	                options: {schema: skillViewLayoutSchema_v2021_02_11,}
	            },
	            /** Card controller. */
	            'skillViewController': {
	                label: 'Card controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.SkillViewController`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(lockScreenSchema)

export default lockScreenSchema
