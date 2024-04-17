import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const progressNavigatorStepSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorStepSchema =
    {
        id: 'progressNavigatorStep',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: '',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** . */
            id: {
                type: 'id',
                isRequired: true,
                options: undefined,
            },
            /** . */
            label: {
                type: 'text',
                isRequired: true,
                options: undefined,
            },
            /** . */
            isComplete: {
                type: 'boolean',
                options: undefined,
            },
            /** . */
            hasError: {
                type: 'boolean',
                options: undefined,
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(progressNavigatorStepSchema)

export default progressNavigatorStepSchema
