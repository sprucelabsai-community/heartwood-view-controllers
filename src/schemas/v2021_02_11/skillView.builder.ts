import { buildSchema } from '@sprucelabs/schema'
import layoutBuilder from './skillViewLayout.builder'

export default buildSchema({
    id: 'skillView',
    name: 'Skill view',
    description: '',
    fields: {
        id: {
            type: 'id',
            isPrivate: true,
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.SkillViewController',
            },
        },
        shouldCenterVertically: {
            type: 'boolean',
            label: 'Center vertically',
            defaultValue: false,
        },
        isFullScreen: {
            type: 'boolean',
            label: 'Full screen',
        },
        title: {
            type: 'text',
        },
        subtitle: {
            type: 'text',
        },
        description: {
            type: 'text',
        },
        width: {
            type: 'select',
            label: 'Width',
            defaultValue: 'tight',
            options: {
                choices: [
                    {
                        value: 'wide',
                        label: 'Wide',
                    },
                    {
                        value: 'tight',
                        label: 'Tight',
                    },
                    {
                        value: 'full',
                        label: 'Full width',
                    },
                ],
            },
        },
        layouts: {
            type: 'schema',
            label: 'Layout',
            isArray: true,
            options: {
                schema: layoutBuilder,
            },
        },
    },
})
