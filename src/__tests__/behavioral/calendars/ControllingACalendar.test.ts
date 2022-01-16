import { dateUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import calendarSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendar.schema'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import vcAssert from '../../../tests/utilities/vcAssert'
import CalendarViewController from '../../../viewControllers/Calendar.vc'

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

		assert.isEqualDeep(actual, model)
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

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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
		errorAssertUtil.assertError(err, 'DUPLICATE_EVENT_ID', {
			id: event.id,
		})
	}

	@test()
	protected static addingEventAddsToModel() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)

		const model = this.render(this.vc)
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
		errorAssertUtil.assertError(err, 'EVENT_NOT_FOUND', {
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
		errorAssertUtil.assertError(err, 'DUPLICATE_EVENT_ID', {
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
		errorAssertUtil.assertError(err, 'DUPLICATE_EVENT_ID', {
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

		errorAssertUtil.assertError(err, 'EVENT_NOT_FOUND', {
			id: '1234',
		})
	}

	@test()
	protected static canSelectEvent() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.selectEvent(event.id)
		assert.isEqualDeep(this.vc.getSelectedEvent(), event)
	}

	@test()
	protected static canSelectFromBusyCalendar() {
		this.populateCalendar()
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.selectEvent(event.id)
		assert.isEqualDeep(this.vc.getSelectedEvent(), event)
	}

	@test()
	protected static selectingEventTriggersRender() {
		const event = calendarSeeder.generateEventValues()
		this.vc.addEvent(event)
		this.vc.selectEvent(event.id)
		vcAssert.assertTriggerRenderCount(this.vc, 2)
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
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
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
		errorAssertUtil.assertError(err, 'EVENT_NOT_FOUND', {
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
		errorAssertUtil.assertError(err, 'EVENT_NOT_FOUND', {
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
	protected static updatingEventTriggersRender() {
		const [event] = this.populateCalendar(1)
		this.vc.updateEvent(event.id, {})
		vcAssert.assertTriggerRenderCount(this.vc, 2)
	}

	@test()
	protected static needAPersonToAddPerson() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.vc.addPerson())
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
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
		errorAssertUtil.assertError(err, 'PERSON_NOT_FOUND', {
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
	protected static canSetPeople() {
		const people = calendarSeeder.generatePeopleValues(1)
		this.vc.setPeople(people)
		assert.isEqualDeep(this.vc.getPeople(), people)
		assert.isNotEqual(this.vc.getPeople(), people)
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
}

function getDate() {
	return new Date().getTime()
}
