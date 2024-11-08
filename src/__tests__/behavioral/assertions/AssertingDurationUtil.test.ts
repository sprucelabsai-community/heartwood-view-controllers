import { dateUtil, durationUtil } from '@sprucelabs/calendar-utils'
import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { cloneDeep } from '@sprucelabs/schema'
import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcDurationAssert from '../../../tests/utilities/vcDurationAssert'
import { Card, ViewControllerOptions } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'

export default class AssertingDurationUtilTest extends AbstractViewControllerTest {
    @test()
    protected static async throwsIfNotConfiguredBeforeEach() {
        assert.doesThrow(
            () => vcDurationAssert.durationUtilIsConfiguredForVc(this.Vc()),
            'beforeEach'
        )
    }

    @test()
    protected static async throwsWhenDurationUtilsNotConfiguredToVc() {
        vcDurationAssert.beforeEach(this.getFactory())

        assert.doesThrow(
            () => vcDurationAssert.durationUtilIsConfiguredForVc(this.Vc()),
            'durationUtil.dates = this.dates'
        )
    }

    @test()
    protected static async passesWhenConfigured() {
        vcDurationAssert.beforeEach(this.getFactory())
        this.getFactory().setController('card', ConfiguredViewController)
        vcDurationAssert.durationUtilIsConfiguredForVc(this.Vc())
    }

    @test()
    protected static async mockDateUtil() {
        const methods = Object.keys(dateUtil)
        for (const method of methods) {
            //@ts-ignore
            if (typeof dateUtil[method] === 'function') {
                assert.isFunction(
                    //@ts-ignore
                    mockDateUtil[method],
                    `dateUtil.${method} is not a function`
                )
            }
        }
    }

    private static Vc() {
        return this.Controller('card', {})
    }
}

const mockDateUtil = cloneDeep(dateUtil)

class ConfiguredViewController extends AbstractViewController<Card> {
    public constructor(options: ViewControllerOptions) {
        super(options)
        durationUtil.dates = this.dates
    }
    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return {}
    }
}
