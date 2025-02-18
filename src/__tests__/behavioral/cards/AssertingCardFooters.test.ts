import { assert, errorAssert, test } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardFooter, CardViewController } from '../../../types/heartwood.types'

export default class AssertingCardFootersTest extends AbstractViewControllerTest {
    private static vc: CardViewController
    @test()
    protected static knowsIfFooterIsDisabed() {
        this.setFooter({
            isEnabled: false,
        })

        this.assertFooterIsDisabled()
        assert.doesThrow(() => this.assertFooterIsEnabled())
    }

    @test()
    protected static knowsIfFooterIsEnabled() {
        this.setFooter({
            isEnabled: true,
        })

        assert.doesThrow(() => this.assertFooterIsDisabled())
        this.assertFooterIsEnabled()
    }

    @test()
    protected static enabledToStart() {
        this.setFooter({})
        this.assertFooterIsEnabled()
    }

    @test()
    protected static async assertFooterIsNotRenderedThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            vcAssert.assertCardDoesNotRenderFooter()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected static async assertFooterThrowsIfRendersFooter() {
        this.setFooter({})
        assert.doesThrow(
            () => vcAssert.assertCardDoesNotRenderFooter(this.vc),
            'footer'
        )
    }

    @test()
    protected static async assertFooterNotRendered() {
        this.setFooter(null)
        vcAssert.assertCardDoesNotRenderFooter(this.vc)
    }

    @test()
    protected static async assertFooterIsNotBusy() {
        assert.doesThrow(() => vcAssert.assertCardFooterIsBusy(this.vc))
        vcAssert.assertCardFooterIsNotBusy(this.vc)
    }

    @test()
    protected static async canAsserFooterIsBusy() {
        this.setFooter({ isBusy: true })
        assert.doesThrow(() => vcAssert.assertCardFooterIsNotBusy(this.vc))
        vcAssert.assertCardFooterIsBusy(this.vc)
    }

    private static assertFooterIsDisabled() {
        vcAssert.assertCardFooterIsDisabled(this.vc)
    }

    private static assertFooterIsEnabled() {
        vcAssert.assertCardFooterIsEnabled(this.vc)
    }

    private static setFooter(footer: CardFooter | null) {
        this.vc = this.Controller('card', {
            footer,
        })
    }
}
