import { buildSchema } from '@sprucelabs/schema'
import inputBuilder from './forms/input.builder'

export default buildSchema({
	id: 'addressInput',
	name: 'Address input',
	fields: {
		...inputBuilder.fields,
	},
})
