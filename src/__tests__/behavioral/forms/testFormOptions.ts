import { buildSchema } from '@sprucelabs/schema'
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
	},
})

export type TestFormSchema = typeof testFormSchema

export const testFormOptions = buildForm({
	id: 'testForm',
	schema: testFormSchema,
	sections: [
		{
			fields: ['first'],
		},
		{
			fields: ['last', 'nickname'],
		},
		{
			fields: [{ name: 'favoriteNumber' }],
		},
	],
})
