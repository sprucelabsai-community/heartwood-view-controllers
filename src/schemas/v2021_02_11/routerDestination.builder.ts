import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'routerDestination',
    name: 'router destination',
    fields: {
        id: {
            type: 'raw',
            isRequired: true,
            options: {
                valueType: 'HeartwoodTypes.SkillViewControllerId',
            },
        },
        args: {
            type: 'raw',
            options: {
                valueType: 'Record<string, any>',
            },
        },
    },
})
