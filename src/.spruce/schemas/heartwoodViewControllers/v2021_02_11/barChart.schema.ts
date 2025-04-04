import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import chartDataSetSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/chartDataSet.schema'

const barChartSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChartSchema  = {
	id: 'barChart',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Bar chart',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ChartViewController<HeartwoodTypes.BarChart>`,}
	            },
	            /** . */
	            'dataSets': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: chartDataSetSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(barChartSchema)

export default barChartSchema
