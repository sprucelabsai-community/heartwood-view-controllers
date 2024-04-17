import { SchemaRegistry } from '@sprucelabs/schema'
import feedItemSchema_v2020_07_22 from '#spruce/schemas/spruce/v2020_07_22/feedItem.schema'
import { SpruceSchemas } from '../../schemas.types'

const feedSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FeedSchema =
    {
        id: 'feed',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: 'Feed',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** . */
            items: {
                type: 'schema',
                isRequired: true,
                isArray: true,
                minArrayLength: 0,
                options: { schema: feedItemSchema_v2020_07_22 },
            },
            /** . */
            onSubmitMessage: {
                type: 'raw',
                options: {
                    valueType: `HeartwoodTypes.OnSubmitFeedMessageHandler`,
                },
            },
            /** . */
            controller: {
                type: 'raw',
                options: {
                    valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed>`,
                },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(feedSchema)

export default feedSchema
