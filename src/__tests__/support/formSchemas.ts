import { buildSchema } from '@sprucelabs/schema'

export const formWithEveryFieldTypeOptionalSchema = buildSchema({
	id: 'formWithAllFieldTypesOptional',
	fields: {
		firstName: {
			type: 'text',
		},
		phone: {
			type: 'phone',
		},
		favoriteColor: {
			type: 'select',
			options: {
				choices: [
					{
						value: 'red',
						label: 'Red',
					},
					{
						value: 'green',
						label: 'Green',
					},
					{
						value: 'blue',
						label: 'Blue',
					},
				],
			},
		},
	},
})

export const profileFormSchema = buildSchema({
	id: 'profileForm',
	fields: {
		firstName: {
			type: 'text',
			isRequired: true,
		},
		phone: {
			type: 'phone',
			isRequired: true,
		},
	},
})

export const formWithEveryFieldTypeOptionalWithDefaultValuesSchema =
	buildSchema({
		id: 'defaultValuesForm',
		fields: {
			firstName: {
				type: 'text',
				defaultValue: 'Tay',
			},
			phone: {
				type: 'phone',
				defaultValue: '555-555-0000',
			},
			favoriteColor: {
				type: 'select',
				defaultValue: 'red',
				options: {
					choices: [
						{
							value: 'red',
							label: 'Red',
						},
						{
							value: 'green',
							label: 'Green',
						},
						{
							value: 'blue',
							label: 'Blue',
						},
					],
				},
			},
		},
	})
