import { assert, test, suite } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import { CalendarEvent, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import { CalendarEventViewController } from '../../../types/calendar.types'
import SpyCalendarVc from './SpyCalendarVc'

@suite()
export default class ControllingACalendarEvent extends AbstractViewControllerTest {
    private calendarVc!: SpyCalendarVc
    private event!: CalendarEvent
    private vc!: CalendarEventViewController

    protected async beforeEach() {
        await super.beforeEach()

        this.getFactory().setController('calendar', SpyCalendarVc)
        this.calendarVc = this.Controller('calendar', {}) as SpyCalendarVc
        this.event = {
            ...calendarSeeder.generateEventValues(),
        }

        this.calendarVc.addEvent(this.event)

        this.vc = this.calendarVc.getEventVc(this.event.id)

        vcAssert.attachTriggerRenderCounter(this.vc)
    }

    @test()
    protected throwWithoutGetterAndSetter() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            this.Controller('calendar-event', {})
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: [
                'setEvent',
                'getEvent',
                'hasEvent',
                'setTriggerRenderHandler',
                'triggerRenderHandler',
            ],
        })
    }

    @test('can mixin updates 1', { style: 'blocked' })
    @test('can mixin updates 2', { startDateTimeMs: 100 })
    protected mixingInUpdatesUpdatesEvent(changes: Partial<CalendarEvent>) {
        this.vc.mixinChanges(changes)

        const expected = {
            ...this.event,
            ...changes,
        }

        assert.isEqualDeep(
            this.render(this.vc, { shouldStripControllers: true }),
            expected
        )

        assert.isEqualDeep(
            this.render(this.calendarVc, { shouldStripControllers: true })
                .events[0],
            expected
        )

        assert.isEqualDeep(this.calendarVc.getEvent(this.event.id), expected)
    }

    @test()
    protected canSetIsBusy() {
        assert.isFalse(this.vc.getIsBusy())
        this.vc.setIsBusy(true)
        assert.isTrue(this.vc.getIsBusy())
        assert.isTrue(this.render(this.vc).isBusy)
        this.vc.setIsBusy(false)
        assert.isFalse(this.render(this.vc).isBusy)
    }

    @test()
    protected async mixingInChangesTriggersRender() {
        this.vc.mixinChanges({ style: 'draft' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async updatingAnEventOnCalendarTriggersRenderOnEvent() {
        this.calendarVc.updateEvent(this.event.id, { style: 'draft' })
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async eventKnowsIfBeenDeleted() {
        assert.isFalse(this.vc.getIsOrphaned())

        await this.calendarVc.removeEvent(this.event.id)

        assert.isTrue(this.vc.getIsOrphaned())
    }

    @test()
    protected async eventsRenderIsSelectedFalseByDefault() {
        let event = this.addEvent()

        assert.isUndefined(this.getEvent(event.id).isSelected)

        await this.calendarVc.selectEvent(event.id)

        assert.isTrue(this.getEvent(event.id).isSelected)
    }

    @test()
    protected async havingASelectedEventDoesNotImpactNotSelectedEvents() {
        const e1 = this.addEvent()
        const e2 = this.addEvent()

        await this.calendarVc.selectEvent(e1.id)

        assert.isUndefined(this.getEvent(e2.id).isSelected)
    }

    @test()
    protected selectingDeselectingTriggersRender() {
        this.vc.select()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.vc.deselect()
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected async eventVcsWithSameIdShareTriggerRenders() {
        let hitCount = 0

        this.vc.setTriggerRenderHandler(() => {
            hitCount++
        })
        this.calendarVc.clearEventVcs()
        const vc2 = this.calendarVc.getEventVc(this.event.id)

        assert.isEqual(hitCount, 0)

        vc2.triggerRender()
        assert.isEqual(hitCount, 1)
    }

    @test()
    protected async calendarSelectedEventClearedBeforeDeselectOnEventVc() {
        this.vc.deselect = () => {
            assert.isFalsy(this.calendarVc.getSelectedEvent())
        }

        await this.calendarVc.selectEvent(this.event.id)
        await this.calendarVc.deselectEvent()
    }

    private getEvent(eventId: string) {
        return this.calendarVc.getEvent(eventId)
    }

    private addEvent() {
        const event = calendarSeeder.generateEventValues()
        this.calendarVc.addEvent(event)
        return event
    }
}
