import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import chartDataPointSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/chartDataPoint.schema'

const chartDataSetSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSetSchema  = {
	id: 'chartDataSet',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Chart data set',
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
	                options: {schema: chartDataPointSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(chartDataSetSchema)

export default chartDataSetSchema
