import { assertOptions } from '@sprucelabs/schema'
import WebRtcStreamerImpl from './WebRtcStreamer'

export default class WebRtcConnection {
    public static get RTCPeerConnection() {
        return window.RTCPeerConnection
    }

    public static set RTCPeerConnection(value) {
        window.RTCPeerConnection = value
    }

    public static async createOffer(
        options: WebRtcVcPluginCreateOfferOptions
    ): Promise<{
        offerSdp: RTCSessionDescriptionInit
        streamer: WebRtcStreamerImpl
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
            streamer: WebRtcStreamerImpl.Streamer(connection),
        }
    }
}

export interface WebRtcVcPluginCreateOfferOptions {
    offerOptions: {
        offerToReceiveAudio?: boolean
        offerToReceiveVideo?: boolean
    }
}
