import { buildSchema } from '@sprucelabs/schema'
import { SelectChoice } from '@sprucelabs/spruce-core-schemas'

const choices: SelectChoice[] = Array.from({ length: 5 }).map((_, index) => ({
    value: `status${index + 1}`,
    label: `Status ${index + 1}`,
}))

export default buildSchema({
    id: 'statusIndicator',
    name: 'Status indicator',
    fields: {
        status: {
            type: 'select',
            label: 'Status',
            options: {
                choices,
            },
        },
        hint: {
            type: 'text',
            label: 'Hint',
        },
    },
})
