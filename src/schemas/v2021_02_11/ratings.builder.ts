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
            label: 'Steps',
            hint: 'How many choices does a person have? Defaults to 5.',
        },
        leftLabel: {
            type: 'text',
            label: 'Left Label',
            hint: 'The label on the left side of the ratings. Usually assocatiated with the lowest rating.',
        },
        rightLabel: {
            type: 'text',
            label: 'Right Label',
            hint: 'The label on the right side of the ratings. Usually associated with the highest rating.',
        },
        middleLabel: {
            type: 'text',
            label: 'Middle Label',
            hint: 'The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common.',
        },
        icon: {
            type: 'select',
            label: 'Style',
            hint: "How should I render the ratings? Defaults to 'Star'.",
            options: {
                choices: [
                    {
                        value: 'star',
                        label: 'Star',
                    },
                    {
                        value: 'radio',
                        label: 'Radio Buttons',
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
