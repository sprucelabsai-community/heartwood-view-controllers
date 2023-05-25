import { assertOptions } from '@sprucelabs/schema'
import {
	CalendarEvent,
	CalendarEventViewController as CalendarEventVc,
} from '../types/calendar.types'
import { ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

export default abstract class AbstractCalendarEventViewController
	extends AbstractViewController<Event>
	implements CalendarEventVc
{
	public static id = 'calendar-event'
	protected setEvent: SetEventHandler
	protected getEvent: GetEventHandler
	protected hasEvent: HasEventHandler

	public constructor(options: ViewControllerOptions & CalendarEventOptions) {
		super(options)

		assertOptions(options, ['setEvent', 'getEvent', 'hasEvent'])

		this.setEvent = options.setEvent
		this.getEvent = options.getEvent
		this.hasEvent = options.hasEvent
	}

	public setIsBusy(isBusy: boolean): void {
		this.mixinChanges({ isBusy })
	}

	public getIsBusy(): boolean {
		return this.getEvent().isBusy ?? false
	}

	public getIsOrphaned(): boolean {
		return !this.hasEvent()
	}

	public mixinChanges(changes: Partial<CalendarEvent>): void {
		this.setEvent({
			...this.getEvent(),
			...changes,
		})
	}

	public render(): CalendarEvent {
		return { ...this.getEvent(), controller: this }
	}
}

type Event = CalendarEvent

type GetEventHandler = () => Event
type SetEventHandler = (event: Event) => void
type HasEventHandler = () => boolean

export interface CalendarEventOptions {
	getEvent: GetEventHandler
	setEvent: SetEventHandler
	hasEvent: HasEventHandler
}
