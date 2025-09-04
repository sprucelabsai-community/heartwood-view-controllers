import { buildSchema } from '@sprucelabs/schema'

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
        isSticky: {
            type: 'boolean',
            label: 'Is Sticky',
        },
    },
})
