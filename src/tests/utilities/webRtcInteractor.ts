import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    WebRtcConnectionState,
    WebRtcCropPoint,
    WebRtcStateChangeEvent,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import WebRtcPlayerViewController from '../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'
import WebRtcConnectionImpl from '../../webRtcStreaming/WebRtcConnection'
import MockRtcPeerConnection from '../MockRtcPeerConnection'

const webRtcInteractor = {
    simulateCrop: async (
        vc: WebRtcPlayerViewController,
        cropPoint?: WebRtcCropPoint
    ) => {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        await model.onCrop?.(cropPoint)
    },

    async simulateStateChange<State extends WebRtcConnectionState>(
        vc: WebRtcPlayerViewController,
        state: State,
        event?: WebRtcStateChangeEvent<State>
    ) {
        const model = renderUtil.render(vc)
        const { onStateChange } = model

        assert.isFunction(
            onStateChange,
            `You must pass onStateChange to the view model during construction: this.Controller('web-rtc-player', { onStateChange: () => {} }).`
        )

        assert.isEqual(
            WebRtcConnectionImpl.RTCPeerConnection,
            MockRtcPeerConnection,
            `You must setup the MockRtcPeerConnection in your test to test interactions. Try putting WebRtcConnectionImpl.RTCPeerConnection = MockRtcPeerConnection in your beforeEach().`
        )

        await onStateChange(state, event)
    },
}

export default webRtcInteractor
