import { assert, generateId } from '@sprucelabs/test-utils'

export default class MocRtcPeerConnection implements RTCPeerConnection {
    public static instance: MocRtcPeerConnection
    private constructorOptions?: RTCConfiguration
    private offerOptions?: RTCOfferOptions | undefined
    public offer = {
        [generateId()]: generateId(),
    } as unknown as RTCSessionDescription
    private lastAddedEventListener?: { eventName: unknown; listener: unknown }

    public constructor(options?: RTCConfiguration) {
        MocRtcPeerConnection.instance = this
        this.constructorOptions = options
    }

    public assertGeneratedOfferEquals(offer: RTCSessionDescriptionInit) {
        assert.isEqualDeep(
            offer,
            this.offer,
            'Did not return the generated offer'
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

    public assertCalledCreateOfferWith(expected: RTCOfferOptions) {
        assert.isEqualDeep(
            this.offerOptions,
            expected,
            'Did not pass expected options to createOffer'
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

    public canTrickleIceCandidates: boolean | null = null
    public connectionState: RTCPeerConnectionState =
        {} as RTCPeerConnectionState
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
        _trackOrKind: unknown,
        _init?: unknown
    ): RTCRtpTransceiver {
        return {} as RTCRtpTransceiver
    }

    public close(): void {
        throw new Error('Method not implemented.')
    }

    //@ts-ignore
    public createAnswer(
        _successCallback?: unknown,
        _failureCallback?: unknown
    ): Promise<void> | Promise<RTCSessionDescriptionInit> {
        return {} as Promise<void> | Promise<RTCSessionDescriptionInit>
    }

    public createDataChannel(
        _label: unknown,
        _dataChannelDict?: unknown
    ): RTCDataChannel {
        return {} as RTCDataChannel
    }

    //@ts-ignore
    public async createOffer(options?: RTCOfferOptions) {
        this.offerOptions = options
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

    //@ts-ignore
    public async getStats(
        _selector?: unknown,
        _successCallback?: unknown,
        _failureCallback?: unknown
    ) {
        throw new Error('Method not implemented.')
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
    }

    public removeEventListener(
        _type: unknown,
        _listener: unknown,
        _options?: unknown
    ): void {
        throw new Error('Method not implemented.')
    }

    public dispatchEvent(_event: Event): boolean {
        return true
    }
}
