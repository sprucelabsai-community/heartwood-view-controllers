import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'invalidViewControllerName',
	name: 'Invalid view controller name',
	description: '',
	fields: {
		name: {
			type: 'text',
			label: 'Supplied name',
			isRequired: true,
		},
		validNames: {
			type: 'text',
			label: 'Valid names',
			isRequired: true,
			isArray: true,
		},
	},
})
