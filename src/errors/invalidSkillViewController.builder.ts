import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'invalidSkillViewController',
	name: 'Invalid skill view',
	description: '',
	fields: {
		id: {
			type: 'text',
			isRequired: true,
		},
	},
})
