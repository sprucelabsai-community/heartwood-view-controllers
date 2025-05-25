import { assertOptions } from '@sprucelabs/schema'
import { WebRtcStateChangeHandler as WebRtcStateChangeListener } from './WebRtcConnection'

export default class WebRtcStreamerImpl implements WebRtcStreamer {
    private connection: RTCPeerConnection

    public static Class?: new (
        connection: RTCPeerConnection,
        stateChangeHandlers?: WebRtcStateChangeListener
    ) => WebRtcStreamer

    private setAnwserHandler?: WebRtcStateChangeListener

    protected constructor(
        connection: RTCPeerConnection,
        onSetAnswer?: WebRtcStateChangeListener
    ) {
        this.connection = connection
        this.setAnwserHandler = onSetAnswer
    }

    public static Streamer(
        connection: RTCPeerConnection,
        onSetAnswer?: WebRtcStateChangeListener
    ) {
        return new (this.Class ?? this)(connection, onSetAnswer)
    }

    public async setAnswer(answerSdp: string) {
        assertOptions({ answerSdp }, ['answerSdp'])
        await this.connection.setRemoteDescription({
            type: 'answer',
            sdp: answerSdp,
        })

        await this.setAnwserHandler?.('suppliedAnswer')
    }

    public onTrack(cb: (event: RTCTrackEvent) => void) {
        this.connection.addEventListener('track', cb)
    }
}

export interface WebRtcStreamer {
    setAnswer(answerSdp: string): Promise<void>
    onTrack(cb: (event: RTCTrackEvent) => void): void
}
