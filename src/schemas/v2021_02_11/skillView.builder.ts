import { buildSchema } from '@sprucelabs/schema'
import layoutBuilder from './layout.builder'

export default buildSchema({
	id: 'skillView',
	name: 'Skill view',
	description: '',
	fields: {
		id: {
			type: 'id',
			isPrivate: true,
		},
		shouldCenterVertically: {
			type: 'boolean',
			label: 'Center vertically',
			defaultValue: false,
		},
		isFullScreen: {
			type: 'boolean',
			label: 'Full screen',
		},
		layouts: {
			type: 'schema',
			label: 'Layout',
			isRequired: true,
			isArray: true,
			options: {
				schema: layoutBuilder,
			},
		},
	},
})
