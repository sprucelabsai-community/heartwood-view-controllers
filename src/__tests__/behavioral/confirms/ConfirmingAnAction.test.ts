import { assert, test } from '@sprucelabs/test-utils'
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

	@test()
	protected static dropInConfirmBody() {
		const section1 = {
			text: {
				content: 'hey',
			},
		}
		const section2 = {
			text: {
				content: 'there!',
			},
		}

		const sections = {
			sections: [section1, section2],
		}

		const message = 'hey there!'
		const confirmVc = this.Controller('confirm', {
			message,
			body: sections,
			onAccept: () => {},
			onDecline: () => {},
		})

		const model = this.render(confirmVc)
		assert.doesInclude(model.body?.sections?.[0], {
			title: 'hey there!',
		})

		assert.doesInclude(model.body?.sections?.[1], section1)
		assert.doesInclude(model.body?.sections?.[2], section2)
	}

	private static Svc() {
		return this.Factory().Controller('confirmTest', {})
	}
}
