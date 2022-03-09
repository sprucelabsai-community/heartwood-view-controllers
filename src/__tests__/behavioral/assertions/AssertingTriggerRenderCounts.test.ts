import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { AbstractViewController, vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CardViewController from '../../../viewControllers/card/Card.vc'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class RenderViewController extends AbstractViewController<Card> {
	public myRenderCount = 0

	public triggerRender() {
		this.myRenderCount++
	}
	public render() {
		return {}
	}
}

export default class AssertingTriggerRenderCountsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		card: CardViewController,
		render: RenderViewController,
	}

	@test()
	protected static async canCreateAssertingTriggerRenderCounts() {
		const vc = this.Controller('card', {
			header: {
				title: 'hey!',
			},
		})

		vcAssert.attachTriggerRenderCounter(vc)

		//@ts-ignore
		assert.isEqual(vc.__renderInvocationCount, 0)

		vc.triggerRender()

		//@ts-ignore
		assert.isEqual(vc.__renderInvocationCount, 1)

		vcAssert.attachTriggerRenderCounter(vc)

		//@ts-ignore
		assert.isEqual(vc.__renderInvocationCount, 1)
	}

	@test()
	protected static async retainsOriginalTriggerRender() {
		//@ts-ignore
		const vc = this.Controller('render', {})

		//@ts-ignore
		vc.triggerRender()

		//@ts-ignore
		assert.isEqual(vc.myRenderCount, 1)
	}
}
