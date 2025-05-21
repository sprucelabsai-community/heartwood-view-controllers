import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockRtcPeerConnection from '../../../tests/MockRtcPeerConnection'
import WebRtcConnectionImpl, {
    WebRtcConnection,
    WebRtcConnectionState,
    WebRtcStateChangeEvent,
    WebRtcStateChangeHandler,
    WebRtcVcPluginCreateOfferOptions,
} from '../../../webRtcStreaming/WebRtcConnection'

export default class WebRtcVcPluginTest extends AbstractViewControllerTest {
    private static webRtc: WebRtcConnection
    private static stateChanges: WebRtcConnectionState[] = []
    private static stateChangeEvents: (WebRtcStateChangeEvent | undefined)[] =
        []

    protected static async beforeEach(): Promise<void> {
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
    protected static async createOfferThrowsWithMissing() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => this.webRtc.createOffer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['offerOptions'],
        })
    }

    @test()
    protected static async canCreateOfferWithRequried() {
        await this.createOffer()
    }

    @test()
    protected static async createsPeerConnectionWhenCreatingOffer() {
        await this.createOffer()
        assert.isTruthy(
            this.peerConnection,
            `You didn't create a peer connection`
        )
    }

    @test()
    protected static async passedDefaultOptionsToPeerConnection() {
        await this.createOffer()
        this.peerConnection.assertCreatedWithOptions({
            sdpSemantics: 'unified-plan',
            iceServers: [],
        })
    }

    @test()
    protected static async callsCreateOfferOnConnection() {
        await this.createOffer()
        this.peerConnection.assertAddedTranseivers({})
    }

    @test()
    protected static async passesThroughOfferOptions() {
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
    protected static async createsDataChannnelWhenCreatingOffer() {
        await this.createOffer()
        this.peerConnection.assertCreatedDataChannel('dataSendChannel')
    }

    @test()
    protected static async callsEverythingInTheExpectedOrderWhenCreatingOffer() {
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
    protected static async setsResponseToConnectionCreateOfferToConnectionLocalDescription() {
        await this.createOffer()
        this.peerConnection.assertSetsResponseToConnectionLocalDescription()
    }

    @test()
    protected static async createOfferReturnsTheCreatedOffer() {
        const { offerSdp } = await this.createOffer()
        this.peerConnection.assertCreatedOfferEquals(offerSdp)
    }

    @test()
    protected static async settingAnswerToStreamerThrowsWithMissing() {
        const { streamer } = await this.createOffer()
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => streamer.setAnswer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['answerSdp'],
        })
    }

    @test()
    protected static async settingAswerToStreamerSetsRemoteDescriptionOnConnection() {
        const answerSdp = generateId()
        const { streamer } = await this.createOffer()
        await streamer.setAnswer(answerSdp)
        this.peerConnection.assertSetAnswerEquals({
            type: 'answer',
            sdp: answerSdp,
        })
    }

    @test()
    protected static async streamerHasOnTrackMethod() {
        const { streamer } = await this.createOffer()
        assert.isFunction(streamer.onTrack)
    }

    @test()
    protected static async onTrackMethodAddsListenerToConnection() {
        const { streamer } = await this.createOffer()
        const listener = () => {}
        streamer.onTrack(listener)
        this.peerConnection.assertTrackListenerSet(listener)
    }

    @test()
    protected static async canAddEventListenerForCreatingOffer() {
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
    protected static async canSetMultipleEventListeners() {
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
    protected static async emitsCreatedOfferAfterActuallyCreatingTheOffer() {
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
    protected static async canHookIntoAnswerSupplied() {
        const { streamer } = await this.createOffer()
        await streamer.setAnswer(generateId())

        assert.isEqualDeep(
            this.stateChanges,
            ['createdOffer', 'suppliedAnswer'],
            'Did not emit the correct events'
        )
    }

    @test()
    protected static async emitsWhenReceivingTrack() {
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
    protected static async emittingTrackPassesThroughEvent() {
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
    protected static async canRemoveStateChangeListener() {
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
    protected static async removesCorrectListener() {
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
    protected static async getConnectionThrowsIfHaventCreatedOffer() {
        const err = await assert.doesThrowAsync(() => {
            return this.webRtc.getRtcPeerConnection()
        })

        errorAssert.assertError(err, 'DID_NOT_GENERATE_OFFER')
    }

    @test()
    protected static async getConnectionReturnsPeerConnection() {
        const { rtcPeerConnection } = await this.createOffer()
        const connection = this.webRtc.getRtcPeerConnection()
        assert.isEqual(
            connection,
            rtcPeerConnection,
            'The connection returned was not the peer connection'
        )
    }

    @test()
    protected static async stateChangeFiresOnPeerConnectionStatusChangeFailure() {
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
    protected static async connectionStateChangeNotFailedDoesNotEmitStateChangeEvent() {
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
    @test('passes through connection stats to fail event 2', { go: 'team' })
    protected static async failedPassesThroughConnectionStats(
        stats: RTCStatsReport
    ) {
        await this.createOffer()

        this.peerConnection.setStats(stats)

        this.setConnectionState('failed')

        await this.emitConnectionEvent('connectionstatechange')

        const lastEvent = this.stateChangeEvents.pop()
        assert.isEqualDeep(
            lastEvent,
            { stats },
            'Stats were not passed through'
        )
    }

    private static setConnectionState(state: RTCPeerConnectionState) {
        this.peerConnection.connectionState = state
    }

    private static get peerConnection(): MockRtcPeerConnection {
        return MockRtcPeerConnection.instance
    }

    private static async createOffer(
        options?: WebRtcVcPluginCreateOfferOptions
    ) {
        return await this.webRtc.createOffer({
            offerOptions: {},
            ...options,
        })
    }

    private static async emitConnectionEvent(
        eventName: 'track' | 'connectionstatechange',
        event?: any
    ) {
        await this.peerConnection.emitEvent(eventName, event)
    }
}
