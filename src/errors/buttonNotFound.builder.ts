import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'buttonNotFound',
    name: 'button not found',
    fields: {
        id: {
            type: 'id',
            isRequired: true,
        },
    },
})
