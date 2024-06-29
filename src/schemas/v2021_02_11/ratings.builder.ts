import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'ratings',
    name: 'Ratings',
    fields: {
        value: {
            type: 'number',
            label: 'Value',
            hint: 'A number between 0-1.',
        },
        canBeChanged: {
            type: 'boolean',
            label: 'Can be changed',
        },
        onChange: {
            type: 'raw',
            label: 'Callback',
            options: {
                valueType: '(value: number) => any',
            },
        },
        steps: {
            type: 'number',
        },
        leftLabel: { type: 'text' },
        rightLabel: { type: 'text' },
        middleLabel: { type: 'text' },
        icon: {
            type: 'select',
            options: {
                choices: [
                    {
                        value: 'star',
                        label: 'Star',
                    },
                    {
                        value: 'radio',
                        label: 'Radio',
                    },
                ],
            },
        },
        controller: {
            type: 'raw',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>',
            },
        },
    },
})
