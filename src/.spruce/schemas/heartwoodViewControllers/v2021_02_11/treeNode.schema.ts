import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const treeNodeSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TreeNodeSchema  = {
	id: 'treeNode',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'label': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'childrenIds': {
	                type: 'id',
	                isArray: true,
	                minArrayLength: 0,
	                options: undefined
	            },
	            /** . */
	            'isSelected': {
	                type: 'boolean',
	                options: undefined
	            },
	            /** Delete click handler. */
	            'onClickDelete': {
	                label: 'Delete click handler',
	                type: 'raw',
	                options: {valueType: `() => void | Promise<void>`,}
	            },
	            /** Node click handler. */
	            'onClick': {
	                label: 'Node click handler',
	                type: 'raw',
	                options: {valueType: `() => void | Promise<void>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(treeNodeSchema)

export default treeNodeSchema
