import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'

class SuccessAlertSkillViewController extends AbstractSkillViewController {
    public afterAlertWasHit = false
    public afterSuccessWasHit = false
    public async renderSuccess() {
        await this.alert({
            style: 'success',
            message: 'yay bro!',
        })
    }

    public async showWithStyle(style: string) {
        await this.alert({
            style: style as any,
            message: 'yay bro!',
        })
    }

    public async doNothing() {}

    public async operationAfterAlert() {
        await this.alert({ message: 'an alert!' })
        this.afterAlertWasHit = true
    }

    public async alertThenThrow() {
        await this.alert({ message: 'should throw next' })
        throw new Error('should throw')
    }

    public async operationAfterSuccess() {
        await this.alert({ message: 'an alert!', style: 'success' })
        this.afterSuccessWasHit = true
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
        return {
            layouts: [],
        }
    }
}

@suite()
export default class AssertingAlertsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        'success.root': SuccessAlertSkillViewController,
    }
    private vc!: SuccessAlertSkillViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected async throwsWhenNothingRendered() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersSuccessAlert(this.vc, () =>
                this.vc.doNothing()
            )
        )
    }

    @test()
    protected async doesNotThrowWhenSuccessRendered() {
        await vcAssert.assertRendersSuccessAlert(this.vc, () =>
            this.vc.renderSuccess()
        )

        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersAlert(this.vc, () => this.vc.renderSuccess())
        )
    }

    @test()
    protected async throwsWhenAnyOtherAlertStyleRendered() {
        const style = 'info'

        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersSuccessAlert(this.vc, () =>
                this.vc.showWithStyle(style)
            )
        )
    }

    @test()
    protected async hidingSuccessDialogLetsHandlerComplete() {
        const vc = await vcAssert.assertRendersSuccessAlert(this.vc, () =>
            this.vc.operationAfterSuccess()
        )

        await vc.hide()

        assert.isTrue(this.vc.afterSuccessWasHit)
    }

    @test()
    protected async hidingAlertLetsHandlerComplete() {
        const vc = await vcAssert.assertRendersAlert(this.vc, () =>
            this.vc.operationAfterAlert()
        )

        await vc.hide()

        assert.isTrue(this.vc.afterAlertWasHit)
    }

    @test()
    protected async throwsWhenRenderingInfoWhenNotExpectingTo() {
        await assert.doesThrowAsync(() =>
            vcAssert.assertDoesNotRenderAlert(
                this.vc,
                () => this.vc.showWithStyle('info'),
                'info'
            )
        )
    }

    @test()
    protected async throwsIfAssertsAlertTwice() {
        await vcAssert.assertRendersAlert(this.vc, () =>
            this.vc.operationAfterAlert()
        )

        await assert.doesThrowAsync(() =>
            vcAssert.assertRendersAlert(this.vc, () =>
                this.vc.operationAfterAlert()
            )
        )
    }

    @test()
    protected async hidingAlertThrowsIfCodeAfterHidingThrows() {
        const alertVc = await vcAssert.assertRendersAlert(this.vc, () =>
            this.vc.alertThenThrow()
        )

        await assert.doesThrowAsync(() => alertVc.hide())
    }

    private Vc() {
        return this.Controller(
            'success.root' as any,
            {}
        ) as SuccessAlertSkillViewController
    }
}
