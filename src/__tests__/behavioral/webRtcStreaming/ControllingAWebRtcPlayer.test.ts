import {
    assert,
    errorAssert,
    generateId,
    test,
    suite,
} from '@sprucelabs/test-utils'
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

@suite()
export default class ControllingAWebRtcPlayerTest extends AbstractViewControllerTest {
    private vc!: WebRtcPlayerViewController
    private streamer = new StubWebRtcStreamer()

    protected async beforeEach() {
        await super.beforeEach()
        const options: Card = {}

        delete WebRtcConnectionImpl.Class
        WebRtcConnectionImpl.RTCPeerConnection = MockRtcPeerConnection
        WebRtcStreamerImpl.Class = SpyWebRtcStreamer

        this.vc = this.Vc(options)
    }

    @test()
    protected async setStreamerThrowsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.setStreamer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['streamer'],
        })
    }

    @test()
    protected async doesNotThrowWhenPassedStreamer() {
        this.setStreamer()
    }

    @test()
    protected async returnsStreamerAfterIfSet() {
        this.setStreamer()
        this.assertReturnsStreamerInViewModel()
    }

    @test()
    protected async settingStreamerTriggersRender() {
        this.setStreamer()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async passesStreamerThroughConstructor() {
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
    protected async createOfferPassesThroughCreateOfferOptions(
        offerOptions: RTCOfferOptions
    ) {
        await this.createOffer(offerOptions)
        assert.isTruthy(this.peerConnection, 'Did not attepmt to create offer')
        this.peerConnection.assertAddedTranseivers(offerOptions)
    }

    @test()
    protected async returnsCreatedOffer() {
        const offerSdp = await this.createOffer()
        this.peerConnection.assertCreatedOfferSdpEquals(offerSdp)
    }

    @test()
    protected async createOfferSetsStreamerToPlayer() {
        await this.createOffer()
        this.streamer = this.spyStreamerOnVc
        this.assertReturnsStreamerInViewModel()
    }

    @test()
    protected async settingAnswerBeforeOfferThrows() {
        const answer = generateId()
        const err = await assert.doesThrowAsync(() =>
            this.setAnswerOnVc(answer)
        )
        errorAssert.assertError(err, 'DID_NOT_GENERATE_OFFER')
    }

    @test()
    protected async canSetAnswerOnVc() {
        await this.createOffer()
        const answer = generateId()
        await this.setAnswerOnVc(answer)
        assert.isEqual(this.spyStreamerOnVc.answer, answer)
    }

    @test()
    protected async rendersWebRtcConnectionToViewModel() {
        WebRtcConnectionImpl.Class = SpyWebRtcConnection
        this.vc = this.Vc({})
        await this.createOffer()
        const model = this.render(this.vc)
        assert.isEqual(
            model.connection,
            this.spyWebRtcConnection,
            'Did not return connection from render'
        )
    }

    @test()
    protected async callingOnCropSetsOnVc() {
        const actual: WebRtcCropPoint = await this.callOnCropInViewModel()
        const expected = this.vc.getCrop()
        assert.isEqualDeep(actual, expected, 'Crop point was not set')
    }

    @test()
    protected async stillCallsOnCropPassedToConstructor() {
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
    protected async settingCropTriggersRender() {
        const crop = generateCropPointValues()
        this.vc.setCrop(crop)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async canEnableCropping() {
        this.vc.enableCropping()
        this.assertShouldAllowCroppingEquals(true)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async canDisableCropping() {
        this.vc.disableCropping()
        this.assertShouldAllowCroppingEquals(false)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async canHookIntoStateChangeEvents() {
        WebRtcConnectionImpl.Class = SpyWebRtcConnection

        const stateChangeHandler = () => {}

        this.vc = this.Vc({
            onStateChange: stateChangeHandler,
        })

        assert.isEqual(
            this.spyWebRtcConnection.stateChangeListeners[0],
            stateChangeHandler,
            'Did not register state change listener'
        )
    }

    private get spyWebRtcConnection() {
        assert.isTruthy(
            SpyWebRtcConnection.instance,
            'Make sure you set WebRtcConnectionImpl.Class = SpyWebRtcConnection before constructing the vc'
        )
        return SpyWebRtcConnection.instance
    }

    private assertShouldAllowCroppingEquals(expected: boolean) {
        const model = this.render(this.vc)
        assert.isEqual(
            model.shouldAllowCropping,
            expected,
            'Should allow cropping is wrong'
        )
    }

    private async callOnCropInViewModel() {
        const model = this.render(this.vc)
        const actual: WebRtcCropPoint = generateCropPointValues()
        await model.onCrop?.(actual)
        return actual
    }

    private get spyStreamerOnVc() {
        return SpyWebRtcStreamer.instance
    }

    private setAnswerOnVc(answer: string): any {
        return this.vc.setAnswer(answer)
    }

    private async createOffer(offerOptions?: RTCOfferOptions) {
        return await this.vc.createOffer(offerOptions ?? {})
    }

    private get peerConnection(): MockRtcPeerConnection {
        return MockRtcPeerConnection.instance
    }

    private assertReturnsStreamerInViewModel() {
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

    private setStreamer() {
        this.vc.setStreamer(this.streamer)
    }

    private Vc(options?: WebRtcPlayer): WebRtcPlayerViewController {
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
    public stateChangeListeners: WebRtcStateChangeHandler[] = []

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
    public onStateChange(cb: WebRtcStateChangeHandler): void {
        this.stateChangeListeners.push(cb)
    }
    public offStateChange(_listener: WebRtcStateChangeHandler): void {}
}
