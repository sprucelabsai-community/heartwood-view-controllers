import { buildSchema } from '@sprucelabs/schema'

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
				schemaId: {
					id: 'button',
					namespace: 'Heartwood',
					version: 'v2021_02_11',
				},
			},
		},
		card: {
			type: 'schema',
			options: {
				schemaId: {
					id: 'cardBuilder',
					namespace: 'Heartwood',
					version: 'v2021_02_11',
				},
			},
		},
	},
})
