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
        placeholder: {
            type: 'text',
            label: 'Placeholder',
        },
        choices: {
            type: 'schema',
            isArray: true,
            isRequired: true,
            options: {
                schema: {
                    id: 'selectInputChoice',
                    fields: {
                        value: {
                            type: 'raw',
                            isRequired: true,
                            options: {
                                valueType: 'string | number',
                            },
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
