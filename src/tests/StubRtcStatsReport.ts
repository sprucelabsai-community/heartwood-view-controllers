export default class StubRtcStatsReport
    extends Map<string, RTCStats>
    implements RTCStatsReport
{
    public constructor() {
        super()

        const baseTime = Date.now()

        this.set('inbound-rtp', {
            id: 'inbound-rtp',
            type: 'inbound-rtp',
            timestamp: baseTime,
            kind: 'video',
            ssrc: 1234,
            bytesReceived: 500000,
            packetsReceived: 1000,
            packetsLost: 10,
            jitter: 0.005,
        } as any)

        this.set('outbound-rtp', {
            id: 'outbound-rtp',
            type: 'outbound-rtp',
            timestamp: baseTime,
            kind: 'video',
            ssrc: 5678,
            bytesSent: 700000,
            packetsSent: 1200,
        } as any)

        this.set('candidate-pair', {
            id: 'candidate-pair',
            type: 'candidate-pair',
            timestamp: baseTime,
            state: 'succeeded',
            currentRoundTripTime: 0.03,
            availableOutgoingBitrate: 3000000,
        } as any)
    }
}
