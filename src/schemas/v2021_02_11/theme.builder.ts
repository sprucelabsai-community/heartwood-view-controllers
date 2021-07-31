import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'theme',
	name: 'Theme',
	description: '',
	fields: {
		props: {
			type: 'schema',
			isRequired: true,
			options: {
				schema: {
					id: 'themeProps',
					fields: {
						color1: {
							type: 'text',
							label: 'Color 1',
							hint: 'Used to color anything overlayed on the background (color1Inverse or color1InverseGradient).',
						},
						color1Inverse: {
							type: 'text',
							label: 'Color 1 (inverse)',
							hint: 'Background color of the view if color1InverseGradient is not set',
						},
						color1InverseGradient: {
							type: 'text',
							label: 'Color 1 Gradient (inverse)',
							hint: 'Background griedent applied to view.',
						},
						color2: {
							type: 'text',
							label: 'Color 2',
							hint: 'The color of anything overlayed on the background of a card (color2Inverse)',
						},
						color2Transparent: {
							type: 'text',
							label: 'Color 2',
							hint: 'The color of overlays ontop of a card.',
						},
						color2Inverse: {
							type: 'text',
							label: 'Color',
							hint: 'Background color of cards.',
						},
						color2InverseTransparent: {
							type: 'text',
							label: 'Color 2 (inverse with transparency)',
							hint: 'Background color used when some transparency is needed for context.',
						},
						color3: {
							type: 'text',
							label: 'Color 3',
							hint: 'Titles of cards.',
						},
						color3Compliment: {
							type: 'text',
							label: 'Color 3 (compliment)',
							hint: 'Subtitles of cards.',
						},
						color3Inverse: {
							type: 'text',
							label: 'Color 3 (inverse)',
							hint: 'Background for headers of cards.',
						},
						color4: {
							type: 'text',
							label: 'Color 4',
							hint: 'Foreground for buttons and menu items.',
						},
						color4Compliment: {
							type: 'text',
							label: 'Color 4 (compliment)',
							hint: 'Border, outlines and highlights',
						},
						color4Inverse: {
							type: 'text',
							label: 'Color 4 (inverse)',
							hint: 'Background for buttons and menu items.',
						},
						color4InverseCompliment: {
							type: 'text',
							label: 'Color (inverse, compliment)',
							hint: 'Background for buttons and menu items',
						},
						controlBarColor1: {
							type: 'text',
							label: 'Color',
							hint: 'The foreground color of the control bar.',
						},
						controlBarColor2: {
							type: 'text',
							label: 'Color',
							hint: 'The background color of the control bar.',
						},
						errorColor1: {
							type: 'text',
							label: 'Color',
							hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
						},
						errorColor1Inverse: {
							type: 'text',
							label: 'Color',
							hint: 'The background used when rendering errors.',
						},
					},
				},
			},
		},
	},
})
