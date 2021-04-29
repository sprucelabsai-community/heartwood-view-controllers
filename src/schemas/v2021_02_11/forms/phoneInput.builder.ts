import { buildSchema } from '@sprucelabs/schema'
import inputBuilder from './input.builder'

export default buildSchema({
	id: 'phoneInput',
	name: 'Phone input',
	description: '',
	fields: {
		...inputBuilder.fields,
	},
})
