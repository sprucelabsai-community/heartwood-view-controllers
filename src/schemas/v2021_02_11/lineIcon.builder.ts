import { buildSchema } from '@sprucelabs/schema'
import { lineIcons } from '../../constants'

export default buildSchema({
	id: 'lineIcon',
	name: 'Line icon',
	description: '',
	fields: {
		name: {
			type: 'select',
			label: 'Name',
			isRequired: true,
			options: {
				choices: lineIcons.map((i) => ({
					value: i,
					label: i,
				})),
			},
		},
	},
})
