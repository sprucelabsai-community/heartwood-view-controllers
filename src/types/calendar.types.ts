import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ToolBeltState } from '..'
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

export interface DragEvent extends CalendarEvent {
	originalId?: string
}

export interface BlockUpdate {
	blockIdx: number
	durationSec: number
}
export interface DropEventOptions {
	event: CalendarEvent
	dragEvent: DragEvent
	newStartAt?: number
	newPerson?: Person
	blockUpdates?: BlockUpdate[]
}

export interface CalendarEventViewController
	extends ViewController<CalendarEvent> {
	isOrphaned(): boolean
	mixinChanges(changes: Partial<CalendarEvent>): void
	setIsBusy(isBusy: boolean): void
	getToolBeltState?(): ToolBeltState
}
