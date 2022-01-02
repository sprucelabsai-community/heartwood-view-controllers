import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { dateUtil } from '@sprucelabs/spruce-calendar-utils'

let idCount = 0

export default function generateRandomEventValues(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent {
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
	}
}
