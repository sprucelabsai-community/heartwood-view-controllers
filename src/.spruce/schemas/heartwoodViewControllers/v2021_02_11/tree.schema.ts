import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import treeNodeSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/treeNode.schema'

const treeSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TreeSchema  = {
	id: 'tree',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Tree',
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
	                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.Tree>`,}
	            },
	            /** Node click handler. */
	            'onClickNode': {
	                label: 'Node click handler',
	                type: 'raw',
	                options: {valueType: `(nodeId: string) => void | Promise<void>`,}
	            },
	            /** Delete node click handler. */
	            'onClickDeleteNode': {
	                label: 'Delete node click handler',
	                type: 'raw',
	                options: {valueType: `(nodeId: string) => void | Promise<void>`,}
	            },
	            /** . */
	            'nodes': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: treeNodeSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(treeSchema)

export default treeSchema
