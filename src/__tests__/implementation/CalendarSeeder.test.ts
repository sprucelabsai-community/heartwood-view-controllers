import { dateUtil } from '@sprucelabs/calendar-utils'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { calendarSeeder } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

@suite()
export default class CalendarSeederTest extends AbstractViewControllerTest {
    @test()
    protected async eventsAreNotAllTheSame() {
        const events = calendarSeeder.generateEventsValues(10)
        const startDateTimes: Record<string, boolean> = {}
        const subtitles: Record<string, boolean> = {}

        events.forEach((e) => {
            startDateTimes[e.startDateTimeMs] = true
            subtitles[e.timeBlocks[0].subtitle ?? `${new Date().getTime()}`] =
                true
        })

        assert.isAbove(Object.keys(startDateTimes).length, 1)
        assert.isAbove(
            Object.keys(subtitles).length,
            1,
            'all subtitles are the same'
        )
    }

    @test()
    protected async allEventsIn9To5OnTheCurrentDay() {
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
