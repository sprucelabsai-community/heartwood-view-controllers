import { assertOptions } from '@sprucelabs/schema'
import {
    AbstractViewController,
    removeUniversalViewOptions,
    WebRtcConnection,
} from '../..'
import SpruceError from '../../errors/SpruceError'
import {
    ViewControllerOptions,
    WebRtcPlayer,
} from '../../types/heartwood.types'
import { WebRtcStreamer } from '../../webRtcStreaming/WebRtcStreamer'

export default class WebRtcPlayerViewController extends AbstractViewController<WebRtcPlayer> {
    public static id = 'web-rtc-player-card'
    private model: WebRtcPlayer

    public constructor(options: ViewControllerOptions & WebRtcPlayerOptions) {
        super(options)
        this.model = {
            ...removeUniversalViewOptions(options),
            controller: this,
        }
    }

    public setStreamer(streamer: WebRtcStreamer) {
        assertOptions({ streamer }, ['streamer'])
        this.model.streamer = streamer
        this.triggerRender()
    }

    public async createOffer(offerOptions: RTCOfferOptions) {
        const { offerSdp, streamer } = await WebRtcConnection.createOffer({
            offerOptions,
        })

        this.setStreamer(streamer)
        return offerSdp.sdp!
    }

    public async setAnswer(answerSdp: string) {
        if (!this.model.streamer) {
            throw new SpruceError({
                code: 'DID_NOT_GENERATE_OFFER',
            })
        }

        await this.model.streamer.setAnswer(answerSdp)
    }

    public render(): WebRtcPlayer {
        return this.model
    }
}

export interface WebRtcPlayerOptions extends WebRtcPlayer {}
