import { buildSchema } from '@sprucelabs/schema'
import inputBuilder from './input.builder'

export default buildSchema({
	id: 'toggleInput',
	name: 'Toggle input',
	description: '',
	fields: {
		...inputBuilder.fields,
		value: {
			type: 'boolean',
			isPrivate: true,
		},
		onChange: {
			type: 'raw',
			label: 'On change handler',
			options: {
				valueType:
					'(value: boolean) => void | boolean | Promise<void | boolean>',
			},
		},
	},
})
