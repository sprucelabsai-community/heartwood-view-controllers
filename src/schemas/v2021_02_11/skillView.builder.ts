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
			isArray: true,
			options: {
				schema: layoutBuilder,
			},
		},
		leftCards: {
			type: 'schema',
			isArray: true,
			options: {
				schemaId: {
					id: 'card',
				},
			},
		},
		rightCards: {
			type: 'schema',
			isArray: true,
			options: {
				schemaId: {
					id: 'card',
				},
			},
		},
		topCards: {
			type: 'schema',
			isArray: true,
			options: {
				schemaId: {
					id: 'card',
				},
			},
		},
		bottomCards: {
			type: 'schema',
			isArray: true,
			options: {
				schemaId: {
					id: 'card',
				},
			},
		},
		topLeftCards: {
			type: 'schema',
			isArray: true,
			options: {
				schemaId: {
					id: 'card',
				},
			},
		},
		layout: {
			type: 'select',
			options: {
				choices: [
					{
						value: 'big-left',
						label: 'Big left',
					},
					{
						value: 'big-right',
						label: 'Big right',
					},
					{
						value: 'big-top',
						label: 'Big top',
					},
					{
						value: 'big-top-left',
						label: 'Big top left',
					},
					{
						value: 'one-col',
						label: 'One column',
					},
					{
						value: 'two-col',
						label: 'Two column',
					},
					{
						value: 'three-col',
						label: 'Three left',
					},
				],
			},
		},
	},
})
