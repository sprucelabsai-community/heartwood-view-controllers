import { buildSchema } from '@sprucelabs/schema'
import { buildLocalFormImports } from '../../utilities/buildLocalFormImports'
import inputBuilder from './forms/input.builder'

export const type = 'string'

export default buildSchema({
	id: 'selectInput',
	name: 'Select input',
	description: '',
	importsWhenLocal: buildLocalFormImports(),
	fields: {
		...inputBuilder.fields,
		choices: {
			type: 'schema',
			isArray: true,
			isRequired: true,
			options: {
				schema: {
					id: 'selectInputChoice',
					fields: {
						value: {
							type: 'text',
							isRequired: true,
						},
						label: {
							type: 'text',
							isRequired: true,
						},
					},
				},
			},
		},
	},
})
