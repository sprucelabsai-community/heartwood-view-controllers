import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'toastMessage',
    name: 'Toast message',
    fields: {
        message: {
            type: 'text',
            label: 'Message',
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
        isSticky: {
            type: 'boolean',
            label: 'Is Sticky',
        },
    },
})
