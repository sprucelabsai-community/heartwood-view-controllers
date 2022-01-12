import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'

let idCount = 0

type Event = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

export default function generateRandomEventValues(
	values?: Partial<Event>
): Event {
	return {
		id: `new ${new Date().getTime() * Math.random()}-${idCount++}`,
		startDateTimeMs: dateUtil.getStartOfDay(),
		target: {
			personId: '1234',
		},
		calendarId: '2134',
		timeBlocks: [
			{
				durationMinutes: 60,
				isBusy: true,
				title: `Block ${new Date().getTime()}`,
			},
		],
		...values,
	}
}
