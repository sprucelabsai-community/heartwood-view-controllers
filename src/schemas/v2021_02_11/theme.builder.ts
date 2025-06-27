import { buildSchema } from '@sprucelabs/schema'
import calendarEventColorsBuilder from './calendarEventColors.builder'
import statusIndicatorColorsBuilder from './statusIndicatorColors.builder'

const fontSettingSchema = buildSchema({
    id: 'fontSetting',
    fields: {
        fontFamily: {
            type: 'text',
            label: 'Font Family',
            hint: 'The name of the font family to use. This should match the name you set in the font families section of the theme.',
        },
        fontSize: {
            type: 'text',
            label: 'Font Size',
            hint: 'The size of the font. e.g. "16px" or "1em".',
        },
    },
})

const themeFontsSchema = buildSchema({
    id: 'themeFonts',
    fields: {
        headerOneFont: {
            type: 'schema',
            options: {
                schema: fontSettingSchema,
            },
            label: 'Header One Font',
            hint: 'The font used for the largest headers.',
        },
        altHeaderFont: {
            type: 'schema',
            options: {
                schema: fontSettingSchema,
            },
            label: 'Alternative Header Font',
            hint: 'The font used for the alternative headers. These are rendered next to the header one font, but are usually smaller.',
        },
        headerTwoFont: {
            type: 'schema',
            options: {
                schema: fontSettingSchema,
            },
            label: 'Header Two Font',
            hint: 'The font used for the second largest headers.',
        },
        headerThreeFont: {
            type: 'schema',
            options: {
                schema: fontSettingSchema,
            },
            label: 'Header Three Font',
            hint: 'The font used for third largest headers.',
        },
        bodyFont: {
            type: 'schema',
            options: {
                schema: fontSettingSchema,
            },
            label: 'Body Font',
            hint: 'The font used for the body text on all cards, toolbelt, etc.',
        },
        footerFont: {
            type: 'schema',
            options: {
                schema: fontSettingSchema,
            },
            label: 'Footer Font',
            hint: 'The font used for footers (but can be overriden by card footer styles).',
        },
    },
})

const cardStyleSchema = buildSchema({
    id: 'cardStyle',
    fields: {
        backgroundColor: {
            type: 'text',
            label: 'Card Background Color',
            hint: 'The background color of the card.',
        },
        foregroundColor: {
            type: 'text',
            label: 'Card Foreground Color',
            hint: 'The color of the text of the card.',
        },
        headerBackgroundColor: {
            type: 'text',
            label: 'Header Background Color',
            hint: "The background color of the card's header.",
        },
        headerForegroundColor: {
            type: 'text',
            label: 'Header Foreground Color',
            hint: "The color of the text in the card's header.",
        },
        footerBackgroundColor: {
            type: 'text',
            label: 'Footer Background Color',
            hint: "The background color of the card's footer.",
        },
        footerForegroundColor: {
            type: 'text',
            label: 'Footer Foreground Color',
            hint: "The color of the text in the card's footer.",
        },
        fonts: {
            type: 'schema',
            options: {
                schema: themeFontsSchema,
            },
            label: 'Fonts',
            hint: 'The fonts used in the card.',
        },
    },
})

const fontFamilySchema = buildSchema({
    id: 'fontFamily',
    fields: {
        name: {
            type: 'text',
            isRequired: true,
            label: 'Name',
            hint: 'What is the name of the font family? e.g. "Arial" or "Headers". This will be the name you can apply to different parts of the theme.',
        },
        src: {
            type: 'text',
            isRequired: true,
            label: 'Source',
            hint: 'The URL to the font file (otf, ttf, etc.). Must be publicly accessible.',
        },
    },
})

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
                        controlBarFont: {
                            type: 'schema',
                            options: {
                                schema: fontSettingSchema,
                            },
                            label: 'Control bar font',
                            hint: 'The font used in the control bar.',
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
                        fontFamilies: {
                            type: 'schema',
                            isArray: true,
                            options: {
                                schema: fontFamilySchema,
                            },
                        },
                        fonts: {
                            type: 'schema',
                            options: {
                                schema: themeFontsSchema,
                            },
                        },
                        cardStyles: {
                            type: 'schema',
                            options: {
                                schema: buildSchema({
                                    id: 'cardStyles',
                                    fields: {
                                        informational: {
                                            label: 'Informational',
                                            type: 'schema',
                                            options: {
                                                schema: cardStyleSchema,
                                            },
                                        },
                                        graphical: {
                                            label: 'Graphical',
                                            type: 'schema',
                                            options: {
                                                schema: cardStyleSchema,
                                            },
                                        },
                                        heading: {
                                            label: 'Heading',
                                            type: 'schema',
                                            options: {
                                                schema: cardStyleSchema,
                                            },
                                        },
                                    },
                                }),
                            },
                        },
                    },
                },
            },
        },
    },
})
