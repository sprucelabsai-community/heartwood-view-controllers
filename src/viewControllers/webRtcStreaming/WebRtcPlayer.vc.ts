import { assertOptions } from '@sprucelabs/schema'

import SpruceError from '../../errors/SpruceError'
import {
    ViewControllerOptions,
    WebRtcConnection,
    WebRtcCropPoint,
    WebRtcPlayer,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import WebRtcConnectionImpl, {
    WebRtcVcPluginCreateOfferOptions,
} from '../../webRtcStreaming/WebRtcConnection'
import { WebRtcStreamer } from '../../webRtcStreaming/WebRtcStreamer'
import AbstractViewController from '../Abstract.vc'

export default class WebRtcPlayerViewController extends AbstractViewController<WebRtcPlayer> {
    public static id = 'web-rtc-player-card'
    private model: WebRtcPlayer
    private connection: WebRtcConnection

    public constructor(options: ViewControllerOptions & WebRtcPlayerOptions) {
        super(options)

        const { onStateChange, ...model } = removeUniversalViewOptions(options)

        this.connection = WebRtcConnectionImpl.Connection()
        if (onStateChange) {
            this.connection.onStateChange(onStateChange)
        }

        this.model = {
            connection: this.connection,
            onStateChange,
            ...model,
            controller: this,
        }
    }

    public setStreamer(streamer: WebRtcStreamer) {
        assertOptions({ streamer }, ['streamer'])
        this.model.streamer = streamer
        this.triggerRender()
    }

    public async createOffer(
        offerOptions: WebRtcVcPluginCreateOfferOptions['offerOptions'] = {}
    ) {
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

    public enableCropping() {
        this.model.shouldAllowCropping = true
        this.triggerRender()
    }

    public disableCropping() {
        this.model.shouldAllowCropping = false
        this.triggerRender()
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
