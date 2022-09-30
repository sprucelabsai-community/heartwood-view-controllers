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
	            /** Row height. */
	            'height': {
	                label: 'Row height',
	                type: 'select',
	                options: {choices: [{"label":"Standard","value":"standard"},{"label":"Tall","value":"tall"},{"label":"Content","value":"content"}],}
	            },
	            /** Enabled. */
	            'isEnabled': {
	                label: 'Enabled',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Id. */
	            'id': {
	                label: 'Id',
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** Click handler. */
	            'onClick': {
	                label: 'Click handler',
	                type: 'raw',
	                options: {valueType: `() => Promise<any> | any`,}
	            },
	            /** Selected. */
	            'isSelected': {
	                label: 'Selected',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Style. */
	            'style': {
	                label: 'Style',
	                type: 'select',
	                options: {choices: [{"value":"standard","label":"Standard"},{"value":"warning","label":"Warning"},{"value":"critical","label":"Critical"}],}
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
