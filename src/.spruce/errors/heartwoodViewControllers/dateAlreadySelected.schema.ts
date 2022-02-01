import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceErrors } from '../errors.types'



const dateAlreadySelectedSchema: SpruceErrors.HeartwoodViewControllers.DateAlreadySelectedSchema  = {
	id: 'dateAlreadySelected',
	namespace: 'HeartwoodViewControllers',
	name: 'Date already selected',
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

SchemaRegistry.getInstance().trackSchema(dateAlreadySelectedSchema)

export default dateAlreadySelectedSchema
