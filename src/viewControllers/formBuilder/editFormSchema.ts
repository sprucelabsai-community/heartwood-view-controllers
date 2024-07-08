import { buildSchema, pickFields, SchemaValues } from '@sprucelabs/schema'
import ratingsInputSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/ratingsInput.schema'
import { fieldTypeChoices } from '../../constants'

export const editFieldFormSchema = buildSchema({
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

export type EditFieldFormSchema = typeof editFieldFormSchema
export type EditFieldValues = SchemaValues<EditFieldFormSchema>
