import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test-utils'
import { vcAssert, ViewController, ViewControllerOptions } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card

class MockCardViewController implements ViewController<Card> {
	private model: Card

	public constructor(options: ViewControllerOptions & Card) {
		this.model = removeUniversalViewOptions(options)
	}

	public triggerRender() {}

	public render(): Card {
		return this.model
	}
}

export default class AssertingStatsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		mockCard: MockCardViewController,
	}

	@test()
	protected static throwsIfNotRenderingStats() {
		const vc = this.Card()
		assert.doesThrow(() => vcAssert.assertCardRendersStats(vc))
	}

	@test()
	protected static knowsIfStatsAreInFirstSection() {
		const vc = this.Card({
			body: {
				sections: [
					{
						stats: {
							stats: [
								{
									value: 123,
									label: 'hey',
								},
							],
						},
					},
				],
			},
		})

		vcAssert.assertCardRendersStats(vc)
	}

	@test()
	protected static knowsIfStatsInAnotherSection() {
		const vc = this.Card({
			body: {
				sections: [
					{},
					{},
					{
						stats: {
							stats: [
								{
									value: 123,
									label: 'hey',
								},
							],
						},
					},
				],
			},
		})

		vcAssert.assertCardRendersStats(vc)
	}

	@test()
	protected static returnsController() {
		const statsVc = this.Controller('stats', {
			stats: [
				{
					value: 100,
				},
			],
		})
		const vc = this.Card({
			body: {
				sections: [
					{
						stats: statsVc.render(),
					},
				],
			},
		})

		const matchVc = vcAssert.assertCardRendersStats(vc)
		assert.isEqual(matchVc, statsVc)
	}

	private static Card(options: Card = {}) {
		//@ts-ignore
		return this.Controller('mockCard', options) as MockCardViewController
	}
}
