import { buildSchema } from '@sprucelabs/schema'
import skillViewBuilder from './skillView.builder'

export default buildSchema({
    id: 'lockScreen',
    name: 'lock screen',
    fields: {
        ...skillViewBuilder.fields,
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreen>',
            },
        },
        skillViewController: {
            type: 'raw',
            label: 'Card controller',
            options: {
                valueType: 'HeartwoodTypes.SkillViewController',
            },
        },
    },
})
