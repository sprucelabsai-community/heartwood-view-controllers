import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'duplicateToolId',
	name: 'Dulicate tool id',
	fields: {
		id: {
			type: 'id',
			isRequired: true,
		},
	},
})
