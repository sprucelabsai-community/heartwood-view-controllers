import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import {
    AbstractAppController,
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

class AlertAppController extends AbstractAppController {
    public static id = 'app'

    public afterAlert = false
    public async showAnAlert(): Promise<void> {
        await this.alert({
            title: 'oh no!',
            message: 'what the?',
        })

        this.afterAlert = true
    }
}

@suite()
export default class ControllingAnAlertTest extends AbstractViewControllerTest {
    protected controllerMap = {
        alert: AlertSkillViewController,
    }

    private vc!: AlertSkillViewController
    private app!: AlertAppController

    protected async beforeEach() {
        await super.beforeEach()
        this.getFactory().setAppController(AlertAppController)
        this.vc = this.Controller('alert' as any, {})
        this.app = this.getFactory().App('app' as any)
    }

    @test('view controllers have alert method', 'vc')
    @test('app controllers have alert method', 'app')
    protected async hasAlertMethod(prop: Prop) {
        //@ts-ignore
        assert.isFunction(this[prop].alert)
    }

    @test('view invoking alert throws by default', 'vc')
    @test('app invoking alert throws by default', 'app')
    protected async invokingAlertThrowsByDefault(prop: Prop) {
        vcAssert.patchAlertToThrow(this[prop])
        await assert.doesThrowAsync(() => this[prop].showAnAlert())
        //@ts-ignore
        await assert.doesThrowAsync(() => this[prop].alert())
    }

    @test('view does not throw with other style alerts', 'vc')
    @test('app does not throw with other style alerts', 'app')
    protected async doesNotThrowWithOtherStyleAlerts(prop: Prop) {
        vcAssert.patchAlertToThrow(this[prop])

        //@ts-ignore
        await this[prop].alert({
            style: 'info',
            message: 'should not have been called',
        })

        //@ts-ignore
        await this[prop].alert({
            style: 'success',
            message: 'should not have been called',
        })
    }

    @test('view alert renders dialog', 'vc')
    @test('app alert renders dialog', 'app')
    protected async alertRendersDialog(prop: Prop) {
        const title = `${new Date().getTime()}`
        const message = `${new Date().getTime() * Math.random()}`

        const dlgVc = await vcAssert.assertRendersDialog(this[prop], () =>
            //@ts-ignore
            this[prop].alert({
                title,
                message,
            })
        )

        const model = this.render(dlgVc)

        assert.isEqual(model.header?.title, title)
        assert.isEqual(model.body?.sections?.[0].text?.content, message)
    }

    @test()
    protected async executionHoldsUntilAlertIsClosed() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            this.vc.showAnAlert()
        )

        assert.isFalse(this.vc.afterAlert)

        await dlgVc.hide()
        await this.wait(0)

        assert.isTrue(this.vc.afterAlert)
    }

    @test()
    protected async alertingWithoutTitleDropsInDefault() {
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
    protected async hasSingleFooterButtonThatIsDestructive() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            //@ts-ignore
            this.vc.alert({
                message: 'go team!',
            })
        )

        vcAssert.assertFooterRendersButtonWithType(dlgVc, 'destructive')
    }

    @test()
    protected async clickingDestructiveButtonInFooterHidesDialog() {
        const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
            this.vc.showAnAlert()
        )

        assert.isFalse(this.vc.afterAlert)

        await interactor.clickDestructiveInFooter(dlgVc)

        await this.wait(0)

        assert.isTrue(this.vc.afterAlert)
    }

    @test()
    protected async alertsCanReceiveTypeOfButton() {
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
    protected async successRendersPrimaryButton() {
        const dlgVc = await this.assertAlertRendersDialog({
            title: 'hey',
            message: 'hey',
            style: 'success',
        })
        vcAssert.assertFooterRendersButtonWithType(dlgVc, 'primary')
    }

    @test()
    protected async renderingAnAlertVibratesTheDevice() {
        deviceAssert.wasNotVibrated(this.vc)
        await vcAssert.assertRendersDialog(this.vc, () => this.vc.showAnAlert())
        deviceAssert.wasVibrated(this.vc)
    }

    @test()
    protected async theSameAlertDoesNotRenderMoreThanOnce() {
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
    protected async canSetOkButton() {
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
    protected async rendersToHtmlIfMessageIsHtml(message: string) {
        const dlgVc = await this.assertAlertRendersDialog({
            message,
        })

        assert.isEqual(
            this.render(dlgVc.getCardVc()).body?.sections?.[0].text?.html,
            message,
            'Did not render to html'
        )
    }

    @test()
    protected async rendersToContentWithErrorStack() {
        const message = `Error: NOT_IMPLEMENTED: 1742988596907 and then more!
    at Object.listenerCb (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/packages/spruce-organization-skill/src/__tests__/behavioral/AddingAnOrganization.test.ts:60:19)
    at InternalEmitter.emitOne (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/mercury-event-emitter/build/AbstractEventEmitter.js:82:45)
    at emitOneAndValidate (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/mercury-event-emitter/build/AbstractEventEmitter.js:25:39)
    at /Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/mercury-event-emitter/build/AbstractEventEmitter.js:58:84
    at Array.map (<anonymous>)
    at InternalEmitter.emit (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/mercury-event-emitter/build/AbstractEventEmitter.js:58:53)
    at MercuryTestClient.handleEventLocally (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/mercury-client/build/clients/MercuryTestClient.js:225:40)
    at MercuryTestClient.emit (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/mercury-client/build/clients/MercuryTestClient.js:120:29)
    at AddSkillViewController.emit [as handleSubmit] (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/packages/spruce-organization-skill/src/skillViewControllers/Add.svc.ts:63:48)
    at BigFormViewController.submit (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/heartwood-view-controllers/build/viewControllers/BigForm.vc.js:55:13)
    at Object.submitForm (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/heartwood-view-controllers/build/tests/utilities/interactor.js:179:9)
    at Object.submitBigFormSlide (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/node_modules/@sprucelabs/heartwood-view-controllers/build/tests/utilities/interactor.js:171:9)
    at AddingAnOrganizationTest.submitAddForm (/Users/taylorromero/Development/SpruceLabs/spruce-theatre/packages/spruce-organization-skill/src/__tests__/behavioral/AddingAnOrganization.test.ts:156:9)`

        const dlgVc = await this.assertAlertRendersDialog({
            message,
        })

        const model = this.render(dlgVc.getCardVc())
        assert.isEqual(
            model.body?.sections?.[0].text?.content,
            message,
            'Did not render to content'
        )
    }

    private async assertAlertRendersDialog(alert: AlertOptions) {
        return await vcAssert.assertRendersDialog(this.vc, () =>
            this.vc.alert(alert)
        )
    }

    private async assertAlertDoesNotRenderDialog(alert: AlertOptions) {
        return await vcAssert.assertDoesNotRenderDialog(this.vc, () =>
            this.vc.alert(alert)
        )
    }
}

type Prop = 'vc' | 'app'
