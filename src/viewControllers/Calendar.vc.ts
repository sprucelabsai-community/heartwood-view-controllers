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
	events?: ConstructorEvent[]
}
type Time = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime
type Event = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent
type ConstructorEvent = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent,
	'isSelected'
>
type Person = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson
type SelectedDate =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDate

export type CalendarViewControllerOptions = CalendarOptions
export type CalendarView = NonNullable<CalendarOptions['view']>

export default class CalendarViewController extends AbstractViewController<CalendarOptions> {
	protected model: Omit<CalendarOptions, 'events'>
	private vcIdsByEventType: Record<string, string> = {}
	private vcsById: Record<string, CalendarEventViewController> = {}
	private eventsById: Record<string, Event> = {}
	private defaultEventVcId?: string
	private selectedEventId?: string

	public constructor(options: CalendarOptions & ViewControllerOptions) {
		super(options)

		const view = options.view ?? 'day'

		this.assertValidMinAndMaxTime(options)

		this.mixinControllers({ calendarEvent: CalendarEventViewControllerImpl })

		let {
			events = [],
			selectedDates,
			startDate,
			...rest
		} = removeUniversalViewOptions(options)

		for (const event of events) {
			this.eventsById[event.id] = event
		}

		if (selectedDates?.[0] && !startDate) {
			startDate = this.dates.getStartOfMonth(this.dates.date(selectedDates[0]))
		}

		this.model = {
			shouldEnableAnimations: true,
			selectedDates,
			startDate,
			...rest,
			view,
		}
	}

	public getPeople(): Person[] {
		return this.model.people ?? []
	}

	public setPeople(people: Person[]) {
		this.model.people = [...people]
		this.triggerRender()
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

	public getIsAnimationEnabled(): boolean {
		return this.model.shouldEnableAnimations ?? true
	}

	public setShifts(
		shifts: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarShift[]
	) {
		this.model.shifts = [...shifts]
		this.triggerRender()
	}

	public enableAnimation() {
		const original = this.model.shouldEnableAnimations
		this.model.shouldEnableAnimations = true
		if (!original) {
			this.triggerRender()
		}
	}

	public disableAnimations() {
		const original = this.model.shouldEnableAnimations
		this.model.shouldEnableAnimations = false
		if (original) {
			this.triggerRender()
		}
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

	public getTimezoneOffsetMs(): any {
		return this.model.timezoneOffsetMs
	}

	public getShifts() {
		return this.model.shifts
	}

	public async selectEvent(id: string) {
		const event = this.getEvent(id)
		this.selectedEventId = id
		this.triggerRender()
		await this.model?.onSelectEvent?.(event)
	}

	public async deselectEvent() {
		const event = this.getSelectedEvent()
		if (event) {
			this.selectedEventId = undefined
			await this.model.onDeselectEvent?.(event)
			this.triggerRender()
		}
	}

	public deselectDate(year: number, month: number, day: number) {
		assertOptions({ year, month, day }, ['year', 'month', 'day'])

		const idx =
			this.model.selectedDates?.findIndex(
				(s) => s.year === year && s.month === month && s.day === day
			) ?? -1

		if (idx < 0) {
			throw new SpruceError({
				code: 'DATE_NOT_SELECTED',
				year,
				month,
				day,
			})
		}

		if (!this.model.selectedDates) {
			this.model.selectedDates = []
		}

		this.model.selectedDates.splice(idx, 1)

		this.triggerRender()
	}

	public getSelectedDates() {
		return this.model.selectedDates ?? []
	}

	public clearSelectedDates() {
		this.model.selectedDates = []
		this.triggerRender()
	}

	public isDateSelected(year: number, month: number, day: number): boolean {
		const selected = this.model.selectedDates ?? []
		return !!selected.find(
			(s) => s?.year === year && s?.month === month && s?.day === day
		)
	}

	public getSelectedEvent() {
		return this.selectedEventId
			? this.getEvent(this.selectedEventId)
			: undefined
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

	public async removeEvent(id: string) {
		this.getEvent(id)

		if (this.selectedEventId === id) {
			await this.deselectEvent()
		}

		delete this.eventsById[id]
		delete this.vcsById[id]

		this.triggerRender()
	}

	public async removeEvents(ids: string[]) {
		await this.renderOnce(() =>
			Promise.all(ids.map((id) => this.removeEvent(id)))
		)
	}

	public clearEvents() {
		const events = this.getEvents()
		void this.renderOnce(() => {
			events.forEach((e) => this.removeEvent(e.id))
		})
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

	public updateEvent(id: string, updates: Partial<Event>): Event {
		const original = this.getEvent(id)

		const match = {
			...original,
			...updates,
		}

		this.eventsById[id] = match

		if (updates.startDateTimeMs && id === this.selectedEventId) {
			this.model.startDate = updates.startDateTimeMs
		}

		if (updates.eventTypeSlug !== original.eventTypeSlug) {
			delete this.vcsById[id]
			this.triggerRender()
		} else {
			this.vcsById[id]?.triggerRender()
		}

		return match
	}

	public getEvent(id: string): Event {
		const match = this.findEvent(id)

		if (!match) {
			throw new SpruceError({ code: 'EVENT_NOT_FOUND', id })
		}

		const e = { ...match }

		if (this.selectedEventId && this.selectedEventId === id) {
			e.isSelected = true
		}

		return e
	}

	private findEvent(id: string) {
		return this.eventsById[id]
	}

	public getDefaultControllerForEvents(): string | undefined {
		return this.defaultEventVcId
	}

	public setDefaultControllerForEvents(vcId: string) {
		this.defaultEventVcId = vcId
	}

	public setControllerForEventType(type: string, vcId: string) {
		this.vcIdsByEventType[type] = vcId
		for (const event of this.getEvents()) {
			if (event.eventTypeSlug === type) {
				delete this.vcsById[event.id]
			}
		}

		this.triggerRender()
	}

	public getEventVc(eventId: string): CalendarEventViewController {
		if (!this.vcsById[eventId]) {
			const event = this.getEvent(eventId)
			const vc = this.Controller(
				(this.vcIdsByEventType[event.eventTypeSlug ?? '**missing**'] ??
					this.defaultEventVcId ??
					'calendarEvent') as any,
				{
					getEvent: () => this.getEvent(eventId),
					setEvent: (event: Event) => this.updateEvent(eventId, event),
					hasEvent: () => this.hasEvent(eventId),
				}
			)

			vc.triggerRender = () => this.triggerRender()
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

	public async setStartDate(date: number) {
		this.model.startDate = date
		await this.model.onChangeStartDate?.(date)
		this.triggerRender()
	}

	public getStartDate() {
		return this.model.startDate
	}

	public setSelectedDates(dates: SelectedDate[]) {
		this.model.selectedDates = [...dates]
		this.triggerRender()
	}

	public selectDate(year: number, month: number, day: number) {
		assertOptions({ year, month, day }, ['year', 'month', 'day'])
		if (!this.model.selectedDates) {
			this.model.selectedDates = []
		}

		if (
			this.model.selectedDates[0]?.year === year &&
			this.model.selectedDates[0]?.month === month &&
			this.model.selectedDates[0]?.day === day
		) {
			throw new SpruceError({
				code: 'DATE_ALREADY_SELECTED',
				year: 2020,
				month: 1,
				day: 1,
			})
		}

		this.model.selectedDates.push({ year, month, day })

		this.triggerRender()
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
			selectedDates: this.model.selectedDates,
			selectedEvent: this.getSelectedEvent(),
		}
	}
}
