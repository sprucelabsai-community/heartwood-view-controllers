import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from './button.builder'

export default buildSchema({
	id: 'dropdown',
	name: 'Dropdown',
	description: '',
	fields: {
		position: {
			type: 'select',
			label: 'Position',
			options: {
				choices: [
					{
						label: 'Bottom',
						value: 'bottom',
					},
					{
						label: 'Top',
						value: 'top',
					},
					{
						label: 'Right',
						value: 'right',
					},
				],
			},
		},
		items: {
			type: 'schema',
			isArray: true,
			options: {
				schema: buttonBuilder,
			},
		},
	},
})
