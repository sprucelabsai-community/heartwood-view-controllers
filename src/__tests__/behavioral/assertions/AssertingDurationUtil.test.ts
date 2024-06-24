import { DateUtil, durationUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Card, ViewControllerOptions } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'

export default class AssertingDurationUtilTest extends AbstractViewControllerTest {
    protected static async beforeEach() {
        await super.beforeEach()
        this.getFactory().setDates({} as DateUtil)
    }

    @test()
    protected static async throwsWhenDurationUtilsNotConfiguredToVc() {
        assert.doesThrow(
            () => vcAssert.durationUtilIsConfiguredForVc(this.Vc()),
            'durationUtil.dates = this.dates'
        )
    }

    @test()
    protected static async passesWhenConfigured() {
        this.getFactory().setController('card', ConfiguredViewController)
        vcAssert.durationUtilIsConfiguredForVc(this.Vc())
    }

    private static Vc() {
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
