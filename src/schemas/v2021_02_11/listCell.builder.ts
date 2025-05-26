import { buildSchema } from '@sprucelabs/schema'
import { buttonFields, lineIconFields } from '../../constants'
import {
    buildLocalTypesImport,
    buildRemoteTypesImport,
} from '../../utilities/importBuilder'
import buttonBarBuilder from './buttonBar.builder'
import calendarBuilder from './calendar.builder'
import ratingsInputBuilder from './forms/ratingsInput.builder'
import textInputBuilder from './forms/textInput.builder'
import toggleInputBuilder from './forms/toggleInput.builder'
import selectInputBuilder from './selectInput.builder'
import statusIndicatorBuilder from './statusIndicator.builder'
import textBuilder from './text.builder'

const cellInputFields = {
    onKeyDown: {
        type: 'raw',
        label: 'Cell button key down handler',
        options: {
            valueType:
                '(options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>',
        },
    },
} as const

export default buildSchema({
    id: 'listCell',
    name: 'List Cell',
    description: '',
    importsWhenLocal: buildLocalTypesImport(),
    importsWhenRemote: buildRemoteTypesImport(),
    fields: {
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.ListCellViewController',
            },
        },
        id: {
            type: 'id',
        },
        text: {
            type: 'schema',
            label: 'Text',
            options: {
                schema: textBuilder,
            },
        },
        onClick: {
            type: 'raw',
            label: 'Click handler',
            options: {
                valueType: '() => Promise<any> | any',
            },
        },
        subText: {
            type: 'schema',
            label: 'Subtext',
            options: {
                schema: textBuilder,
            },
        },
        image: {
            type: 'text',
            label: 'Image url',
        },
        avatars: {
            type: 'raw',
            isArray: true,
            label: 'Avatars',
            options: {
                valueType: 'string | null | undefined',
            },
        },
        button: {
            type: 'schema',
            label: 'Button',
            options: {
                schema: {
                    id: 'listCellButton',
                    fields: {
                        ...buttonFields,
                        ...cellInputFields,
                        onClick: {
                            type: 'raw',
                            label: 'Cell button click handler',
                            options: {
                                valueType:
                                    '(options: { rowVc: HeartwoodTypes.ListRowViewController }) => any | Promise<any>',
                            },
                        },
                        dropdown: {
                            type: 'schema',
                            label: 'Dropdown',
                            options: {
                                schemaId: { id: 'dropdown' },
                            },
                        },
                    },
                },
            },
        },
        lineIcon: {
            type: 'select',
            label: 'Line icon',
            options: {
                ...(lineIconFields.name.options as any),
            },
        },
        calendar: {
            type: 'schema',
            options: {
                schema: calendarBuilder,
            },
        },
        buttonBar: {
            type: 'schema',
            options: {
                schema: buttonBarBuilder,
            },
        },
        textInput: {
            type: 'schema',
            label: 'Text input',
            options: {
                schema: {
                    id: 'listTextInput',
                    fields: {
                        ...textInputBuilder.fields,
                        ...cellInputFields,
                        setValue: {
                            type: 'raw',
                            options: {
                                valueType:
                                    '(name: string, value: string) => Promise<any> | any',
                            },
                        },
                    },
                },
            },
        },
        dateInput: {
            type: 'schema',
            label: 'Date input',
            options: {
                schema: {
                    id: 'listDateInput',
                    fields: {
                        ...textInputBuilder.fields,
                        ...cellInputFields,
                        setValue: {
                            type: 'raw',
                            options: {
                                valueType:
                                    '(name: string, value: number) => Promise<any> | any',
                            },
                        },
                    },
                },
            },
        },
        selectInput: {
            type: 'schema',
            label: 'Select input',
            options: {
                schema: {
                    id: 'listSelectInput',
                    fields: {
                        ...selectInputBuilder.fields,
                        ...cellInputFields,
                        setValue: {
                            type: 'raw',
                            options: {
                                valueType:
                                    '(name: string, value: string) => Promise<any> | any',
                            },
                        },
                    },
                },
            },
        },
        toggleInput: {
            type: 'schema',
            label: 'Toggle input',
            options: {
                schema: {
                    id: 'listToggleInput',
                    fields: {
                        ...toggleInputBuilder.fields,
                        ...cellInputFields,
                        setValue: {
                            type: 'raw',
                            options: {
                                valueType:
                                    '(name: string, value: boolean) => Promise<any> | any',
                            },
                        },
                    },
                },
            },
        },
        checkboxInput: {
            type: 'schema',
            label: 'Checkbox input',
            options: {
                schema: {
                    id: 'listToggleInput',
                    fields: {
                        ...toggleInputBuilder.fields,
                        ...cellInputFields,
                        setValue: {
                            type: 'raw',
                            options: {
                                valueType:
                                    '(name: string, value: boolean) => Promise<any> | any',
                            },
                        },
                    },
                },
            },
        },
        ratingsInput: {
            type: 'schema',
            label: 'Ratings input',
            options: {
                schema: {
                    id: 'listRatingsInput',
                    fields: {
                        ...ratingsInputBuilder.fields,
                        ...cellInputFields,
                        setValue: {
                            type: 'raw',
                            options: {
                                valueType:
                                    '(name: string, value: number) => Promise<any> | any',
                            },
                        },
                    },
                },
            },
        },
        statusIndicator: {
            type: 'schema',
            label: 'Status indicator',
            options: {
                schema: statusIndicatorBuilder,
            },
        },
    },
})
