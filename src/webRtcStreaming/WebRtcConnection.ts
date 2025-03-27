import { assertOptions } from '@sprucelabs/schema'
import MockRtcPeerConnection from '../tests/MockRtcPeerConnection'
import WebRtcStreamerImpl, { WebRtcStreamer } from './WebRtcStreamer'

export default class WebRtcConnection {
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

    public static async createOffer(
        options: WebRtcVcPluginCreateOfferOptions
    ): Promise<{
        offerSdp: RTCSessionDescriptionInit
        streamer: WebRtcStreamer
    }> {
        const { offerOptions } = assertOptions(options, ['offerOptions'])
        const connection = new WebRtcConnection.RTCPeerConnection({
            //@ts-ignore
            sdpSemantics: 'unified-plan',
            iceServers: [],
        })

        const offer = await connection.createOffer(offerOptions)
        await connection.setLocalDescription(offer)

        return {
            offerSdp: offer,
            streamer: WebRtcStreamerImpl.Streamer(
                connection as RTCPeerConnection
            ),
        }
    }
}

export interface WebRtcVcPluginCreateOfferOptions {
    offerOptions: {
        offerToReceiveAudio?: boolean
        offerToReceiveVideo?: boolean
    }
}
