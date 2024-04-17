import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
    id: 'stepNotComplete',
    name: ' Step not complete',
    fields: {
        stepId: {
            type: 'id',
            isRequired: true,
        },
    },
})
