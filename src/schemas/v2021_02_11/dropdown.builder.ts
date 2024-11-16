import { buildSchema } from '@sprucelabs/schema'
import dropdownButtonBuilder from './dropdownButton.builder'

export default buildSchema({
    id: 'dropdown',
    name: 'Dropdown',
    description: '',
    fields: {
        position: {
            type: 'select',
            label: 'Position',
            options: {
                choices: [
                    {
                        label: 'Top',
                        value: 'top',
                    },
                    {
                        label: 'Right',
                        value: 'right',
                    },
                    {
                        label: 'Bottom',
                        value: 'bottom',
                    },
                    {
                        label: 'Left',
                        value: 'left',
                    },
                ],
            },
        },
        items: {
            type: 'schema',
            isArray: true,
            options: {
                schema: dropdownButtonBuilder,
            },
        },
        card: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.Card',
            },
        },
    },
})
