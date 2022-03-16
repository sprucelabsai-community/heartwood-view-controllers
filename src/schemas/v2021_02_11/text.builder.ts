import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'text',
	name: 'Text',
	description: '',
	fields: {
		content: {
			type: 'text',
			label: 'Text',
		},
		html: {
			type: 'text',
			label: 'Html',
		},
		align: {
			type: 'select',
			label: 'Align',
			defaultValue: 'left',
			options: {
				choices: [
					{
						value: 'left',
						label: 'Left',
					},
					{
						value: 'right',
						label: 'Right',
					},
					{
						value: 'center',
						label: 'Center',
					},
				],
			},
		},
	},
})
