import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'appNotFound',
    name: 'App not found',
    fields: {
        namespace: {
            type: 'id',
            isRequired: true,
        },
    },
})
