import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { CountdownTimer } from '../../../types/heartwood.types'
import CountdownTimerViewController, {
	CountdownTimerViewControllerOptions,
} from '../../../viewControllers/countdownTimer/CountdownTimer.vc'

export default class ControllingCountdownTimersTest extends AbstractViewControllerTest {
	private static vc: CountdownTimerViewController
	private static model: CountdownTimer
	protected static async beforeEach() {
		await super.beforeEach()
		this.reload()
	}

	@test()
	protected static async rendersSetStartHandler() {
		assert.isFunction(this.model.setStartHandler)
	}

	@test()
	protected static async rendersItselfAsController() {
		assert.isEqual(this.model.controller, this.vc)
	}

	@test('passes expected end 1', 1)
	@test('passes expected end 2', 2)
	protected static async clickingStartOnTimerCallsHandler(toMs: number) {
		let wasHit = false
		let passedToMs: number | undefined

		this.model.setStartHandler((toMs) => {
			passedToMs = toMs
			wasHit = true
		})

		this.vc.start(toMs)

		assert.isTrue(wasHit)
		assert.isEqual(passedToMs, toMs)

		assert.isEqual(this.render(this.vc).endDateMs, toMs)
	}

	@test()
	protected static async onCompleteIsPassedThrough() {
		const onComplete = () => {}

		this.reload({
			onComplete,
		})

		assert.isEqual(this.model.onComplete, onComplete)
	}

	@test(`passes end date ms through options to rendered model 1`, 0)
	@test(`passes end date ms through options to rendered model 2`, 1)
	@test(`passes end date ms through options to rendered model 3`, 2)
	protected static async passesEndDateMsThroughOptionsToRenderedModel(
		endDateMs: number
	) {
		this.reload({ endDateMs })
		assert.isEqual(this.model.endDateMs, endDateMs)
	}

	private static reload(
		options?: Partial<CountdownTimerViewControllerOptions>
	) {
		this.vc = this.Controller('countdown-timer', { ...options })
		this.model = this.render(this.vc)
	}
}
