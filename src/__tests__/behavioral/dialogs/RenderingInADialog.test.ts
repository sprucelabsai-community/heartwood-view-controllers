import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import CardViewController from '../../../viewControllers/card/Card.vc'
import DialogViewController from '../../../viewControllers/Dialog.vc'
import DialogTestSkillViewController from '../../support/DialogTest.svc'

export default class RenderingInADialogTest extends AbstractViewControllerTest {
	private static vc: DialogTestSkillViewController
	protected static controllerMap = {
		dialogTest: DialogTestSkillViewController,
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

	private static Svc() {
		return this.Factory().Controller('dialogTest', {})
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

	private static assertDialogIsBusy(dlg: DialogViewController) {
		const model = this.render(dlg)
		assert.isTrue(model.body?.isBusy)
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
