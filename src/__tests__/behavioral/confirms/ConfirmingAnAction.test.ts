import { assert, test } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ConfirmTestSkillViewController from '../../support/ConfirmTest.svc'

export default class ConfirmingAnActionTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		confirmTest: ConfirmTestSkillViewController,
	}
	private static svc: ConfirmTestSkillViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.svc = this.Svc()
	}

	@test()
	protected static renders() {
		const model = this.svc.render()
		assert.isArray(model.layouts)
	}

	@test()
	protected static canInvokeConfirmWithoutCrashing() {
		void this.svc.confirmShouldSave()
	}

	private static Svc() {
		return this.Factory().Controller('confirmTest', {})
	}
}
