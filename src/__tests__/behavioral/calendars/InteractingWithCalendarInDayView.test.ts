import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarInteractor from '../../../tests/utilities/calendarInteractor'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    CalendarSwipeDirection,
    ClickEventOptions,
    DropEventOptions,
} from '../../../types/calendar.types'
import CalendarViewController, {
    CalendarViewControllerOptions,
} from '../../../viewControllers/Calendar.vc'

export class InteractingWithCalendarInMonthViewTest extends AbstractViewControllerTest {
    private static vc: CalendarViewController
    private static lastOnClickOptions: ClickEventOptions

    protected static async beforeEach() {
        await super.beforeEach()
        this.reload()
    }

    @test()
    protected static async interactingThrowsWhenMissingOptions() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            calendarInteractor.clickDayView()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'dateTimeMs'],
        })
    }

    @test()
    protected static async throwsWhenClickingCalendarInWrongView() {
        this.reload({
            view: 'month',
        })

        const err = await assert.doesThrowAsync(() => this.clickCalendar())
        assert.doesInclude(err.message, 'month')
    }

    @test()
    protected static async throwsWhenNoPersonMatch() {
        const err = await assert.doesThrowAsync(() =>
            this.clickCalendar({ personId: '234234' })
        )
        assert.doesInclude(err.message, 'person')
    }

    @test()
    protected static async throwsWithNoOnClick() {
        const [person] = this.VcWithPeople(1, { onClickView: null })

        const err = await assert.doesThrowAsync(() =>
            this.clickCalendar({ personId: person.id })
        )
        assert.doesInclude(err.message, 'onClick')
    }

    @test()
    protected static async noErrorWhenPersonMatches() {
        const [person] = this.VcWithPeople(1)

        await this.clickCalendar({ personId: person.id })
    }

    @test()
    protected static async canFindPersonInSecondSpot() {
        const [, person] = this.VcWithPeople(3)

        await this.clickCalendar({ personId: person.id })
    }

    @test()
    protected static async invokesOnClickOnView() {
        let passedOptions: any

        const [person] = this.VcWithPeople(1, {
            onClickView: (options) => {
                passedOptions = options
            },
        })

        const dateTimeMs = new Date().getTime()

        await this.clickCalendar({ personId: person.id, dateTimeMs })

        assert.isEqualDeep(passedOptions, {
            personId: person.id,
            dateTimeMs,
        })
    }

    @test()
    protected static async canPassUndefinedAsPersonId() {
        let passedOptions: any

        this.VcWithPeople(1, {
            onClickView: (options) => {
                passedOptions = options
            },
        })

        const dateTimeMs = new Date().getTime()

        await this.clickCalendar({ personId: null, dateTimeMs })

        assert.isEqualDeep(passedOptions, {
            personId: undefined,
            dateTimeMs,
        })
    }

    @test()
    protected static async cantClickOnEventWhenMissingParams() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            calendarInteractor.clickEvent()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'eventId'],
        })
    }

    @test()
    protected static async cantClickEventThatDoesNotExist() {
        await assert.doesThrowAsync(
            () => calendarInteractor.clickEvent(this.vc, 'not-found'),
            /not-found/gi
        )
    }

    @test()
    protected static async throwsWithoutOnClick() {
        this.VcWithPeople(4, {
            onClickEvent: undefined,
        })
        await assert.doesThrowAsync(
            () => this.addEventsAndClickLast(4),
            'onClick'
        )
    }

    @test()
    protected static async canClickFirstEvent() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        await this.clickEvent(event.id)
    }

    @test()
    protected static async canClickLaterEvent() {
        const events = calendarSeeder.generateEventsValues(10)
        this.vc.mixinEvents(events)
        await this.clickEvent(events[4].id)
    }

    @test()
    protected static async clickingEventInvokesOnClickEvent() {
        const event = await this.addEventsAndClickLast(3)

        assert.isEqual(
            this.lastOnClickOptions.viewController,
            this.vc.getEventVc(event.id)
        )

        //@ts-ignore
        delete this.lastOnClickOptions.viewController
        delete this.lastOnClickOptions.event.controller

        //@ts-ignore
        assert.isEqualDeep(this.lastOnClickOptions, {
            event,
            block: event.timeBlocks[0],
            blockIdx: 0,
        })
    }

    @test()
    protected static async updatingEventDoesNotClearVc() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)

        const vc1 = this.vc.getEventVc(event.id)

        this.vc.updateEvent(event.id, { startDateTimeMs: 100 })

        const vc2 = this.vc.getEventVc(event.id)

        assert.isEqual(vc1, vc2)
    }

    @test()
    protected static async updatingAnEventDoesNotTriggerRender() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        this.vc.updateEvent(event.id, { startDateTimeMs: 100 })

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async deletingEventClearsVc() {
        const event = calendarSeeder.generateEventValues()

        this.vc.addEvent(event)
        this.vc.getEventVc(event.id)
        await this.vc.removeEvent(event.id)

        assert.doesThrow(() => this.vc.getEventVc(event.id))
    }

    @test()
    protected static async cantClickOnEventBlockThatDoesNotExist() {
        await assert.doesThrowAsync(() => this.addEventsAndClickLast(3, 10))
    }

    @test()
    protected static async cantClickOnEventBlockThatDoesNotExist2() {
        const event = calendarSeeder.generateEventValues({
            timeBlocks: [
                {
                    durationMinutes: 20,
                    isBusy: true,
                    title: `Block ${new Date().getTime()}`,
                },
                {
                    durationMinutes: 10,
                    isBusy: false,
                    title: `Block ${new Date().getTime()}`,
                },
            ],
        })

        this.vc.addEvent(event)
        await assert.doesThrowAsync(() => this.clickEvent(event?.id, 2))
    }

    @test('can click on second block', 1)
    @test('can click on third block', 2)
    protected static async canClickOnLaterBlock(blockIdx: number) {
        const timeBlocks = [
            {
                durationMinutes: 20,
                isBusy: true,
                title: `Block ${new Date().getTime()}`,
            },
            {
                durationMinutes: 10,
                isBusy: false,
                title: `Block ${new Date().getTime()}`,
            },
            {
                durationMinutes: 10,
                isBusy: false,
                title: `Block ${new Date().getTime()}`,
            },
        ]
        const event = calendarSeeder.generateEventValues({
            timeBlocks,
        })

        this.vc.addEvent(event)

        const match = await this.clickEvent(event.id, blockIdx)

        assert.isEqualDeep(match.timeBlocks, timeBlocks)
        assert.isEqualDeep(this.lastOnClickOptions.block, timeBlocks[blockIdx])
        assert.isEqual(this.lastOnClickOptions.blockIdx, blockIdx)
    }

    @test()
    protected static hasDragEvent() {
        assert.isFunction(calendarInteractor.dragAndDropEvent)
    }

    @test()
    protected static async throwsIfDraggingEventDoesNotExist() {
        await assert.doesThrowAsync(() =>
            calendarInteractor.dragAndDropEvent(this.vc, 'aoeu', {
                newStartDateTimeMs: 100,
            })
        )
    }

    @test()
    protected static async throwsIfCallbackDoesNotReturnBoolean() {
        this.reload({
            onDropEvent: () => {},
        })

        let [event] = this.addEvents(1)

        await assert.doesThrowAsync(() =>
            calendarInteractor.dragAndDropEvent(this.vc, event.id, {
                newStartDateTimeMs: 100,
            })
        )
    }

    @test('Dropping works if onDropEvent returns true', true)
    @test('Dropping works if onDropEvent returns false', false)
    protected static async canDragIfReturningBoolFromOnDropEvent(
        results: boolean
    ) {
        this.reload({
            onDropEvent: () => {
                return results
            },
        })

        let [event] = this.addEvents(1)

        const actual = await calendarInteractor.dragAndDropEvent(
            this.vc,
            event.id,
            {
                newStartDateTimeMs: 100,
            }
        )

        assert.isEqual(actual, results)
    }

    @test()
    protected static async canDragEventItFindEvent() {
        let [event] = this.addEvents(1)

        await assert.doesThrowAsync(() =>
            calendarInteractor.dragAndDropEvent(this.vc, event.id, {
                newStartDateTimeMs: 100,
            })
        )

        this.reload({
            onDropEvent: () => {
                return true
            },
        })

        event = this.addEvents(1)[0]

        await calendarInteractor.dragAndDropEvent(this.vc, event.id, {
            newStartDateTimeMs: 100,
        })
    }

    @test('can drag event 1', {
        newStartDateTimeMs: 100,
    })
    @test('can drag event 2', {
        blockUpdates: [{ hello: 'world' }],
    })
    protected static async passesThroughToChanges(
        updates: Partial<DropEventOptions>
    ) {
        let wasHit = false
        let passedOptions: any
        this.reload({
            onDropEvent: (options) => {
                passedOptions = options
                wasHit = true
                return true
            },
        })

        const [event] = this.addEvents(1)

        await calendarInteractor.dragAndDropEvent(this.vc, event.id, updates)

        delete event.controller
        delete passedOptions.event.controller
        delete passedOptions.dragEvent.controller

        assert.isTrue(wasHit)
        assert.isEqualDeep(passedOptions, {
            event,
            dragEvent: {
                ...event,
                id: 'dragging',
            },
            ...updates,
        })
    }

    @test()
    protected static async throwsWhenTryingToWipeWithoutHandler() {
        await assert.doesThrowAsync(() =>
            calendarInteractor.swipe(this.vc, 'forward')
        )
    }

    @test('can swipe forward', 'forward')
    @test('can swipe backward', 'backward')
    protected static async canSimulateSwipe(expected: CalendarSwipeDirection) {
        let wasHit = false
        let direction: CalendarSwipeDirection | undefined
        this.reload({
            onSwipe: (options) => {
                wasHit = true
                direction = options.direction
            },
        })

        await this.swipe(expected)
        assert.isTrue(wasHit)
        assert.isEqual(direction, expected)
    }

    private static async swipe(direction: CalendarSwipeDirection) {
        await calendarInteractor.swipe(this.vc, direction)
    }

    private static async addEventsAndClickLast(
        total: number,
        blockIdx?: number
    ) {
        const events = this.addEvents(total)
        const selected = events[total - 1]
        await this.clickEvent(selected.id, blockIdx)

        return selected
    }

    private static addEvents(total: number) {
        const events = calendarSeeder.generateEventsValues(total)
        this.vc.mixinEvents(events)
        return events
    }

    private static async clickEvent(eventId: string, blockIdx?: number) {
        return calendarInteractor.clickEvent(this.vc, eventId, blockIdx)
    }

    private static VcWithPeople(
        totalPeople: number,
        options?: Partial<CalendarViewControllerOptions>
    ) {
        const people = calendarSeeder.generatePeopleValues(totalPeople)

        this.reload({
            people,
            ...options,
        })

        return people
    }

    private static reload(options?: Partial<CalendarViewControllerOptions>) {
        this.vc = this.Controller('calendar', {
            view: 'day',
            people: [],
            onClickView: () => {},
            onClickEvent: (options) => {
                this.lastOnClickOptions = options
            },
            ...options,
        })
    }

    private static clickCalendar(options?: {
        personId?: string | null
        dateTimeMs?: number
    }): any {
        return calendarInteractor.clickDayView(
            this.vc,
            options?.dateTimeMs ?? new Date().getTime(),
            options?.personId === null
                ? undefined
                : (options?.personId ?? `123`)
        )
    }
}
