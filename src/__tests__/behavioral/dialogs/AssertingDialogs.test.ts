import { assert, test } from '@sprucelabs/test'
import { vcAssertUtil } from '../../..'
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
		await assert.doesThrowAsync(() => this.vc.getRenderInDialogController())
	}

	@test()
	protected static async assertingDoesRenderWorksAsExpected() {
		await vcAssertUtil.assertRendersDialog(
			this.vc,
			() => this.vc.getRenderInDialogController() as any
		)
	}

	private static PatchedVc() {
		const vc = this.Controller('dialogTest', {})
		dialogTestPatcher.patchDialogToThrow(vc)
		return vc
	}
}
