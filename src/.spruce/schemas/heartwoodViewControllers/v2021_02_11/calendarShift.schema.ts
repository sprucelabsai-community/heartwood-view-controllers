import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const calendarShiftSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarShiftSchema  = {
	id: 'calendarShift',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'startDateTimeMs': {
	                type: 'date',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'endDateTimeMs': {
	                type: 'date',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'id': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'personId': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarShiftSchema)

export default calendarShiftSchema
