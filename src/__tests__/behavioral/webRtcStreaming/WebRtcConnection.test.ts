import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockRtcPeerConnection from '../../../tests/MockRtcPeerConnection'
import WebRtcConnectionImpl, {
    WebRtcConnection,
    WebRtcConnectionState,
    WebRtcStateChangeEvent,
    WebRtcStateChangeHandler,
    WebRtcVcPluginCreateOfferOptions,
} from '../../../webRtcStreaming/WebRtcConnection'

@suite()
export default class WebRtcVcPluginTest extends AbstractViewControllerTest {
    private webRtc!: WebRtcConnection
    private stateChanges: WebRtcConnectionState[] = []
    private stateChangeEvents: (WebRtcStateChangeEvent | undefined)[] = []

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()

        this.stateChanges = []
        this.stateChangeEvents = []

        WebRtcConnectionImpl.RTCPeerConnection = MockRtcPeerConnection
        this.webRtc = WebRtcConnectionImpl.Connection()

        this.webRtc.onStateChange((state, event) => {
            this.stateChanges.push(state)
            this.stateChangeEvents.push(event)
        })
    }

    @test()
    protected async createOfferThrowsWithMissing() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => this.webRtc.createOffer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['offerOptions'],
        })
    }

    @test()
    protected async canCreateOfferWithRequried() {
        await this.createOffer()
    }

    @test()
    protected async createsPeerConnectionWhenCreatingOffer() {
        await this.createOffer()
        assert.isTruthy(
            this.peerConnection,
            `You didn't create a peer connection`
        )
    }

    @test()
    protected async passedDefaultOptionsToPeerConnection() {
        await this.createOffer()
        this.peerConnection.assertCreatedWithOptions({
            sdpSemantics: 'unified-plan',
            iceServers: [],
        })
    }

    @test()
    protected async callsCreateOfferOnConnection() {
        await this.createOffer()
        this.peerConnection.assertAddedTranseivers({})
    }

    @test()
    protected async passesThroughOfferOptions() {
        const expected = {
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
        }

        await this.createOffer({
            offerOptions: expected,
        })
        this.peerConnection.assertAddedTranseivers(expected)
    }

    @test()
    protected async createsDataChannnelWhenCreatingOffer() {
        await this.createOffer()
        this.peerConnection.assertCreatedDataChannel('dataSendChannel')
    }

    @test()
    protected async passingIceRestartToOfferPassesThroughToConnection() {
        const expected = {
            iceRestart: false,
        }

        await this.createOffer({
            offerOptions: expected,
        })

        this.assertOfferOptionsEquals(expected)
    }

    @test()
    protected async defaultsToIceRestartTrueWhenCreatingOffer() {
        await this.createOffer()
        this.assertOfferOptionsEquals({
            iceRestart: true,
        })
    }

    @test()
    protected async callsEverythingInTheExpectedOrderWhenCreatingOffer() {
        const expected = {
            offerToReceiveVideo: true,
            offerToReceiveAudio: true,
        }

        await this.createOffer({
            offerOptions: expected,
        })

        this.peerConnection.assertTranceiversAndDataChannelCreatedInOrder([
            'addTransceiver:audio',
            'addTransceiver:video',
            'createDataChannel:dataSendChannel',
        ])
    }

    @test()
    protected async setsResponseToConnectionCreateOfferToConnectionLocalDescription() {
        await this.createOffer()
        this.peerConnection.assertSetsResponseToConnectionLocalDescription()
    }

    @test()
    protected async createOfferReturnsTheCreatedOffer() {
        const { offerSdp } = await this.createOffer()
        this.peerConnection.assertCreatedOfferEquals(offerSdp)
    }

    @test()
    protected async settingAnswerToStreamerThrowsWithMissing() {
        const { streamer } = await this.createOffer()
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => streamer.setAnswer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['answerSdp'],
        })
    }

    @test()
    protected async settingAswerToStreamerSetsRemoteDescriptionOnConnection() {
        const answerSdp = generateId()
        const { streamer } = await this.createOffer()
        await streamer.setAnswer(answerSdp)
        this.peerConnection.assertSetAnswerEquals({
            type: 'answer',
            sdp: answerSdp,
        })
    }

    @test()
    protected async streamerHasOnTrackMethod() {
        const { streamer } = await this.createOffer()
        assert.isFunction(streamer.onTrack)
    }

    @test()
    protected async onTrackMethodAddsListenerToConnection() {
        const { streamer } = await this.createOffer()
        const listener = () => {}
        streamer.onTrack(listener)
        this.peerConnection.assertTrackListenerSet(listener)
    }

    @test()
    protected async canAddEventListenerForCreatingOffer() {
        let passedState: WebRtcConnectionState | undefined
        this.webRtc.onStateChange((state) => {
            passedState = state
        })

        assert.isFalsy(
            passedState,
            'State change was hit before offer was created'
        )
        await this.createOffer()
        assert.isTruthy(passedState, 'State change was not hit')
        assert.isEqual(
            passedState,
            'createdOffer',
            'State change was not correct'
        )
    }

    @test()
    protected async canSetMultipleEventListeners() {
        let passedState: WebRtcConnectionState | undefined
        this.webRtc.onStateChange((state) => {
            passedState = state
        })

        let secondPassedState: WebRtcConnectionState | undefined
        this.webRtc.onStateChange((state) => {
            secondPassedState = state
        })

        await this.createOffer()

        assert.isTruthy(passedState, 'State change was not hit')
        assert.isEqual(
            passedState,
            'createdOffer',
            'State change was not correct'
        )
        assert.isEqual(
            secondPassedState,
            'createdOffer',
            'Second state change was not correct'
        )
    }

    @test()
    protected async emitsCreatedOfferAfterActuallyCreatingTheOffer() {
        const hits: string[] = []

        MockRtcPeerConnection.onCreateOffer(() => {
            hits.push('onCreateOffer')
        })

        this.webRtc.onStateChange(() => {
            hits.push('onStateChange')
        })

        await this.createOffer()

        assert.isEqualDeep(
            hits,
            ['onCreateOffer', 'onStateChange'],
            'Did not emit the correct events'
        )
    }

    @test()
    protected async canHookIntoAnswerSupplied() {
        const { streamer } = await this.createOffer()
        await streamer.setAnswer(generateId())

        assert.isEqualDeep(
            this.stateChanges,
            ['createdOffer', 'suppliedAnswer'],
            'Did not emit the correct events'
        )
    }

    @test()
    protected async emitsWhenReceivingTrack() {
        await this.createOffer()

        assert.isEqualDeep(
            this.stateChanges,
            ['createdOffer'],
            'Did not emit the correct events. Called trackAdded too soon.'
        )
        await this.emitConnectionEvent('track')

        assert.isEqualDeep(
            this.stateChanges,
            ['createdOffer', 'trackAdded'],
            'Did not emit the correct events'
        )
    }

    @test()
    protected async emittingTrackPassesThroughEvent() {
        await this.createOffer()

        const event = {} as any
        await this.emitConnectionEvent('track', event)
        assert.isEqual(
            this.stateChangeEvents.pop(),
            event,
            'Event was not passed through'
        )
    }

    @test()
    protected async canRemoveStateChangeListener() {
        let wasHit = false
        const listener: WebRtcStateChangeHandler = () => {
            wasHit = true
        }

        this.webRtc.onStateChange(listener)
        this.webRtc.offStateChange(listener)

        await this.createOffer()

        assert.isFalse(
            wasHit,
            'State change was hit when it should not have been'
        )
    }

    @test()
    protected async removesCorrectListener() {
        let wasHit = false
        const listener: WebRtcStateChangeHandler = () => {
            wasHit = true
        }

        this.webRtc.onStateChange(listener)
        this.webRtc.offStateChange(() => {})

        await this.createOffer()

        assert.isTrue(
            wasHit,
            'State change was not hit and should have been. Make sure you are removing the correct listener'
        )
    }

    @test()
    protected async getConnectionThrowsIfHaventCreatedOffer() {
        const err = await assert.doesThrowAsync(() => {
            return this.webRtc.getRtcPeerConnection()
        })

        errorAssert.assertError(err, 'DID_NOT_GENERATE_OFFER')
    }

    @test()
    protected async getConnectionReturnsPeerConnection() {
        const { rtcPeerConnection } = await this.createOffer()
        const connection = this.webRtc.getRtcPeerConnection()
        assert.isEqual(
            connection,
            rtcPeerConnection,
            'The connection returned was not the peer connection'
        )
    }

    @test()
    protected async stateChangeFiresOnPeerConnectionStatusChangeFailure() {
        await this.createOffer()

        this.setConnectionState('failed')

        await this.emitConnectionEvent('connectionstatechange')

        assert.doesInclude(
            this.stateChanges,
            'error',
            'Did not emit the correct events'
        )
    }

    @test()
    protected async connectionStateChangeNotFailedDoesNotEmitStateChangeEvent() {
        await this.createOffer()

        this.setConnectionState('connected')
        await this.emitConnectionEvent('connectionstatechange')

        assert.doesNotInclude(
            this.stateChanges,
            'error',
            'Should not have emitted an error event'
        )
    }

    @test('passes through connection stats to fail event 1', [])
    @test('passes through connection stats to fail event 2', [{ go: 'team' }])
    protected async failedPassesThroughConnectionStats(stats: RTCStatsReport) {
        await this.createOffer()

        this.peerConnection.setStats(stats)

        this.setConnectionState('failed')

        await this.emitConnectionEvent('connectionstatechange')

        const lastEvent = this.stateChangeEvents.pop()
        assert.isEqualDeep(
            lastEvent,
            { stats, connection: this.peerConnection as RTCPeerConnection },
            'Stats were not passed through'
        )
    }

    @test('passes through connecting event', 'connecting')
    @test('passes through connected event', 'connected')
    @test('passes through disconnected event', 'disconnected')
    protected async passesThroughPeerConnectionEvents(
        state: RTCPeerConnectionState
    ) {
        await this.createOffer()
        this.setConnectionState(state)
        await this.emitConnectionEvent('connectionstatechange')
        assert.isEqualDeep(
            this.stateChanges,
            ['createdOffer', state],
            'Did not emit the correct events'
        )

        assert.isEqualDeep(
            this.stateChangeEvents,
            [
                undefined,
                { connection: this.peerConnection as RTCPeerConnection },
            ],
            'Did not pass through the expected events'
        )
    }

    private setConnectionState(state: RTCPeerConnectionState) {
        this.peerConnection.connectionState = state
    }

    private assertOfferOptionsEquals(expected: { iceRestart: boolean }) {
        this.peerConnection.assertCreateOfferOptionsEqual(expected)
    }

    private get peerConnection(): MockRtcPeerConnection {
        return MockRtcPeerConnection.instance
    }

    private async createOffer(options?: WebRtcVcPluginCreateOfferOptions) {
        return await this.webRtc.createOffer({
            offerOptions: {},
            ...options,
        })
    }

    private async emitConnectionEvent(
        eventName: 'track' | 'connectionstatechange',
        event?: any
    ) {
        await this.peerConnection.emitEvent(eventName, event)
    }
}
