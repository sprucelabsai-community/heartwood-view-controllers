import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'chartDataSet',
    name: 'Chart data set',
    fields: {
        label: {
            type: 'text',
        },
        dataPoints: {
            type: 'schema',
            isRequired: true,
            isArray: true,
            minArrayLength: 0,
            options: {
                schema: buildSchema({
                    id: 'chartDataPoint',
                    fields: {
                        label: {
                            type: 'text',
                        },
                        value: {
                            type: 'number',
                            isRequired: true,
                        },
                    },
                }),
            },
        },
    },
})
