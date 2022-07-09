import { assert, test } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import dialogTestPatcher from '../../../tests/utilities/dialogTestPatcher'
import vcAssert from '../../../tests/utilities/vcAssert'
import DialogTestSkillViewController from '../../support/DialogTest.svc'

export default class AssertingDialogsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		dialogTest: DialogTestSkillViewController,
	}
	private static vc: DialogTestSkillViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.PatchedVc()
	}

	@test()
	protected static async canBePathedToThrowWhenRenderingDialog() {
		await assert.doesThrowAsync(() => this.vc.renderInDialogAndGetDlgVc())
	}

	@test()
	protected static async assertingDoesRenderWorksAsExpected() {
		await this.assertRendersDialog()
	}

	@test()
	protected static async callsOriginalDialogHandler() {
		let wasHit = false
		this.vc = this.PatchedVc()

		//@ts-ignore
		this.vc.renderInDialogHandler = () => {
			wasHit = true
		}

		await this.assertRendersDialog()

		assert.isTruthy(wasHit)
	}

	@test()
	protected static async renderingMoreThanOneDialogPerAssertionThrows() {
		await assert.doesThrowAsync(() =>
			vcAssert.assertRendersDialog(this.vc, async () => {
				await Promise.all([
					this.vc.renderInDialogAndGetDlgVc(),
					this.vc.renderInDialogAndGetDlgVc(),
				])
			})
		)
	}

	@test()
	protected static async canTestMultipleTimesInOneTest() {
		const dlg = await vcAssert.assertRendersDialog(this.vc, async () => {
			await this.vc.renderInDialogAndWait()
		})

		await dlg.hide()

		await vcAssert.assertRendersDialog(this.vc, async () => {
			await this.vc.renderInDialogAndWait()
		})
	}

	private static async assertRendersDialog() {
		await vcAssert.assertRendersDialog(
			this.vc,
			() => this.vc.renderInDialogAndGetDlgVc() as any
		)
	}

	private static PatchedVc() {
		const vc = this.Controller('dialogTest', {})
		dialogTestPatcher.patchDialogToThrow(vc)
		return vc
	}
}
