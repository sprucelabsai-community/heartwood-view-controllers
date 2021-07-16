import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listCellSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/listCell.schema'

const listRowSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRowSchema  = {
	id: 'listRow',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ListRowViewController`,}
	            },
	            /** Cells. */
	            'cells': {
	                label: 'Cells',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: listCellSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRowSchema)

export default listRowSchema
