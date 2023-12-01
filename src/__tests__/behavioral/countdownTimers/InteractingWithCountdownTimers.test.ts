import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import countdownTimerInteractor from '../../../tests/utilities/countdownTimerInteractor'

export default class InteractingWithCountdownTimersTest extends AbstractViewControllerTest {
	@test()
	protected static async throwsWhenNoOnCompleteSet() {
		const vc = this.Controller('countdown-timer', {})
		await assert.doesThrowAsync(() =>
			countdownTimerInteractor.simulateOnComplete(vc)
		)
	}

	@test()
	protected static async triggersOnComplete() {
		let wasHit = false
		const vc = this.Controller('countdown-timer', {
			onComplete: () => {
				wasHit = true
			},
		})

		await countdownTimerInteractor.simulateOnComplete(vc)

		assert.isTrue(wasHit)
	}
}
