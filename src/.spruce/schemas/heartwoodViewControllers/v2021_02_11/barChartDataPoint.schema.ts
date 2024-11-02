import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const barChartDataPointSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChartDataPointSchema  = {
	id: 'barChartDataPoint',
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
	            'value': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(barChartDataPointSchema)

export default barChartDataPointSchema
