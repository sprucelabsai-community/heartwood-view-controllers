import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'invalidAppController',
    name: 'Invalid app controller',
    fields: {
        id: {
            type: 'id',
            isRequired: true,
        },
    },
})
