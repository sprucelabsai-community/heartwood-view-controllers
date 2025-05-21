import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import calendarSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendar.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CalendarSelectedDate } from '../../../types/heartwood.types'
import AbstractCalendarEventViewController from '../../../viewControllers/AbstractCalendarEvent.vc'
import { CalendarViewControllerOptions } from '../../../viewControllers/Calendar.vc'
import CalendarEventViewController from '../../../viewControllers/CalendarEvent.vc'
import CardViewController from '../../../viewControllers/card/Card.vc'
import ListViewController from '../../../viewControllers/list/List.vc'
import SpyCalendarVc from './SpyCalendarVc'

class TestEventViewController extends AbstractCalendarEventViewController {}

@suite()
export default class ControllingACalendarTest extends AbstractViewControllerTest {
    protected controllerMap = {
        testEvent: TestEventViewController,
        spyCalendar: SpyCalendarVc,
    }

    protected vc!: SpyCalendarVc

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected doesNotThroughIfMissingPeopleInMonthView() {
        this.Controller('calendar', { view: 'month' })
    }

    @test()
    protected rendersValidView() {
        validateSchemaValues(calendarSchema, this.render(this.vc))
    }

    @test()
    protected passesThroughViewValues() {
        const model: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar =
            {
                timezoneOffsetMs: new Date().getTimezoneOffset() * 1000,
                minTime: { hour: 3, minute: 0 },
                maxTime: { hour: 10, minute: 0 },
                events: [calendarSeeder.generateEventValues()],
                [`${new Date().getTime()}`]: Math.random(),
                view: 'day',
                people: [
                    {
                        id: `${new Date().getTime()}`,
                        casualName: `${Math.random()}`,
                    },
                ],
            }
        const vc = this.Controller('calendar', model)
        const actual = this.render(vc)

        assert.isTrue(actual.controller === vc)
        delete actual.controller
        delete actual.events[0].controller

        assert.doesInclude(actual, { ...model, shouldEnableAnimations: true })
    }

    @test(
        `can't set min after max 1`,
        { hour: 10, minute: 0 },
        { hour: 0, minute: 0 }
    )
    @test(
        `can't set min after max 2`,
        { hour: 10, minute: 30 },
        { hour: 10, minute: 0 }
    )
    protected cantSetMinTimeForAfterMaxTime(
        minTime: CalendarTime,
        maxTime: CalendarTime
    ) {
        const err = assert.doesThrow(() =>
            this.Controller('calendar', {
                minTime,
                maxTime,
                people: [
                    {
                        id: 'aoeu',
                        casualName: 'Tay',
                    },
                ],
            })
        )

        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['minTime', 'maxTime'],
        })
    }

    @test('can set min time 1', { hour: 9, minute: 30 })
    @test('can set min time 2', { hour: 10, minute: 0 })
    protected canSetMinTime(time: CalendarTime) {
        this.vc.setMinTime(time)
        this.assertTriggerRenderCount(1)

        assert.isEqualDeep(this.render(this.vc).minTime, time)
    }

    @test('can set max time 1', { hour: 15, minute: 30 })
    @test('can set max time 2', { hour: 17, minute: 0 })
    protected canSetMaxTime(time: CalendarTime) {
        this.vc.setMaxTime(time)
        this.assertTriggerRenderCount(1)

        assert.isEqualDeep(this.render(this.vc).maxTime, time)
    }

    @test("can't set bad timezone 1", -12 * 60 * 60 * 1001)
    @test("can't set bad timezone 2", 14 * 60 * 60 * 1001)
    protected mustSetValidTimezoneOffset(offset: number) {
        const err = assert.doesThrow(() => this.vc.setTimezoneOffsetMs(offset))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['timezoneOffsetMs'],
        })
    }

    @test('can set timezoneOffset 1', -12 * 60 * 60 * 1000)
    @test('can set timezoneOffset 2', 14 * 60 * 60 * 1000)
    protected canSetTimezoneOffset(time: number) {
        this.vc.setTimezoneOffsetMs(time)
        this.assertTriggerRenderCount(1)
        assert.isEqual(this.render(this.vc).timezoneOffsetMs, time)
        assert.isEqual(this.vc.getTimezoneOffsetMs(), time)
    }

    @test()
    protected defaultsToDayView() {
        assert.isEqual(this.vc.getView(), 'day')
        assert.isEqual(this.render(this.vc).view, 'day')
    }

    @test()
    protected canSetStartDay() {
        const vc = this.Controller('calendar', {
            view: 'month',
            people: [
                {
                    id: `${new Date().getTime()}`,
                    casualName: 'Tay',
                },
            ],
        })

        assert.isEqual(vc.getView(), 'month')
        assert.isEqual(this.render(vc).view, 'month')
    }

    @test()
    protected canSetView() {
        this.vc.setView('month')
        assert.isEqual(this.vc.getView(), 'month')
        this.assertTriggerRenderCount(1)
        this.vc.setView('day')
        assert.isEqual(this.vc.getView(), 'day')
    }

    @test()
    protected canAddEvent() {
        this.vc.addEvent(calendarSeeder.generateEventValues())
    }

    @test()
    protected cantAddEventWithSameIdTwice() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        const err = assert.doesThrow(() => this.vc.addEvent(event))
        errorAssert.assertError(err, 'DUPLICATE_EVENT_ID', {
            id: event.id,
        })
    }

    @test()
    protected addingEventAddsToModel() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)

        const model = this.render(this.vc)
        delete model.events[0].controller
        assert.isEqualDeep(model.events, [event])
    }

    @test()
    protected canAddAFewEvents() {
        this.vc.addEvent(calendarSeeder.generateEventValues())
        this.vc.addEvent(calendarSeeder.generateEventValues())
        this.vc.addEvent(calendarSeeder.generateEventValues())

        const expected = 3

        this.assertRendersTotalEvents(expected)
    }

    @test()
    protected addingEventTriggersRender() {
        this.vc.addEvent(calendarSeeder.generateEventValues())
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected async cantRemoveEventThatDoesNotExist() {
        const err = await assert.doesThrowAsync(() =>
            this.vc.removeEvent('aoeu')
        )
        errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
            id: 'aoeu',
        })
    }

    @test()
    protected async canRemoveEventWithGoodId() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        await this.vc.removeEvent(event.id)
    }

    @test()
    protected async removeEventRemovesItFromTheModel() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        await this.vc.removeEvent(event.id)
        this.assertRendersTotalEvents(0)
    }

    @test()
    protected async onlyRemovesExpectedEvent() {
        const event1 = calendarSeeder.generateEventValues()
        this.vc.addEvent(event1)
        const event2 = calendarSeeder.generateEventValues()
        this.vc.addEvent(event2)

        await this.vc.removeEvent(event1.id)

        const model = this.render(this.vc)
        delete model.events[0].controller
        assert.isEqualDeep(model.events, [event2])
    }

    @test()
    protected async removingAnEventTriggersRender() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        await this.vc.removeEvent(event.id)
        this.assertTriggerRenderCount(2)
    }

    @test()
    protected canMixinEvents() {
        this.vc.mixinEvents([calendarSeeder.generateEventValues()])
    }

    @test()
    protected cantMixinEventsWithSameIdAtOnce() {
        const event = calendarSeeder.generateEventValues()
        const err = assert.doesThrow(() => this.vc.mixinEvents([event, event]))
        errorAssert.assertError(err, 'DUPLICATE_EVENT_ID', {
            id: event.id,
        })
    }

    @test()
    protected mixingInDupsNotNextToEachOtherStillThrows() {
        const event = calendarSeeder.generateEventValues()
        const err = assert.doesThrow(() =>
            this.vc.mixinEvents([
                calendarSeeder.generateEventValues(),
                event,
                calendarSeeder.generateEventValues(),
                event,
            ])
        )
        errorAssert.assertError(err, 'DUPLICATE_EVENT_ID', {
            id: event.id,
        })
    }

    @test()
    protected canMixinEventsToEmptyCalendar() {
        this.vc.mixinEvents([calendarSeeder.generateEventValues()])
        this.assertRendersTotalEvents(1)
    }

    @test()
    protected mixingInDoesNotClearPreviousEvents() {
        this.vc.addEvent(calendarSeeder.generateEventValues())
        this.vc.mixinEvents([calendarSeeder.generateEventValues()])
        this.assertRendersTotalEvents(2)
    }

    @test()
    protected mixingInReplacesEventsWithMatchingId() {
        const original = calendarSeeder.generateEventValues()
        this.vc.addEvent(original)
        const updated = {
            ...calendarSeeder.generateEventValues(),
            id: original.id,
        }

        this.vc.mixinEvents([updated])

        this.assertRendersTotalEvents(1)
    }

    @test()
    protected mixingInReplacesEventsWithMatchingIdInBusyCalendar() {
        const original = calendarSeeder.generateEventValues()

        this.vc.addEvent(calendarSeeder.generateEventValues())
        this.vc.addEvent(original)

        const updated = {
            ...calendarSeeder.generateEventValues(),
            id: original.id,
        }

        this.vc.mixinEvents([calendarSeeder.generateEventValues(), updated])

        this.assertRendersTotalEvents(3)
    }

    @test()
    protected mixinTriggersRender() {
        this.populateCalendar()
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected async cantSelectEventThatDoesNotExist() {
        this.populateCalendar()
        const err = await assert.doesThrowAsync(() =>
            this.vc.selectEvent('1234')
        )

        errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
            id: '1234',
        })
    }

    @test()
    protected async canSelectEvent() {
        const event = await this.addOneEventAndSelectIt()
        assert.isEqualDeep(this.vc.getSelectedEvent(), {
            ...event,
            isSelected: true,
        })
    }

    @test()
    protected async selectingEventTriggersCallback() {
        let passedEvent: any

        this.vc = this.Vc({
            onSelectEvent: (event) => {
                passedEvent = event
            },
        })

        const [event] = this.populateCalendar(1)

        await this.vc.selectEvent(event.id)

        assert.isTruthy(passedEvent)
        assert.isEqualDeep(passedEvent, event)
    }

    @test()
    protected async selectedEventIsSetBeforeSelectInvokedOnVc() {
        const event = this.addEvent()
        const vc = this.vc.getEventVc(event.id)
        vc.select = () => {
            assert.isEqual(this.vc.getSelectedEvent()?.id, event.id)
        }

        await this.vc.selectEvent(event.id)
    }

    @test()
    protected async updatingASelectedEventReflectsChanges() {
        const event = await this.addOneEventAndSelectIt()
        const updates = {
            startDateTimeMs: 100,
        }

        this.vc.updateEvent(event.id, updates)

        assert.isEqualDeep(this.vc.getSelectedEvent(), {
            ...event,
            ...updates,
            isSelected: true,
        })
    }

    @test()
    protected async canSelectFromBusyCalendar() {
        this.populateCalendar()
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        await this.vc.selectEvent(event.id)
        assert.isEqualDeep(this.vc.getSelectedEvent(), {
            ...event,
            isSelected: true,
        })
        assert.isEqualDeep(this.render(this.vc).selectedEvent, {
            ...event,
            isSelected: true,
        })
    }

    @test()
    protected async canDeselectEvent() {
        await this.addEventSelectAndDeselectIt()
        assert.isUndefined(this.vc.getSelectedEvent())
    }

    @test()
    protected async deselectingTriggersCallback() {
        let passedEvent: any
        this.vc = this.Vc({
            onDeselectEvent: (event) => {
                passedEvent = event
            },
        })

        const [event] = this.populateCalendar(1)

        await this.vc.selectEvent(event.id)
        await this.vc.deselectEvent()

        assert.isTruthy(passedEvent)
        assert.isEqualDeep(passedEvent, { ...event, isSelected: true })
    }

    @test()
    protected async deselectingWithNoSelectedEventHasNoEffect() {
        let wasHit = false
        this.vc = this.Vc({
            onDeselectEvent: () => {
                wasHit = true
            },
        })
        await this.vc.deselectEvent()
        assert.isFalse(wasHit)
        this.assertTriggerRenderCount(0)
    }

    @test()
    protected async removingSelectedEventDeselectsIt() {
        let wasHit = false
        this.vc = this.Vc({
            onDeselectEvent: () => {
                wasHit = true
            },
        })
        const event = await this.addOneEventAndSelectIt()
        await this.vc.removeEvent(event.id)
        assert.isUndefined(this.vc.getSelectedEvent())

        assert.isTrue(wasHit)
    }

    @test()
    protected async removingEventOtherThanSelectedDoesNotDeselect() {
        const event = await this.addOneEventAndSelectIt()
        const [event2] = this.populateCalendar(1)

        await this.vc.removeEvent(event2.id)
        assert.isEqualDeep(this.vc.getSelectedEvent(), {
            ...event,
            isSelected: true,
        })
    }

    @test()
    protected getsNoEventsToStart() {
        assert.isEqualDeep(this.events, [])
    }

    @test()
    protected returnsEvents() {
        this.populateCalendar()
        assert.isLength(this.events, 3)
    }

    @test()
    protected async canSetStartDate() {
        await this.vc.setStartDate(new Date().getTime())
    }

    @test()
    protected async canGetStartDate() {
        const date = getDate()
        await this.vc.setStartDate(date)
        assert.isEqual(this.vc.getStartDate(), date)
    }

    @test()
    protected async settingDateTriggersOnDateChange() {
        let wasHit = false
        let passedDate
        this.vc = this.Vc({
            onChangeStartDate: (date) => {
                passedDate = date
                wasHit = true
            },
        })

        const date = getDate()
        await this.vc.setStartDate(date)

        assert.isTrue(wasHit)
        assert.isEqual(passedDate, date)
    }

    @test()
    protected async rendersStartDate() {
        const date = getDate()
        await this.vc.setStartDate(date)
        assert.isEqual(this.render(this.vc).startDate, date)
    }

    @test()
    protected async settingStartDateTriggersRender() {
        await this.vc.setStartDate(getDate())
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected settingEventsForRangeThrowsWithEndBeforeStart() {
        const err = assert.doesThrow(() =>
            this.vc.replaceEventsInRange([], 10, 0)
        )
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['endDate'],
        })
    }

    @test()
    protected settingEventsForTodayClearsExistingEvents() {
        this.populateCalendar()
        this.vc.replaceEventsInRange(
            [],
            dateUtil.getStartOfDay(),
            dateUtil.getEndOfDay()
        )

        this.assertRendersTotalEvents(0)
    }

    @test()
    protected setEventsForRangeClearsOutEventsOutsideOfRange() {
        this.populateCalendar()
        const event = calendarSeeder.generateEventValues({
            startDateTimeMs: dateUtil.addDays(dateUtil.getEndOfDay(), 2),
        })

        this.vc.addEvent(event)

        this.vc.replaceEventsInRange(
            [],
            dateUtil.getStartOfDay(),
            dateUtil.getEndOfDay()
        )

        this.assertRendersTotalEvents(1)
    }

    @test()
    protected replacedEventsAreSet() {
        this.vc.replaceEventsInRange(
            [calendarSeeder.generateEventValues()],
            dateUtil.getStartOfDay(),
            dateUtil.getEndOfDay()
        )

        this.assertRendersTotalEvents(1)
    }

    @test()
    protected replacingEventsTriggersRender() {
        this.vc.replaceEventsInRange(
            [calendarSeeder.generateEventValues()],
            dateUtil.getStartOfDay(),
            dateUtil.getEndOfDay()
        )

        this.assertTriggerRenderCount(1)
    }

    @test('throws with getting bad event 1', '123')
    @test('throws with getting bad event 2', '567')
    protected throwsIfGettingBadEvent(id: string) {
        this.vc.addEvent(calendarSeeder.generateEventValues())
        const err = assert.doesThrow(() => this.vc.getEvent(id))
        errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
            id,
        })
    }

    @test()
    protected canGetFirstEvent() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        const match = this.vc.getEvent(event.id)
        assert.isEqualDeep(match, event)
    }

    @test()
    protected canGetSecondEvent() {
        const events = calendarSeeder.generateEventsValues(5)

        this.vc.mixinEvents(events)

        const event = events[2]
        const match = this.vc.getEvent(event.id)
        assert.isEqualDeep(match, event)
    }

    @test()
    protected gettingEventReturnsCopy() {
        const event = calendarSeeder.generateEventValues()

        this.vc.addEvent(event)

        const match = this.vc.getEvent(event.id)

        assert.isNotEqual(event, match)
    }

    @test('throws with updating bad event 1', '123')
    @test('throws with updating bad event 2', '567')
    protected throwsIfUpdatingEventTHatDoesNotExist(id: string) {
        this.vc.addEvent(calendarSeeder.generateEventValues())

        const err = assert.doesThrow(() => this.vc.updateEvent(id, {}))
        errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
            id,
        })
    }

    @test('can update start time for first event', 0)
    @test('can update start time for third event', 2)
    @test('can update start time for fifth event', 4)
    protected updatesStartTime(idx: number) {
        const events = calendarSeeder.generateEventsValues(10)
        const event = events[idx]

        this.vc.mixinEvents(events)

        this.assertChangesArMade(event, { startDateTimeMs: 100 })
    }

    @test()
    protected canUpdateCalendarId() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)

        this.assertChangesArMade(event, { calendarId: '23423' })
    }

    @test()
    protected updatingReplacesEvent() {
        const [, event] = this.populateCalendar(2)
        this.vc.updateEvent(event.id, {})

        const { events } = this.render(this.vc)
        const matches = events.filter((e) => e.id === event.id)
        assert.isLength(matches, 1)
    }

    @test()
    protected updatingEventDoesNotTriggersRender() {
        const [event] = this.populateCalendar(1)
        this.vc.updateEvent(event.id, {})
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected needAPersonToAddPerson() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.addPerson())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['person'],
        })
    }

    @test()
    protected canAddPerson() {
        const person = this.addPerson()
        assert.isEqualDeep(this.vc.getPeople(), [this.firstPerson, person])
    }

    @test()
    protected canRenderEvenWhenStartingWithNoPeople() {
        this.vc = this.Controller('calendar', {}) as SpyCalendarVc
        const person = this.addPerson()
        assert.isEqualDeep(this.vc.getPeople(), [person])
    }

    @test()
    protected async addingPersonTriggersRender() {
        this.addPerson()
        this.assertTriggerRenderCount(1)
    }

    @test('cant remove person no there 1', 'aoeu')
    @test('cant remove person no there 2', 'sth')
    protected cantRemovePersonWhoIsNotThere(personId: string) {
        const err = assert.doesThrow(() => this.vc.removePerson(personId))
        errorAssert.assertError(err, 'PERSON_NOT_FOUND', {
            personId,
        })
    }

    @test()
    protected canRemoveRemovePeople() {
        this.vc.removePerson(this.firstPerson.id)
        assert.isEqualDeep(this.vc.getPeople(), [])

        const person = this.addPerson()
        const person2 = this.addPerson()

        this.vc.removePerson(person.id)
        assert.isEqualDeep(this.vc.getPeople(), [person2])
    }

    @test()
    protected canRemoveLaterPerson() {
        const p1 = this.addPerson()
        const p2 = this.addPerson()
        const person = this.addPerson()

        this.vc.removePerson(person.id)

        assert.isEqualDeep(this.vc.getPeople(), [this.firstPerson, p1, p2])
    }

    @test()
    protected async removingPersonTriggersRender() {
        const p1 = this.addPerson()
        this.vc.removePerson(p1.id)
        this.assertTriggerRenderCount(2)
    }

    @test()
    protected canSetPeople() {
        const people = calendarSeeder.generatePeopleValues(1)
        this.vc.setPeople(people)
        assert.isEqualDeep(this.vc.getPeople(), people)
        assert.isNotEqual(this.vc.getPeople(), people)
    }

    @test()
    protected throwsWhenGettingBadEventVc() {
        const id = `${new Date().getTime() * Math.random()}`
        const err = assert.doesThrow(() => this.vc.getEventVc(id))

        errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
            id,
        })
    }

    @test()
    protected canGetEventVc() {
        const { vc } = this.addEventAndGetVc()
        assert.isTrue(vc instanceof CalendarEventViewController)
    }

    @test()
    protected eventVcRendersExpectedEvent() {
        const { vc, event } = this.addEventAndGetVc()
        const model = this.render(vc)
        assert.doesNotInclude(event, model)
    }

    @test()
    protected canSetViewControllersByEventType() {
        this.assertSetsVcForEventType('test', 'list', ListViewController)

        this.Factory().setController('card', CardViewController)
        this.assertSetsVcForEventType('waka', 'card', CardViewController)

        this.assertVcForEventType('test', ListViewController)
    }

    @test()
    protected settingViewControllerSetsOnEventsAlreadySet() {
        const { event } = this.addEventWithType('test')
        this.vc.setControllerForEventType('test', 'list')

        const match = this.vc.getEventVc(event.id)
        assert.isTrue(match instanceof ListViewController)
    }

    @test()
    protected settingViewControllerByTypeTriggersRender() {
        this.addEvent()
        this.assertTriggerRenderCount(1)
        this.vc.setControllerForEventType('test', 'list')
        this.assertTriggerRenderCount(2)
    }

    @test()
    protected settingVcDoesNotTriggerRenderIfThereAreNoEvents() {
        this.vc.setControllerForEventType('test', 'list')
        this.assertTriggerRenderCount(0)
    }

    @test()
    protected async settingViewControllerDoesNotClearPastVcs() {
        const { vc, event } = this.addEventAndGetVc()
        this.vc.setControllerForEventType('test', 'list')

        const match = this.vc.getEventVc(event.id)
        assert.isEqual(vc, match)
    }

    @test()
    protected async settingToViewControllerThatAlreadyExistsDoesNothing() {
        let hitCount = 0
        this.vc.getEvents = () => {
            hitCount++
            return []
        }
        this.vc.setControllerForEventType('test', 'list')
        this.vc.setControllerForEventType('test', 'list')
        assert.isEqual(hitCount, 1)
        this.vc.setControllerForEventType('test', 'card')
        assert.isEqual(hitCount, 2)
    }

    @test()
    protected canSetDefaultVcForEvents() {
        assert.isFalsy(this.vc.getDefaultControllerForEvents())

        this.vc.setDefaultControllerForEvents('list')

        assert.isEqual(this.vc.getDefaultControllerForEvents(), 'list')
        const { vc } = this.addEventAndGetVc()
        assert.isTrue(vc instanceof ListViewController)

        this.vc.setDefaultControllerForEvents('card')

        assert.isEqual(this.vc.getDefaultControllerForEvents(), 'card')
        const { vc: vc2 } = this.addEventAndGetVc()
        assert.isTrue(vc2 instanceof CardViewController)
    }

    @test()
    protected defaultEventVcFallsBackForEventsWithTypeSlugs() {
        this.vc.setDefaultControllerForEvents('list')
        const event = calendarSeeder.generateEventValues()
        event.eventTypeSlug = 'waka'
        this.vc.addEvent(event)

        const vc = this.vc.getEventVc(event.id)

        assert.isTrue(vc instanceof ListViewController)
    }

    @test()
    protected renderingEventRendersController() {
        const { vc } = this.addEventAndGetVc()
        const model = this.render(vc)
        assert.isEqual(model.controller, vc)
    }

    @test()
    protected calendarRendersEventControllers() {
        this.vc.mixinEvents(calendarSeeder.generateEventsValues(10))
        const model = this.render(this.vc)

        assert.isTruthy(model.events[0].controller)
        assert.isTrue(
            model.events[0].controller instanceof CalendarEventViewController
        )

        for (const event of model.events) {
            const model = this.render(event.controller as any)
            assert.isTruthy(model)
            assert.isTruthy(model.id)
            assert.doesInclude(event, model)
        }
    }

    @test()
    protected reUsesEventVc() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)

        assert.isEqual(
            this.vc.getEventVc(event.id),
            this.vc.getEventVc(event.id)
        )
    }

    @test()
    protected mixingInManyEventsDoesNotDup() {
        const events = calendarSeeder.generateEventsValues(5)
        this.vc.mixinEvents(events)
        this.vc.mixinEvents(events)

        assert.isLength(this.render(this.vc).events, 5)
    }

    @test()
    protected canControlAnimation() {
        assert.isTrue(this.vc.getIsAnimationEnabled())
        assert.isTrue(this.render(this.vc).shouldEnableAnimations)
        this.vc.disableAnimations()
        assert.isFalse(this.render(this.vc).shouldEnableAnimations)
        assert.isFalse(this.vc.getIsAnimationEnabled())
        this.vc.enableAnimation()
        assert.isTrue(this.render(this.vc).shouldEnableAnimations)
        assert.isTrue(this.vc.getIsAnimationEnabled())
    }

    @test()
    protected enablingDisablingAnimationsTriggersRender() {
        this.vc.enableAnimation()
        this.assertTriggerRenderCount(0)
        this.vc.disableAnimations()
        this.vc.disableAnimations()
        this.assertTriggerRenderCount(1)
        this.vc.enableAnimation()
        this.assertTriggerRenderCount(2)
    }

    @test()
    protected updatingEventOtherThanSelectedDoesNotChangeStartDate() {
        const original = this.vc.getStartDate()
        const [event] = this.populateCalendar(1)
        this.vc.updateEvent(event.id, { startDateTimeMs: 100 })
        assert.isEqual(original, this.vc.getStartDate())
    }

    @test()
    protected async doesNotClearStartDateIfSelectedUpdated() {
        const event = await this.addOneEventAndSelectIt()
        const original = 100
        await this.vc.setStartDate(original)

        this.vc.updateEvent(event.id, {
            groupId: '12334',
        })

        assert.isEqual(original, this.vc.getStartDate())
    }

    @test()
    protected canClearAllEvents() {
        const events = this.populateCalendar(10)

        let passedIds: string[] = []

        this.vc.removeEvent = async (id) => {
            passedIds.push(id)
        }

        this.vc.clearEvents()

        assert.isEqualDeep(
            passedIds,
            events.map((e) => e.id)
        )
    }

    @test()
    protected async clearingEventsRendersOnce() {
        this.populateCalendar(10)
        this.vc.clearEvents()
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected updatingAnEventToNewTypeSlugSetsNewVc() {
        const { event } = this.addEventAndGetVc()
        const event2 = this.addEvent()

        this.render(this.vc)

        this.vc.setControllerForEventType('testing', 'testEvent')

        this.vc.updateEvent(event.id, { eventTypeSlug: 'testing' })

        const eventVc = this.vc.getEventVc(event.id)

        assert.isTrue(eventVc instanceof TestEventViewController)

        //@ts-ignore
        assert.isTrue(event2.id in this.vc.vcsById)

        this.assertTriggerRenderCount(4)
    }

    @test()
    protected onlyClearsVcByIdIfSlugChanges() {
        this.vc.setControllerForEventType('testing', 'testEvent')
        const { event } = this.addEventAndGetVc({ eventTypeSlug: 'testing' })

        this.vc.updateEvent(event.id, { eventTypeSlug: 'testing' })

        //@ts-ignore
        assert.isTrue(event.id in this.vc.vcsById)
    }

    @test()
    protected async settingPeopleTriggersRender() {
        this.vc.setPeople([])
        this.assertTriggerRenderCount(1)
    }

    @test()
    protected async canRemoveMaynEventsAtOnce() {
        const [e1, e2, e3] = this.add3Events()
        await this.removeEvents([e2])
        const expected = [e1, e3]
        this.assertEventsEqual(expected)
        await this.removeEvents([e1, e3])
        this.assertEventsEqual([])
    }

    @test()
    protected async removingManyEventsRendersOnce() {
        const events = this.add3Events()
        this.assertTriggerRenderCount(3)
        await this.removeEvents(events)
        this.assertTriggerRenderCount(4)
    }

    @test()
    protected async selectingEventInvokesOnSelectOnVc() {
        this.setSpyCalendarEvent()
        const event = this.addEvent()

        const calendarEventVc = this.getEventVc(event.id)

        await this.vc.selectEvent(event.id)
        assert.isTrue(calendarEventVc.wasSelected)
    }

    @test()
    protected async shouldCallDeselectOnTheDeselectedEvent() {
        this.setSpyCalendarEvent()

        const event1 = this.addEvent()
        const event2 = this.addEvent()

        const vc1 = this.getEventVc(event1.id)

        await this.vc.selectEvent(event1.id)
        assert.isFalse(vc1.wasDeselected)

        await this.vc.selectEvent(event2.id)
        assert.isTrue(vc1.wasDeselected)
    }

    @test()
    protected async getSelectedEventsWontCrashIfSelectedEventIdIsBad() {
        this.addEvent()
        this.vc.clearSelectedEventId()
        this.vc.getSelectedEvent()
    }

    @test()
    protected async canSetEnabledDays() {
        const expected = [
            {
                day: 1,
                month: 0,
                year: 2020,
            },
        ]

        this.vc = this.Vc({
            enabledDays: expected,
        })

        this.assertRenderedEnabledDaysEquals(expected)
    }

    @test()
    protected async settingEnabledDaysTriggersRenderAndSetsToViewModel() {
        let expected = [
            {
                day: 1,
                month: 0,
                year: 2020,
            },
        ]

        this.vc.setEnabledDays(expected)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.assertRenderedEnabledDaysEquals(expected)

        expected = [
            {
                day: 2,
                month: 5,
                year: 2022,
            },
            {
                day: 3,
                month: 2,
                year: 2030,
            },
        ]

        this.vc.setEnabledDays(expected)
        this.assertRenderedEnabledDaysEquals(expected)
    }

    private assertRenderedEnabledDaysEquals(expected: CalendarSelectedDate[]) {
        const { enabledDays: actual } = this.render(this.vc)
        assert.isEqualDeep(actual, expected)
        assert.isEqualDeep(this.vc.getEnabledDays(), expected)
    }

    private getEventVc(id: string) {
        return this.vc.getEventVc(id) as SpyCalendarEvent
    }

    private setSpyCalendarEvent() {
        this.getFactory().setController('calendar-event', SpyCalendarEvent)
    }

    private add3Events(): [any, any, any] {
        return [this.addEvent(), this.addEvent(), this.addEvent()]
    }

    private assertEventsEqual(expected: CalendarEvent[]) {
        assert.isEqualDeep(this.events, expected)
    }

    private async removeEvents(events: CalendarEvent[]) {
        await this.vc.removeEvents(events.map((e) => e.id))
    }

    private addEventWithType(type: string) {
        return this.addEventAndGetVc({
            eventTypeSlug: type,
        })
    }

    private assertSetsVcForEventType(type: string, vcId: string, Class: any) {
        this.vc.setControllerForEventType(type, vcId)
        this.assertVcForEventType(type, Class)
    }

    private assertVcForEventType(type: string, Class: any) {
        const { vc } = this.addEventAndGetVc({ eventTypeSlug: type })
        assert.isTrue(vc instanceof Class)
    }

    private addEventAndGetVc(event?: Partial<CalendarEvent>) {
        const e = this.addEvent(event)

        const vc = this.vc.getEventVc(e.id)

        return { vc, event: e }
    }

    private addEvent(
        event?: Partial<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent>
    ) {
        const e = { ...calendarSeeder.generateEventValues(), ...event }

        this.vc.addEvent(e)
        return e
    }

    private addPerson() {
        const person = calendarSeeder.generatePersonValues()
        this.vc.addPerson(person)
        return person
    }

    private assertRendersTotalEvents(expected: number) {
        const model = this.render(this.vc)
        assert.isLength(model.events ?? [], expected)
    }

    private populateCalendar(total = 3) {
        const events = calendarSeeder.generateEventsValues(total)
        this.vc.mixinEvents(events)
        return events
    }

    private async addOneEventAndSelectIt() {
        const event = calendarSeeder.generateEventValues()
        this.vc.addEvent(event)
        await this.vc.selectEvent(event.id)
        return event
    }
    private get events() {
        return this.vc.getEvents()
    }

    private Vc(
        options?: Partial<CalendarViewControllerOptions>
    ): SpyCalendarVc {
        return this.Controller('spyCalendar' as any, {
            people: [this.firstPerson],
            ...options,
        }) as SpyCalendarVc
    }

    private assertChangesArMade(
        event: CalendarEvent,
        changes: Partial<CalendarEvent>
    ) {
        this.vc.updateEvent(event.id, changes)

        const expected = {
            ...event,
            ...changes,
        }

        assert.isEqualDeep(this.vc.getEvent(event.id), expected)
    }

    private async addEventSelectAndDeselectIt() {
        await this.addOneEventAndSelectIt()
        await this.vc.deselectEvent()
    }

    private assertTriggerRenderCount(expected: number) {
        vcAssert.assertTriggerRenderCount(this.vc, expected)
    }

    private readonly firstPerson = {
        id: `${new Date().getTime()}`,
        casualName: 'Tay',
    }
}

function getDate() {
    return new Date().getTime()
}

class SpyCalendarEvent extends AbstractCalendarEventViewController {
    public wasSelected = false
    public wasDeselected = false
    public select(): void {
        this.wasSelected = true
        return super.select()
    }

    public deselect(): void {
        this.wasDeselected = true
        return super.deselect()
    }
}

type CalendarTime =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime

type CalendarEvent =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent
