import { buildSchema } from '@sprucelabs/schema'
import navigationButtonBuilder from './navigationButton.builder'

export default buildSchema({
    id: 'navigation',
    name: 'Navigation',
    importsWhenLocal: [
        `import * as MercuryTypes from '@sprucelabs/mercury-types'`,
    ],
    importsWhenRemote: [
        `import * as MercuryTypes from '@sprucelabs/mercury-types'`,
    ],
    fields: {
        shouldRenderButtonLabels: {
            type: 'boolean',
            label: 'Render button labels',
            hint: 'Should the button labels be rendered?',
        },
        isVisible: {
            type: 'boolean',
            label: 'Is visible',
            hint: 'Should the navigation be visible? Defaults to true.',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>',
            },
        },
        buttons: {
            type: 'schema',
            isArray: true,
            options: {
                schema: navigationButtonBuilder,
            },
        },
    },
})
