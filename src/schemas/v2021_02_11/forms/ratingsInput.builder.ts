import { buildSchema } from '@sprucelabs/schema'
import ratingsBuilder from '../ratings.builder'
import inputBuilder from './input.builder'

export default buildSchema({
	id: 'ratingsInput',
	name: 'ratings input',
	description: '',
	fields: {
		...inputBuilder.fields,
		...ratingsBuilder.fields,
		value: {
			type: 'number',
			isPrivate: true,
		},
		onChange: {
			type: 'raw',
			label: 'On change handler',
			options: {
				valueType: '(value?: number) => any | Promise<any>',
			},
		},
	},
})
