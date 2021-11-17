import { test, assert } from '@sprucelabs/test'
import { vcAssertUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import CardViewController from '../../viewControllers/Card.vc'

export default class AssertingTriggerRenderCountsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		card: CardViewController,
	}

	@test()
	protected static async canCreateAssertingTriggerRenderCounts() {
		const vc = this.Controller('card', {
			header: {
				title: 'hey!',
			},
		})

		vcAssertUtil.attachTriggerRenderCounter(vc)

		//@ts-ignore
		assert.isEqual(vc.__renderInvocationCount, 0)

		vc.triggerRender()

		//@ts-ignore
		assert.isEqual(vc.__renderInvocationCount, 1)

		vcAssertUtil.attachTriggerRenderCounter(vc)

		//@ts-ignore
		assert.isEqual(vc.__renderInvocationCount, 1)
	}
}
