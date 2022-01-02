import { buildSchema, dropFields } from '@sprucelabs/schema'
import { calendarEventSchema as originalEventSchema } from '@sprucelabs/spruce-calendar-utils'

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
	},
})

export default calendarEventSchema
