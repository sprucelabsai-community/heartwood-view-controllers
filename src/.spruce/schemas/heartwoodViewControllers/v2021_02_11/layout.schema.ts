import { SchemaRegistry } from '@sprucelabs/schema'
import cardSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/card.schema'
import { SpruceSchemas } from '../../schemas.types'

const layoutSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LayoutSchema =
    {
        id: 'layout',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: 'Layout',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** Card. Will render a card in this section */
            cards: {
                label: 'Card',
                type: 'schema',
                hint: 'Will render a card in this section',
                isArray: true,
                options: { schema: cardSchema_v2021_02_11 },
            },
            /** . */
            className: {
                type: 'text',
                isPrivate: true,
                options: undefined,
            },
            /** Grid. Will force cards to render as grid. */
            shouldRenderAsGrid: {
                label: 'Grid',
                type: 'boolean',
                hint: 'Will force cards to render as grid.',
                options: undefined,
            },
            /** Width. */
            width: {
                label: 'Width',
                type: 'select',
                defaultValue: 'tight',
                options: {
                    choices: [
                        { value: 'wide', label: 'Wide' },
                        { value: 'tight', label: 'Tight' },
                        { value: 'full', label: 'Full width' },
                    ],
                },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(layoutSchema)

export default layoutSchema
