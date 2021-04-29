import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'skillViewsRegistration',
	name: 'Skill views registration',
	description: '',
	fields: {
		id: {
			type: 'id',
			isRequired: true,
		},
		namespace: {
			type: 'text',
			isRequired: true,
		},
		ids: {
			type: 'text',
			isRequired: true,
			isArray: true,
		},
		source: {
			type: 'text',
			isRequired: true,
		},
	},
})
