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
	            /** Alternative Header Font. The font used for the alternative headers. These are rendered next to the header one font, but are usually smaller. */
	            'altHeaderFont': {
	                label: 'Alternative Header Font',
	                type: 'schema',
	                hint: 'The font used for the alternative headers. These are rendered next to the header one font, but are usually smaller.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Header Two Font. The font used for the second largest headers. */
	            'headerTwoFont': {
	                label: 'Header Two Font',
	                type: 'schema',
	                hint: 'The font used for the second largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Header Three Font. The font used for third largest headers. */
	            'headerThreeFont': {
	                label: 'Header Three Font',
	                type: 'schema',
	                hint: 'The font used for third largest headers.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Body Font. The font used for the body text on all cards, toolbelt, etc. */
	            'bodyFont': {
	                label: 'Body Font',
	                type: 'schema',
	                hint: 'The font used for the body text on all cards, toolbelt, etc.',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	            /** Footer Font. The font used for footers (but can be overriden by card footer styles). */
	            'footerFont': {
	                label: 'Footer Font',
	                type: 'schema',
	                hint: 'The font used for footers (but can be overriden by card footer styles).',
	                options: {schema: fontSettingSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(themeFontsSchema)

export default themeFontsSchema
