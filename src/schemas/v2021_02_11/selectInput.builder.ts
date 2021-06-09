import { buildSchema } from '@sprucelabs/schema'
import {
	buildLocalTypesImport,
	buildRemoteTypesImport,
} from '../../utilities/importBuilder'
import inputBuilder from './forms/input.builder'

export const type = 'string'

export default buildSchema({
	id: 'selectInput',
	name: 'Select input',
	description: '',
	importsWhenLocal: buildLocalTypesImport(),
	importsWhenRemote: buildRemoteTypesImport(),
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
