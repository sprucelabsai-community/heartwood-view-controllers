import { SpruceSchemas } from '#spruce/schemas/schemas.types'
import { CalendarEventViewController as CalendarEventVc } from '../types/calendar.types'
import { ViewControllerOptions } from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

type Event = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

export default class CalendarEventViewController
	extends AbstractViewController<Event>
	implements CalendarEventVc
{
	public static id = 'calendar-event'
	private model: Event

	public constructor(options: ViewControllerOptions & Event) {
		super(options)
		this.model = removeUniversalViewOptions(options)
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent {
		return { ...this.model, controller: this }
	}
}
