import { assertOptions } from '@sprucelabs/schema'
import { WebRtcCropPoint } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import WebRtcPlayerViewController from '../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'

const webRtcInteractor = {
    simulateCrop: async (
        vc: WebRtcPlayerViewController,
        cropPoint?: WebRtcCropPoint
    ) => {
        assertOptions({ vc }, ['vc'])
        const model = renderUtil.render(vc)
        await model.onCrop?.(cropPoint)
    },
}

export default webRtcInteractor
