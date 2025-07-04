import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'skillViewLayout',
    name: 'Layout',
    description: '',
    fields: {
        headerCard: {
            type: 'schema',
            isRequired: false,
            options: {
                schemaId: {
                    id: 'card',
                },
            },
        },
        leftCards: {
            type: 'schema',
            minArrayLength: 0,
            isArray: true,
            options: {
                schemaId: {
                    id: 'card',
                },
            },
        },
        rightCards: {
            type: 'schema',
            isArray: true,
            minArrayLength: 0,
            options: {
                schemaId: {
                    id: 'card',
                },
            },
        },
        topCards: {
            type: 'schema',
            isArray: true,
            minArrayLength: 0,
            options: {
                schemaId: {
                    id: 'card',
                },
            },
        },
        cards: {
            type: 'schema',
            isArray: true,
            minArrayLength: 0,
            options: {
                schemaId: {
                    id: 'card',
                },
            },
        },
        bottomCards: {
            type: 'schema',
            isArray: true,
            options: {
                schemaId: {
                    id: 'card',
                },
            },
        },
        style: {
            type: 'select',
            options: {
                choices: [
                    {
                        value: 'one-col',
                        label: 'One column',
                    },
                    {
                        value: 'two-col',
                        label: 'Two columns',
                    },
                    {
                        value: 'three-col',
                        label: 'Three columns',
                    },
                    {
                        value: 'big-left',
                        label: 'Big left',
                    },
                    {
                        value: 'big-right',
                        label: 'Big right',
                    },
                    {
                        value: 'big-top',
                        label: 'Big top',
                    },
                    {
                        value: 'big-top-left',
                        label: 'Big top left',
                    },
                    {
                        value: 'grid',
                        label: 'Grid',
                    },
                ],
            },
        },
    },
})
