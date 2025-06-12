import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listRowSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/listRow.schema'

const listSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSchema  = {
	id: 'list',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'list',
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
	                options: {valueType: `HeartwoodTypes.ListViewController`,}
	            },
	            /** Render row dividers. */
	            'shouldRenderRowDividers': {
	                label: 'Render row dividers',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Allow drag and drop sorting. */
	            'shouldAllowDragAndDropSorting': {
	                label: 'Allow drag and drop sorting',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Drag and drop sort handler. */
	            'onDragAndDropSort': {
	                label: 'Drag and drop sort handler',
	                type: 'raw',
	                options: {valueType: `(rowIds: string[]) => boolean | Promise<boolean | void> | void`,}
	            },
	            /** Column widths. */
	            'columnWidths': {
	                label: 'Column widths',
	                type: 'raw',
	                isArray: true,
	                options: {valueType: `number | 'fill' | 'content'`,}
	            },
	            /** Row height. */
	            'defaultRowHeight': {
	                label: 'Row height',
	                type: 'select',
	                options: {choices: [{"label":"Standard","value":"standard"},{"label":"Tall","value":"tall"},{"label":"Content","value":"content"}],}
	            },
	            /** Rows. */
	            'rows': {
	                label: 'Rows',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: listRowSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listSchema)

export default listSchema
