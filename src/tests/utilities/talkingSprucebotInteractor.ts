import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ViewController, TalkingSprucebot } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'

const talkingSprucebotInteractor = {
    async simulateOnComplete(talkingVc: ViewController<TalkingSprucebot>) {
        assertOptions({ talkingVc }, ['talkingVc'])

        const model = renderUtil.render(talkingVc)

        assert.isTruthy(
            model.onComplete,
            `I could not simulate an onComplete for your talking Sprucebot because there is no onComplete set.`
        )

        await model.onComplete()
    },
}

export default talkingSprucebotInteractor
