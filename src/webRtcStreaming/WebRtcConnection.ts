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

    private stateChangeListeners: WebRtcStateChangeHandler[] = []

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

        const { offerToReceiveAudio, offerToReceiveVideo } = offerOptions

        if (offerToReceiveAudio) {
            connection.addTransceiver('audio', { direction: 'recvonly' })
        }

        if (offerToReceiveVideo) {
            connection.addTransceiver('video', { direction: 'recvonly' })
        }

        //must create this and add transceivers in order for Google Devices, if changing, make sure this
        //stays the default behavior
        connection.createDataChannel('dataSendChannel')

        const offer = await connection.createOffer({})
        await connection.setLocalDescription(offer)

        void this.emitStateChange('createdOffer')

        connection.addEventListener('track', (event) => {
            void this.emitStateChange('trackAdded', event as RTCTrackEvent)
        })

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

    private async emitStateChange(
        state: WebRtcConnectionState,
        event?: RTCTrackEvent
    ) {
        for (const handler of this.stateChangeListeners) {
            await handler(state, event)
        }
    }

    public onStateChange(cb: WebRtcStateChangeHandler) {
        this.stateChangeListeners.push(cb)
    }

    public offStateChange(listener: WebRtcStateChangeHandler) {
        this.stateChangeListeners = this.stateChangeListeners.filter(
            (handler) => handler !== listener
        )
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
    state: WebRtcConnectionState,
    event?: RTCTrackEvent
) => void | Promise<void>

export interface WebRtcConnection {
    offStateChange(listener: WebRtcStateChangeHandler): void
    createOffer(
        options: WebRtcVcPluginCreateOfferOptions
    ): Promise<WebRtcCreateOfferResponse>
    onStateChange(cb: WebRtcStateChangeHandler): void
}

export interface WebRtcCreateOfferResponse {
    offerSdp: RTCSessionDescriptionInit
    streamer: WebRtcStreamer
}
