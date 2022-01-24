import { dateUtil } from '@sprucelabs/calendar-utils'
import { test, assert } from '@sprucelabs/test'
import { calendarSeeder } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

export default class CalendarSeederTest extends AbstractViewControllerTest {
	@test()
	protected static async eventsAreNotAllTheSame() {
		const events = calendarSeeder.generateEventsValues(10)
		const uniques: Record<string, boolean> = {}

		events.forEach((e) => {
			uniques[e.startDateTimeMs] = true
		})

		assert.isAbove(Object.keys(uniques).length, 1)
	}

	@test()
	protected static async allEventsIn9To5OnTheCurrentDay() {
		const earliest = dateUtil.setTimeOfDay(new Date().getTime(), 9, 0, 0, 0)
		const latest = dateUtil.setTimeOfDay(new Date().getTime(), 18)
		const events = calendarSeeder.generateEventsValues(10)

		for (const event of events) {
			assert.isTrue(
				event.startDateTimeMs >= earliest,
				`${event.startDateTimeMs} needs to be more than or equal to ${earliest}`
			)
			assert.isTrue(
				event.startDateTimeMs < latest,
				`${event.startDateTimeMs} needs to be less than ${latest}`
			)
		}
	}
}
