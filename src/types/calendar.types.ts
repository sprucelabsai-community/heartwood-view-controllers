import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ToolBeltState } from '..'
import { ViewController } from './heartwood.types'

type TimeBlock = SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock
export type CalendarEvent =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent

export interface ClickCalendarViewOptions {
    dateTimeMs?: number
    personId?: string
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
    newStartDateTimeMs?: number
    newPersonId?: string
    blockUpdates?: BlockUpdate[]
}

export type CalendarSwipeDirection = 'back' | 'forward'

export interface SwipeOptions {
    direction: CalendarSwipeDirection
}

export interface CalendarEventViewController extends ViewController<CalendarEvent> {
    getIsOrphaned(): boolean
    mixinChanges(changes: Partial<CalendarEvent>): void
    setIsBusy(isBusy: boolean): void
    getIsBusy(): boolean
    select(): void
    deselect(): void
    getToolBeltState?(): ToolBeltState
}

export type StickyToolPosition = 'top' | 'bottom'

export type StickyTool = Omit<Tool, 'id'> & {
    position: StickyToolPosition
}

type Tool = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool
