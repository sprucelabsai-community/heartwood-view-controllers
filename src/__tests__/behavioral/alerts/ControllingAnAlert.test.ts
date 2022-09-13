import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import { AbstractSkillViewController, interactor, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import deviceAssert from '../../../tests/utilities/deviceAssert'

class AlertSkillViewController extends AbstractSkillViewController {
	public afterAlert = false
	public async showAnAlert(): Promise<void> {
		await this.alert({ title: 'oh no!', message: 'what the?' })

		this.afterAlert = true
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

		vcAssert.assertFooterRendersButtonWithType(dlgVc, 'secondary')
	}

	@test()
	protected static async successRendersPrimaryButton() {
		const dlgVc = await vcAssert.assertRendersDialog(this.vc, () =>
			//@ts-ignore
			this.vc.alert({
				title: 'hey',
				message: 'hey',
				style: 'success',
			})
		)

		vcAssert.assertFooterRendersButtonWithType(dlgVc, 'primary')
	}

	@test()
	protected static async renderingAnAlertVibratesTheDevice() {
		deviceAssert.assertWasNotVibrated(this.vc)
		await vcAssert.assertRendersDialog(this.vc, () => this.vc.showAnAlert())
		deviceAssert.assertWasVibrated(this.vc)
	}
}
