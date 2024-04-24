import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const calendarEventColorOverrideSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorOverrideSchema  = {
	id: 'calendarEventColorOverride',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'backgroundColor': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'foregroundColor': {
	                type: 'text',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarEventColorOverrideSchema)

export default calendarEventColorOverrideSchema
