import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import calendarPersonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendarPerson.schema'
import calendarTimeSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendarTime.schema'
import calendarEventSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendarEvent.schema'

const calendarSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSchema  = {
	id: 'calendar',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Calendar',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar>`,}
	            },
	            /** People. */
	            'people': {
	                label: 'People',
	                type: 'schema',
	                isArray: true,
	                options: {schema: calendarPersonSchema_v2021_02_11,}
	            },
	            /** Minimum time. The earliest time to show in the calendar. */
	            'minTime': {
	                label: 'Minimum time',
	                type: 'schema',
	                hint: 'The earliest time to show in the calendar.',
	                options: {schema: calendarTimeSchema_v2021_02_11,}
	            },
	            /** Maximum time. The latest time to show in the calendar. */
	            'maxTime': {
	                label: 'Maximum time',
	                type: 'schema',
	                hint: 'The latest time to show in the calendar.',
	                options: {schema: calendarTimeSchema_v2021_02_11,}
	            },
	            /** date. The date the calendar will start on. First of month or first of week. */
	            'startDate': {
	                label: 'date',
	                type: 'number',
	                hint: 'The date the calendar will start on. First of month or first of week.',
	                options: undefined
	            },
	            /** Default start time. Any time before this will be dimmed out. Only applies if people have no schedules. */
	            'defaultStartTime': {
	                label: 'Default start time',
	                type: 'schema',
	                hint: 'Any time before this will be dimmed out. Only applies if people have no schedules.',
	                options: {schema: calendarTimeSchema_v2021_02_11,}
	            },
	            /** Default end time. Any time after this will be dimmed out. Only applies if people have no schedules. */
	            'defaultEndTime': {
	                label: 'Default end time',
	                type: 'schema',
	                hint: 'Any time after this will be dimmed out. Only applies if people have no schedules.',
	                options: {schema: calendarTimeSchema_v2021_02_11,}
	            },
	            /** . */
	            'events': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: calendarEventSchema_v2021_02_11,}
	            },
	            /** . */
	            'selectedEvent': {
	                type: 'schema',
	                options: {schema: calendarEventSchema_v2021_02_11,}
	            },
	            /** Timezone offset. In milliseconds */
	            'timezoneOffsetMs': {
	                label: 'Timezone offset',
	                type: 'number',
	                hint: 'In milliseconds',
	                options: undefined
	            },
	            /** View. */
	            'view': {
	                label: 'View',
	                type: 'select',
	                defaultValue: "day",
	                options: {choices: [{"label":"Day","value":"day"},{"label":"Month","value":"month"}],}
	            },
	            /** Render header. */
	            'shouldRenderHeader': {
	                label: 'Render header',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** . */
	            'onClick': {
	                type: 'raw',
	                options: {valueType: `(options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>`,}
	            },
	            /** . */
	            'onSelectEvent': {
	                type: 'raw',
	                options: {valueType: `(options: HeartwoodTypes.SelectEventOptions) => void | Promise<void>`,}
	            },
	            /** . */
	            'onDeselectEvent': {
	                type: 'raw',
	                options: {valueType: `(options: HeartwoodTypes.CalendarEvent) => void | Promise<void>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(calendarSchema)

export default calendarSchema
