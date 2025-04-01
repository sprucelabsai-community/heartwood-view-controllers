import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import generateCropPointValues from '../../../tests/utilities/generateCropPointValues'
import webRtcAssert, {
    AssertingWebRtcPlayerViewController,
} from '../../../tests/utilities/webRtcAssert'
import {
    CardViewController,
    WebRtcCropPoint,
} from '../../../types/heartwood.types'
import WebRtcPlayerViewController from '../../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'

export default class AssertingWebrtcPlayerTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    private static playerVc: WebRtcPlayerViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.playerVc = this.Vc()
    }

    @test()
    protected static throwsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => webRtcAssert.cardRendersPlayer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static throwsWhenCardDoesNotRenderPlayer() {
        assert.doesThrow(() => this.assertRendersPlayer(), 'not rendering')
    }

    @test()
    protected static passesWithWebRtcPlayerInFirstSection() {
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer()
    }

    @test()
    protected static returnsWithWebRtcPlayerInFirstSection() {
        this.dropPlayerVcIntoNewSection()
        const vc = this.assertRendersPlayer()
        assert.isEqual(
            vc,
            this.playerVc,
            'You should return the view controller you passed in'
        )
    }

    @test()
    protected static canFindCardIsSecondSection() {
        this.vc.addSection({})
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer()
    }

    @test()
    protected static throwsWhenSendingBadId() {
        this.dropPlayerVcIntoNewSection()
        assert.doesThrow(
            () => this.assertRendersPlayer(generateId()),
            'with the id'
        )
    }

    @test()
    protected static canFindWhenIdMatches() {
        const id = generateId()
        this.setIdOnplayer(id)
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer(id)
    }

    @test()
    protected static canFindInTheSecondSection() {
        const id = generateId()
        this.setIdOnplayer(id)
        this.vc.addSection({})
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer(id)
    }

    @test()
    protected static async generatesOfferThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.actionCreatesOffer()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'action'],
        })
    }

    @test()
    protected static async actionCreateOfferThrowsIfBeforeEachNotCalled() {
        await this.assertCreateOfferThrowsBeforeEach()
    }

    @test()
    protected static async callingBeforeEachAllowsGenerateOfferToThrowForNoOfferGenerated() {
        this.callBeforeEachAndReloadPlayerVc()
        await assert.doesThrowAsync(
            () => this.assertCreatesOffer(() => {}),
            'did not'
        )
    }

    @test()
    protected static async callingBeforeEachWithoutCreatingVcThrows() {
        this.callBeforeEachOnAssert()
        await this.assertCreateOfferThrowsBeforeEach()
    }

    @test()
    protected static async assertCreateOfferPassesIfActuallyCreatingOffer() {
        this.callBeforeEachAndReloadPlayerVc()
        await this.assertCreatesOffer(async () => {
            await this.playerVc.createOffer({})
        })
    }

    @test()
    protected static async throwsWhenOptionsPassedToCreateOfferDontMatch() {
        this.callBeforeEachAndReloadPlayerVc()
        const options: RTCOfferOptions = {
            offerToReceiveAudio: true,
        }

        await assert.doesThrowAsync(
            () =>
                this.assertCreatesOffer(async () => {
                    await this.playerVc.createOffer({})
                }, options),
            'options'
        )
    }

    @test()
    protected static async assertProvideAnswerThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.answerSet()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async throwsIfAnswerNotSet() {
        this.callBeforeEachAndReloadPlayerVc()
        await assert.doesThrowAsync(() => this.assertAnswerSet(), 'setAnswer')
    }

    @test()
    protected static async answerSetThrowsIfDidNotCallBeforeEach() {
        await assert.doesThrowAsync(
            () => webRtcAssert.answerSet(this.playerVc),
            'beforeEach'
        )
    }

    @test()
    protected static async passesIfSetAnswerCalled() {
        this.callBeforeEachAndReloadPlayerVc()
        await this.setAnswerOnPlayerVc(generateId())
        await this.assertAnswerSet()
    }

    @test()
    protected static async throwsIfDifferentAnswerIsPassed() {
        this.callBeforeEachAndReloadPlayerVc()
        await this.setAnswerOnPlayerVc(generateId())
        await assert.doesThrowAsync(
            () => this.assertAnswerSet('aoeuaou'),
            'match'
        )
    }

    @test()
    protected static async passesIfAnswerMatches() {
        this.callBeforeEachAndReloadPlayerVc()
        const answer = generateId()
        await this.setAnswerOnPlayerVc(answer)
        await this.assertAnswerSet(answer)
    }

    @test()
    protected static async assertingCropThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.assertCropEquals()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async assertingCropThrowsWhenCropDoesNotMatch() {
        const crop = generateCropPointValues()
        this.setCrop(crop)
        const point = generateCropPointValues()
        await assert.doesThrowAsync(() => this.assertCropEquals(point), 'crop')
    }

    @test()
    protected static async assertingCropDoesNotThrowIfMatches() {
        const crop = generateCropPointValues()
        this.setCrop(crop)
        await this.assertCropEquals(crop)
    }

    @test()
    protected static async assertIsCroppingEnabledThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.croppingIsEnabled()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async assertIsCroppingEnabledThrowsIfNotMatch() {
        await assert.doesThrowAsync(
            () => this.assertCroppingIsEnabled(),
            'enableCropping'
        )

        this.enableCropping()
        this.assertCroppingIsEnabled()
    }

    @test()
    protected static async assertIsCroppingDisabledThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.croppingIsDisabled()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected static async assertIsCroppingDisabledThrowsIfNotMatch() {
        this.enableCropping()
        await assert.doesThrowAsync(
            () => this.assertCroppingIsDisabled(),
            'disableCropping'
        )

        this.disableCropping()
        this.assertCroppingIsDisabled()
    }

    @test()
    protected static async canAssertCropping() {
        this.assertCroppingIsDisabled()
        this.enableCropping()
        this.assertCroppingIsEnabled()
        this.disableCropping()
        this.assertCroppingIsDisabled()
    }

    @test()
    protected static async assertingOfferReturnsGeneratedOffer() {
        this.callBeforeEachAndReloadPlayerVc()
        const offerSdp = await this.assertCreatesOffer(() =>
            this.playerVc.createOffer({})
        )

        assert.isEqual(
            offerSdp,
            AssertingWebRtcPlayerViewController.lastGeretateOfferSdp!
        )
    }

    private static disableCropping() {
        this.playerVc.disableCropping()
    }

    private static enableCropping() {
        this.playerVc.enableCropping()
    }

    private static assertCroppingIsEnabled(): any {
        return webRtcAssert.croppingIsEnabled(this.playerVc)
    }

    private static assertCroppingIsDisabled(): any {
        return webRtcAssert.croppingIsDisabled(this.playerVc)
    }

    private static assertCropEquals(point: WebRtcCropPoint): any {
        return webRtcAssert.assertCropEquals(this.playerVc, point)
    }

    private static setCrop(crop: WebRtcCropPoint) {
        this.playerVc.setCrop(crop)
    }

    private static async setAnswerOnPlayerVc(answer: string) {
        await this.playerVc.setAnswer(answer)
    }

    private static assertAnswerSet(answerSdp?: string) {
        return webRtcAssert.answerSet(this.playerVc, answerSdp)
    }

    private static callBeforeEachAndReloadPlayerVc() {
        this.callBeforeEachOnAssert()
        this.playerVc = this.Vc()
    }

    private static async assertCreateOfferThrowsBeforeEach() {
        await assert.doesThrowAsync(
            () => this.assertCreatesOffer(() => {}),
            'beforeEach'
        )
    }

    private static callBeforeEachOnAssert() {
        webRtcAssert.beforeEach(this.getFactory())
    }

    private static assertCreatesOffer(
        cb: () => void,
        offerOptions?: RTCOfferOptions
    ) {
        return webRtcAssert.actionCreatesOffer(this.playerVc, cb, offerOptions)
    }

    private static setIdOnplayer(id: string) {
        this.playerVc = this.Controller('web-rtc-player', {
            id,
        })
    }

    private static Vc(): WebRtcPlayerViewController {
        return this.Controller('web-rtc-player', {})
    }

    private static dropPlayerVcIntoNewSection() {
        this.vc.addSection({
            webRtcPlayer: this.playerVc.render(),
        })
    }

    private static assertRendersPlayer(id?: string) {
        return webRtcAssert.cardRendersPlayer(this.vc, id)
    }
}
