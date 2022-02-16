import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import calendarSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendar.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import vcAssert from '../../../tests/utilities/vcAssert'
import CalendarViewController from '../../../viewControllers/Calendar.vc'
import CalendarEventViewController from '../../../viewControllers/CalendarEvent.vc'
import CardViewController from '../../../viewControllers/Card.vc'
import ListViewController from '../../../viewControllers/list/List.vc'

type CalendarTime =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime

type CalendarEvent =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

export default class ControllingACalendarTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	protected static vc: CalendarViewController

	private static readonly firstPerson = {
		id: `${new Date().getTime()}`,
		casualName: 'Tay',
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('calendar', {
			people: [this.firstPerson],
		})
	}

	@test()
	protected static doesNotThroughIfMissingPeopleInMonthView() {
		this.Controller('calendar', { view: 'month' })
	}

	@test()
	protected static rendersValidView() {
		validateSchemaValues(calendarSchema, this.render(this.vc))
	}

	@test()
	protected static passesThroughViewValues() {
		const model: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar = {
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
	protected static cantSetMinTimeForAfterMaxTime(
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
	protected static canSetMinTime(time: CalendarTime) {
		this.vc.setMinTime(time)
		vcAssert.assertTriggerRenderCount(this.vc, 1)

		assert.isEqualDeep(this.render(this.vc).minTime, time)
	}

	@test('can set max time 1', { hour: 15, minute: 30 })
	@test('can set max time 2', { hour: 17, minute: 0 })
	protected static canSetMaxTime(time: CalendarTime) {
		this.vc.setMaxTime(time)
		vcAssert.assertTriggerRenderCount(this.vc, 1)

		assert.isEqualDeep(this.render(this.vc).maxTime, time)
	}

	@test("can't set bad timezone 1", -12 * 60 * 60 * 1001)
	@test("can't set bad timezone 2", 14 * 60 * 60 * 1001)
	protected static mustSetValidTimezoneOffset(offset: number) {
		const err = assert.doesThrow(() => this.vc.setTimezoneOffsetMs(offset))
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['timezoneOffsetMs'],
		})
	}

	@test('can set timezoneOffset 1', -12 * 60 * 60 * 1000)
	@test('can set timezoneOffset 2', 14 * 60 * 60 * 1000)
	protected static canSetTimezoneOffset(time: number) {
		this.vc.setTimezoneOffsetMs(time)
		vcAssert.assertTriggerRenderCount(this.vc, 1)
		assert.isEqualDeep(this.render(this.vc).timezoneOffsetMs, time)
	}

	@test()
	protected static defaultsToDayView() {
		assert.isEqual(this.vc.getView(), 'day')
		assert.isEqual(this.render(this.vc).view, 'day')
	}

	@test()
	protected static canSetStartDay() {
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
	protected static canSetView() {
		this.vc.setView('month')
		assert.isEqual(this.vc.getView(), 'month')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
		this.vc.setView('day')
		assert.isEqual(this.vc.getView(), 'day')
	}

	@test()
	protected static canAddEvent() {
		this.vc.addEvent(calendarSeeder.generateEventValues())
	}

	@test()
	protected static cantAddEventWithSameIdTwice() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		const err = assert.doesThrow(() => this.vc.addEvent(event))
		errorAssert.assertError(err, 'DUPLICATE_EVENT_ID', {
			id: event.id,
		})
	}

	@test()
	protected static addingEventAddsToModel() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)

		const model = this.render(this.vc)
		delete model.events[0].controller
		assert.isEqualDeep(model.events, [event])
	}

	@test()
	protected static canAddAFewEvents() {
		this.vc.addEvent(calendarSeeder.generateEventValues())
		this.vc.addEvent(calendarSeeder.generateEventValues())
		this.vc.addEvent(calendarSeeder.generateEventValues())

		const expected = 3

		this.assertRendersTotalEvents(expected)
	}

	@test()
	protected static addingEventTriggersRender() {
		this.vc.addEvent(calendarSeeder.generateEventValues())
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static cantRemoveEventThatDoesNotExist() {
		const err = assert.doesThrow(() => this.vc.removeEvent('aoeu'))
		errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
			id: 'aoeu',
		})
	}

	@test()
	protected static canRemoveEventWithGoodId() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.removeEvent(event.id)
	}

	@test()
	protected static removeEventRemovesItFromTheModel() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.removeEvent(event.id)
		this.assertRendersTotalEvents(0)
	}

	@test()
	protected static onlyRemovesExpectedEvent() {
		const event1 = calendarSeeder.generateEventValues()
		this.vc.addEvent(event1)
		const event2 = calendarSeeder.generateEventValues()
		this.vc.addEvent(event2)

		this.vc.removeEvent(event1.id)

		const model = this.render(this.vc)
		delete model.events[0].controller
		assert.isEqualDeep(model.events, [event2])
	}

	@test()
	protected static removingAnEventTriggersRender() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.removeEvent(event.id)
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	@test()
	protected static canMixinEvents() {
		this.vc.mixinEvents([calendarSeeder.generateEventValues()])
	}

	@test()
	protected static cantMixinEventsWithSameIdAtOnce() {
		const event = calendarSeeder.generateEventValues()
		const err = assert.doesThrow(() => this.vc.mixinEvents([event, event]))
		errorAssert.assertError(err, 'DUPLICATE_EVENT_ID', {
			id: event.id,
		})
	}

	@test()
	protected static mixingInDupsNotNextToEachOtherStillThrows() {
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
	protected static canMixinEventsToEmptyCalendar() {
		this.vc.mixinEvents([calendarSeeder.generateEventValues()])
		this.assertRendersTotalEvents(1)
	}

	@test()
	protected static mixingInDoesNotClearPreviousEvents() {
		this.vc.addEvent(calendarSeeder.generateEventValues())
		this.vc.mixinEvents([calendarSeeder.generateEventValues()])
		this.assertRendersTotalEvents(2)
	}

	@test()
	protected static mixingInReplacesEventsWithMatchingId() {
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
	protected static mixingInReplacesEventsWithMatchingIdInBusyCalendar() {
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
	protected static mixinTriggersRender() {
		this.populateCalendar()
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static cantSelectEventThatDoesNotExist() {
		this.populateCalendar()
		const err = assert.doesThrow(() => this.vc.selectEvent('1234'))

		errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
			id: '1234',
		})
	}

	@test()
	protected static canSelectEvent() {
		const event = this.addOneEventAndSelectIt()
		assert.isEqualDeep(this.vc.getSelectedEvent(), {
			...event,
			isSelected: true,
		})
	}

	@test()
	protected static async selectingEventTriggersCallback() {
		let passedEvent: any

		this.vc = this.Controller('calendar', {
			onSelectEvent: (event) => {
				passedEvent = event
			},
		})

		const [event] = this.populateCalendar(1)

		this.vc.selectEvent(event.id)

		assert.isTruthy(passedEvent)
		assert.isEqualDeep(passedEvent, event)
	}

	@test()
	protected static updatingASelectedEventReflectsChanges() {
		const event = this.addOneEventAndSelectIt()
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
	protected static canSelectFromBusyCalendar() {
		this.populateCalendar()
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.selectEvent(event.id)
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
	protected static selectingEventTriggersRender() {
		this.addOneEventAndSelectIt()
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	@test()
	protected static canDeselectEvent() {
		this.addEventSelectAndDeselectIt()
		assert.isUndefined(this.vc.getSelectedEvent())
	}

	@test()
	protected static async deselectingTriggersCallback() {
		let passedEvent: any
		this.vc = this.Controller('calendar', {
			onDeselectEvent: (event) => {
				passedEvent = event
			},
		})

		const [event] = this.populateCalendar(1)

		this.vc.selectEvent(event.id)
		this.vc.deselectEvent()

		assert.isTruthy(passedEvent)
		assert.isEqualDeep(passedEvent, { ...event, isSelected: true })
	}

	@test()
	protected static async deselectingEventTriggersRender() {
		this.addEventSelectAndDeselectIt()
		vcAssert.assertTriggerRenderCount(this.vc, 3)
	}

	@test()
	protected static deselectingWithNoSelectedEventHasNoEffect() {
		let wasHit = false
		this.vc = this.Controller('calendar', {
			onDeselectEvent: () => {
				wasHit = true
			},
		})
		this.vc.deselectEvent()
		assert.isFalse(wasHit)
		vcAssert.assertTriggerRenderCount(this.vc, 0)
	}

	@test()
	protected static removingSelectedEventDeselectsIt() {
		let wasHit = false
		this.vc = this.Controller('calendar', {
			onDeselectEvent: () => {
				wasHit = true
			},
		})
		const event = this.addOneEventAndSelectIt()
		this.vc.removeEvent(event.id)
		assert.isUndefined(this.vc.getSelectedEvent())

		assert.isTrue(wasHit)
	}

	@test()
	protected static removingEventOtherThanSelectedDoesNotDeselect() {
		const event = this.addOneEventAndSelectIt()
		const [event2] = this.populateCalendar(1)

		this.vc.removeEvent(event2.id)
		assert.isEqualDeep(this.vc.getSelectedEvent(), {
			...event,
			isSelected: true,
		})
	}

	@test()
	protected static getsNoEventsToStart() {
		assert.isEqualDeep(this.vc.getEvents(), [])
	}

	@test()
	protected static returnsEvents() {
		this.populateCalendar()
		assert.isLength(this.vc.getEvents(), 3)
	}

	@test()
	protected static canSetStartDate() {
		this.vc.setStartDate(new Date().getTime())
	}

	@test()
	protected static canGetStartDate() {
		const date = getDate()
		this.vc.setStartDate(date)
		assert.isEqual(this.vc.getStartDate(), date)
	}

	@test()
	protected static settingDateTriggersOnDateChange() {
		let wasHit = false
		let passedDate
		this.vc = this.Controller('calendar', {
			onChangeStartDate: (date) => {
				passedDate = date
				wasHit = true
			},
		})

		const date = getDate()
		this.vc.setStartDate(date)

		assert.isTrue(wasHit)
		assert.isEqual(passedDate, date)
	}

	@test()
	protected static rendersStartDate() {
		const date = getDate()
		this.vc.setStartDate(date)
		assert.isEqual(this.render(this.vc).startDate, date)
	}

	@test()
	protected static settingStartDateTriggersRender() {
		this.vc.setStartDate(getDate())
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static settingEventsForRangeThrowsWithEndBeforeStart() {
		const err = assert.doesThrow(() => this.vc.replaceEventsInRange([], 10, 0))
		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['endDate'],
		})
	}

	@test()
	protected static settingEventsForTodayClearsExistingEvents() {
		this.populateCalendar()
		this.vc.replaceEventsInRange(
			[],
			dateUtil.getStartOfDay(),
			dateUtil.getEndOfDay()
		)

		this.assertRendersTotalEvents(0)
	}

	@test()
	protected static setEventsForRangeClearsOutEventsOutsideOfRange() {
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
	protected static replacedEventsAreSet() {
		this.vc.replaceEventsInRange(
			[calendarSeeder.generateEventValues()],
			dateUtil.getStartOfDay(),
			dateUtil.getEndOfDay()
		)

		this.assertRendersTotalEvents(1)
	}

	@test()
	protected static replacingEventsTriggersRender() {
		this.vc.replaceEventsInRange(
			[calendarSeeder.generateEventValues()],
			dateUtil.getStartOfDay(),
			dateUtil.getEndOfDay()
		)

		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test('throws with getting bad event 1', '123')
	@test('throws with getting bad event 2', '567')
	protected static throwsIfGettingBadEvent(id: string) {
		this.vc.addEvent(calendarSeeder.generateEventValues())
		const err = assert.doesThrow(() => this.vc.getEvent(id))
		errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
			id,
		})
	}

	@test()
	protected static canGetFirstEvent() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		const match = this.vc.getEvent(event.id)
		assert.isEqualDeep(match, event)
	}

	@test()
	protected static canGetSecondEvent() {
		const events = calendarSeeder.generateEventsValues(5)

		this.vc.mixinEvents(events)

		const event = events[2]
		const match = this.vc.getEvent(event.id)
		assert.isEqualDeep(match, event)
	}

	@test()
	protected static gettingEventReturnsCopy() {
		const event = calendarSeeder.generateEventValues()

		this.vc.addEvent(event)

		const match = this.vc.getEvent(event.id)

		assert.isNotEqual(event, match)
	}

	@test('throws with updating bad event 1', '123')
	@test('throws with updating bad event 2', '567')
	protected static throwsIfUpdatingEventTHatDoesNotExist(id: string) {
		this.vc.addEvent(calendarSeeder.generateEventValues())

		const err = assert.doesThrow(() => this.vc.updateEvent(id, {}))
		errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
			id,
		})
	}

	@test('can update start time for first event', 0)
	@test('can update start time for third event', 2)
	@test('can update start time for fifth event', 4)
	protected static updatesStartTime(idx: number) {
		const events = calendarSeeder.generateEventsValues(10)
		const event = events[idx]

		this.vc.mixinEvents(events)

		this.assertChangesArMade(event, { startDateTimeMs: 100 })
	}

	@test()
	protected static canUpdateCalendarId() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)

		this.assertChangesArMade(event, { calendarId: '23423' })
	}

	@test()
	protected static updatingReplacesEvent() {
		const [, event] = this.populateCalendar(2)
		this.vc.updateEvent(event.id, {})

		const { events } = this.render(this.vc)
		const matches = events.filter((e) => e.id === event.id)
		assert.isLength(matches, 1)
	}

	@test()
	protected static updatingEventDoesNotTriggersRender() {
		const [event] = this.populateCalendar(1)
		this.vc.updateEvent(event.id, {})
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static needAPersonToAddPerson() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.addPerson())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['person'],
		})
	}

	@test()
	protected static canAddPerson() {
		const person = this.addPerson()
		assert.isEqualDeep(this.vc.getPeople(), [this.firstPerson, person])
	}

	@test()
	protected static canRenderEvenWhenStartingWithNoPeople() {
		this.vc = this.Controller('calendar', {})
		const person = this.addPerson()
		assert.isEqualDeep(this.vc.getPeople(), [person])
	}

	@test()
	protected static async addingPersonTriggersRender() {
		this.addPerson()
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test('cant remove person no there 1', 'aoeu')
	@test('cant remove person no there 2', 'sth')
	protected static cantRemovePersonWhoIsNotThere(personId: string) {
		const err = assert.doesThrow(() => this.vc.removePerson(personId))
		errorAssert.assertError(err, 'PERSON_NOT_FOUND', {
			personId,
		})
	}

	@test()
	protected static canRemoveRemovePeople() {
		this.vc.removePerson(this.firstPerson.id)
		assert.isEqualDeep(this.vc.getPeople(), [])

		const person = this.addPerson()
		const person2 = this.addPerson()

		this.vc.removePerson(person.id)
		assert.isEqualDeep(this.vc.getPeople(), [person2])
	}

	@test()
	protected static canRemoveLaterPerson() {
		const p1 = this.addPerson()
		const p2 = this.addPerson()
		const person = this.addPerson()

		this.vc.removePerson(person.id)

		assert.isEqualDeep(this.vc.getPeople(), [this.firstPerson, p1, p2])
	}

	@test()
	protected static async removingPersonTriggersRender() {
		const p1 = this.addPerson()
		this.vc.removePerson(p1.id)
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	@test()
	protected static canSetPeople() {
		const people = calendarSeeder.generatePeopleValues(1)
		this.vc.setPeople(people)
		assert.isEqualDeep(this.vc.getPeople(), people)
		assert.isNotEqual(this.vc.getPeople(), people)
	}

	@test()
	protected static throwsWhenGettingBadEventVc() {
		const id = `${new Date().getTime() * Math.random()}`
		const err = assert.doesThrow(() => this.vc.getEventVc(id))

		errorAssert.assertError(err, 'EVENT_NOT_FOUND', {
			id,
		})
	}

	@test()
	protected static canGetEventVc() {
		const { vc } = this.addEventAndGetVc()
		assert.isTrue(vc instanceof CalendarEventViewController)
	}

	@test()
	protected static eventVcRendersExpectedEvent() {
		const { vc, event } = this.addEventAndGetVc()
		const model = this.render(vc)
		assert.doesNotInclude(event, model)
	}

	@test()
	protected static canSetViewControllersByEventType() {
		this.assertSetsVcForEventType('test', 'list', ListViewController)

		this.Factory().setController('card', CardViewController)
		this.assertSetsVcForEventType('waka', 'card', CardViewController)

		this.assertVcForEventType('test', ListViewController)
	}

	@test()
	protected static settingViewControllerSetsOnEventsAlreadySet() {
		const { event } = this.addEventWithType('test')
		this.vc.setControllerForEventType('test', 'list')

		const match = this.vc.getEventVc(event.id)
		assert.isTrue(match instanceof ListViewController)
	}

	@test()
	protected static settingViewControllerByTypeTriggersRender() {
		this.vc.setControllerForEventType('test', 'list')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async settingViewControllerDoesNotClearPastVcs() {
		const { vc, event } = this.addEventAndGetVc()
		this.vc.setControllerForEventType('test', 'list')

		const match = this.vc.getEventVc(event.id)
		assert.isEqual(vc, match)
	}

	@test()
	protected static canSetDefaultVcForEvents() {
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
	protected static defaultEventVcFallsBackForEventsWithTypeSlugs() {
		this.vc.setDefaultControllerForEvents('list')
		const event = calendarSeeder.generateEventValues()
		event.eventTypeSlug = 'waka'
		this.vc.addEvent(event)

		const vc = this.vc.getEventVc(event.id)

		assert.isTrue(vc instanceof ListViewController)
	}

	@test()
	protected static renderingEventRendersController() {
		const { vc } = this.addEventAndGetVc()
		const model = this.render(vc)
		assert.isEqual(model.controller, vc)
	}

	@test()
	protected static calendarRendersEventControllers() {
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
	protected static reUsesEventVc() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)

		assert.isEqual(this.vc.getEventVc(event.id), this.vc.getEventVc(event.id))
	}

	@test()
	protected static mixingInManyEventsDoesNotDup() {
		const events = calendarSeeder.generateEventsValues(5)
		this.vc.mixinEvents(events)
		this.vc.mixinEvents(events)

		assert.isLength(this.render(this.vc).events, 5)
	}

	@test()
	protected static canControlAnimation() {
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
	protected static enablingDisablingAnimationsTriggersRender() {
		this.vc.enableAnimation()
		vcAssert.assertTriggerRenderCount(this.vc, 0)
		this.vc.disableAnimations()
		this.vc.disableAnimations()
		vcAssert.assertTriggerRenderCount(this.vc, 1)
		this.vc.enableAnimation()
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	@test('updating selected event updates start date 1', 100)
	@test('updating selected event updates start date 2', 200)
	protected static updatingSelectedEventChangesStartDateOfCalendar(
		startDate: number
	) {
		const event = this.addOneEventAndSelectIt()

		this.vc.updateEvent(event.id, { startDateTimeMs: startDate })
		assert.isEqual(this.vc.getStartDate(), startDate)
	}

	@test()
	protected static updatingEventOtherThanSelectedDoesNotChangeStartDate() {
		const original = this.vc.getStartDate()
		const [event] = this.populateCalendar(1)
		this.vc.updateEvent(event.id, { startDateTimeMs: 100 })
		assert.isEqual(original, this.vc.getStartDate())
	}

	@test()
	protected static doesNotClearStartDateIfSelectedUpdated() {
		const event = this.addOneEventAndSelectIt()
		const original = 100
		this.vc.setStartDate(original)

		this.vc.updateEvent(event.id, {
			groupId: '12334',
		})

		assert.isEqual(original, this.vc.getStartDate())
	}

	@test()
	protected static canClearAllEvents() {
		const events = this.populateCalendar(10)

		let passedIds: string[] = []

		this.vc.removeEvent = (id) => {
			passedIds.push(id)
		}

		this.vc.clearEvents()

		assert.isEqualDeep(
			passedIds,
			events.map((e) => e.id)
		)
	}

	@test()
	protected static async clearingEventsRendersOnce() {
		this.populateCalendar(10)
		this.vc.clearEvents()
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	private static addEventWithType(type: string) {
		return this.addEventAndGetVc({
			eventTypeSlug: type,
		})
	}

	private static assertSetsVcForEventType(
		type: string,
		vcId: string,
		Class: any
	) {
		this.vc.setControllerForEventType(type, vcId)
		this.assertVcForEventType(type, Class)
	}

	private static assertVcForEventType(type: string, Class: any) {
		const { vc } = this.addEventAndGetVc({ eventTypeSlug: type })
		assert.isTrue(vc instanceof Class)
	}

	private static addEventAndGetVc(event?: Partial<CalendarEvent>) {
		const e = { ...calendarSeeder.generateEventValues(), ...event }

		this.vc.addEvent(e)

		const vc = this.vc.getEventVc(e.id)

		return { vc, event: e }
	}

	private static addPerson() {
		const person = calendarSeeder.generatePersonValues()
		this.vc.addPerson(person)
		return person
	}

	private static assertRendersTotalEvents(expected: number) {
		const model = this.render(this.vc)
		assert.isLength(model.events ?? [], expected)
	}

	private static populateCalendar(total = 3) {
		const events = calendarSeeder.generateEventsValues(total)
		this.vc.mixinEvents(events)
		return events
	}

	private static addOneEventAndSelectIt() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.selectEvent(event.id)
		return event
	}

	private static assertChangesArMade(
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

	private static addEventSelectAndDeselectIt() {
		this.addOneEventAndSelectIt()
		this.vc.deselectEvent()
	}
}

function getDate() {
	return new Date().getTime()
}
