import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const themePropsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemePropsSchema  = {
	id: 'themeProps',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
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
	            /** Color 2. The color of anything overlayed on the background of a card (color2Inverse) */
	            'color2': {
	                label: 'Color 2',
	                type: 'text',
	                hint: 'The color of anything overlayed on the background of a card (color2Inverse)',
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
	            /** Color 4 (compliment). Border, outlines and highlights */
	            'color4Compliment': {
	                label: 'Color 4 (compliment)',
	                type: 'text',
	                hint: 'Border, outlines and highlights',
	                options: undefined
	            },
	            /** Color 4 (inverse). Background for buttons and menu items. */
	            'color4Inverse': {
	                label: 'Color 4 (inverse)',
	                type: 'text',
	                hint: 'Background for buttons and menu items.',
	                options: undefined
	            },
	            /** Color (inverse, compliment). Background for buttons and menu items */
	            'color4InverseCompliment': {
	                label: 'Color (inverse, compliment)',
	                type: 'text',
	                hint: 'Background for buttons and menu items',
	                options: undefined
	            },
	            /** Color. The foreground color of the control bar. */
	            'controlBarColor1': {
	                label: 'Color',
	                type: 'text',
	                hint: 'The foreground color of the control bar.',
	                options: undefined
	            },
	            /** Color. The background color of the control bar. */
	            'controlBarColor2': {
	                label: 'Color',
	                type: 'text',
	                hint: 'The background color of the control bar.',
	                options: undefined
	            },
	            /** Color. Errors overlayed on a background colored with errorColor1Inverse. */
	            'errorColor1': {
	                label: 'Color',
	                type: 'text',
	                hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
	                options: undefined
	            },
	            /** Color. The background used when rendering errors. */
	            'errorColor1Inverse': {
	                label: 'Color',
	                type: 'text',
	                hint: 'The background used when rendering errors.',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(themePropsSchema)

export default themePropsSchema
