import { assert, errorAssert, generateId, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import MockRtcPeerConnection from '../../../tests/MockRtcPeerConnection'
import generateCropPointValues from '../../../tests/utilities/generateCropPointValues'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    Card,
    WebRtcCropPoint,
    WebRtcPlayer,
    WebRtcStreamer,
} from '../../../types/heartwood.types'
import WebRtcPlayerViewController from '../../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'
import WebRtcConnectionImpl, {
    WebRtcConnection,
    WebRtcCreateOfferResponse,
    WebRtcStateChangeHandler,
    WebRtcVcPluginCreateOfferOptions,
} from '../../../webRtcStreaming/WebRtcConnection'
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

        delete WebRtcConnectionImpl.Class
        WebRtcConnectionImpl.RTCPeerConnection = MockRtcPeerConnection
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
        this.peerConnection.assertAddedTranseivers(offerOptions)
    }

    @test()
    protected static async returnsCreatedOffer() {
        const offerSdp = await this.createOffer()
        this.peerConnection.assertCreatedOfferSdpEquals(offerSdp)
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

    @test()
    protected static async rendersWebRtcConnectionToViewModel() {
        WebRtcConnectionImpl.Class = SpyWebRtcConnection
        this.vc = this.Vc({})
        await this.createOffer()
        const model = this.render(this.vc)
        assert.isEqual(
            model.connection,
            SpyWebRtcConnection.instance,
            'Did not return connection from render'
        )
    }

    @test()
    protected static async callingOnCropSetsOnVc() {
        const actual: WebRtcCropPoint = await this.callOnCropInViewModel()
        const expected = this.vc.getCrop()
        assert.isEqualDeep(actual, expected, 'Crop point was not set')
    }

    @test()
    protected static async stillCallsOnCropPassedToConstructor() {
        let passedPoint: WebRtcCropPoint | undefined

        this.vc = this.Vc({
            onCrop: (point) => {
                passedPoint = point
            },
        })

        const actual: WebRtcCropPoint = await this.callOnCropInViewModel()
        assert.isEqualDeep(
            actual,
            passedPoint,
            'Crop point was not set on passed in onCrop'
        )
    }

    @test()
    protected static async settingCropTriggersRender() {
        const crop = generateCropPointValues()
        this.vc.setCrop(crop)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async canEnableCropping() {
        this.vc.enableCropping()
        this.assertShouldAllowCroppingEquals(true)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected static async canDisableCropping() {
        this.vc.disableCropping()
        this.assertShouldAllowCroppingEquals(false)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private static assertShouldAllowCroppingEquals(expected: boolean) {
        const model = this.render(this.vc)
        assert.isEqual(
            model.shouldAllowCropping,
            expected,
            'Should allow cropping is wrong'
        )
    }

    private static async callOnCropInViewModel() {
        const model = this.render(this.vc)
        const actual: WebRtcCropPoint = generateCropPointValues()
        await model.onCrop?.(actual)
        return actual
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

    private static get peerConnection(): MockRtcPeerConnection {
        return MockRtcPeerConnection.instance
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

class SpyWebRtcConnection implements WebRtcConnection {
    public static instance: SpyWebRtcConnection
    public constructor() {
        SpyWebRtcConnection.instance = this
    }

    public getRtcPeerConnection(): RTCPeerConnection {
        return new MockRtcPeerConnection() as any
    }

    public async createOffer(
        _options: WebRtcVcPluginCreateOfferOptions
    ): Promise<WebRtcCreateOfferResponse> {
        return {
            offerSdp: {} as any,
            rtcPeerConnection: new MockRtcPeerConnection() as any,
            streamer: new SpyWebRtcStreamer(),
        }
    }
    public onStateChange(_cb: WebRtcStateChangeHandler): void {}
    public offStateChange(_listener: WebRtcStateChangeHandler): void {}
}
