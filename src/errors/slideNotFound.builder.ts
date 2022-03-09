import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'slideNotFound',
	name: 'Slide not found',
	fields: {
		id: {
			type: 'id',
		},
	},
})
