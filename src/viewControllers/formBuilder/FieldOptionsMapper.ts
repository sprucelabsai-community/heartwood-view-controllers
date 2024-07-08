import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
    Schema,
    IFieldDefinition,
    FieldDefinitions,
    SchemaValues,
} from '@sprucelabs/schema'
import { namesUtil } from '@sprucelabs/spruce-skill-utils'
import ratingsSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/ratings.schema'
import {
    FieldRenderOptions,
    RatingsInputComponent,
} from '../../types/heartwood.types'
import {
    EditFieldFormSchema,
    editFieldFormSchema,
    EditFieldValues,
} from './editFormSchema'

export default class FieldOptionsMapper {
    public static Updater() {
        return new this()
    }

    public buildEditFormSections(type: FieldDefinitions['type']) {
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
                title: 'Ratings Options',
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

    public definitionToEditFormValues(
        field: FieldDefinitions,
        renderOptions?: FieldRenderOptions<Schema>
    ) {
        const values: Partial<SchemaValues<EditFieldFormSchema>> = {}
        const { renderAs } = renderOptions ?? {}

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

        const ratingsRenderAs = renderAs as RatingsInputComponent
        if (ratingsRenderAs?.type === 'ratings') {
            const fieldsToTransfer = Object.keys(ratingsSchema.fields)
            fieldsToTransfer.forEach((field) => {
                //@ts-ignore
                values[field] = ratingsRenderAs[field]
            })
        }

        return values
    }

    public editFormValuesToDefinition(
        name: string,
        field: Partial<IFieldDefinition>,
        updates: Partial<EditFieldValues>
    ) {
        const { selectOptions, ...changes } = updates
        delete changes.name

        let newDefinition = {
            ...field,
            ...changes,
        }

        if (selectOptions) {
            newDefinition.options = {
                ...field.options,
                choices: selectOptions.split('\n').map((label) => ({
                    label: label.trim(),
                    value: namesUtil.toCamel(label),
                })),
            }
        }

        const renderOptions: FieldRenderOptions<Schema> = {
            name: name as never,
        }

        if (updates.type === 'signature') {
            newDefinition.type = 'image'
            renderOptions.renderAs = 'signature'
        } else if (updates.type === 'ratings') {
            newDefinition.type = 'number'
            renderOptions.renderAs = {
                type: 'ratings',
            }

            const fieldsToTransfer = Object.keys(ratingsSchema.fields)

            fieldsToTransfer.forEach((field) => {
                //@ts-ignore
                if (newDefinition[field]) {
                    //@ts-ignore
                    renderOptions.renderAs[field] = newDefinition[field]
                }

                //@ts-ignore
                delete newDefinition[field]
            })
        }

        return [newDefinition, renderOptions]
    }
}
