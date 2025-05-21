import { assert, errorAssert, test, suite } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardFooter, CardViewController } from '../../../types/heartwood.types'

@suite()
export default class AssertingCardFootersTest extends AbstractViewControllerTest {
    private vc!: CardViewController
    @test()
    protected knowsIfFooterIsDisabed() {
        this.setFooter({
            isEnabled: false,
        })

        this.assertFooterIsDisabled()
        assert.doesThrow(() => this.assertFooterIsEnabled())
    }

    @test()
    protected knowsIfFooterIsEnabled() {
        this.setFooter({
            isEnabled: true,
        })

        assert.doesThrow(() => this.assertFooterIsDisabled())
        this.assertFooterIsEnabled()
    }

    @test()
    protected enabledToStart() {
        this.setFooter({})
        this.assertFooterIsEnabled()
    }

    @test()
    protected async assertFooterIsNotRenderedThrowsWithMissing() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            vcAssert.assertCardDoesNotRenderFooter()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected async assertFooterThrowsIfRendersFooter() {
        this.setFooter({})
        assert.doesThrow(
            () => vcAssert.assertCardDoesNotRenderFooter(this.vc),
            'footer'
        )
    }

    @test()
    protected async assertFooterNotRendered() {
        this.setFooter(null)
        vcAssert.assertCardDoesNotRenderFooter(this.vc)
    }

    @test()
    protected async assertFooterIsNotBusy() {
        this.setFooter({})
        assert.doesThrow(() => vcAssert.assertCardFooterIsBusy(this.vc))
        vcAssert.assertCardFooterIsNotBusy(this.vc)
    }

    @test()
    protected async canAsserFooterIsBusy() {
        this.setFooter({ isBusy: true })
        assert.doesThrow(() => vcAssert.assertCardFooterIsNotBusy(this.vc))
        vcAssert.assertCardFooterIsBusy(this.vc)
    }

    private assertFooterIsDisabled() {
        vcAssert.assertCardFooterIsDisabled(this.vc)
    }

    private assertFooterIsEnabled() {
        vcAssert.assertCardFooterIsEnabled(this.vc)
    }

    private setFooter(footer: CardFooter | null) {
        this.vc = this.Controller('card', {
            footer,
        })
    }
}
