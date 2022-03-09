import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import {
	AbstractSkillViewController,
	splitCardsIntoLayouts,
	vcAssert,
	ViewControllerOptions,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import CardViewController from '../../../viewControllers/card/Card.vc'
import SwipeCardViewController from '../../../viewControllers/SwipeCard.vc'

type Card = CardViewController | SwipeCardViewController

interface Options {
	cards: Card[]
}

class SkillView extends AbstractSkillViewController {
	private cards: Card[]

	public constructor(options: ViewControllerOptions & Options) {
		super(options)
		this.cards = options.cards
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
		return {
			layouts: splitCardsIntoLayouts(
				this.cards.map((c) => c.render()),
				3
			),
		}
	}
}

export default class AssertingSwipeViewsTest extends AbstractViewControllerTest {
	protected static controllerMap = {
		skillView: SkillView,
	}
	@test()
	protected static throwsWhenMissingParams() {
		const err = assert.doesThrow(() =>
			//@ts-ignore
			vcAssert.assertSkillViewRendersSwipeCard()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static findsSwipeView() {
		const vc = this.Vc([this.SwipeVc()])

		vcAssert.assertSkillViewRendersSwipeCard(vc)
	}

	@test()
	protected static throwsWithNoSwipe() {
		const vc = this.Vc([])
		assert.doesThrow(() => vcAssert.assertSkillViewRendersSwipeCard(vc))
	}

	@test()
	protected static throwsWhenFindingCard() {
		const vc = this.Vc([this.CardVc()])
		assert.doesThrow(() => vcAssert.assertSkillViewRendersSwipeCard(vc))
	}

	@test()
	protected static findsSwipeInSecondLayout() {
		const vc = this.Vc([this.CardVc(), this.SwipeVc()])
		vcAssert.assertSkillViewRendersSwipeCard(vc)
	}

	@test()
	protected static findsSwipeAFewCardsDeep() {
		const vc = this.Vc([
			this.CardVc(),
			this.CardVc(),
			this.CardVc(),
			this.CardVc(),
			this.CardVc(),
			this.SwipeVc(),
		])

		vcAssert.assertSkillViewRendersSwipeCard(vc)
	}

	@test()
	protected static returnsSwipeVc() {
		const swipeVc = this.SwipeVc()
		const vc = this.Vc([this.CardVc(), swipeVc])
		const match = vcAssert.assertSkillViewRendersSwipeCard(vc)
		assert.isEqual(match, swipeVc)
	}

	private static CardVc(): CardViewController {
		return this.Controller('card', {})
	}

	private static SwipeVc() {
		return this.Controller('swipeCard', {
			slides: [],
		}) as SwipeCardViewController
	}

	private static Vc(cards: Card[]): SkillView {
		return this.Controller('skillView' as any, {
			cards,
		}) as any
	}
}
