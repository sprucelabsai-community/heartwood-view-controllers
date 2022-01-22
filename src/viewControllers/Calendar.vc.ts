import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import {
	ViewControllerOptions,
	CalendarEventViewController,
} from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'
import CalendarEventViewControllerImpl from './CalendarEvent.vc'

type CalendarOptions = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar,
	'controller' | 'events'
> & {
	events?: Event[]
}
type Time = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime
type Event = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent
type Person = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson

export type CalendarViewControllerOptions = CalendarOptions
export type CalendarView = NonNullable<CalendarOptions['view']>

export default class CalendarViewController extends AbstractViewController<CalendarOptions> {
	protected model: Omit<CalendarOptions, 'events'>
	private vcIdsByEventType: Record<string, string> = {}
	private vcsById: Record<string, CalendarEventViewController> = {}
	private eventsById: Record<string, Event> = {}

	public constructor(options: CalendarOptions & ViewControllerOptions) {
		super(options)

		const view = options.view ?? 'day'

		this.assertValidMinAndMaxTime(options)

		this.mixinControllers({ calendarEvent: CalendarEventViewControllerImpl })

		const { events = [], ...rest } = removeUniversalViewOptions(options)

		for (const event of events) {
			this.eventsById[event.id] = event
		}

		this.model = {
			...rest,
			view,
		}
	}

	public getPeople(): Person[] {
		return this.model.people ?? []
	}

	public setPeople(people: Person[]) {
		this.model.people = [...people]
	}

	private assertValidMinAndMaxTime(
		options: Omit<
			SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar,
			'controller' | 'events'
		> & {
			events?:
				| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent[]
				| undefined
		} & ViewControllerOptions
	) {
		const minHour = options.minTime?.hour ?? 0
		const minMinute = options.minTime?.minute ?? 0

		const maxHour = options.maxTime?.hour ?? 0
		const maxMinute = options.maxTime?.minute ?? 0

		if (minHour + minMinute > maxHour + maxMinute) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['minTime', 'maxTime'],
				friendlyMessages: [
					'minTime time must be later than maxTime',
					'maxTime must be before minTime.',
				],
			})
		}
	}

	public setMinTime(time: Time) {
		this.model.minTime = time
		this.triggerRender()
	}

	public setMaxTime(time: Time) {
		this.model.maxTime = time
		this.triggerRender()
	}

	public setTimezoneOffsetMs(offsetMs: number): any {
		if (offsetMs < -12 * 60 * 60 * 1000 || offsetMs > 14 * 60 * 60 * 1000) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['timezoneOffsetMs'],
				friendlyMessage: `timezoneOffsetMs must be in milliseconds from 0 to 86,400,000.`,
			})
		}

		this.model.timezoneOffsetMs = offsetMs
		this.triggerRender()
	}

	public selectEvent(id: string) {
		const match = this.getEvent(id)
		this.model.selectedEvent = match
		this.triggerRender()
	}

	public getSelectedEvent() {
		return this.model.selectedEvent
	}

	public getView() {
		return this.model.view
	}

	public setView(view: CalendarView) {
		this.model.view = view
		this.triggerRender()
	}

	public addEvent(event: Event) {
		const eventId = event.id
		if (this.doesEventExist(eventId)) {
			throw new SpruceError({
				code: 'DUPLICATE_EVENT_ID',
				id: eventId,
			})
		}

		this.eventsById[event.id] = event
		this.triggerRender()
	}

	private doesEventExist(eventId: string) {
		return !!this.eventsById[eventId]
	}

	public removeEvent(id: string) {
		this.getEvent(id)

		delete this.eventsById[id]
		delete this.vcsById[id]

		this.triggerRender()
	}

	public removePerson(id: string) {
		const idx = this.model.people?.findIndex((p) => p.id === id) ?? -1

		if (idx === -1) {
			throw new SpruceError({
				code: 'PERSON_NOT_FOUND',
				personId: id,
			})
		}

		this.model.people?.splice(idx, 1)

		this.triggerRender()
	}

	public addPerson(person: Person) {
		assertOptions({ person }, ['person'])

		if (!this.model.people) {
			this.model.people = []
		}

		this.model.people?.push(person)

		this.triggerRender()
	}

	public updateEvent(id: string, updates: Partial<Event>) {
		let match = this.getEvent(id)

		match = {
			...match,
			...updates,
		}

		this.eventsById[id] = match
		this.vcsById[id]?.triggerRender()

		return match
	}

	public getEvent(id: string) {
		const match = this.findEvent(id)

		if (!match) {
			throw new SpruceError({ code: 'EVENT_NOT_FOUND', id })
		}

		return { ...match }
	}

	private findEvent(id: string) {
		return this.eventsById[id]
	}

	public setControllerForEventType(type: string, vcId: string) {
		this.vcIdsByEventType[type] = vcId
	}

	public getEventVc(eventId: string): CalendarEventViewController {
		if (!this.vcsById[eventId]) {
			const event = this.getEvent(eventId)
			const vc = this.Controller(
				(this.vcIdsByEventType[event.eventTypeSlug ?? '***missing***'] ??
					'calendarEvent') as any,
				{
					getEvent: () => this.getEvent(eventId),
					setEvent: (event: Event) => this.updateEvent(eventId, event),
					hasEvent: () => this.hasEvent(eventId),
				}
			)

			this.vcsById[eventId] = vc
		}

		return this.vcsById[eventId]
	}

	public hasEvent(id: string) {
		return !!this.findEvent(id)
	}

	public mixinEvents(events: Event[]) {
		for (const event of events) {
			const count = events.filter((e) => e.id === event.id).length
			if (count > 1) {
				throw new SpruceError({
					code: 'DUPLICATE_EVENT_ID',
					id: event.id,
					friendlyMessage: `You are trying to mixin events that contain a duplicate id: '${event.id}'`,
				})
			}
		}

		for (const event of events) {
			this.eventsById[event.id] = event
		}

		this.triggerRender()
	}

	public getEvents() {
		return Object.values(this.eventsById)
	}

	public setStartDate(date: number) {
		this.model.startDate = date
		this.triggerRender()
	}

	public getStartDate() {
		return this.model.startDate
	}

	public replaceEventsInRange(
		events: Event[],
		startDate: number,
		endDate: number
	) {
		if (endDate < startDate) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['endDate'],
				friendlyMessage: 'Your end date has to be after the start date.',
			})
		}

		for (const event of this.getEvents()) {
			if (
				event.startDateTimeMs >= startDate &&
				event.startDateTimeMs < endDate
			) {
				delete this.eventsById[event.id]
			}
		}

		for (const event of events) {
			this.eventsById[event.id] = event
		}
		this.triggerRender()
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar & {
		events: Event[]
	} {
		return {
			...this.model,
			events: this.getEvents().map((e) => ({
				...e,
				controller: this.getEventVc(e.id),
			})),
			controller: this,
		}
	}
}
