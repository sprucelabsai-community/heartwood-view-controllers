import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import webRtcAssert from '../../../tests/utilities/webRtcAssert'
import { CardViewController } from '../../../types/heartwood.types'
import WebRtcPlayerViewController from '../../../viewControllers/webRtcStreaming/WebRtcPlayer.vc'

export default class AssertingWebrtcPlayerTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    private static playerVc: WebRtcPlayerViewController

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
        this.playerVc = this.Controller('web-rtc-player', {})
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

    private static setIdOnplayer(id: string) {
        this.playerVc = this.Controller('web-rtc-player', {
            id,
        })
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
