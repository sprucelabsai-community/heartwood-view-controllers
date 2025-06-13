import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import fontSettingSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/fontSetting.schema'

const themeFontsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeFontsSchema  = {
	id: 'themeFonts',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Header One Font. The font used for the largest headers. */
	            'headerOneFont': {
	                label: 'Header One Font',
	                type: 'schema',
	                hint: 'The font used for the largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Header One Font. The font used for the largest headers. */
	            'headerTwoFont': {
	                label: 'Header One Font',
	                type: 'schema',
	                hint: 'The font used for the largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Header One Font. The font used for the largest headers. */
	            'headerThreeFont': {
	                label: 'Header One Font',
	                type: 'schema',
	                hint: 'The font used for the largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Header One Font. The font used for the largest headers. */
	            'bodyFont': {
	                label: 'Header One Font',
	                type: 'schema',
	                hint: 'The font used for the largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Header One Font. The font used for the largest headers. */
	            'footerFont': {
	                label: 'Header One Font',
	                type: 'schema',
	                hint: 'The font used for the largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(themeFontsSchema)

export default themeFontsSchema
