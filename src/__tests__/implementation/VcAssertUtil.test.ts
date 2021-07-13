import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import vcAssertUtil from '../../tests/utilities/vcAssert.utility'

class BadSkillViewController {
	public render() {
		return {}
	}
}

class GoodSkillViewController {
	private model: SpruceSchemas.Heartwood.v2021_02_11.SkillView
	public constructor(model: SpruceSchemas.Heartwood.v2021_02_11.SkillView) {
		this.model = model
	}
	public render() {
		return this.model
	}
}

export default class VcAssertUtilTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		bad: BadSkillViewController,
		good: GoodSkillViewController,
	}

	@test()
	protected static async knowsIfNotRenderingCard() {
		assert.isFunction(vcAssertUtil.assertSkillViewRendersCard)
		const vc = this.BadController()
		//@ts-ignore
		assert.doesThrow(() => vcAssertUtil.assertSkillViewRendersCard(vc))
	}

	@test()
	protected static async knowsIfCardInFirstLayout() {
		const vc = this.GoodController({
			layouts: [
				{
					cards: [
						{
							header: {
								title: 'go!',
							},
						},
					],
				},
			],
		})

		//@ts-ignore
		const cardVc = vcAssertUtil.assertSkillViewRendersCard(vc)

		assert.isEqual(cardVc.getHeaderTitle(), 'go!')
	}

	@test()
	protected static async knowsIfCardInSecondLayout() {
		const vc = this.GoodController({
			layouts: [
				{},
				{
					cards: [
						{
							header: {
								title: 'go2!',
							},
						},
					],
				},
			],
		})

		//@ts-ignore
		const cardVc = vcAssertUtil.assertSkillViewRendersCard(vc)

		assert.isEqual(cardVc.getHeaderTitle(), 'go2!')
	}

	@test()
	protected static assertingIfCardBodyIsLoading() {
		const vc = this.Controller('card', {
			body: {},
		})

		assert.doesThrow(() => vcAssertUtil.assertCardBodyIsLoading(vc))
		vcAssertUtil.assertCardBodyIsNotLoading(vc)

		vc.setIsBodyLoading(true)

		vcAssertUtil.assertCardBodyIsLoading(vc)
		assert.doesThrow(() => vcAssertUtil.assertCardBodyIsNotLoading(vc))
	}

	private static BadController() {
		//@ts-ignore
		return this.Controller('bad') as BadSkillViewController
	}

	private static GoodController(
		model: SpruceSchemas.Heartwood.v2021_02_11.SkillView
	) {
		//@ts-ignore
		return this.Controller('good', model) as BadSkillViewController
	}
}
