import { assertOptions } from '@sprucelabs/schema'
import { assert, generateId } from '@sprucelabs/test-utils'
import {
    ViewController,
    Card,
    SimpleViewControllerFactory,
    WebRtcCropPoint,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import WebRtcPlayerViewController from '../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'
import { pluckAllFromView } from './assertSupport'

const webRtcAssert = {
    beforeEach: (views: SimpleViewControllerFactory) => {
        views.setController(
            'web-rtc-player',
            AssertingWebRtcPlayerViewController
        )
    },
    cardRendersPlayer: (
        vc: ViewController<Card>,
        id?: string
    ): WebRtcPlayerViewController => {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const players = pluckAllFromView(model, 'webRtcPlayer')

        assert.isAbove(
            players.length,
            0,
            `Your card is not rendering a webrtc player!. Try:\n\nthis.playerVc = this.Controller('web-rtc-player', {})\nthis.cardVc = this.Controller('card', { webRtcPlayer: this.playerVc.render() })`
        )

        if (id) {
            for (const player of players) {
                if (player?.id === id) {
                    return player.controller! as WebRtcPlayerViewController
                }
            }
            assert.fail(
                `I could not find a webRtcPlayerViewController with the id: "${id}"`
            )
        }

        return players[0]!.controller! as WebRtcPlayerViewController
    },

    actionCreatesOffer: async (
        vc: WebRtcPlayerViewController,
        action: () => void | Promise<void>,
        expectedOptions?: RTCOfferOptions
    ) => {
        assertOptions({ vc, action }, ['vc', 'action'])
        const assertingVc = assertCalledBeforeEach(vc)

        let wasHit = false
        let passedOptions: RTCOfferOptions | undefined

        assertingVc.onCreateOffer((options) => {
            passedOptions = options
            wasHit = true
        })

        await action()

        if (expectedOptions) {
            assert.isEqualDeep(
                passedOptions,
                expectedOptions,
                `The options you passed to createOffer did not matching.`
            )
        }

        assert.isTrue(
            wasHit,
            `You did not create an offer. Try 'const offer = await this.playerVc.createOffer()'`
        )

        return AssertingWebRtcPlayerViewController.lastGeretateOfferSdp
    },

    answerSet: async (vc: WebRtcPlayerViewController, answerSdp?: string) => {
        assertOptions({ vc }, ['vc'])

        const assertingVc = assertCalledBeforeEach(vc)
        assertingVc.assertAnswerWasSet(answerSdp)
    },

    croppingIsEnabled: (vc: WebRtcPlayerViewController) => {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const croppingEnabled = model.shouldAllowCropping
        assert.isTrue(
            croppingEnabled,
            `Cropping is not enabled. Make sure you call 'this.playerVc.enableCropping()'`
        )
    },

    croppingIsDisabled: (vc: WebRtcPlayerViewController) => {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)
        const croppingEnabled = model.shouldAllowCropping

        assert.isFalsy(
            croppingEnabled,
            `Cropping is enabled. Make sure you call 'this.playerVc.disableCropping()'`
        )
    },

    assertCropEquals: (
        vc: WebRtcPlayerViewController,
        expectedCrop?: WebRtcCropPoint
    ) => {
        assertOptions({ vc }, ['vc'])

        const model = renderUtil.render(vc)

        assert.isEqualDeep(
            model.crop,
            expectedCrop,
            `Crop does not match, make sure you're calling 'this.playerVc.setCrop(...)'`
        )
    },
}

export default webRtcAssert

export class AssertingWebRtcPlayerViewController extends WebRtcPlayerViewController {
    private onCreateOfferHandler?: (offerOptions: RTCOfferOptions) => void
    private passedAnswer?: string
    public static lastGeretateOfferSdp: string

    public onCreateOffer(cb: (offerOptions: RTCOfferOptions) => void) {
        this.onCreateOfferHandler = cb
    }

    public async createOffer(offerOptions: RTCOfferOptions): Promise<string> {
        this.onCreateOfferHandler?.(offerOptions)
        AssertingWebRtcPlayerViewController.lastGeretateOfferSdp = generateId()
        return AssertingWebRtcPlayerViewController.lastGeretateOfferSdp
    }

    public async setAnswer(answerSdp: string): Promise<void> {
        this.passedAnswer = answerSdp
    }

    public assertAnswerWasSet(answerSdp?: string) {
        assert.isTruthy(
            this.passedAnswer,
            `You did not call setAnswer. Try 'await this.playerVc.setAnswer(offer)'`
        )

        if (answerSdp) {
            assert.isEqual(
                this.passedAnswer,
                answerSdp,
                `The answer you passed to 'await this.playerVc.setAnswer(...)' did not match expected.`
            )
        }
    }
}

function assertCalledBeforeEach(vc: WebRtcPlayerViewController) {
    assert.isInstanceOf(
        vc,
        AssertingWebRtcPlayerViewController,
        `You have to run webRtcAssert.beforeEach(this.views) in your beforeEach before you create any ViewControllers.`
    )

    const assertingVc = vc as AssertingWebRtcPlayerViewController
    return assertingVc
}
