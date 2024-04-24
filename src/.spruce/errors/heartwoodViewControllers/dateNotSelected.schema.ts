import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const dateNotSelectedSchema: SpruceErrors.HeartwoodViewControllers.DateNotSelectedSchema  = {
	id: 'dateNotSelected',
	namespace: 'HeartwoodViewControllers',
	name: 'Date not selected',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'year': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'month': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'day': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(dateNotSelectedSchema)

export default dateNotSelectedSchema
