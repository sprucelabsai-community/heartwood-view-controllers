import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import calendarEventColorsSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendarEventColors.schema'

const themePropsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemePropsSchema  = {
	id: 'themeProps',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Card corner style. */
	            'borderRadius': {
	                label: 'Card corner style',
	                type: 'select',
	                options: {choices: [{"value":"rounded","label":"Rounded"},{"value":"square","label":"Square"}],}
	            },
	            /** Color 1. Used to color anything overlayed on the background (color1Inverse or color1InverseGradient). */
	            'color1': {
	                label: 'Color 1',
	                type: 'text',
	                hint: 'Used to color anything overlayed on the background (color1Inverse or color1InverseGradient).',
	                options: undefined
	            },
	            /** Color 1 (inverse). Background color of the view if color1InverseGradient is not set */
	            'color1Inverse': {
	                label: 'Color 1 (inverse)',
	                type: 'text',
	                hint: 'Background color of the view if color1InverseGradient is not set',
	                options: undefined
	            },
	            /** Color 1 Gradient (inverse). Background griedent applied to view. */
	            'color1InverseGradient': {
	                label: 'Color 1 Gradient (inverse)',
	                type: 'text',
	                hint: 'Background griedent applied to view.',
	                options: undefined
	            },
	            /** Color 2. The color of text inside of cards and lists. */
	            'color2': {
	                label: 'Color 2',
	                type: 'text',
	                hint: 'The color of text inside of cards and lists.',
	                options: undefined
	            },
	            /** Color 2 (compliment). The color of headers in card bodies and lists. Defaults to color2. */
	            'color2Compliment': {
	                label: 'Color 2 (compliment)',
	                type: 'text',
	                hint: 'The color of headers in card bodies and lists. Defaults to color2.',
	                options: undefined
	            },
	            /** Color 2. The color of overlays ontop of a card. */
	            'color2Transparent': {
	                label: 'Color 2',
	                type: 'text',
	                hint: 'The color of overlays ontop of a card.',
	                options: undefined
	            },
	            /** Color. Background color of cards. */
	            'color2Inverse': {
	                label: 'Color',
	                type: 'text',
	                hint: 'Background color of cards.',
	                options: undefined
	            },
	            /** Color 2 (inverse with transparency). Background color used when some transparency is needed for context. */
	            'color2InverseTransparent': {
	                label: 'Color 2 (inverse with transparency)',
	                type: 'text',
	                hint: 'Background color used when some transparency is needed for context.',
	                options: undefined
	            },
	            /** Color 3. Titles of cards. */
	            'color3': {
	                label: 'Color 3',
	                type: 'text',
	                hint: 'Titles of cards.',
	                options: undefined
	            },
	            /** Color 3 (compliment). Subtitles of cards. */
	            'color3Compliment': {
	                label: 'Color 3 (compliment)',
	                type: 'text',
	                hint: 'Subtitles of cards.',
	                options: undefined
	            },
	            /** Color 3 (inverse). Background for headers of cards. */
	            'color3Inverse': {
	                label: 'Color 3 (inverse)',
	                type: 'text',
	                hint: 'Background for headers of cards.',
	                options: undefined
	            },
	            /** Color 4. Foreground for buttons and menu items. */
	            'color4': {
	                label: 'Color 4',
	                type: 'text',
	                hint: 'Foreground for buttons and menu items.',
	                options: undefined
	            },
	            /** Color 4 (compliment). Borders for buttons and menu items. */
	            'color4Compliment': {
	                label: 'Color 4 (compliment)',
	                type: 'text',
	                hint: 'Borders for buttons and menu items.',
	                options: undefined
	            },
	            /** Color 4 (compliment, transparent). Lighter version of borders, outlines, and highlights */
	            'color4ComplimentTransparent': {
	                label: 'Color 4 (compliment, transparent)',
	                type: 'text',
	                hint: 'Lighter version of borders, outlines, and highlights',
	                options: undefined
	            },
	            /** Color 4 (inverse). Background for buttons and menu items. */
	            'color4Inverse': {
	                label: 'Color 4 (inverse)',
	                type: 'text',
	                hint: 'Background for buttons and menu items.',
	                options: undefined
	            },
	            /** Color 4 (inverse, compliment). Background for buttons and menu items */
	            'color4InverseCompliment': {
	                label: 'Color 4 (inverse, compliment)',
	                type: 'text',
	                hint: 'Background for buttons and menu items',
	                options: undefined
	            },
	            /** Control bar color 1. The foreground color of the control bar. */
	            'controlBarColor1': {
	                label: 'Control bar color 1',
	                type: 'text',
	                hint: 'The foreground color of the control bar.',
	                options: undefined
	            },
	            /** Control bar color 2. The background color of the control bar. */
	            'controlBarColor2': {
	                label: 'Control bar color 2',
	                type: 'text',
	                hint: 'The background color of the control bar.',
	                options: undefined
	            },
	            /** Tool belt color 2. The background color of the tool belts. */
	            'toolBeltColor2': {
	                label: 'Tool belt color 2',
	                type: 'text',
	                hint: 'The background color of the tool belts.',
	                options: undefined
	            },
	            /** Error color 1. Errors overlayed on a background colored with errorColor1Inverse. */
	            'errorColor1': {
	                label: 'Error color 1',
	                type: 'text',
	                hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
	                options: undefined
	            },
	            /** Error color 2. The background used when rendering errors. */
	            'errorColor1Inverse': {
	                label: 'Error color 2',
	                type: 'text',
	                hint: 'The background used when rendering errors.',
	                options: undefined
	            },
	            /** Warning color 1. Warnings overlayed on a background colored with warningColor1Inverse. */
	            'warningColor1': {
	                label: 'Warning color 1',
	                type: 'text',
	                hint: 'Warnings overlayed on a background colored with warningColor1Inverse.',
	                options: undefined
	            },
	            /** Warning color 2. The background used when rendering tarnings. */
	            'warningColor1Inverse': {
	                label: 'Warning color 2',
	                type: 'text',
	                hint: 'The background used when rendering tarnings.',
	                options: undefined
	            },
	            /** . */
	            'calendarEvents': {
	                type: 'schema',
	                options: {schema: calendarEventColorsSchema_v2021_02_11,}
	            },
	            /** Footer Icon Url. The url of the icon to show in the footer. Must be publically served in some way */
	            'footerIconUrl': {
	                label: 'Footer Icon Url',
	                type: 'text',
	                hint: 'The url of the icon to show in the footer. Must be publically served in some way',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(themePropsSchema)

export default themePropsSchema
