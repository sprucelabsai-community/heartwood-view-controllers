import { buildSchema, dropFields } from '@sprucelabs/schema'
import textInputBuilder from './forms/textInput.builder'

export default buildSchema({
    id: 'autocompleteInput',
    name: 'Autocomplete input',
    fields: {
        ...dropFields(textInputBuilder.fields, ['name']),
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.FormInputViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInput>',
            },
        },
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
                                valueType:
                                    '(id: string) => void | Promise<void>',
                            },
                        },
                    },
                }),
            },
        },
    },
})
