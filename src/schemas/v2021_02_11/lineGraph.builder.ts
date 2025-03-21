import { buildSchema } from '@sprucelabs/schema'
import chartDataSetBuilder from './chartDataSet.builder'

export default buildSchema({
    id: 'lineGraph',
    name: 'Line graph',
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            options: {
                valueType:
                    'HeartwoodTypes.ChartViewController<HeartwoodTypes.LineGraph>',
            },
        },
        dataSets: {
            type: 'schema',
            isRequired: true,
            isArray: true,
            minArrayLength: 0,
            options: {
                schema: chartDataSetBuilder,
            },
        },
    },
})
