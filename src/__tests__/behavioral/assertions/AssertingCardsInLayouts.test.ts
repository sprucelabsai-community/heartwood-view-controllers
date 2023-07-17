import { test, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
	SkillView,
	SkillViewController,
	TriggerRenderHandler,
} from '../../../types/heartwood.types'
import buildSkillViewLayout from '../../../utilities/buildSkillViewLayout'

class GoodSkillViewController implements SkillViewController {
	private model: SkillView

	public constructor(model: SkillView) {
		this.model = model
	}

	public async load() {}
	public triggerRender() {}
	public setTriggerRenderHandler(_handler: TriggerRenderHandler) {}
	public render() {
		return this.model
	}
}

export default class AssertingCardsInLayoutsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		good: GoodSkillViewController,
	}
	private static vc: GoodSkillViewController

	@test()
	protected static async canGetCardsInLeft() {
		const { cardVc, id } = this.CardVc()

		this.vc = this.SkillView(
			buildSkillViewLayout('big-left', { leftCards: [cardVc.render()] })
		)

		this.assertRendersCard(id)
	}

	@test()
	protected static async canGetCardInRight() {
		const { cardVc, id } = this.CardVc()

		this.vc = this.SkillView(
			buildSkillViewLayout('big-right', { rightCards: [cardVc.render()] })
		)

		this.assertRendersCard(id)
	}

	@test()
	protected static async canGetCardsFromAnywhere() {
		const { cardVc, id } = this.CardVc()
		const { cardVc: cardVc2, id: id2 } = this.CardVc()
		const { cardVc: cardVc3, id: id3 } = this.CardVc()
		const { cardVc: cardVc4, id: id4 } = this.CardVc()
		const { cardVc: cardVc5, id: id5 } = this.CardVc()
		const { cardVc: cardVc6, id: id6 } = this.CardVc()
		const { cardVc: cardVc7, id: id7 } = this.CardVc()

		this.vc = this.SkillView(
			buildSkillViewLayout('big-right', {
				leftCards: [cardVc.render(), cardVc2.render()],
				rightCards: [cardVc3.render(), cardVc4.render()],
				topCards: [cardVc5.render()],
				bottomCards: [cardVc6.render()],
				topLeftCards: [cardVc7.render()],
			})
		)

		this.assertRendersCard(id)
		this.assertRendersCard(id2)
		this.assertRendersCard(id3)
		this.assertRendersCard(id4)
		this.assertRendersCard(id5)
		this.assertRendersCard(id6)
		this.assertRendersCard(id7)
	}

	private static assertRendersCard(id: string) {
		vcAssert.assertSkillViewRendersCard(this.vc, id)
	}

	private static SkillView(
		options: Partial<SkillView>
	): GoodSkillViewController {
		return this.Controller('good', {
			...options,
		}) as any
	}

	private static CardVc() {
		const id = generateId()
		const cardVc = this.Controller('card', {
			id,
		})

		return { id, cardVc }
	}
}
