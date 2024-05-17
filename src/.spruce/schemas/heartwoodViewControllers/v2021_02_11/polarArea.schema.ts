import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import polarAreaDataItemSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/polarAreaDataItem.schema'

const polarAreaSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaSchema  = {
	id: 'polarArea',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Polar Area',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.PolarAreaViewController`,}
	            },
	            /** . */
	            'data': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: polarAreaDataItemSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(polarAreaSchema)

export default polarAreaSchema
