import { assertOptions } from '@sprucelabs/schema'

import SpruceError from '../../errors/SpruceError'
import {
    ViewControllerOptions,
    WebRtcConnection,
    WebRtcCropPoint,
    WebRtcPlayer,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import WebRtcConnectionImpl from '../../webRtcStreaming/WebRtcConnection'
import { WebRtcStreamer } from '../../webRtcStreaming/WebRtcStreamer'
import AbstractViewController from '../Abstract.vc'

export default class WebRtcPlayerViewController extends AbstractViewController<WebRtcPlayer> {
    public static id = 'web-rtc-player-card'
    private model: WebRtcPlayer
    private connection: WebRtcConnection

    public constructor(options: ViewControllerOptions & WebRtcPlayerOptions) {
        super(options)

        this.connection = WebRtcConnectionImpl.Connection()
        this.model = {
            connection: this.connection,
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
        const { offerSdp, streamer } = await this.connection.createOffer({
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

    public getCrop() {
        return this.model.crop
    }

    public setCrop(point?: WebRtcCropPoint) {
        this.model.crop = point
        void this.model.onCrop?.(point)
        this.triggerRender()
    }

    public render(): WebRtcPlayer {
        return {
            ...this.model,
            onCrop: (point) => {
                this.setCrop(point)
            },
        }
    }
}

export interface WebRtcPlayerOptions extends WebRtcPlayer {}
