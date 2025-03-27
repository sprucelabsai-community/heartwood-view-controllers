import { assertOptions } from '@sprucelabs/schema'
import { AbstractViewController, WebRtcConnection } from '../..'
import SpruceError from '../../errors/SpruceError'
import {
    ViewControllerOptions,
    WebRtcPlayer,
} from '../../types/heartwood.types'
import { WebRtcStreamer } from '../../webRtcStreaming/WebRtcStreamer'

export default class WebRtcPlayerViewController extends AbstractViewController<WebRtcPlayer> {
    public static id = 'web-rtc-player-card'
    private streamer?: WebRtcStreamer

    public constructor(options: ViewControllerOptions & WebRtcPlayerOptions) {
        super(options)
        const { streamer } = options
        this.streamer = streamer ?? undefined
    }

    public setStreamer(streamer: WebRtcStreamer) {
        assertOptions({ streamer }, ['streamer'])
        this.streamer = streamer
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
        if (!this.streamer) {
            throw new SpruceError({
                code: 'DID_NOT_GENERATE_OFFER',
            })
        }

        await this.streamer.setAnswer(answerSdp)
    }

    public render(): WebRtcPlayer {
        return {
            streamer: this.streamer,
            controller: this,
        }
    }
}

export interface WebRtcPlayerOptions extends WebRtcPlayer {}
