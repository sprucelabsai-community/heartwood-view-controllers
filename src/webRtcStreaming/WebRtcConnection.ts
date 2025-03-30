import { assertOptions } from '@sprucelabs/schema'
import MockRtcPeerConnection from '../tests/MockRtcPeerConnection'
import WebRtcStreamerImpl, { WebRtcStreamer } from './WebRtcStreamer'

export default class WebRtcConnectionImpl implements WebRtcConnection {
    public static Class: new () => WebRtcConnection

    public static get RTCPeerConnection() {
        return window.RTCPeerConnection
    }

    public static set RTCPeerConnection(
        value: new (
            config: RTCConfiguration
        ) => RTCPeerConnection | MockRtcPeerConnection
    ) {
        global.window.RTCPeerConnection = value as any
    }

    private stateChangeHandlers: WebRtcStateChangeHandler[] = []

    public static Connection(): WebRtcConnection {
        return new (this.Class ?? this)()
    }

    public async createOffer(
        options: WebRtcVcPluginCreateOfferOptions
    ): Promise<WebRtcCreateOfferResponse> {
        const { offerOptions } = assertOptions(options, ['offerOptions'])
        const connection = new WebRtcConnectionImpl.RTCPeerConnection({
            //@ts-ignore
            sdpSemantics: 'unified-plan',
            iceServers: [],
        })

        const offer = await connection.createOffer(offerOptions)
        await connection.setLocalDescription(offer)

        void this.emitStateChange('createdOffer')

        return {
            offerSdp: offer,
            streamer: WebRtcStreamerImpl.Streamer(
                connection as RTCPeerConnection,
                async (status) => {
                    await this.emitStateChange(status)
                }
            ),
        }
    }

    private async emitStateChange(state: WebRtcConnectionState) {
        for (const handler of this.stateChangeHandlers) {
            await handler(state)
        }
    }

    public onStateChange(cb: WebRtcStateChangeHandler) {
        this.stateChangeHandlers.push(cb)
    }
}

export interface WebRtcVcPluginCreateOfferOptions {
    offerOptions: {
        offerToReceiveAudio?: boolean
        offerToReceiveVideo?: boolean
    }
}

export type WebRtcConnectionState =
    | 'createdOffer'
    | 'suppliedAnswer'
    | 'trackAdded'

export type WebRtcStateChangeHandler = (
    state: WebRtcConnectionState
) => void | Promise<void>

export interface WebRtcConnection {
    createOffer(
        options: WebRtcVcPluginCreateOfferOptions
    ): Promise<WebRtcCreateOfferResponse>
    onStateChange(cb: WebRtcStateChangeHandler): void
}

export interface WebRtcCreateOfferResponse {
    offerSdp: RTCSessionDescriptionInit
    streamer: WebRtcStreamer
}
