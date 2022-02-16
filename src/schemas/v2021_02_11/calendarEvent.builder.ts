import { calendarEventSchema as originalEventSchema } from '@sprucelabs/calendar-utils'
import { buildSchema, dropFields } from '@sprucelabs/schema'

const calendarEventSchema = buildSchema({
	id: 'calendarEvent',
	fields: {
		...dropFields(originalEventSchema.fields, [
			'source',
			'dateCreated',
			'dateDeleted',
		]),
		activeUntilDate: {
			type: 'dateTime',
			options: undefined,
		},
		error: {
			type: 'raw',
			options: {
				valueType: 'Error',
			},
		},
		isSelected: {
			type: 'boolean',
		},
		controller: {
			type: 'raw',
			options: {
				valueType: 'HeartwoodTypes.CalendarEventViewController',
			},
		},
	},
})

export default calendarEventSchema
