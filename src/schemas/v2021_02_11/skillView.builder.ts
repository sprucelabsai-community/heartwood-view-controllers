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
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.SkillViewController',
			},
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
		title: {
			type: 'text',
		},
		subtitle: {
			type: 'text',
		},
		description: {
			type: 'text',
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
