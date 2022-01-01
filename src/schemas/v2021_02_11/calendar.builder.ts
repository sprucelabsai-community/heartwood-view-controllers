import { buildSchema } from '@sprucelabs/schema'

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
	},
})
