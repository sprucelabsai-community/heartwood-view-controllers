import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import DialogTestSkillViewController from '../support/DialogTest.svc'

export default class RenderingInADialogTest extends AbstractViewControllerTest {
	private static svc: DialogTestSkillViewController
	protected static controllerMap = {
		dialogTest: DialogTestSkillViewController,
	}

	protected static async beforeEach() {
		await super.beforeEach()
		this.svc = this.Svc()
	}

	@test()
	protected static renders() {
		const model = this.svc.render()
		assert.isArray(model.layouts)
	}

	private static Svc() {
		return this.Factory().Controller('dialogTest', {})
	}

	@test()
	protected static async doesntThrowWhenPresenting() {
		await this.svc.showTermsOfService()
	}

	@test()
	protected static getsBackDialogController() {
		const dialog = this.svc.getRenderInDialogController()
		assert.isTruthy(dialog)
		assert.isFunction(dialog.hide)
	}

	@test()
	protected static async canWaitUntilDialogIsClossed() {
		const dialog = this.svc.getRenderInDialogController()

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

		const dialog = this.svc.invokesOnCloseCallback(() => {
			wasHit = true
		})

		await dialog.hide()

		assert.isTrue(wasHit)
	}
}
