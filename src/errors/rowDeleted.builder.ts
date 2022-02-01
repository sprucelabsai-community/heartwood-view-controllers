import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'rowDeleted',
	name: 'row deleted',
	fields: {
		row: {
			type: 'id',
			isRequired: true,
		},
	},
})
