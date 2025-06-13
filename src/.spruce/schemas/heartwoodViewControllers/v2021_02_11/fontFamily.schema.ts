import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const fontFamilySchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontFamilySchema  = {
	id: 'fontFamily',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Name. What is the name of the font family? e.g. "Arial" or "Headers". This will be the name you can apply to different parts of the theme. */
	            'name': {
	                label: 'Name',
	                type: 'text',
	                hint: 'What is the name of the font family? e.g. "Arial" or "Headers". This will be the name you can apply to different parts of the theme.',
	                options: undefined
	            },
	            /** Source. The URL to the font file (otf, ttf, etc.). Must be publicly accessible. */
	            'src': {
	                label: 'Source',
	                type: 'text',
	                isRequired: true,
	                hint: 'The URL to the font file (otf, ttf, etc.). Must be publicly accessible.',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(fontFamilySchema)

export default fontFamilySchema
