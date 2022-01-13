import { buildSchema } from '@sprucelabs/schema'
import calendarEventBuilder from './calendarEvent.builder'

const timeSchema = buildSchema({
	id: 'calendarTime',
	fields: {
		hour: {
			type: 'number',
			isRequired: true,
		},
		minute: {
			type: 'number',
			isRequired: true,
		},
	},
})

export default buildSchema({
	id: 'calendar',
	name: 'Calendar',
	fields: {
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar>',
			},
		},
		people: {
			type: 'schema',
			label: 'People',
			isArray: true,
			isRequired: true,
			minArrayLength: 0,
			options: {
				schema: {
					id: 'calendarPerson',
					fields: {
						id: {
							type: 'id',
							isRequired: true,
						},
						casualName: {
							type: 'text',
							isRequired: true,
						},
					},
				},
			},
		},
		minTime: {
			type: 'schema',
			label: 'Minimum time',
			hint: 'The earliest time to show in the calendar.',
			options: {
				schema: timeSchema,
			},
		},
		maxTime: {
			type: 'schema',
			label: 'Maximum time',
			hint: 'The latest time to show in the calendar.',
			options: {
				schema: timeSchema,
			},
		},
		startDate: {
			type: 'number',
			label: 'date',
			hint: 'The date the calendar will start on. First of month or first of week.',
		},
		defaultStartTime: {
			type: 'schema',
			label: 'Default start time',
			hint: 'Any time before this will be dimmed out. Only applies if people have no schedules.',
			options: {
				schema: timeSchema,
			},
		},
		defaultEndTime: {
			type: 'schema',
			label: 'Default end time',
			hint: 'Any time after this will be dimmed out. Only applies if people have no schedules.',
			options: {
				schema: timeSchema,
			},
		},
		events: {
			type: 'schema',
			isArray: true,
			isRequired: true,
			minArrayLength: 0,
			options: {
				schema: calendarEventBuilder,
			},
		},
		selectedEvent: {
			type: 'schema',
			options: {
				schema: calendarEventBuilder,
			},
		},
		timezoneOffsetMs: {
			type: 'number',
			label: 'Timezone offset',
			hint: 'In milliseconds',
		},
		view: {
			type: 'select',
			label: 'View',
			defaultValue: 'day',
			options: {
				choices: [
					{
						label: 'Day',
						value: 'day',
					},
					{
						label: 'Month',
						value: 'month',
					},
				],
			},
		},
		shouldRenderHeader: {
			type: 'boolean',
			label: 'Render header',
			defaultValue: true,
		},
		onClick: {
			type: 'raw',
			options: {
				valueType:
					'(options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>',
			},
		},
		onSelectEvent: {
			type: 'raw',
			options: {
				valueType:
					'(options: HeartwoodTypes.SelectEventOptions) => void | Promise<void>',
			},
		},
		onDeselectEvent: {
			type: 'raw',
			options: {
				valueType:
					'(options: HeartwoodTypes.CalendarEvent) => void | Promise<void>',
			},
		},
	},
})
