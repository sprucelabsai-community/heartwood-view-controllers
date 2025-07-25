import {
    Schema,
    FieldDefinitions,
    SchemaError,
    SchemaValues,
    assertOptions,
} from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import buildForm from '../../builders/buildForm'
import { formBuilderFieldTypes } from '../../constants'
import {
    FieldRenderOptions,
    InputComponent,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import CardViewController from '../card/Card.vc'
import FormViewController from '../form/Form.vc'
import { EditFieldFormSchema, editFieldFormSchema } from './editFormSchema'
import FieldOptionsMapper from './FieldOptionsMapper'

export default class EditFormBuilderFieldCardViewController extends CardViewController {
    private formVc: FormViewController<EditFieldFormSchema>
    private fieldOptionsMapper: FieldOptionsMapper
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
        this.fieldOptionsMapper = FieldOptionsMapper.Updater()

        this.assertRequiredParameters(options)
        this.assertSupportedFieldType(field.type ?? 'text')

        const values: Partial<SchemaValues<EditFieldFormSchema>> =
            this.optionsToFormValues(
                {
                    ...options,
                    ...field,
                } as FieldDefinitions,
                renderOptions as FieldRenderOptions<Schema>
            )

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
                shouldRenderCancelButton: false,
                submitButtonLabel: 'Save',
                values,
                onSubmit: async ({ values }) => {
                    await this.onDoneHandler(
                        //@ts-ignore
                        ...this.formValuesToFieldOptions(values, field)
                    )
                },
                sections: this.buildSections(field?.type ?? 'text'),
            })
        )
    }

    private formValuesToFieldOptions(
        values: Record<string, any>,
        field: Partial<FieldDefinitions>
    ) {
        return this.fieldOptionsMapper.editFormValuesToDefinition(
            this.formVc.getValue('name')!,
            field,
            values
        )
    }

    private optionsToFormValues(
        field: FieldDefinitions,
        renderOptions?: FieldRenderOptions<Schema>
    ) {
        return this.fieldOptionsMapper.definitionToEditFormValues(
            field,
            renderOptions
        )
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
        return this.fieldOptionsMapper.buildEditFormSections(forType)
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
