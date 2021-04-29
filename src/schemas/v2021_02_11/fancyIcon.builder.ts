import { buildSchema } from '@sprucelabs/schema'
import { fancyIcons } from '../../constants'

export default buildSchema({
	id: 'fancyIcon',
	name: 'Fancy icon',
	description: '',
	fields: {
		name: {
			type: 'select',
			label: 'Name',
			isRequired: true,
			options: {
				choices: fancyIcons.map((i) => ({
					value: i,
					label: i,
				})),
			},
		},
		size: {
			type: 'select',
			label: 'Size',
			options: {
				choices: [
					{
						value: 'medium',
						label: 'medium',
					},
					{
						value: 'extraLarge',
						label: 'Extra lange',
					},
				],
			},
		},
	},
})
