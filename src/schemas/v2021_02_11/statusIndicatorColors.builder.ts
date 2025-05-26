import { buildSchema, SchemaFieldsByName } from '@sprucelabs/schema'

const fields: SchemaFieldsByName = {}

Array.from({ length: 5 }).forEach((_, index) => {
    fields[`color${index + 1}`] = {
        type: 'text',
        label: `Color ${index + 1}`,
    }
})

export default buildSchema({
    id: 'statusIndicatorColors',
    name: 'Status indicator colors',
    fields,
})
