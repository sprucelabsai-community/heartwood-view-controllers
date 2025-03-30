import { assertOptions } from '@sprucelabs/schema'
import { WebRtcStateChangeHandler } from './WebRtcConnection'

export default class WebRtcStreamerImpl implements WebRtcStreamer {
    private connection: RTCPeerConnection

    public static Class?: new (
        connection: RTCPeerConnection,
        stateChangeHandlers?: WebRtcStateChangeHandler
    ) => WebRtcStreamer

    private stateChangeHandler?: WebRtcStateChangeHandler

    protected constructor(
        connection: RTCPeerConnection,
        stateChangeHandler?: WebRtcStateChangeHandler
    ) {
        this.connection = connection
        this.stateChangeHandler = stateChangeHandler
    }

    public static Streamer(
        connection: RTCPeerConnection,
        stateChangeHandler?: WebRtcStateChangeHandler
    ) {
        return new (this.Class ?? this)(connection, stateChangeHandler)
    }

    public async setAnswer(answerSdp: string) {
        assertOptions({ answerSdp }, ['answerSdp'])
        await this.connection.setRemoteDescription({
            type: 'answer',
            sdp: answerSdp,
        })

        await this.stateChangeHandler?.('suppliedAnswer')
    }

    public onTrack(cb: (event: RTCTrackEvent) => void) {
        this.connection.addEventListener('track', cb)
        void this.stateChangeHandler?.('trackAdded')
    }
}

export interface WebRtcStreamer {
    setAnswer(answerSdp: string): Promise<void>
    onTrack(cb: (event: RTCTrackEvent) => void): void
}
