import { buildSchema } from '@sprucelabs/schema'
import { feedSchema } from '@sprucelabs/spruce-core-schemas'

export default buildSchema({
    id: 'feed',
    name: 'Feed',
    fields: {
        ...feedSchema.fields,
        scrollMode: {
            type: 'select',
            options: {
                choices: [
                    {
                        value: 'inline',
                        label: 'Inline Scroll',
                    },
                    {
                        value: 'fullView',
                        label: 'Full View',
                    },
                ],
            },
            hint: 'Determines how the feed should handle scrolling. Inline will scroll within the feed area, while Full View delegates scrolling to the entire view.',
        },
        onSubmitMessage: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.OnSubmitFeedMessageHandler',
            },
        },
        controller: {
            type: 'raw',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed>',
            },
        },
    },
})
