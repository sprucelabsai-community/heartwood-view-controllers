import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import fontSettingSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/fontSetting.schema'

const controlBarSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ControlBarSchema  = {
	id: 'controlBar',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Control bar color 1. The foreground color of the control bar. */
	            'foregroundColor': {
	                label: 'Control bar color 1',
	                type: 'text',
	                hint: 'The foreground color of the control bar.',
	                options: undefined
	            },
	            /** Control bar color 2. The background color of the control bar. */
	            'backgroundColor': {
	                label: 'Control bar color 2',
	                type: 'text',
	                hint: 'The background color of the control bar.',
	                options: undefined
	            },
	            /** Control bar font. The font used in the control bar. */
	            'font': {
	                label: 'Control bar font',
	                type: 'schema',
	                hint: 'The font used in the control bar.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Control bar style. Should the control bar span the full width of the screen or the width of the buttons and float in the center? */
	            'style': {
	                label: 'Control bar style',
	                type: 'select',
	                hint: 'Should the control bar span the full width of the screen or the width of the buttons and float in the center?',
	                options: {choices: [{"value":"standard","label":"Standard"},{"value":"floating","label":"Floating"}],}
	            },
	            /** Control bar size. */
	            'size': {
	                label: 'Control bar size',
	                type: 'select',
	                options: {choices: [{"value":"medium","label":"Standard"},{"value":"large","label":"Large"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(controlBarSchema)

export default controlBarSchema
