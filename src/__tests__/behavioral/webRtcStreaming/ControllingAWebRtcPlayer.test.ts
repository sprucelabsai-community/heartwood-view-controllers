import { assert, errorAssert, generateId, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MocRtcPeerConnection from '../../../tests/MockRtcPeerConnection'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    Card,
    WebRtcPlayer,
    WebRtcStreamer,
} from '../../../types/heartwood.types'
import WebRtcPlayerViewController from '../../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'
import WebRtcConnection from '../../../webRtcStreaming/WebRtcConnection'
import WebRtcStreamerImpl from '../../../webRtcStreaming/WebRtcStreamer'

class StubWebRtcStreamer implements WebRtcStreamer {
    public async setAnswer(_answerSdp: string): Promise<void> {}
    public onTrack(_cb: (event: RTCTrackEvent) => void): void {}
}

export default class ControllingAWebRtcPlayerTest extends AbstractViewControllerTest {
    private static vc: WebRtcPlayerViewController
    private static streamer = new StubWebRtcStreamer()

    protected static async beforeEach() {
        await super.beforeEach()
        const options: Card = {}

        this.vc = this.Vc(options)

        WebRtcConnection.RTCPeerConnection = MocRtcPeerConnection
        WebRtcStreamerImpl.Class = SpyWebRtcStreamer
    }

    @test()
    protected static async setStreamerThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.setStreamer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['streamer'],
        })
    }

    @test()
    protected static async doesNotThrowWhenPassedStreamer() {
        this.setStreamer()
    }

    @test()
    protected static async returnsStreamerAfterIfSet() {
        this.setStreamer()
        this.assertReturnsStreamerInViewModel()
    }

    @test()
    protected static async settingStreamerTriggersRender() {
        this.setStreamer()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async passesStreamerThroughConstructor() {
        this.vc = this.Vc({
            streamer: this.streamer,
        })
        this.assertReturnsStreamerInViewModel()
    }

    @test('passes options to create offer 1', {
        offerToReceiveAudio: true,
    })
    @test('passes options to create offer 2', {
        offerToReceiveAudio: false,
        offerToReceiveVideo: true,
    })
    protected static async createOfferPassesThroughCreateOfferOptions(
        offerOptions: RTCOfferOptions
    ) {
        await this.createOffer(offerOptions)
        assert.isTruthy(this.peerConnection, 'Did not attepmt to create offer')
        this.peerConnection.assertCalledCreateOfferWith(offerOptions)
    }

    @test()
    protected static async returnsGeneratedOffer() {
        const offerSdp = await this.createOffer()
        this.peerConnection.assertGeneratedOfferSdpEquals(offerSdp)
    }

    @test()
    protected static async createOfferSetsStreamerToPlayer() {
        await this.createOffer()
        this.streamer = this.spyStreamerOnVc
        this.assertReturnsStreamerInViewModel()
    }

    @test()
    protected static async settingAnswerBeforeOfferThrows() {
        const answer = generateId()
        const err = await assert.doesThrowAsync(() =>
            this.setAnswerOnVc(answer)
        )
        errorAssert.assertError(err, 'DID_NOT_GENERATE_OFFER')
    }

    @test()
    protected static async canSetAnswerOnVc() {
        await this.createOffer()
        const answer = generateId()
        await this.setAnswerOnVc(answer)
        assert.isEqual(this.spyStreamerOnVc.answer, answer)
    }

    private static get spyStreamerOnVc() {
        return SpyWebRtcStreamer.instance
    }

    private static setAnswerOnVc(answer: string): any {
        return this.vc.setAnswer(answer)
    }

    private static async createOffer(offerOptions?: RTCOfferOptions) {
        return await this.vc.createOffer(offerOptions ?? {})
    }

    private static get peerConnection(): MocRtcPeerConnection {
        return MocRtcPeerConnection.instance
    }

    private static assertReturnsStreamerInViewModel() {
        const model = this.render(this.vc)
        assert.isEqual(
            model.streamer,
            this.streamer,
            'Did not return streamer from render'
        )
        assert.isEqual(
            model.controller,
            this.vc,
            'Did not return controller from render'
        )
    }

    private static setStreamer() {
        this.vc.setStreamer(this.streamer)
    }

    private static Vc(options?: WebRtcPlayer): WebRtcPlayerViewController {
        return this.Controller('web-rtc-player', {
            ...options,
        })
    }
}

class SpyWebRtcStreamer implements WebRtcStreamer {
    public static instance: SpyWebRtcStreamer
    public answer?: string

    public constructor() {
        SpyWebRtcStreamer.instance = this
    }

    public async setAnswer(answerSdp: string): Promise<void> {
        this.answer = answerSdp
    }

    public onTrack(_cb: (event: RTCTrackEvent) => void): void {}
}
