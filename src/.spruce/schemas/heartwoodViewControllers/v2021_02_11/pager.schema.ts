import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const pagerSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PagerSchema  = {
	id: 'pager',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Pager',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.PagerViewController`,}
	            },
	            /** . */
	            'totalPages': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'currentPage': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'onChangePage': {
	                type: 'raw',
	                options: {valueType: `(page: number) => Promise<any> | any`,}
	            },
	            /** . */
	            'setCurrentPage': {
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `(page: number) => Promise<any> | any`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(pagerSchema)

export default pagerSchema
