import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'noFieldVcSet',
	name: 'No field vc set',
	fields: {
		fieldName: {
			type: 'text',
			isRequired: true,
		},
	},
})
