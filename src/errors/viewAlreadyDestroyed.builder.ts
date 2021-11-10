import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'viewAlreadyDestroyed',
	name: 'View already destroyed',
	fields: {
		viewId: {
			type: 'id',
			isRequired: true,
		},
	},
})
