import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
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

@suite()
export default class AssertingWebrtcPlayerTest extends AbstractViewControllerTest {
    private vc!: CardViewController
    private playerVc!: WebRtcPlayerViewController

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.playerVc = this.Vc()
    }

    @test()
    protected throwsWithMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => webRtcAssert.cardRendersPlayer())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected throwsWhenCardDoesNotRenderPlayer() {
        assert.doesThrow(() => this.assertRendersPlayer(), 'not rendering')
    }

    @test()
    protected passesWithWebRtcPlayerInFirstSection() {
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer()
    }

    @test()
    protected returnsWithWebRtcPlayerInFirstSection() {
        this.dropPlayerVcIntoNewSection()
        const vc = this.assertRendersPlayer()
        assert.isEqual(
            vc,
            this.playerVc,
            'You should return the view controller you passed in'
        )
    }

    @test()
    protected canFindCardIsSecondSection() {
        this.vc.addSection({})
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer()
    }

    @test()
    protected throwsWhenSendingBadId() {
        this.dropPlayerVcIntoNewSection()
        assert.doesThrow(
            () => this.assertRendersPlayer(generateId()),
            'with the id'
        )
    }

    @test()
    protected canFindWhenIdMatches() {
        const id = generateId()
        this.setIdOnplayer(id)
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer(id)
    }

    @test()
    protected canFindInTheSecondSection() {
        const id = generateId()
        this.setIdOnplayer(id)
        this.vc.addSection({})
        this.dropPlayerVcIntoNewSection()
        this.assertRendersPlayer(id)
    }

    @test()
    protected async generatesOfferThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.actionCreatesOffer()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'action'],
        })
    }

    @test()
    protected async actionCreateOfferThrowsIfBeforeEachNotCalled() {
        await this.assertCreateOfferThrowsBeforeEach()
    }

    @test()
    protected async callingBeforeEachAllowsGenerateOfferToThrowForNoOfferGenerated() {
        this.callBeforeEachAndReloadPlayerVc()
        await assert.doesThrowAsync(
            () => this.assertCreatesOffer(() => {}),
            'did not'
        )
    }

    @test()
    protected async callingBeforeEachWithoutCreatingVcThrows() {
        this.callBeforeEachOnAssert()
        await this.assertCreateOfferThrowsBeforeEach()
    }

    @test()
    protected async assertCreateOfferPassesIfActuallyCreatingOffer() {
        this.callBeforeEachAndReloadPlayerVc()
        await this.assertCreatesOffer(async () => {
            await this.playerVc.createOffer({})
        })
    }

    @test()
    protected async throwsWhenOptionsPassedToCreateOfferDontMatch() {
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
    protected async assertProvideAnswerThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.answerSet()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsIfAnswerNotSet() {
        this.callBeforeEachAndReloadPlayerVc()
        await assert.doesThrowAsync(() => this.assertAnswerSet(), 'setAnswer')
    }

    @test()
    protected async answerSetThrowsIfDidNotCallBeforeEach() {
        await assert.doesThrowAsync(
            () => webRtcAssert.answerSet(this.playerVc),
            'beforeEach'
        )
    }

    @test()
    protected async passesIfSetAnswerCalled() {
        this.callBeforeEachAndReloadPlayerVc()
        await this.setAnswerOnPlayerVc(generateId())
        await this.assertAnswerSet()
    }

    @test()
    protected async throwsIfDifferentAnswerIsPassed() {
        this.callBeforeEachAndReloadPlayerVc()
        await this.setAnswerOnPlayerVc(generateId())
        await assert.doesThrowAsync(
            () => this.assertAnswerSet('aoeuaou'),
            'match'
        )
    }

    @test()
    protected async passesIfAnswerMatches() {
        this.callBeforeEachAndReloadPlayerVc()
        const answer = generateId()
        await this.setAnswerOnPlayerVc(answer)
        await this.assertAnswerSet(answer)
    }

    @test()
    protected async assertingCropThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.assertCropEquals()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async assertingCropThrowsWhenCropDoesNotMatch() {
        const crop = generateCropPointValues()
        this.setCrop(crop)
        const point = generateCropPointValues()
        await assert.doesThrowAsync(() => this.assertCropEquals(point), 'crop')
    }

    @test()
    protected async assertingCropDoesNotThrowIfMatches() {
        const crop = generateCropPointValues()
        this.setCrop(crop)
        await this.assertCropEquals(crop)
    }

    @test()
    protected async assertIsCroppingEnabledThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.croppingIsEnabled()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async assertIsCroppingEnabledThrowsIfNotMatch() {
        await assert.doesThrowAsync(
            () => this.assertCroppingIsEnabled(),
            'enableCropping'
        )

        this.enableCropping()
        this.assertCroppingIsEnabled()
    }

    @test()
    protected async assertIsCroppingDisabledThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            webRtcAssert.croppingIsDisabled()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async assertIsCroppingDisabledThrowsIfNotMatch() {
        this.enableCropping()
        await assert.doesThrowAsync(
            () => this.assertCroppingIsDisabled(),
            'disableCropping'
        )

        this.disableCropping()
        this.assertCroppingIsDisabled()
    }

    @test()
    protected async canAssertCropping() {
        this.assertCroppingIsDisabled()
        this.enableCropping()
        this.assertCroppingIsEnabled()
        this.disableCropping()
        this.assertCroppingIsDisabled()
    }

    @test()
    protected async assertingOfferReturnsGeneratedOffer() {
        this.callBeforeEachAndReloadPlayerVc()
        const offerSdp = await this.assertCreatesOffer(() =>
            this.playerVc.createOffer({})
        )

        assert.isEqual(
            offerSdp,
            AssertingWebRtcPlayerViewController.lastGeretateOfferSdp!
        )
    }

    private disableCropping() {
        this.playerVc.disableCropping()
    }

    private enableCropping() {
        this.playerVc.enableCropping()
    }

    private assertCroppingIsEnabled(): any {
        return webRtcAssert.croppingIsEnabled(this.playerVc)
    }

    private assertCroppingIsDisabled(): any {
        return webRtcAssert.croppingIsDisabled(this.playerVc)
    }

    private assertCropEquals(point: WebRtcCropPoint): any {
        return webRtcAssert.assertCropEquals(this.playerVc, point)
    }

    private setCrop(crop: WebRtcCropPoint) {
        this.playerVc.setCrop(crop)
    }

    private async setAnswerOnPlayerVc(answer: string) {
        await this.playerVc.setAnswer(answer)
    }

    private assertAnswerSet(answerSdp?: string) {
        return webRtcAssert.answerSet(this.playerVc, answerSdp)
    }

    private callBeforeEachAndReloadPlayerVc() {
        this.callBeforeEachOnAssert()
        this.playerVc = this.Vc()
    }

    private async assertCreateOfferThrowsBeforeEach() {
        await assert.doesThrowAsync(
            () => this.assertCreatesOffer(() => {}),
            'beforeEach'
        )
    }

    private callBeforeEachOnAssert() {
        webRtcAssert.beforeEach(this.getFactory())
    }

    private assertCreatesOffer(cb: () => void, offerOptions?: RTCOfferOptions) {
        return webRtcAssert.actionCreatesOffer(this.playerVc, cb, offerOptions)
    }

    private setIdOnplayer(id: string) {
        this.playerVc = this.Controller('web-rtc-player', {
            id,
        })
    }

    private Vc(): WebRtcPlayerViewController {
        return this.Controller('web-rtc-player', {})
    }

    private dropPlayerVcIntoNewSection() {
        this.vc.addSection({
            webRtcPlayer: this.playerVc.render(),
        })
    }

    private assertRendersPlayer(id?: string) {
        return webRtcAssert.cardRendersPlayer(this.vc, id)
    }
}
