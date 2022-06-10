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
		renderedValue: {
			type: 'text',
			hint: `If you need the text input to render a value other than what is stored (a person's name vs. their id).`,
		},
		placeholder: {
			type: 'text',
			label: 'Placeholder',
		},
	},
})
