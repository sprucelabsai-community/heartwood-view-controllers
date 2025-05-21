import { test, suite, assert } from '@sprucelabs/test-utils'
import { calendarSeeder, SpruceSchemas } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

@suite()
export default class GeneratingCalendarDataTest extends AbstractViewControllerTest {
    private events!: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent[]

    protected async beforeEach() {
        await super.beforeEach()
        this.events = this.generate10RandomEvents()
    }

    @test()
    protected generatesRandomAmountOfTimeBlocks() {
        let firstTotalBlocks = this.events[0].timeBlocks.length

        for (const event of this.events) {
            if (firstTotalBlocks !== event.timeBlocks.length) {
                return
            }
        }

        assert.fail(`All events have only ${firstTotalBlocks} time blocks.`)
    }

    @test()
    protected durationsAreRandom() {
        let lastDuration = this.events[0].timeBlocks[0].durationMinutes

        for (const event of this.events) {
            const different = event.timeBlocks.find(
                (t) => t.durationMinutes !== lastDuration
            )
            if (different) {
                return
            }
        }

        assert.fail(`All events have a duration of ${lastDuration} minutes.`)
    }

    private generate10RandomEvents() {
        const events = calendarSeeder.generateEventsValues(10)

        for (const event of events) {
            for (const block of event.timeBlocks) {
                block.title = 'same'
            }
        }
        return events
    }
}
