import {
    Schema,
    buildSchema,
    FieldDefinitions,
    SchemaError,
    SchemaValues,
    assertOptions,
    pickFields,
} from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import ratingsInputSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/ratingsInput.schema'
import buildForm from '../../builders/buildForm'
import { fieldTypeChoices, formBuilderFieldTypes } from '../../constants'
import {
    FieldRenderOptions,
    InputComponent,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import CardViewController from '../card/Card.vc'
import FormViewController from '../form/Form.vc'
import FieldUpdater from './FieldUpdater'

export default class EditFormBuilderFieldCardViewController extends CardViewController {
    private formVc: FormViewController<EditFieldFormSchema>
    private fieldUpdater: FieldUpdater
    private onDoneHandler: DoneHandler
    public constructor(
        options: ViewControllerOptions & EditFormBuilderFieldOptions
    ) {
        super(options)

        const { field: f, onDone, renderOptions } = options

        const { ...field } = f ?? {}

        if (field.type === 'image' && renderOptions?.renderAs === 'signature') {
            field.type = 'signature' as any
        } else if (
            (renderOptions?.renderAs as InputComponent)?.type === 'ratings'
        ) {
            field.type = 'ratings' as any
        }

        this.onDoneHandler = onDone
        this.fieldUpdater = FieldUpdater.Updater()

        this.assertRequiredParameters(options)
        this.assertSupportedFieldType(field.type ?? 'text')

        const values: Partial<SchemaValues<EditFieldFormSchema>> =
            this.optionsToFormValues({
                ...options,
                ...field,
            } as FieldDefinitions)

        this.formVc = this.FormVc(values, field)
    }

    private FormVc(
        values: Record<string, any>,
        field: Partial<FieldDefinitions>
    ) {
        return this.Controller(
            'form',
            buildForm({
                schema: editFieldFormSchema,
                onChange: this.handleFormChange.bind(this),
                shouldShowCancelButton: false,
                submitButtonLabel: 'Save',
                values,
                onSubmit: async ({ values }) => {
                    await this.onDoneHandler(
                        //@ts-ignore
                        ...this.formValuesToOptions(values, field)
                    )
                },
                sections: this.buildSections(field?.type ?? 'text'),
            })
        )
    }

    private formValuesToOptions(
        values: Record<string, any>,
        field: Partial<FieldDefinitions>
    ) {
        return this.fieldUpdater.update(
            this.formVc.getValue('name')!,
            field,
            values
        )
    }

    private optionsToFormValues(field: FieldDefinitions) {
        const values: Partial<SchemaValues<EditFieldFormSchema>> = {}

        Object.keys(editFieldFormSchema.fields).forEach((name) => {
            //@ts-ignore
            values[name] = field[name]
        })

        //@ts-ignore
        if (field.options?.choices) {
            //@ts-ignore
            const selectOptions = field.options.choices
                //@ts-ignore
                .map((c) => c.label)
                .join('\n')
            values.selectOptions = selectOptions
        }
        return values
    }

    private assertSupportedFieldType(type: FieldDefinitions['type']) {
        const types = Object.keys(formBuilderFieldTypes)

        if (!types.includes(type)) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['type'],
                friendlyMessage: `You passed a field with the type ${type}. Field type must be one of the following:\n\n${types.join(
                    '\n'
                )}`,
            })
        }
    }

    private assertRequiredParameters(options: EditFormBuilderFieldOptions) {
        assertOptions(options, ['name', 'field', 'onDone'])
    }

    public handleFormChange() {
        const sections = this.buildSections(this.formVc.getValue('type') as any)
        this.formVc.setSections(sections)
    }

    private buildSections(forType: FieldDefinitions['type']) {
        const sections: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<EditFieldFormSchema>[] =
            [
                {
                    fields: [
                        { name: 'name' },
                        { name: 'label' },
                        { name: 'isRequired' },
                        { name: 'type' },
                    ],
                },
            ]

        const type = forType
        if (type === 'select') {
            sections.push({
                fields: [
                    {
                        name: 'selectOptions',
                        placeholder: 'Option 1\nOption 2',
                        renderAs: 'textarea',
                    },
                ],
            })
            //@ts-ignore
        } else if (type === 'ratings') {
            sections.push({
                fields: [
                    { name: 'steps' },
                    { name: 'leftLabel' },
                    { name: 'rightLabel' },
                    { name: 'middleLabel' },
                    { name: 'icon' },
                ],
            })
        }

        return sections
    }

    public getFormVc() {
        return this.formVc
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return {
            ...this.model,
            header: {
                title: 'Edit field',
            },
            controller: this,
            body: {
                sections: [
                    {
                        form: this.formVc.render() as any,
                    },
                ],
            },
        }
    }
}

type DoneHandler = (
    fieldDefinition: FieldDefinitions,
    renderOptions: FieldRenderOptions<Schema>
) => void | Promise<void>

export interface EditFormBuilderFieldOptions {
    name: string
    field: Partial<FieldDefinitions>
    renderOptions?: Partial<FieldRenderOptions<Schema>> | null
    onDone: DoneHandler
}

const editFieldFormSchema = buildSchema({
    id: 'editFieldForm',
    fields: {
        name: {
            type: 'text',
            label: 'Name',
            // isRequired: true,
            hint: 'This is how the name is saved in the database, you can usually ignore this.',
        },
        label: {
            type: 'text',
            label: 'Label',
            // isRequired: true,
            hint: 'This is what people will see when filling out the form.',
        },
        isRequired: {
            type: 'boolean',
            label: 'Required',
        },
        type: {
            type: 'select',
            label: 'Type',
            isRequired: true,
            options: {
                choices: fieldTypeChoices,
            },
        },
        selectOptions: {
            type: 'text',
            label: 'Dropdown options',
            // isRequired: true,
            hint: "Put each choice on it's own line!",
        },
        ...pickFields(ratingsInputSchema.fields, [
            'steps',
            'leftLabel',
            'rightLabel',
            'middleLabel',
            'icon',
        ]),
    },
})

type EditFieldFormSchema = typeof editFieldFormSchema
export type EditFieldValues = SchemaValues<EditFieldFormSchema>
