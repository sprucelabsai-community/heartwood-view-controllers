import { assert, test } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import { CalendarEvent, CalendarViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarSeeder from '../../../tests/utilities/calendarSeeder'
import { CalendarEventViewController } from '../../../types/calendar.types'

export default class ControllingACalendarEvent extends AbstractViewControllerTest {
	private static calendarVc: CalendarViewController
	private static eventModel: CalendarEvent
	private static vc: CalendarEventViewController

	protected static async beforeEach() {
		await super.beforeEach()

		this.calendarVc = this.Controller('calendar', {})
		this.eventModel = calendarSeeder.generateEventValues()

		this.calendarVc.addEvent(this.eventModel)
		this.vc = this.calendarVc.getEventVc(this.eventModel.id)

		vcAssert.attachTriggerRenderCounter(this.vc)
	}

	@test()
	protected static throwWithoutGetterAndSetter() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.Controller('calendarEvent', {}))
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['setEvent', 'getEvent', 'hasEvent'],
		})
	}

	@test('can mixin updates 1', { style: 'blocked' })
	@test('can mixin updates 2', { startDateTimeMs: 100 })
	protected static mixingInUpdatesUpdatesEvent(
		changes: Partial<CalendarEvent>
	) {
		this.vc.mixinChanges(changes)

		const expected = {
			...this.eventModel,
			...changes,
		}

		assert.isEqualDeep(
			this.render(this.vc, { shouldStripControllers: true }),
			expected
		)
		assert.isEqualDeep(
			this.render(this.calendarVc, { shouldStripControllers: true }).events[0],
			expected
		)

		assert.isEqualDeep(this.calendarVc.getEvent(this.eventModel.id), expected)
	}

	@test()
	protected static canSetIsBusy() {
		this.vc.setIsBusy(true)
		assert.isTrue(this.render(this.vc).isBusy)
		this.vc.setIsBusy(false)
		assert.isFalse(this.render(this.vc).isBusy)
	}

	@test()
	protected static async mixingInChangesTriggersRender() {
		this.vc.mixinChanges({ style: 'draft' })
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async updatingAnEventOnCalendarTriggersRenderOnEvent() {
		this.calendarVc.updateEvent(this.eventModel.id, { style: 'draft' })
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async eventKnowsIfBeenDeleted() {
		assert.isFalse(this.vc.isOrphaned())

		this.calendarVc.removeEvent(this.eventModel.id)

		assert.isTrue(this.vc.isOrphaned())
	}
}
