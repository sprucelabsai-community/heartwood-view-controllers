import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ViewController } from './heartwood.types'

type Person = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson
type TimeBlock = SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock
export type CalendarEvent =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

export interface ClickCalendarViewOptions {
	time?: number
	person?: Person
}

export interface ClickEventOptions {
	viewController: CalendarEventViewController
	event: CalendarEvent
	block: TimeBlock
	blockIdx: number
}

export interface CalendarEventViewController
	extends ViewController<CalendarEvent> {}
