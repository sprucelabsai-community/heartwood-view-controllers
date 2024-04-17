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
        error: {
            type: 'raw',
            options: {
                valueType: 'Error',
            },
        },
        isSelected: {
            type: 'boolean',
        },
        colors: {
            type: 'schema',
            options: {
                schema: buildSchema({
                    id: 'calendarEventColorOverride',
                    fields: {
                        backgroundColor: {
                            type: 'text',
                        },
                        foregroundColor: {
                            type: 'text',
                        },
                    },
                }),
            },
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
