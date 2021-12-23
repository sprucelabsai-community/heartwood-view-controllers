import buildForm from '../../../builders/buildForm'

export const testFormOptions = buildForm({
	id: 'testForm',
	schema: {
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
	},
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
