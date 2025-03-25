import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, errorAssert, generateId, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
    Card,
    CardSection,
    WebRtcStreamer,
} from '../../../types/heartwood.types'
import WebRtcStreamingCardViewController from '../../../viewControllers/webRtcStreaming/WebRtcStreamingCard.vc'

class StubWebRtcVcPluginStreamer implements WebRtcStreamer {
    public async setAnswer(_answerSdp: string): Promise<void> {}
    public onTrack(_cb: (event: RTCTrackEvent) => void): void {}
}

export default class WebRtcStreamingCardTest extends AbstractViewControllerTest {
    private static vc: WebRtcStreamingCardViewController
    private static streamer = new StubWebRtcVcPluginStreamer()

    protected static async beforeEach() {
        await super.beforeEach()
        const options: Card = {}
        this.vc = this.Vc(options)
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

    @test('passes through card options 1', { id: generateId() })
    @test('passes through card options 2', { body: {} })
    protected static async passesThroughCardOptions(options: Card) {
        this.vc = this.Vc(options)
        assert.doesInclude(this.render(this.vc), options)
    }

    @test()
    protected static async returnsStreamerInFirstSectionIfSet() {
        this.setStreamer()
        this.assertStreamerOnlyThingInFirstSection()
    }

    @test()
    protected static async returnsStreamerInFirstSectionIfSetTwice() {
        this.setStreamer()
        this.setStreamer()
        this.assertStreamerOnlyThingInFirstSection()
    }

    @test()
    protected static async settingStreamerToFirstSectionDoesNotImpactExistingSections() {
        this.addSection({ title: 'Test' })
        this.setStreamer()
        this.assertFirstSectionEquals({
            title: 'Test',
            webRtcStreamer: this.streamer,
        })
    }

    @test()
    protected static async canAddStreamerToSecondSection() {
        this.addSection({})
        this.addSection({})
        this.setStreamer(1)
        this.assertSectionsEqual([{}, { webRtcStreamer: this.streamer }])
    }

    private static addSection(section: CardSection) {
        this.vc.addSection(section)
    }

    private static assertStreamerOnlyThingInFirstSection() {
        this.assertFirstSectionEquals({
            webRtcStreamer: this.streamer,
        })
    }

    private static assertFirstSectionEquals(expected: CardSection) {
        const expectedSections = [expected]
        this.assertSectionsEqual(expectedSections)
    }

    private static assertSectionsEqual(
        expectedSections: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection[]
    ) {
        const model = this.render(this.vc)

        for (const section of model.body?.sections ?? []) {
            delete section.controller
        }

        assert.isEqualDeep(model.body, {
            sections: expectedSections,
        })
    }

    private static setStreamer(idx?: number) {
        this.vc.setStreamer(this.streamer, idx)
    }

    private static Vc(options?: Card): WebRtcStreamingCardViewController {
        return this.Controller('web-rtc-streaming-card', {
            ...options,
        })
    }
}
