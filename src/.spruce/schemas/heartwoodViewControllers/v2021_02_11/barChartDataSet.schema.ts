import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import barChartDataPointSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/barChartDataPoint.schema'

const barChartDataSetSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChartDataSetSchema  = {
	id: 'barChartDataSet',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'label': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'dataPoints': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: barChartDataPointSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(barChartDataSetSchema)

export default barChartDataSetSchema
