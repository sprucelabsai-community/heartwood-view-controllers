import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'barChart',
    name: 'Bar chart',
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.BarChartViewController',
            },
        },
        dataSets: {
            type: 'schema',
            isRequired: true,
            isArray: true,
            minArrayLength: 0,
            options: {
                schema: buildSchema({
                    id: 'barChartDataSet',
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
                                    id: 'barChartDataPoint',
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
                }),
            },
        },
    },
})
