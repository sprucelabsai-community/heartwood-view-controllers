import { assertOptions } from '@sprucelabs/schema'

export default class WebRtcStreamerImpl {
    private connection: RTCPeerConnection
    protected constructor(connection: RTCPeerConnection) {
        this.connection = connection
    }

    public static Streamer(connection: RTCPeerConnection) {
        return new WebRtcStreamerImpl(connection)
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
