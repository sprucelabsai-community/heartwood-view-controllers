import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const portalSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PortalSchema =
    {
        id: 'portal',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: '',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** HTML. */
            html: {
                label: 'HTML',
                type: 'text',
                options: undefined,
            },
            /** URI. */
            uri: {
                label: 'URI',
                type: 'text',
                options: undefined,
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(portalSchema)

export default portalSchema
