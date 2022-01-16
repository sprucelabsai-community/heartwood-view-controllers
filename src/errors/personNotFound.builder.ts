import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'personNotFound',
	name: 'Person not found',
	fields: {
		personId: {
			type: 'id',
			isRequired: true,
		},
	},
})
