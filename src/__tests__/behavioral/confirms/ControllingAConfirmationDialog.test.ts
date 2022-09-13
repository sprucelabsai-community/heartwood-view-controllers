import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ConfirmViewController, {
	ConfirmViewControllerOptions,
} from '../../../viewControllers/Confirm.vc'

export default class ControllingAConfirmationDialogTest extends AbstractViewControllerTest {
	protected static controllerMap = {}
	private static vc: ConfirmViewController

	protected static async beforeEach() {
		await super.beforeEach()

		this.vc = this.Confirm()
	}

	@test()
	protected static canCreateConfirmationDialog() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static notPassingMessageDoesNotRenderBody() {
		const vc = this.Confirm()

		const model = this.render(vc)

		assert.isUndefined(model.body)
	}

	@test()
	protected static settingMessageSetsBody() {
		const vc = this.Confirm({ message: 'Hey!' })
		const model = this.render(vc)

		assert.isEqual(model.body?.sections?.[0]?.title, 'Hey!')
	}

	@test()
	protected static canSetAsDescructive() {
		const vc = this.Confirm({ message: 'Hey!', isDestructive: true })
		const model = this.render(vc)

		assert.isEqual(model.footer?.buttons?.[1].type, 'destructive')
	}

	@test()
	protected static actionButtonIsPrimaryByDefault() {
		const vc = this.Confirm({ message: 'Hey!' })
		const model = this.render(vc)

		assert.isEqual(model.footer?.buttons?.[1].type, 'primary')
	}

	private static Confirm(options?: Partial<ConfirmViewControllerOptions>) {
		return this.Controller('confirm', {
			onAccept: () => {},
			onDecline: () => {},
			...options,
		})
	}
}
