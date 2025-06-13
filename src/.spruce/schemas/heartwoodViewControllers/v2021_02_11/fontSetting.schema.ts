import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const fontSettingSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema  = {
	id: 'fontSetting',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Font Family. The name of the font family to use. This should match the name you set in the font families section of the theme. */
	            'fontFamily': {
	                label: 'Font Family',
	                type: 'text',
	                hint: 'The name of the font family to use. This should match the name you set in the font families section of the theme.',
	                options: undefined
	            },
	            /** Font Size. The size of the font. e.g. "16px" or "1em". */
	            'fontSize': {
	                label: 'Font Size',
	                type: 'text',
	                hint: 'The size of the font. e.g. "16px" or "1em".',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(fontSettingSchema)

export default fontSettingSchema
