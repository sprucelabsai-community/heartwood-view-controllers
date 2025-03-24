import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import {
    AbstractSkillViewController,
    AlertOptions,
    interactor,
    vcAssert,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import deviceAssert from '../../../tests/utilities/deviceAssert'

class AlertSkillViewController extends AbstractSkillViewController {
    public afterAlert = false
    public async showAnAlert(): Promise<void> {
        await this.alert({
            title: 'oh no!',
            message: 'what the?',
        })

        this.afterAlert = true
    }

    public async alert(options: AlertOptions) {
        return super.alert(options)
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
        return {
            layouts: [],
        }
    }
}

export default class ControllingAnAlertTest extends AbstractViewControllerTest {
    protected static controllerMap = {
        alert: AlertSkillViewController,
    }

    private static vc: AlertSkillViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('alert' as any, {})
    }

    @test()
    protected static async hasAlertMethod() {
        //@ts-ignore
        assert.isFunction(this.vc.alert)
    }

    @test()
    protected static async invokingAlertThrowsByDefault() {
        vcAssert.patchAlertToThrow(this.vc)
        await assert.doesThrowAsync(() => this.vc.showAnAlert())
        //@ts-ignore
        await assert.doesThrowAsync(() => this.vc.alert())
    }

    @test()
    protected static async doesNotThrowWithOtherStylesAlert() {
        vcAssert.patchAlertToThrow(this.vc)
        //@ts-ignore
        await this.vc.alert({
            style: 'info',
            message: 'should not have been called',
        })
        //@ts-ignore
        await this.vc.alert({
            style: 'success',
            message: 'should not have been called',
        })
    }

    @test()
    protected static async alertRendersDialog() {
        const title = `${new Date().getTime()}`
        const message = `${new Date().getTime() * Math.random()}`

        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            //@ts-ignore
            this.vc.alert({
                title,
                message,
            })
        )

        const model = this.render(dlgVc)

        assert.isEqual(model.header?.title, title)
        assert.isEqual(model.body?.sections?.[0].text?.content, message)
    }

    @test()
    protected static async executionHoldsUntilAlertIsClosed() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            this.vc.showAnAlert()
        )

        assert.isFalse(this.vc.afterAlert)

        await dlgVc.hide()
        await this.wait(0)

        assert.isTrue(this.vc.afterAlert)
    }

    @test()
    protected static async alertingWithoutTitleDropsInDefault() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            //@ts-ignore
            this.vc.alert({
                message: 'go team!',
            })
        )

        const model = this.render(dlgVc)
        assert.isString(model.header?.title)
    }

    @test()
    protected static async hasSingleFooterButtonThatIsDestructive() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            //@ts-ignore
            this.vc.alert({
                message: 'go team!',
            })
        )

        vcAssert.assertFooterRendersButtonWithType(dlgVc, 'destructive')
    }

    @test()
    protected static async clickingDestructiveButtonInFooterHidesDialog() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            this.vc.showAnAlert()
        )

        assert.isFalse(this.vc.afterAlert)

        await interactor.clickDestructiveInFooter(dlgVc)

        await this.wait(0)

        assert.isTrue(this.vc.afterAlert)
    }

    @test()
    protected static async alertsCanReceiveTypeOfButton() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            //@ts-ignore
            this.vc.alert({
                title: 'hey',
                message: 'hey',
                style: 'info',
            })
        )

        vcAssert.assertFooterRendersButtonWithType(dlgVc, 'primary')
    }

    @test()
    protected static async successRendersPrimaryButton() {
        const dlgVc = await this.assertAlertRendersDialog({
            title: 'hey',
            message: 'hey',
            style: 'success',
        })
        vcAssert.assertFooterRendersButtonWithType(dlgVc, 'primary')
    }

    @test()
    protected static async renderingAnAlertVibratesTheDevice() {
        deviceAssert.wasNotVibrated(this.vc)
        await vcAssert.assertRendersDialog(this.vc, () => this.vc.showAnAlert())
        deviceAssert.wasVibrated(this.vc)
    }

    @test()
    protected static async theSameAlertDoesNotRenderMoreThanOnce() {
        const alert1: AlertOptions = {
            message: generateId(),
        }

        const alert2: AlertOptions = {
            message: generateId(),
        }

        const alert3: AlertOptions = {
            ...alert2,
            title: generateId(),
        }

        const alert4: AlertOptions = {
            ...alert3,
            style: 'success',
        }

        await this.assertAlertRendersDialog(alert1)
        await this.assertAlertDoesNotRenderDialog(alert1)
        const dlg = await this.assertAlertRendersDialog(alert2)
        await dlg.hide()
        await this.assertAlertRendersDialog(alert2)
        await this.assertAlertRendersDialog(alert3)
        await this.assertAlertRendersDialog(alert4)
    }

    @test()
    protected static async canSetOkButton() {
        const buttonLabel = generateId()

        const dlgVc = await this.assertAlertRendersDialog({
            okButtonLabel: buttonLabel,
            message: generateId(),
        })

        const model = this.render(dlgVc.getCardVc())
        assert.isEqual(
            model.footer?.buttons?.[0].label,
            buttonLabel,
            'Did not set ok button label'
        )
    }

    @test('renders to html if message is html', '<h1>hello</h1>')
    @test('renders to html if message is html', 'Hey there! <div>oh no</div>')
    protected static async rendersToHtmlIfMessageIsHtml(message: string) {
        const dlgVc = await this.assertAlertRendersDialog({
            message,
        })

        assert.isEqual(
            this.render(dlgVc.getCardVc()).body?.sections?.[0].text?.html,
            message,
            'Did not render to html'
        )
    }

    private static async assertAlertRendersDialog(alert: AlertOptions) {
        return await vcAssert.assertRendersDialog(this.vc, () =>
            this.vc.alert(alert)
        )
    }

    private static async assertAlertDoesNotRenderDialog(alert: AlertOptions) {
        return await vcAssert.assertDoesNotRenderDialog(this.vc, () =>
            this.vc.alert(alert)
        )
    }
}
