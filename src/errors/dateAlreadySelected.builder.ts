import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'dateAlreadySelected',
	name: 'Date already selected',
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
