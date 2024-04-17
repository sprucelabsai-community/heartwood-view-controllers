import { assert } from '@sprucelabs/test-utils'
import { CountdownTimer, ViewController } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'

const countdownTimerInteractor = {
    async simulateOnComplete(vc: ViewController<CountdownTimer>) {
        const { onComplete } = renderUtil.render(vc)
        assert.isTruthy(
            onComplete,
            `Countdown timer does not have an onComplete callback! Try passing onComplete: () => {}!`
        )
        await onComplete()
    },
}

export default countdownTimerInteractor
