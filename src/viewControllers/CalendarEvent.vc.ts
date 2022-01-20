import { assertOptions } from '@sprucelabs/schema'
import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { CalendarEventViewController as CalendarEventVc } from '../types/calendar.types'
import { ViewControllerOptions } from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type Event = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

type GetEventHandler = () => Event
type SetEventHandler = (event: Event) => void
type HasEventHandler = () => boolean

interface CalendarEventOptions extends Event {
	getEvent: GetEventHandler
	setEvent: SetEventHandler
	hasEvent: HasEventHandler
}

export default class CalendarEventViewController
	extends AbstractViewController<Event>
	implements CalendarEventVc
{
	public static id = 'calendar-event'
	private setEvent: SetEventHandler
	private getEvent: GetEventHandler
	private hasEvent: HasEventHandler

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

	public isOrphaned(): boolean {
		return !this.hasEvent()
	}

	public mixinChanges(
		changes: Partial<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent>
	): void {
		this.setEvent({
			...this.getEvent(),
			...changes,
		})
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent {
		return { ...this.getEvent(), controller: this }
	}
}
