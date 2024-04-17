import { SchemaRegistry } from '@sprucelabs/schema'
import navigationButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/navigationButton.schema'
import { SpruceSchemas } from '../../schemas.types'

const navigationSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationSchema =
    {
        id: 'navigation',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: 'Navigation',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** Render button labels. Should the button labels be rendered? */
            shouldRenderButtonLabels: {
                label: 'Render button labels',
                type: 'boolean',
                hint: 'Should the button labels be rendered?',
                options: undefined,
            },
            /** Is visible. Should the navigation be visible? Defaults to true. */
            isVisible: {
                label: 'Is visible',
                type: 'boolean',
                hint: 'Should the navigation be visible? Defaults to true.',
                options: undefined,
            },
            /** Controller. */
            controller: {
                label: 'Controller',
                type: 'raw',
                options: {
                    valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>`,
                },
            },
            /** . */
            buttons: {
                type: 'schema',
                isArray: true,
                options: { schema: navigationButtonSchema_v2021_02_11 },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(navigationSchema)

export default navigationSchema
