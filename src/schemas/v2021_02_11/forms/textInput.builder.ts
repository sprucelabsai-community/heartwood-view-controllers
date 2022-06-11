import { buildSchema } from '@sprucelabs/schema'
import inputBuilder from './input.builder'

export default buildSchema({
	id: 'textInput',
	name: 'Text input',
	description: '',
	fields: {
		...inputBuilder.fields,
		value: {
			type: 'text',
		},
		placeholder: {
			type: 'text',
			label: 'Placeholder',
		},
	},
})
