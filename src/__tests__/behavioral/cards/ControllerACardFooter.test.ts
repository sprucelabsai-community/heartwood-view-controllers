import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test, suite } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { CardViewController } from '../../../types/heartwood.types'

@suite()
export default class ControllingACardTest extends AbstractViewControllerTest {
    protected controllerMap = {}
    private vc!: CardViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('card', {})
    }

    @test()
    protected getIsFooterEnabledIsTrueToStart() {
        this.assertFooterIsEnabled()
    }

    @test()
    protected usesValuePassedToFooter() {
        const vc = this.Controller('card', {
            footer: {
                isEnabled: false,
            },
        })
        this.assertFooterIsDisabled(vc)
    }

    @test()
    protected canDisableAndEnableFooter() {
        this.vc.disableFooter()
        this.assertFooterIsDisabled()
        this.vc.enableFooter()
    }

    @test('disables footer 1', {
        buttons: [],
        shouldRenderBorder: true,
    })
    @test('disables footer 2', {
        shouldRenderBorder: false,
    })
    protected persistsFooterOnDisable(footer: Footer) {
        this.vc = this.Controller('card', {
            footer,
        })

        this.vc.disableFooter()

        assert.doesInclude(this.render(this.vc).footer, {
            ...footer,
            isEnabled: false,
        })
    }

    @test('enables footer 1', {
        buttons: [],
        shouldRenderBorder: true,
    })
    @test('enables footer 2', {
        shouldRenderBorder: false,
    })
    protected persistsFooter(footer: Footer) {
        this.vc = this.Controller('card', {
            footer,
        })

        this.vc.enableFooter()

        assert.doesInclude(this.render(this.vc).footer, {
            ...footer,
            isEnabled: true,
        })
    }

    @test()
    protected callingEnableDoesNotBlowUp() {
        this.vc.enableFooter()
    }

    @test()
    protected triggersRenderAsExpected() {
        this.vc.enableFooter()
        vcAssert.assertTriggerRenderCount(this.vc, 1)
        this.vc.disableFooter()
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    private assertFooterIsEnabled() {
        assert.isTrue(this.vc.getIsFooterEnabled())
    }

    private assertFooterIsDisabled(vc?: CardViewController) {
        assert.isFalse((vc ?? this.vc).getIsFooterEnabled())
    }
}

type Footer = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter
