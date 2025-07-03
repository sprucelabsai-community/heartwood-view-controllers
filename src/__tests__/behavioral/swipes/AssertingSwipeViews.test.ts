import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test, suite } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import {
    AbstractSkillViewController,
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
    private cards!: Card[]

    public constructor(options: ViewControllerOptions & Options) {
        super(options)
        this.cards = options.cards
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillView {
        return {
            layouts: [
                {
                    style: 'one-col',
                    cards: this.cards.map((card) => card.render()),
                },
            ],
        }
    }
}

@suite()
export default class AssertingSwipeViewsTest extends AbstractViewControllerTest {
    protected controllerMap = {
        skillView: SkillView,
    }
    @test()
    protected throwsWhenMissingParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            vcAssert.assertSkillViewRendersSwipeCard()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected findsSwipeView() {
        const vc = this.Vc([this.SwipeVc()])

        vcAssert.assertSkillViewRendersSwipeCard(vc)
    }

    @test()
    protected throwsWithNoSwipe() {
        const vc = this.Vc([])
        assert.doesThrow(() => vcAssert.assertSkillViewRendersSwipeCard(vc))
    }

    @test()
    protected throwsWhenFindingCard() {
        const vc = this.Vc([this.CardVc()])
        assert.doesThrow(() => vcAssert.assertSkillViewRendersSwipeCard(vc))
    }

    @test()
    protected findsSwipeInSecondLayout() {
        const vc = this.Vc([this.CardVc(), this.SwipeVc()])
        vcAssert.assertSkillViewRendersSwipeCard(vc)
    }

    @test()
    protected findsSwipeAFewCardsDeep() {
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
    protected returnsSwipeVc() {
        const swipeVc = this.SwipeVc()
        const vc = this.Vc([this.CardVc(), swipeVc])
        const match = vcAssert.assertSkillViewRendersSwipeCard(vc)
        assert.isEqual(match, swipeVc)
    }

    @test()
    protected knowsIfNotSwipeCard() {
        const vc = this.Controller('card', {})

        assert.doesThrow(
            () => vcAssert.assertIsSwipeCard(vc),
            'expected a swipe'
        )

        const swipe = this.SwipeVc()
        vc.render = () => swipe.render()

        vcAssert.assertIsSwipeCard(vc)
    }

    private CardVc(): CardViewController {
        return this.Controller('card', {})
    }

    private SwipeVc() {
        return this.Controller('swipe-card', {
            slides: [],
        }) as SwipeCardViewController
    }

    private Vc(cards: Card[]): SkillView {
        return this.Controller('skillView' as any, {
            cards,
        }) as any
    }
}
