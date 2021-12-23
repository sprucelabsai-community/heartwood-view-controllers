import { assert, test } from '@sprucelabs/test'
import { interactionUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { testFormOptions } from '../forms/testFormOptions'

export default class InteractingWithAFormTest extends AbstractViewControllerTest {
	protected static async beforeEach() {
		await super.beforeEach()
	}

	@test()
	protected static async throwsWhenNoOnCancelHandlerSet() {
		const formVc = this.Controller('form', testFormOptions)
		await assert.doesThrowAsync(() => interactionUtil.cancelForm(formVc))
	}

	@test()
	protected static async callsCancelHandler() {
		let wasHit = false
		const formVc = this.Controller('form', {
			...testFormOptions,
			onCancel: () => {
				wasHit = true
			},
		})

		await interactionUtil.cancelForm(formVc)
		assert.isTrue(wasHit)
	}
}
