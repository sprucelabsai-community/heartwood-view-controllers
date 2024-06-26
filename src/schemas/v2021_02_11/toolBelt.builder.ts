import { lineIconChoices } from '@sprucelabs/calendar-utils'
import { buildSchema } from '@sprucelabs/schema'
import cardBuilder from './cards/card.builder'

export default buildSchema({
    id: 'toolBelt',
    name: 'Tool belt',
    fields: {
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.ToolBeltViewController',
            },
        },
        lineIcon: {
            type: 'select',
            label: 'Icon',
            options: {
                choices: lineIconChoices,
            },
        },
        shouldRenderAllToolsAtOnce: {
            type: 'boolean',
        },
        onCloseToolBelt: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.ToolBeltCloseHandler',
            },
        },
        iconLabel: {
            type: 'text',
        },
        renderAs: {
            type: 'select',
            options: {
                choices: [
                    {
                        value: 'default',
                        label: 'Default',
                    },
                    {
                        value: 'icon',
                        label: 'Icon',
                    },
                ],
            },
        },
        tools: {
            type: 'schema',
            label: 'Tools',
            isRequired: true,
            isArray: true,
            options: {
                schema: {
                    id: 'toolBeltTool',
                    fields: {
                        id: { type: 'id', label: 'Id', isRequired: true },
                        lineIcon: {
                            type: 'select',
                            label: 'Icon',
                            isRequired: true,
                            options: {
                                choices: lineIconChoices,
                            },
                        },
                        card: {
                            type: 'schema',
                            label: 'Card',
                            isRequired: true,
                            options: {
                                schema: cardBuilder,
                            },
                        },
                    },
                },
            },
        },
    },
})
