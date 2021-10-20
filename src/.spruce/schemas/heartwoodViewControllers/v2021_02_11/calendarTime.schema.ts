import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const calendarTimeSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema  = {
	id: 'calendarTime',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'hour': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'minute': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarTimeSchema)

export default calendarTimeSchema
