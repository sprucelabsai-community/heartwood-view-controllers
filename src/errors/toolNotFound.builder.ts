import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'toolNotFound',
	name: 'Tool not found',
	fields: {
		id: {
			type: 'id',
			isRequired: true,
		},
	},
})
