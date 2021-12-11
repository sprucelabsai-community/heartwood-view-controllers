import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { validateSchemaValues } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import calendarSchema from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/calendar.schema'
import { vcAssertUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CalendarViewController from '../../../viewControllers/Calendar.vc'

type CalendarTime =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime

export default class ControllingACalendarTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	protected static vc: CalendarViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Controller('calendar', {
			people: [
				{
					id: `${new Date().getTime()}`,
					casualName: 'Tay',
				},
			],
		})
	}

	@test()
	protected static throwsIfMissingRequiredFieldsInDayView() {
		//@ts-ignore
		const err = assert.doesThrow(() => this.Controller('calendar', {}))
		errorAssertUtil.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['people'],
		})
		assert.doesThrow(() => this.Controller('calendar', { view: 'day' }))
	}

	@test()
	protected static doesNotThroughIfMissingPeopleInMonthView() {
		this.Controller('calendar', { view: 'month' })
	}

	@test()
	protected static rendersValidView() {
		validateSchemaValues(calendarSchema, this.render(this.vc))
	}

	@test()
	protected static passesThroughViewValues() {
		const model: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar = {
			timezoneOffsetMs: new Date().getTimezoneOffset() * 1000,
			minTime: { hour: 3, minute: 0 },
			maxTime: { hour: 10, minute: 0 },
			[`${new Date().getTime()}`]: Math.random(),
			view: 'day',
			people: [
				{
					id: `${new Date().getTime()}`,
					casualName: `${Math.random()}`,
				},
			],
		}
		const vc = this.Controller('calendar', model)
		const actual = this.render(vc)

		assert.isTrue(actual.controller === vc)
		delete actual.controller

		assert.isEqualDeep(actual, model)
	}

	@test(
		`can't set min after max 1`,
		{ hour: 10, minute: 0 },
		{ hour: 0, minute: 0 }
	)
	@test(
		`can't set min after max 2`,
		{ hour: 10, minute: 30 },
		{ hour: 10, minute: 0 }
	)
	protected static cantSetMinTimeForAfterMaxTime(
		minTime: CalendarTime,
		maxTime: CalendarTime
	) {
		const err = assert.doesThrow(() =>
			this.Controller('calendar', {
				minTime,
				maxTime,
				people: [
					{
						id: 'aoeu',
						casualName: 'Tay',
					},
				],
			})
		)

		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['minTime', 'maxTime'],
		})
	}

	@test('can set min time 1', { hour: 9, minute: 30 })
	@test('can set min time 2', { hour: 10, minute: 0 })
	protected static canSetMinTime(time: CalendarTime) {
		this.vc.setMinTime(time)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)

		assert.isEqualDeep(this.render(this.vc).minTime, time)
	}

	@test('can set max time 1', { hour: 15, minute: 30 })
	@test('can set max time 2', { hour: 17, minute: 0 })
	protected static canSetMaxTime(time: CalendarTime) {
		this.vc.setMaxTime(time)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)

		assert.isEqualDeep(this.render(this.vc).maxTime, time)
	}

	@test("can't set bad timezone 1", -12 * 60 * 60 * 1001)
	@test("can't set bad timezone 2", 14 * 60 * 60 * 1001)
	protected static mustSetValidTimezoneOffset(offset: number) {
		const err = assert.doesThrow(() => this.vc.setTimezoneOffsetMs(offset))
		errorAssertUtil.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['timezoneOffsetMs'],
		})
	}

	@test('can set timezoneOffset 1', -12 * 60 * 60 * 1000)
	@test('can set timezoneOffset 2', 14 * 60 * 60 * 1000)
	protected static canSetTimezoneOffset(time: number) {
		this.vc.setTimezoneOffsetMs(time)
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
		assert.isEqualDeep(this.render(this.vc).timezoneOffsetMs, time)
	}

	@test()
	protected static defaultsToDayView() {
		assert.isEqual(this.vc.getView(), 'day')
		assert.isEqual(this.render(this.vc).view, 'day')
	}

	@test()
	protected static canSetStartDay() {
		const vc = this.Controller('calendar', {
			view: 'month',
			people: [
				{
					id: `${new Date().getTime()}`,
					casualName: 'Tay',
				},
			],
		})

		assert.isEqual(vc.getView(), 'month')
		assert.isEqual(this.render(vc).view, 'month')
	}

	@test()
	protected static canSetView() {
		this.vc.setView('month')
		assert.isEqual(this.vc.getView(), 'month')
		vcAssertUtil.assertTriggerRenderCount(this.vc, 1)
	}
}
