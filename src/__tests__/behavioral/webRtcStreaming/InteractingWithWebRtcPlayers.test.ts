import { test, assert, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import webRtcInteractor from '../../../tests/utilities/webRtcInteractor'
import { WebRtcCropPoint } from '../../../types/heartwood.types'
import generateCropPointValues from '../../../tests/utilities/generateCropPointValues'

export default class InteractingWithWebRtcPlayersTest extends AbstractViewControllerTest {
    @test()
    protected static async throwsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcInteractor.simulateCrop()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async passesWithRequired() {
        let passedPoint: WebRtcCropPoint | undefined
        const vc = this.Controller('web-rtc-player', {
            onCrop: (point) => {
                passedPoint = point
            },
        })
        const cropPoint = generateCropPointValues()
        await webRtcInteractor.simulateCrop(vc, cropPoint)
        assert.isTruthy(
            passedPoint,
            'You should call onCrop from the view model'
        )

        assert.isEqualDeep(
            cropPoint,
            passedPoint,
            'You should pass the crop point to the callback'
        )
    }
}
