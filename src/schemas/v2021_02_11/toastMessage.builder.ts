import { buildSchema } from '@sprucelabs/schema'
import routerDestinationBuilder from './routerDestination.builder'

export default buildSchema({
    id: 'toastMessage',
    name: 'Toast message',
    fields: {
        content: {
            type: 'text',
            label: 'Content',
            isRequired: true,
        },
        style: {
            type: 'select',
            label: 'Style',
            options: {
                choices: [
                    { value: 'info', label: 'info' },
                    { value: 'success', label: 'success' },
                    { value: 'warning', label: 'warning' },
                    { value: 'critical', label: 'critical' },
                ],
            },
        },
        destination: {
            type: 'schema',
            options: {
                schema: routerDestinationBuilder,
            },
        },
        isSticky: {
            type: 'boolean',
            label: 'Is Sticky',
        },
    },
})
