import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { Card, ViewControllerOptions } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import CardViewController from '../../../viewControllers/card/Card.vc'
import DialogViewController from '../../../viewControllers/Dialog.vc'
import DialogTestSkillViewController from '../../support/DialogTest.svc'

class SpyDialogViewController extends AbstractViewController<Card> {
    public didHideWasHit = false
    private cardVc: CardViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.cardVc = this.Controller('card', {})
    }

    public didHide() {
        this.didHideWasHit = true
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return this.cardVc.render()
    }
}

export default class RenderingInADialogTest extends AbstractViewControllerTest {
    private static vc: DialogTestSkillViewController
    protected static controllerMap = {
        dialogTest: DialogTestSkillViewController,
        spyTest: SpyDialogViewController,
    }

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.Svc()
    }

    @test()
    protected static renders() {
        const model = this.vc.render()
        assert.isArray(model.layouts)
    }

    @test()
    protected static async doesntThrowWhenPresenting() {
        await this.vc.showTermsOfService()
    }

    @test()
    protected static getsBackDialogController() {
        const dialog = this.vc.renderInDialogAndGetDlgVc()
        assert.isTruthy(dialog)
        assert.isFunction(dialog.hide)
    }

    @test()
    protected static async canWaitUntilDialogIsClosed() {
        const dialog = this.vc.renderInDialogAndGetDlgVc()

        let waited = false

        setTimeout(async () => {
            waited = true
            await dialog.hide()
        }, 10)

        await dialog.wait()

        assert.isTrue(waited)
    }

    @test()
    protected static async onCloseCallbackInvoked() {
        let wasHit = false

        const dialog = this.vc.invokesOnCloseCallback(() => {
            wasHit = true
        })

        await dialog.hide()

        assert.isTrue(wasHit)
    }

    @test()
    protected static dialogProperlyUsesCardViewController() {
        const vc = this.Controller('dialog', {
            body: {
                sections: [
                    {
                        title: 'Go team!',
                    },
                ],
            },
        })

        assert.isFalse(vc instanceof CardViewController)

        const { cardController } = vc.render()

        assert.isTrue(cardController instanceof CardViewController)
        this.assertSectionsHaveControllers(vc)
    }

    @test()
    protected static async canGetCardVcFromDialog() {
        const vc = this.Controller('dialog', {
            body: {
                sections: [
                    {
                        title: 'Go team!',
                    },
                ],
            },
        })

        const cardVc = vc.getCardVc()
        assert.isTrue(cardVc instanceof CardViewController)
    }

    @test('can get should show close button 1', false)
    @test('can get should show close button 2', true)
    protected static canGetShowingCloseButton(expected: boolean) {
        const vc = this.Controller('dialog', {
            shouldShowCloseButton: expected,
        })

        assert.isEqual(vc.getShouldShowCloseButton(), expected)
    }

    @test()
    protected static async renderingInDialogGetsShouldShowCloseButtonWhenRenderingAsCard() {
        const dlg = this.vc.renderInDialogAndGetDlgVc({
            shouldShowCloseButton: false,
            ...this.Controller('card', {
                header: {
                    title: 'first name!',
                },
            }).render(),
        })

        const model = this.render(dlg)
        assert.isFalse(model.shouldShowCloseButton)
    }

    @test()
    protected static async canSetBusyOnDialog() {
        const dlg = this.vc.renderInDialogAndGetDlgVc({})

        vcAssert.attachTriggerRenderCounter(dlg)

        dlg.setIsBusy(true)

        vcAssert.assertTriggerRenderCount(dlg, 1)

        this.assertDialogIsBusy(dlg)
        dlg.setIsBusy(false)
        this.assertDialogIsNotBusy(dlg)
    }

    @test()
    protected static async hidingDialogCallsDidHideOnVc() {
        const cardVc = this.Controller('card', {})
        let wasHit = false

        //@ts-ignore
        cardVc.didHide = async () => {
            wasHit = true
        }

        const dlg = this.vc.renderInDialogAndGetDlgVc(cardVc.render())

        assert.isFalse(wasHit)

        await dlg.hide()

        assert.isTrue(wasHit)
    }

    @test()
    protected static async hidingDialogCallsDidHideDownTheModelTree() {
        const spy = this.Controller(
            'spyTest' as any,
            {}
        ) as SpyDialogViewController

        const dlg = this.vc.renderInDialogAndGetDlgVc(spy.render())

        assert.isFalse(spy.didHideWasHit, 'didHide was hit before hiding')

        await dlg.hide()

        assert.isTrue(spy.didHideWasHit, 'didHide was not hit after hiding')
    }

    @test()
    protected static async shouldNotCallDidHideIfParentOfDialogIsNotRenderedInDialog() {
        const dlg = await this.vc.renderCardInDialog()
        await dlg.hide()
        assert.isFalse(this.vc.wasDidHideHit)
    }

    private static assertDialogIsBusy(dlg: DialogViewController) {
        const model = this.render(dlg)
        assert.isTrue(model.body?.isBusy)
    }

    private static Svc() {
        return this.Factory().Controller('dialogTest', {})
    }

    private static assertDialogIsNotBusy(dlg: DialogViewController) {
        const model = this.render(dlg)
        assert.isFalse(model.body?.isBusy)
    }

    protected static assertSectionsHaveControllers(vc: DialogViewController) {
        const model = this.render(vc)
        for (const section of model.body?.sections ?? []) {
            assert.isTruthy(section.controller)
        }
    }
}
