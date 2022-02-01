import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'dateNotSelected',
	name: 'Date not selected',
	fields: {
		year: {
			type: 'number',
			isRequired: true,
		},
		month: {
			type: 'number',
			isRequired: true,
		},
		day: {
			type: 'number',
			isRequired: true,
		},
	},
})
