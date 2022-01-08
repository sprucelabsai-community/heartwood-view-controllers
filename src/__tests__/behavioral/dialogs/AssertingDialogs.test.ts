import { assert, test } from '@sprucelabs/test'
import { vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import dialogTestPatcher from '../../../tests/utilities/dialogTestPatcher'
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

	private static async assertRendersDialog() {
		await vcAssert.assertRendersDialog(
			this.vc,
			() => this.vc.renderInDialogAndGetDlgVc() as any
		)
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

	private static PatchedVc() {
		const vc = this.Controller('dialogTest', {})
		dialogTestPatcher.patchDialogToThrow(vc)
		return vc
	}
}
