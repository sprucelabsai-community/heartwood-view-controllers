import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import chartDataSetSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/chartDataSet.schema'

const lineGraphSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineGraphSchema  = {
	id: 'lineGraph',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Line graph',
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
	                options: {valueType: `HeartwoodTypes.ChartViewController<HeartwoodTypes.LineGraph>`,}
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

SchemaRegistry.getInstance().trackSchema(lineGraphSchema)

export default lineGraphSchema
