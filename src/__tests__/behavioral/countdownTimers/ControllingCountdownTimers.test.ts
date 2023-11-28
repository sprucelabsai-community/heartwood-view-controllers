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

	@test()
	protected static async clickingStartOnTimerCallsHandler() {
		let wasHit = false
		let passedToMs: number | undefined

		this.model.setStartHandler((toMs) => {
			passedToMs = toMs
			wasHit = true
		})

		const toMsn = 1
		this.vc.start(toMsn)

		assert.isTrue(wasHit)
		assert.isEqual(passedToMs, toMsn)
	}

	@test()
	protected static async onCompleteIsPassedThrough() {
		const onComplete = () => {}

		this.reload({
			onComplete,
		})

		assert.isEqual(this.model.onComplete, onComplete)
	}

	private static reload(
		options?: Partial<CountdownTimerViewControllerOptions>
	) {
		this.vc = this.Controller('countdown-timer', { ...options })
		this.model = this.render(this.vc)
	}
}
