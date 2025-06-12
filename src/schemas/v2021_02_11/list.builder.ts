import { buildSchema } from '@sprucelabs/schema'
import listCellBuilder from './listCell.builder'

const heightChoices = [
    { label: 'Standard', value: 'standard' },
    { label: 'Tall', value: 'tall' },
    { label: 'Content', value: 'content' },
]

const columnWidthFields = {
    columnWidths: {
        type: 'raw',
        label: 'Column widths',
        isArray: true,
        options: {
            valueType: `number | 'fill' | 'content'`,
        },
    },
} as const

export default buildSchema({
    id: 'list',
    name: 'list',
    description: '',
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.ListViewController',
            },
        },
        shouldRenderRowDividers: {
            type: 'boolean',
            label: 'Render row dividers',
        },
        shouldAllowDragAndDropSorting: {
            type: 'boolean',
            label: 'Allow drag and drop sorting',
        },
        onDragAndDropSort: {
            type: 'raw',
            label: 'Drag and drop sort handler',
            options: {
                valueType:
                    '(rowIds: string[]) => boolean | Promise<boolean | void> | void',
            },
        },
        ...columnWidthFields,
        defaultRowHeight: {
            type: 'select',
            label: 'Row height',
            options: {
                choices: heightChoices,
            },
        },
        rows: {
            type: 'schema',
            label: 'Rows',
            isArray: true,
            isRequired: true,
            minArrayLength: 0,
            options: {
                schema: {
                    id: 'listRow',
                    fields: {
                        ...columnWidthFields,
                        controller: {
                            type: 'raw',
                            label: 'Controller',
                            options: {
                                valueType:
                                    'HeartwoodTypes.ListRowViewController',
                            },
                        },
                        height: {
                            type: 'select',
                            label: 'Row height',
                            options: {
                                choices: heightChoices,
                            },
                        },
                        isEnabled: {
                            type: 'boolean',
                            label: 'Enabled',
                        },
                        id: {
                            type: 'id',
                            label: 'Id',
                            isRequired: true,
                        },
                        onClick: {
                            type: 'raw',
                            label: 'Click handler',
                            options: {
                                valueType: '() => Promise<any> | any',
                            },
                        },
                        isSelected: {
                            type: 'boolean',
                            label: 'Selected',
                        },
                        style: {
                            type: 'select',
                            label: 'Style',
                            options: {
                                choices: [
                                    {
                                        value: 'standard',
                                        label: 'Standard',
                                    },
                                    {
                                        value: 'warning',
                                        label: 'Warning',
                                    },
                                    {
                                        value: 'critical',
                                        label: 'Critical',
                                    },
                                ],
                            },
                        },
                        cells: {
                            type: 'schema',
                            label: 'Cells',
                            isArray: true,
                            isRequired: true,
                            options: {
                                schema: listCellBuilder,
                            },
                        },
                    },
                },
            },
        },
    },
})
