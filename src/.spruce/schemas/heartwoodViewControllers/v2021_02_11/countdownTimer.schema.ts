import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

const countdownTimerSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CountdownTimerSchema =
    {
        id: 'countdownTimer',
        version: 'v2021_02_11',
        namespace: 'HeartwoodViewControllers',
        name: 'Countdown Timer',
        moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
        fields: {
            /** . */
            id: {
                type: 'id',
                options: undefined,
            },
            /** . */
            controller: {
                type: 'raw',
                options: {
                    valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.CountdownTimer>`,
                },
            },
            /** . */
            onComplete: {
                type: 'raw',
                options: { valueType: `() => void | Promise<void>` },
            },
            /** . */
            endDateMs: {
                type: 'dateTime',
                options: undefined,
            },
            /** . */
            setStartHandler: {
                type: 'raw',
                isRequired: true,
                options: {
                    valueType: `(handler: (to: number) => void) => void`,
                },
            },
        },
    }

SchemaRegistry.getInstance().trackSchema(countdownTimerSchema)

export default countdownTimerSchema
