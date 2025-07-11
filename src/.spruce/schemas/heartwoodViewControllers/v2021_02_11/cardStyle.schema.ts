import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import themeFontsSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/themeFonts.schema'

const cardStyleSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyleSchema  = {
	id: 'cardStyle',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Card Body Background Color. The background color of the body of the card. */
	            'bodyBackgroundColor': {
	                label: 'Card Body Background Color',
	                type: 'text',
	                hint: 'The background color of the body of the card.',
	                options: undefined
	            },
	            /** Card Body Foreground Color. The color of the text of the body of the card. */
	            'bodyForegroundColor': {
	                label: 'Card Body Foreground Color',
	                type: 'text',
	                hint: 'The color of the text of the body of the card.',
	                options: undefined
	            },
	            /** Header Background Color. The background color of the card's header. */
	            'headerBackgroundColor': {
	                label: 'Header Background Color',
	                type: 'text',
	                hint: 'The background color of the card\'s header.',
	                options: undefined
	            },
	            /** Header Foreground Color. The color of the text in the card's header. */
	            'headerForegroundColor': {
	                label: 'Header Foreground Color',
	                type: 'text',
	                hint: 'The color of the text in the card\'s header.',
	                options: undefined
	            },
	            /** Footer Background Color. The background color of the card's footer. */
	            'footerBackgroundColor': {
	                label: 'Footer Background Color',
	                type: 'text',
	                hint: 'The background color of the card\'s footer.',
	                options: undefined
	            },
	            /** Footer Foreground Color. The color of the text in the card's footer. */
	            'footerForegroundColor': {
	                label: 'Footer Foreground Color',
	                type: 'text',
	                hint: 'The color of the text in the card\'s footer.',
	                options: undefined
	            },
	            /** Fonts. The fonts used in the card. */
	            'fonts': {
	                label: 'Fonts',
	                type: 'schema',
	                hint: 'The fonts used in the card.',
	                options: {schema: themeFontsSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardStyleSchema)

export default cardStyleSchema
