import {
    buildSchema,
    FieldDefinitions,
    SchemaValues,
    SchemaError,
    Schema,
} from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import buildForm from '../../builders/buildForm'
import { FormBuilderFieldType, fieldTypeChoices } from '../../constants'
import {
    FormViewController,
    ViewControllerOptions,
    FieldRenderOptions,
    ListRow,
} from '../../types/heartwood.types'
import CardViewController from '../card/Card.vc'
import ListViewController from '../list/List.vc'

export default class EditFormBuilderSectionCardViewController extends CardViewController {
    private formVc: FormViewController<EditSectionSectionSchema>
    private fieldListVc: ListViewController
    private rows: SimpleRow[] = []
    private onDoneHandler: (values: SimpleSection) => void | Promise<void>

    public constructor(
        options: ViewControllerOptions & EditFormBuilderSectionOptions
    ) {
        super(options)

        if (!options.onDone) {
            throw new SchemaError({
                code: 'MISSING_PARAMETERS',
                parameters: ['onDone'],
            })
        }

        const { onDone, editSection, defaultTitle } = options

        this.onDoneHandler = onDone

        const values: Partial<EditFormBuilderSectionValues> =
            this.buildValuesAndRows(defaultTitle, editSection)

        this.fieldListVc = this.ListVc()

        this.formVc = this.FormVc(values)

        this.model.header = {
            title: editSection?.title ?? 'Add section',
            ...this.model.header,
        }
    }

    private buildValuesAndRows(
        defaultTitle: string,
        editSection?: SimpleSection
    ) {
        const values: Partial<EditFormBuilderSectionValues> = {
            title: defaultTitle,
            type: 'form',
        }

        if (editSection) {
            values.title = editSection.title ?? 'My section title'
            values.type = editSection.type ?? 'form'

            if (values.type === 'form') {
                values.shouldRenderAsGrid = editSection.shouldRenderAsGrid
            }

            if (editSection.text) {
                values.text = editSection.text
            }

            for (const field of editSection.fields ?? []) {
                this.rows.push(field)
            }
        } else {
            this.rows.push(this.buildNextSimpleRow())
        }
        return values
    }

    private FormVc(
        values: Partial<EditFormBuilderSectionValues>
    ): FormViewController<{
        id: string
        fields: {
            title: { type: 'text'; label: string; isRequired: true }
            type: {
                type: 'select'
                label: string
                defaultValue: string
                isRequired: true
                options: {
                    choices: (
                        | { readonly label: 'Form'; readonly value: 'form' }
                        | {
                              readonly label: 'Instructions'
                              readonly value: 'text'
                          }
                    )[]
                }
            }
            shouldRenderAsGrid: { type: 'boolean'; label: string }
            text: { type: 'text'; label: string }
        }
    }> {
        return this.Controller(
            'form',
            buildForm({
                values,
                schema: addSectionSchema,
                shouldRenderCancelButton: false,
                submitButtonLabel: 'Done',
                sections: this.buildFormSections(values.type),
                footer: this.buildFooter(values.type),
                onChange: this.handleFormChange.bind(this),
                onSubmit: this.handleSubmit.bind(this),
            })
        )
    }

    private ListVc(): ListViewController {
        return this.Controller('list', {
            columnWidths: ['fill'],
            rows: this.renderRows(),
        })
    }

    private async handleSubmit() {
        const values: SimpleSection = {
            title: this.formVc.getValue('title'),
            type: this.formVc.getValue('type'),
            shouldRenderAsGrid:
                this.formVc.getValue('shouldRenderAsGrid') ?? false,
            fields: [...this.rows],
        }

        const text = this.formVc.getValue('text')
        if (text) {
            values.text = text
            values.fields = undefined
        }

        for (const field of values.fields ?? []) {
            if (!field.options && field.type === 'select') {
                field.options = { choices: [] }
            } else if (field.type === 'signature') {
                field.type = 'image'
                field.renderOptions = {
                    ...field.renderOptions,
                    renderAs: 'signature',
                }
            }
        }

        await this.onDoneHandler(values)
    }

    private buildNextSimpleRow(): SimpleRow {
        const label = `Field ${this.rows.length + 1}`
        return {
            label,
            type: 'text',
            renderOptions: {
                name: namesUtil.toCamel(label) as never,
            },
        }
    }

    private buildFormSections(
        forType?: EditFormBuilderSectionValues['type']
    ): Section[] {
        const type = forType ?? this.formVc.getValue('type')

        const sections: Section[] = [
            {
                fields: ['title', 'type'],
            },
        ]

        if (type === 'form') {
            sections.push(
                {
                    title: 'Display Settings',
                    fields: [{ name: 'shouldRenderAsGrid' }],
                },
                {
                    title: 'Fields',
                    list: this.fieldListVc.render(),
                }
            )
        } else {
            sections.push({
                title: 'Instructions',
                fields: [{ name: 'text', renderAs: 'textarea' }],
            })
        }

        return sections
    }

    private buildFooter(
        forType?: EditFormBuilderSectionValues['type']
    ):
        | SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
        | undefined {
        const type = forType ?? this.formVc.getValue('type')

        if (type === 'text') {
            return undefined
        }

        return {
            buttons: [
                {
                    label: 'Add field',
                    type: 'secondary',
                    onClick: () => {
                        this.addField()
                    },
                },
            ],
        }
    }

    public getFormVc() {
        return this.formVc
    }

    public getFieldListVc() {
        return this.fieldListVc
    }

    public addField() {
        const simpleRow = this.buildNextSimpleRow()
        this.rows.push(simpleRow)

        this.fieldListVc.addRow(
            this.renderRow({
                ...simpleRow,
                idx: this.rows.length - 1,
            })
        )
    }

    private renderRows() {
        return this.rows.map((row, idx) => this.renderRow({ ...row, idx }))
    }

    private renderRow(options: SimpleRow & { idx: number }): ListRow {
        let { renderOptions, idx, label, type } = options

        if (type === 'image' && renderOptions.renderAs === 'signature') {
            type = 'signature'
        }

        return {
            id: renderOptions.name,
            cells: [
                {
                    textInput: {
                        name: 'fieldName',
                        isRequired: true,
                        value: label,
                        onChange: (value) => {
                            if (value) {
                                this.rows[idx].label = value
                            }
                        },
                    },
                },
                {
                    selectInput: {
                        name: 'fieldType',
                        isRequired: true,
                        value: type,
                        choices: fieldTypeChoices,
                        onChange: (value) => {
                            if (value) {
                                this.rows[idx].type = value
                            }
                        },
                    },
                },
                {
                    button: {
                        lineIcon: 'delete',
                        type: 'destructive',
                        onKeyDown: ({ key, rowVc }) => {
                            if (key === 'Tab' && rowVc.isLastRow()) {
                                this.addField()
                            }
                        },
                        onClick: async ({ rowVc }) => {
                            const shouldDelete = await this.confirm({
                                title: 'Are you sure?',
                                isDestructive: true,
                            })
                            if (shouldDelete) {
                                rowVc.delete()
                                this.rows.splice(idx, 1)
                            }
                        },
                    },
                },
            ],
        }
    }

    private handleFormChange() {
        this.formVc.setSections(this.buildFormSections())
        this.formVc.setFooter(this.buildFooter())

        if (this.formVc.getValue('type') === 'form') {
            if (this.fieldListVc.getTotalRows() === 0) {
                this.fieldListVc.addRow(
                    this.renderRow({
                        idx: 0,
                        label: 'New field',
                        renderOptions: {
                            name: 'field' as never,
                        },
                        type: 'text',
                    })
                )
            }
        }
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        const model = super.render()

        model.body = {
            sections: [
                {
                    form: this.formVc.render() as any,
                },
            ],
        }

        return model
    }
}

const addSectionSchema = buildSchema({
    id: 'addSection',
    fields: {
        title: {
            type: 'text',
            label: 'Title',
            isRequired: true,
        },
        type: {
            type: 'select',
            label: 'Form or instructions',
            defaultValue: 'form',
            isRequired: true,
            options: {
                choices: [
                    {
                        label: 'Form',
                        value: 'form',
                    } as const,
                    {
                        label: 'Instructions',
                        value: 'text',
                    } as const,
                ],
            },
        },
        shouldRenderAsGrid: {
            type: 'boolean',
            label: 'Render as grid',
        },
        text: {
            type: 'text',
            label: 'Instructions',
        },
    },
})
export type EditSectionSectionSchema = typeof addSectionSchema
export type EditFormBuilderSectionValues =
    SchemaValues<EditSectionSectionSchema>

type Section =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<EditSectionSectionSchema>

export interface EditFormBuilderSectionOptions {
    onDone: (section: SimpleSection) => void | Promise<void>
    editSection?: SimpleSection
    defaultTitle: string
}

export type SimpleRow = Omit<FieldDefinitions, 'type'> & {
    type: FormBuilderFieldType
    renderOptions: FieldRenderOptions<Schema>
}

export type SimpleSection = EditFormBuilderSectionValues & {
    fields?: SimpleRow[]
}
