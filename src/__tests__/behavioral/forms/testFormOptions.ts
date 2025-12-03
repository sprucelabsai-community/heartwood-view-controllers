import { SchemaValues, buildSchema } from '@sprucelabs/schema'
import buildForm from '../../../builders/buildForm'

export const testFormSchema = buildSchema({
    id: 'test',
    fields: {
        first: {
            type: 'text',
            isRequired: true,
        },
        last: {
            type: 'text',
        },
        nickname: {
            type: 'text',
            isRequired: true,
        },
        favoriteNumber: {
            type: 'number',
        },
        fieldNotPartOfSection: {
            type: 'id',
        },
        anotherField: {
            type: 'id',
        },
        agreeToTerms: {
            type: 'boolean',
            isRequired: true,
        },
    },
})

export type TestFormSchema = typeof testFormSchema
export type TestFormValues = SchemaValues<TestFormSchema>
export const testFormOptions = buildForm({
    id: 'testForm',
    schema: testFormSchema,
    sections: [
        {
            id: 'first',
            fields: ['first'],
        },
        {
            id: 'second',
            fields: ['last', 'nickname'],
        },
        {
            fields: [{ name: 'favoriteNumber' }],
        },
    ],
})
