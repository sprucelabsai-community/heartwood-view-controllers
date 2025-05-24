import { assertOptions } from '@sprucelabs/schema'
import { buildLog } from '@sprucelabs/spruce-skill-utils'
import SpruceError from '../errors/SpruceError'
import MockRtcPeerConnection from '../tests/MockRtcPeerConnection'
import WebRtcStreamerImpl, { WebRtcStreamer } from './WebRtcStreamer'

export default class WebRtcConnectionImpl implements WebRtcConnection {
    public static Class?: new () => WebRtcConnection
    private log = buildLog('WebRtcConnectionImpl')
    private rtcPeerConnection?: RTCPeerConnection

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

    public getRtcPeerConnection(): RTCPeerConnection {
        if (!this.rtcPeerConnection) {
            throw new SpruceError({
                code: 'DID_NOT_GENERATE_OFFER',
                friendlyMessage:
                    'You must create an offer before getting the peer connection!',
            })
        }
        return this.rtcPeerConnection
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

        this.rtcPeerConnection = connection as RTCPeerConnection

        connection.addEventListener('connectionstatechange', async () => {
            this.log.info(
                `RTCPeerConnection state changed to ${connection.connectionState}`
            )
            if (connection.connectionState === 'failed') {
                const stats = await connection.getStats()
                const messages: string[] = []
                stats.forEach((report) => {
                    messages.push(`[${report.type}] ID: ${report.id}`, report)
                })
                this.log.error(
                    `RTCPeerConnection failed with stats:\n\n`,
                    messages.join('\n')
                )
                await this.emitStateChange('error', { stats })
            }
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
            rtcPeerConnection: connection as RTCPeerConnection,
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
        event?: WebRtcStateChangeEvent
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

export interface WebRtcStateEventMap {
    createdOffer: RTCTrackEvent
    suppliedAnswer: RTCTrackEvent
    trackAdded: RTCTrackEvent
    error: WebRtcErrorEvent
}

export type WebRtcConnectionState = keyof WebRtcStateEventMap
export type WebRtcStateChangeEvent = RTCTrackEvent | WebRtcErrorEvent

export type WebRtcStateChangeHandler = (
    state: WebRtcConnectionState,
    event?: WebRtcStateChangeEvent
) => void | Promise<void>

export interface WebRtcErrorEvent {
    stats: RTCStatsReport
}

export interface WebRtcConnection {
    offStateChange(listener: WebRtcStateChangeHandler): void
    createOffer(
        options: WebRtcVcPluginCreateOfferOptions
    ): Promise<WebRtcCreateOfferResponse>
    onStateChange(cb: WebRtcStateChangeHandler): void
    getRtcPeerConnection(): RTCPeerConnection
}

export interface WebRtcCreateOfferResponse {
    offerSdp: RTCSessionDescriptionInit
    streamer: WebRtcStreamer
    rtcPeerConnection: RTCPeerConnection
}
