import { assert, generateId } from '@sprucelabs/test-utils'

export default class MockRtcPeerConnection implements RTCPeerConnection {
    public static instance: MockRtcPeerConnection
    private static onCreateOfferHandler?: () => void

    private constructorOptions?: RTCConfiguration
    public offer = {
        [generateId()]: generateId(),
    } as unknown as RTCSessionDescription
    private lastAddedEventListener?: { eventName: any; listener: any }
    private eventListeners: {
        type: any
        listener: any
    }[] = []

    private addedTransceivers: AddedTransceiver[] = []
    private lastCreatedDataChannel?: {
        label: string
        dataChannelDict?: RTCDataChannelInit
    }
    private tranceiverAndDataChannelCalls: string[] = []
    private stats: RTCStatsReport = [] as unknown as RTCStatsReport

    public constructor(options?: RTCConfiguration) {
        MockRtcPeerConnection.instance = this
        this.constructorOptions = options
    }

    public assertCreatedOfferEquals(offer: RTCSessionDescriptionInit) {
        assert.isEqualDeep(
            offer,
            this.offer,
            'Did not return the generated offer'
        )
    }

    public assertCreatedDataChannel(
        label: string,
        dataChannelDict?: RTCDataChannelInit
    ) {
        assert.isEqualDeep(
            this.lastCreatedDataChannel,
            {
                label,
                dataChannelDict,
            },
            'did not create expected data channel'
        )
    }

    public assertTranceiversAndDataChannelCreatedInOrder(expected: string[]) {
        assert.isEqualDeep(
            this.tranceiverAndDataChannelCalls,
            expected,
            'Did not call addTransceiver and createDataChannel in the expected order'
        )
    }

    public assertCreatedOfferSdpEquals(sdp: string) {
        assert.isEqualDeep(
            this.offer.sdp,
            sdp,
            'Did not return the generated offer sdp'
        )
    }

    public assertCreatedWithOptions(expected: {
        sdpSemantics: string
        iceServers: never[]
    }) {
        assert.isEqualDeep(
            this.constructorOptions,
            expected,
            'Did not pass default options to peer connection'
        )
    }

    public assertAddedTranseivers(expected: RTCOfferOptions) {
        const expectedMapped: AddedTransceiver[] = []
        for (const key in expected) {
            const shouldAdd = expected[key as keyof typeof expected]
            if (shouldAdd) {
                expectedMapped.push({
                    trackOrKind:
                        key === 'offerToReceiveAudio' ? 'audio' : 'video',
                    init: { direction: 'recvonly' },
                })
            }
        }

        assert.isEqualDeep(
            this.addedTransceivers,
            expectedMapped,
            'Did not add transceivers to peer connection'
        )
    }

    public assertSetsResponseToConnectionLocalDescription() {
        assert.isEqualDeep(
            this.offer,
            this.localDescription,
            'Did not set offer to local description'
        )
    }

    public assertSetAnswerEquals(options: { type: string; sdp: string }) {
        assert.isEqualDeep(
            this.remoteDescription,
            options,
            'Did not set answer to remote description of the peer connection'
        )
    }

    public assertTrackListenerSet(expected: () => void) {
        assert.isEqualDeep(
            this.lastAddedEventListener,
            {
                eventName: 'track',
                listener: expected,
            },
            'did not call connection.addEventListener with track listener'
        )
    }

    public static onCreateOffer(cb?: () => void) {
        this.onCreateOfferHandler = cb
    }

    public canTrickleIceCandidates: boolean | null = null
    public connectionState: RTCPeerConnectionState = 'connected'
    public currentLocalDescription: RTCSessionDescription | null = null
    public currentRemoteDescription: RTCSessionDescription | null = null
    public iceConnectionState: RTCIceConnectionState =
        {} as RTCIceConnectionState
    public iceGatheringState: RTCIceGatheringState = {} as RTCIceGatheringState
    public localDescription: RTCSessionDescription | null = null

    public onconnectionstatechange:
        | ((this: RTCPeerConnection, ev: Event) => any)
        | null = null
    public ondatachannel:
        | ((this: RTCPeerConnection, ev: RTCDataChannelEvent) => any)
        | null = null
    public onicecandidate:
        | ((this: RTCPeerConnection, ev: RTCPeerConnectionIceEvent) => any)
        | null = null
    public onicecandidateerror:
        | ((this: RTCPeerConnection, ev: RTCPeerConnectionIceErrorEvent) => any)
        | null = null
    public oniceconnectionstatechange:
        | ((this: RTCPeerConnection, ev: Event) => any)
        | null = null
    public onicegatheringstatechange:
        | ((this: RTCPeerConnection, ev: Event) => any)
        | null = null
    public onnegotiationneeded:
        | ((this: RTCPeerConnection, ev: Event) => any)
        | null = null
    public onsignalingstatechange:
        | ((this: RTCPeerConnection, ev: Event) => any)
        | null = null
    public ontrack:
        | ((this: RTCPeerConnection, ev: RTCTrackEvent) => any)
        | null = null
    public pendingLocalDescription: RTCSessionDescription | null = null
    public pendingRemoteDescription: RTCSessionDescription | null = null
    public remoteDescription: RTCSessionDescription | null = null
    public sctp: RTCSctpTransport | null = null

    public signalingState: RTCSignalingState = {} as RTCSignalingState

    public async addIceCandidate(
        _candidate?: unknown,
        _successCallback?: unknown,
        _failureCallback?: unknown
    ): Promise<void> {
        throw new Error('Method not implemented.')
    }

    public addTrack(_track: unknown, ..._streams: unknown[]): RTCRtpSender {
        return {} as RTCRtpSender
    }

    public addTransceiver(
        trackOrKind: MediaStreamTrack | string,
        init?: RTCRtpTransceiverInit
    ): RTCRtpTransceiver {
        this.addedTransceivers.push({
            trackOrKind,
            init,
        })

        this.tranceiverAndDataChannelCalls.push(`addTransceiver:${trackOrKind}`)
        return {} as RTCRtpTransceiver
    }

    public close(): void {
        throw new Error('Method not implemented.')
    }

    public async createAnswer(
        _successCallback?: unknown,
        _failureCallback?: unknown
    ) {
        return {} as any
    }

    public createDataChannel(
        label: string,
        dataChannelDict?: RTCDataChannelInit
    ): RTCDataChannel {
        this.lastCreatedDataChannel = {
            label,
            dataChannelDict,
        }

        this.tranceiverAndDataChannelCalls.push(`createDataChannel:${label}`)

        return {} as RTCDataChannel
    }

    //@ts-ignore
    public async createOffer(_options?: RTCOfferOptions) {
        MockRtcPeerConnection.onCreateOfferHandler?.()
        return this.offer as any
    }

    public getConfiguration(): RTCConfiguration {
        return {} as RTCConfiguration
    }

    public getReceivers(): RTCRtpReceiver[] {
        return []
    }

    public getSenders(): RTCRtpSender[] {
        return []
    }

    public async getStats(
        _selector?: unknown,
        _successCallback?: unknown,
        _failureCallback?: unknown
    ) {
        return this.stats
    }

    public setStats(stats: RTCStatsReport) {
        this.stats = stats
    }

    public getTransceivers(): RTCRtpTransceiver[] {
        return []
    }

    public removeTrack(): void {}

    public restartIce(): void {}

    public setConfiguration(_configuration?: unknown): void {}

    public async setLocalDescription(
        description?: RTCLocalSessionDescriptionInit
    ): Promise<void> {
        this.localDescription = description as RTCSessionDescription
    }
    public async setRemoteDescription(description: {
        type: 'answer'
        sdp: string
    }): Promise<void> {
        this.remoteDescription = description as RTCSessionDescription
    }

    public addEventListener(
        type: unknown,
        listener: unknown,
        _options?: unknown
    ): void {
        this.lastAddedEventListener = {
            eventName: type,
            listener,
        }

        this.eventListeners.push({
            type,
            listener,
        })
    }

    public removeEventListener(
        _type: unknown,
        _listener: unknown,
        _options?: unknown
    ): void {
        throw new Error('Method not implemented.')
    }

    public async emitEvent(name: string, event?: Event) {
        for (const listener of this.eventListeners) {
            if (listener.type === name) {
                await listener.listener(event)
            }
        }
    }

    public dispatchEvent(_event: Event): boolean {
        return true
    }
}

export interface AddedTransceiver {
    trackOrKind: MediaStreamTrack | string
    init?: RTCRtpTransceiverInit
}
