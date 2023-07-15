import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'calendarSelectedDate',
	name: 'calendar selected date',
	fields: {
		day: {
			type: 'number',
			isRequired: true,
		},
		month: {
			type: 'number',
			isRequired: true,
		},
		year: {
			type: 'number',
			isRequired: true,
		},
	},
})
