import { durationUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcDurationAssert from '../../../tests/utilities/vcDurationAssert'
import { Card, ViewControllerOptions } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'

@suite()
export default class AssertingDurationUtilTest extends AbstractViewControllerTest {
    @test()
    protected async throwsIfNotConfiguredBeforeEach() {
        assert.doesThrow(
            () => vcDurationAssert.durationUtilIsConfiguredForVc(this.Vc()),
            'beforeEach'
        )
    }

    @test()
    protected async throwsWhenDurationUtilsNotConfiguredToVc() {
        vcDurationAssert.beforeEach(this.getFactory())

        assert.doesThrow(
            () => vcDurationAssert.durationUtilIsConfiguredForVc(this.Vc()),
            'durationUtil.dates = this.dates'
        )
    }

    @test()
    protected async passesWhenConfigured() {
        vcDurationAssert.beforeEach(this.getFactory())
        this.getFactory().setController('card', ConfiguredViewController)
        vcDurationAssert.durationUtilIsConfiguredForVc(this.Vc())
    }

    private Vc() {
        return this.Controller('card', {})
    }
}

class ConfiguredViewController extends AbstractViewController<Card> {
    public constructor(options: ViewControllerOptions) {
        super(options)
        durationUtil.dates = this.dates
    }
    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return {}
    }
}
