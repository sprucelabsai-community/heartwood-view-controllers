import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MocRtcPeerConnection from '../../../tests/MockRtcPeerConnection'
import WebRtcConnection, {
    WebRtcVcPluginCreateOfferOptions,
} from '../../../webRtcStreaming/WebRtcConnection'

export default class WebRtcVcPluginTest extends AbstractViewControllerTest {
    private static webRtc: typeof WebRtcConnection

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        WebRtcConnection.RTCPeerConnection = MocRtcPeerConnection as any
        this.webRtc = WebRtcConnection
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
        this.peerConnection.assertCalledCreateOfferWith({})
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
        this.peerConnection.assertCalledCreateOfferWith(expected)
    }

    @test()
    protected static async setsResponseToConnectionCreateOfferToConnectionLocalDescription() {
        await this.createOffer()
        this.peerConnection.assertSetsResponseToConnectionLocalDescription()
    }

    @test()
    protected static async createOfferReturnsTheCreatedOffer() {
        const { offerSdp } = await this.createOffer()
        this.peerConnection.assertGeneratedOfferEquals(offerSdp)
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

    private static get peerConnection(): MocRtcPeerConnection {
        return MocRtcPeerConnection.instance
    }

    private static async createOffer(
        options?: WebRtcVcPluginCreateOfferOptions
    ) {
        return await this.webRtc.createOffer({
            offerOptions: {},
            ...options,
        })
    }
}
