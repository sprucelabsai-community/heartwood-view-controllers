import { assert, test } from '@sprucelabs/test'
import { vcAssertUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import DialogTestSkillViewController from '../../support/DialogTest.svc'

const dialogTestPatcher = {
	patchDialogToThrow(vc: AbstractViewController<any>) {
		//@ts-ignore
		vc._oldRenderInDialog = vc.renderInDialog?.bind(vc)

		//@ts-ignore
		vc.renderInDialog = () => {
			assert.fail(
				`You unexpectedly rendered a dialog. Make sure you use vcAssert.assertRendersDialog()`
			)
		}
	},
}

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
