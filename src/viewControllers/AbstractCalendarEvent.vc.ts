import { assertOptions } from '@sprucelabs/schema'
import {
    CalendarEvent,
    CalendarEventViewController as CalendarEventVc,
} from '../types/calendar.types'
import {
    TriggerRenderHandler,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

export default abstract class AbstractCalendarEventViewController
    extends AbstractViewController<Event>
    implements CalendarEventVc
{
    public static id = 'calendar-event'
    protected setEvent: SetEventHandler
    protected getEvent: GetEventHandler
    private hasEvent: HasEventHandler

    public constructor(options: ViewControllerOptions & CalendarEventOptions) {
        super(options)

        const {
            getEvent,
            setEvent,
            hasEvent,
            setTriggerRenderHandler,
            triggerRenderHandler,
        } = assertOptions(options, [
            'setEvent',
            'getEvent',
            'hasEvent',
            'setTriggerRenderHandler',
            'triggerRenderHandler',
        ])

        this.setEvent = setEvent
        this.getEvent = getEvent
        this.hasEvent = hasEvent
        this.setTriggerRenderHandler = setTriggerRenderHandler
        this.triggerRenderHandler = triggerRenderHandler
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

    public deselect(): void {
        this.triggerRender()
    }

    public select() {
        this.triggerRender()
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
    setTriggerRenderHandler: (cb: TriggerRenderHandler) => void
    triggerRenderHandler: TriggerRenderHandler
}
