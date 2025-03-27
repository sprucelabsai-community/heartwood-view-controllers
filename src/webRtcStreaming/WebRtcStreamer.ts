import { assertOptions } from '@sprucelabs/schema'

export default class WebRtcStreamerImpl implements WebRtcStreamer {
    private connection: RTCPeerConnection

    public static Class?: new (connection: RTCPeerConnection) => WebRtcStreamer

    protected constructor(connection: RTCPeerConnection) {
        this.connection = connection
    }

    public static Streamer(connection: RTCPeerConnection) {
        return new (this.Class ?? this)(connection)
    }

    public async setAnswer(answerSdp: string) {
        assertOptions({ answerSdp }, ['answerSdp'])
        await this.connection.setRemoteDescription({
            type: 'answer',
            sdp: answerSdp,
        })
    }

    public onTrack(cb: (event: RTCTrackEvent) => void) {
        this.connection.addEventListener('track', cb)
    }
}

export interface WebRtcStreamer {
    setAnswer(answerSdp: string): Promise<void>
    onTrack(cb: (event: RTCTrackEvent) => void): void
}
