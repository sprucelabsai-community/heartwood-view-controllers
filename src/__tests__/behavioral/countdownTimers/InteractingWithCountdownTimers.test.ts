import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import countdownTimerInteractor from '../../../tests/utilities/countdownTimerInteractor'

@suite()
export default class InteractingWithCountdownTimersTest extends AbstractViewControllerTest {
    @test()
    protected async throwsWhenNoOnCompleteSet() {
        const vc = this.Controller('countdown-timer', {})
        await assert.doesThrowAsync(() =>
            countdownTimerInteractor.simulateOnComplete(vc)
        )
    }

    @test()
    protected async triggersOnComplete() {
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
