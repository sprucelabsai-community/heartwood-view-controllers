import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'
import dropdownBuilder from './dropdown.builder'

export default buildSchema({
	id: 'button',
	name: 'Button',
	description: '',
	fields: {
		...buttonFields,
		dropdown: {
			type: 'schema',
			label: 'Dropdown',
			options: {
				schema: dropdownBuilder,
			},
		},
	},
})
