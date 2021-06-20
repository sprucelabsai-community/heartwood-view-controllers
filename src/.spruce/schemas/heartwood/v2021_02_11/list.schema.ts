import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import listRowSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/listRow.schema'

const listSchema: SpruceSchemas.Heartwood.v2021_02_11.ListSchema  = {
	id: 'list',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'list',
	    fields: {
	            /** Render row dividers. */
	            'shouldRenderRowDividers': {
	                label: 'Render row dividers',
	                type: 'boolean',
	                options: undefined
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
	                options: {choices: [{"label":"Standard","value":"standard"},{"label":"Tall","value":"tall"}],}
	            },
	            /** Rows. */
	            'rows': {
	                label: 'Rows',
	                type: 'schema',
	                options: {schema: listRowSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listSchema)

export default listSchema
