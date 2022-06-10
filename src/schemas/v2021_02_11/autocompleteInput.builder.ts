import { buildSchema } from '@sprucelabs/schema'
import textInputBuilder from './forms/textInput.builder'

export default buildSchema({
	id: 'autocompleteInput',
	name: 'Autocomplete input',
	fields: {
		...textInputBuilder.fields,
		suggestions: {
			type: 'schema',
			isArray: true,
			options: {
				schema: buildSchema({
					id: 'autocompleteSuggestion',
					fields: {
						id: {
							type: 'id',
							isRequired: true,
						},
						label: {
							type: 'text',
							isRequired: true,
						},
						onClick: {
							type: 'raw',
							label: 'On click handler',
							options: {
								valueType: '(id: string) => void | Promise<void>',
							},
						},
					},
				}),
			},
		},
	},
})
