import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    TriggerRenderHandler,
    ViewController,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class MockCardViewController implements ViewController<Card> {
    private model!: Card

    public constructor(options: ViewControllerOptions & Card) {
        this.model = removeUniversalViewOptions(options)
    }

    public triggerRender() {}
    public setTriggerRenderHandler(handler: TriggerRenderHandler) {
        this.triggerRender = handler
    }

    public render(): Card {
        return this.model
    }
}

@suite()
export default class AssertingStatsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        mockCard: MockCardViewController,
    }

    @test()
    protected throwsIfNotRenderingStats() {
        const vc = this.Card()
        assert.doesThrow(() => vcAssert.assertCardRendersStats(vc))
    }

    @test()
    protected knowsIfStatsAreInFirstSection() {
        const vc = this.Card({
            body: {
                sections: [
                    {
                        stats: {
                            stats: [
                                {
                                    value: 123,
                                    label: 'hey',
                                },
                            ],
                        },
                    },
                ],
            },
        })

        vcAssert.assertCardRendersStats(vc)
    }

    @test()
    protected knowsIfStatsInAnotherSection() {
        const vc = this.Card({
            body: {
                sections: [
                    {},
                    {},
                    {
                        stats: {
                            stats: [
                                {
                                    value: 123,
                                    label: 'hey',
                                },
                            ],
                        },
                    },
                ],
            },
        })

        vcAssert.assertCardRendersStats(vc)
    }

    @test()
    protected returnsController() {
        const statsVc = this.Controller('stats', {
            stats: [
                {
                    value: 100,
                },
            ],
        })
        const vc = this.Card({
            body: {
                sections: [
                    {
                        stats: statsVc.render(),
                    },
                ],
            },
        })

        const matchVc = vcAssert.assertCardRendersStats(vc)
        assert.isEqual(matchVc, statsVc)
    }

    private Card(options: Card = {}) {
        //@ts-ignore
        return this.Controller('mockCard', options) as MockCardViewController
    }
}
