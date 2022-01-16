import { assertOptions, SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import SpruceError from '../errors/SpruceError'
import { ViewControllerOptions } from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

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
	protected model: CalendarOptions & { events: Event[] }

	public constructor(options: CalendarOptions & ViewControllerOptions) {
		super(options)

		const view = options.view ?? 'day'

		this.assertValidMinAndMaxTime(options)

		this.model = {
			events: [],
			...removeUniversalViewOptions(options),
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

		this.model.events.push(event)
		this.triggerRender()
	}

	private doesEventExist(eventId: string) {
		const match = this.model.events.find((e) => e.id === eventId)

		return !!match
	}

	public removeEvent(id: string) {
		this.getEvent(id)

		this.model.events = this.model.events.filter((e) => e.id !== id)
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
	}

	public addPerson(person: Person) {
		assertOptions({ person }, ['person'])

		this.model.people?.push(person)

		this.triggerRender()
	}

	public updateEvent(id: string, updates: Partial<Event>) {
		let match = this.getEvent(id)

		match = {
			...match,
			...updates,
		}

		const idx = this.model.events.findIndex((e) => e.id === id)

		this.model.events.splice(idx, 1, match)

		this.triggerRender()

		return match
	}

	public getEvent(id: string) {
		const events = this.getEvents()

		const match = events.find((e) => e.id === id)

		if (!match) {
			throw new SpruceError({ code: 'EVENT_NOT_FOUND', id })
		}

		return { ...match }
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

		let existing: Event[] = []

		for (const event of events) {
			existing = this.model.events.filter((e) => e.id !== event.id)
		}

		this.model.events = [...existing, ...events]

		this.triggerRender()
	}

	public getEvents() {
		return this.model.events
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

		const filtered = this.model.events.filter(
			(e) => e.startDateTimeMs < startDate || e.startDateTimeMs >= endDate
		)

		this.model.events = [...filtered, ...events]
		this.triggerRender()
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar & {
		events: Event[]
	} {
		return {
			...this.model,
			controller: this,
		}
	}
}
