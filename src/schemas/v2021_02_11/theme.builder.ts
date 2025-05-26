import { buildSchema } from '@sprucelabs/schema'
import calendarEventColorsBuilder from './calendarEventColors.builder'
import statusIndicatorColorsBuilder from './statusIndicatorColors.builder'

export default buildSchema({
    id: 'theme',
    name: 'Theme',
    description: '',
    fields: {
        name: {
            type: 'text',
            isRequired: true,
        },
        props: {
            type: 'schema',
            isRequired: true,
            options: {
                schema: {
                    id: 'themeProps',
                    fields: {
                        borderRadius: {
                            type: 'select',
                            label: 'Card corner style',
                            options: {
                                choices: [
                                    {
                                        value: 'rounded',
                                        label: 'Rounded',
                                    },
                                    {
                                        value: 'square',
                                        label: 'Square',
                                    },
                                ],
                            },
                        },
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
                            hint: 'The color of text inside of cards and lists.',
                        },
                        color2Compliment: {
                            type: 'text',
                            label: 'Color 2 (compliment)',
                            hint: 'The color of headers in card bodies and lists. Defaults to color2.',
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
                            hint: 'Borders for buttons and menu items.',
                        },
                        color4ComplimentTransparent: {
                            type: 'text',
                            label: 'Color 4 (compliment, transparent)',
                            hint: 'Lighter version of borders, outlines, and highlights',
                        },
                        color4Inverse: {
                            type: 'text',
                            label: 'Color 4 (inverse)',
                            hint: 'Background for buttons and menu items.',
                        },
                        color4InverseCompliment: {
                            type: 'text',
                            label: 'Color 4 (inverse, compliment)',
                            hint: 'Background for buttons and menu items',
                        },
                        controlBarColor1: {
                            type: 'text',
                            label: 'Control bar color 1',
                            hint: 'The foreground color of the control bar.',
                        },
                        controlBarColor2: {
                            type: 'text',
                            label: 'Control bar color 2',
                            hint: 'The background color of the control bar.',
                        },
                        toolBeltColor2: {
                            type: 'text',
                            label: 'Tool belt color 2',
                            hint: 'The background color of the tool belts.',
                        },
                        errorColor1: {
                            type: 'text',
                            label: 'Error color 1',
                            hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
                        },
                        errorColor1Inverse: {
                            type: 'text',
                            label: 'Error color 2',
                            hint: 'The background used when rendering errors.',
                        },
                        warningColor1: {
                            type: 'text',
                            label: 'Warning color 1',
                            hint: 'Warnings overlayed on a background colored with warningColor1Inverse.',
                        },
                        warningColor1Inverse: {
                            type: 'text',
                            label: 'Warning color 2',
                            hint: 'The background used when rendering tarnings.',
                        },
                        calendarEvents: {
                            type: 'schema',
                            options: {
                                schema: calendarEventColorsBuilder,
                            },
                        },
                        footerIconUrl: {
                            type: 'text',
                            label: 'Footer Icon Url',
                            hint: 'The url of the icon to show in the footer. Must be publicly served in some way',
                        },
                        statusIndicators: {
                            type: 'schema',
                            options: {
                                schema: statusIndicatorColorsBuilder,
                            },
                        },
                    },
                },
            },
        },
    },
})
