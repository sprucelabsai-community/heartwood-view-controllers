import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'progress',
    name: 'Progress',
    fields: {
        id: {
            type: 'id',
        },
        title: {
            type: 'text',
            label: 'Title',
            hint: 'Rendered in the center of the circle indicator!',
        },
        percentComplete: {
            type: 'number',
            label: 'Percent complete',
            hint: 'A number from zero to 1',
        },
        details: {
            type: 'schema',
            label: 'Details',
            options: {
                schema: buildSchema({
                    id: 'progressDetails',
                    fields: {
                        title: {
                            type: 'text',
                        },
                        subtitle: {
                            type: 'text',
                        },
                    },
                }),
            },
        },
    },
})
