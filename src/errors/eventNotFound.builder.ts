import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'eventNotFound',
	name: 'Event not found',
	fields: {
		id: {
			type: 'id',
			isRequired: true,
		},
	},
})
