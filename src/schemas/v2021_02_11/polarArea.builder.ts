import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'polarArea',
    name: 'Polar Area',
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            label: 'Controller',
            options: {
                valueType: 'HeartwoodTypes.PolarAreaViewController',
            },
        },
        data: {
            type: 'schema',
            isRequired: true,
            isArray: true,
            options: {
                schema: buildSchema({
                    id: 'polarAreaDataItem',
                    fields: {
                        label: { type: 'text', isRequired: true },
                        value: { type: 'number', isRequired: true },
                    },
                }),
            },
        },
    },
})
