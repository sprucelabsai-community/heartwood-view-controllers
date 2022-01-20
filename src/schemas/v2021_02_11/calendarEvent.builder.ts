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
			type: 'number',
			options: undefined,
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
