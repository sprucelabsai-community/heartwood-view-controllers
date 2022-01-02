import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'duplicateEventId',
	name: 'Duplicate event id',
	fields: {
		id: {
			type: 'id',
			isRequired: true,
		},
	},
})
