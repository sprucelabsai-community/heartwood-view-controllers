import { test, suite, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    LayoutStyle,
    SkillView,
    SkillViewController,
    SkillViewLayout,
    TriggerRenderHandler,
} from '../../../types/heartwood.types'
import buildSkillViewLayout from '../../../utilities/buildSkillViewLayout'

class GoodSkillViewController implements SkillViewController {
    private model!: SkillView

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

@suite()
export default class AssertingCardsWithDifferentStylesTest extends AbstractViewControllerTest {
    protected controllerMap = {
        good: GoodSkillViewController,
    }
    private vc!: GoodSkillViewController

    @test('can get cards in left in layout 0', 0)
    @test('can get cards in left in layout 1', 1)
    protected async canGetCardsInLeft(layoutIdx: number) {
        const { cardVc, id } = this.CardVc()

        this.vc = this.SkillView(
            buildSkillViewLayout('big-left', { leftCards: [cardVc.render()] }),
            layoutIdx
        )

        this.assertRendersCard(id)
    }

    @test('cat get cards in right in layout 0', 0)
    @test('cat get cards in right in layout 1', 1)
    protected async canGetCardInRight(layoutIdx: number) {
        const { cardVc, id } = this.CardVc()

        this.vc = this.SkillView(
            buildSkillViewLayout('big-right', {
                rightCards: [cardVc.render()],
            }),
            layoutIdx
        )

        this.assertRendersCard(id)
    }

    @test()
    protected async canGetCardsFromAnywhere() {
        const { cardVc, id } = this.CardVc()
        const { cardVc: cardVc2, id: id2 } = this.CardVc()
        const { cardVc: cardVc3, id: id3 } = this.CardVc()
        const { cardVc: cardVc4, id: id4 } = this.CardVc()
        const { cardVc: cardVc5, id: id5 } = this.CardVc()
        const { cardVc: cardVc6, id: id6 } = this.CardVc()

        this.vc = this.SkillView(
            buildSkillViewLayout('big-right' as LayoutStyle, {
                leftCards: [cardVc.render(), cardVc2.render()],
                rightCards: [cardVc3.render(), cardVc4.render()],
                topCards: [cardVc5.render()],
                bottomCards: [cardVc6.render()],
            })
        )

        this.assertRendersCard(id)
        this.assertRendersCard(id2)
        this.assertRendersCard(id3)
        this.assertRendersCard(id4)
        this.assertRendersCard(id5)
        this.assertRendersCard(id6)
    }

    @test()
    protected async canGetCardsFromGrid() {
        const { cardVc, id } = this.CardVc()
        this.vc = this.SkillView(
            buildSkillViewLayout('grid', {
                cards: [cardVc.render()],
            })
        )

        this.assertRendersCard(id)
    }

    @test('can get header card in layout 0', 0)
    @test('can get header card in layout 1', 1)
    protected async cancheckForCardInHeader(layoutIdx: number) {
        const { cardVc, id } = this.CardVc()
        this.vc = this.SkillView(
            buildSkillViewLayout('grid', {
                headerCard: cardVc.render(),
                cards: [],
            }),
            layoutIdx
        )

        this.assertRendersCard(id)
    }

    private assertRendersCard(id: string) {
        vcAssert.assertSkillViewRendersCard(this.vc, id)
    }

    private SkillView(
        layout: SkillViewLayout,
        layoutIdx = 0
    ): GoodSkillViewController {
        const layouts: SkillViewLayout[] = Array.from(
            { length: layoutIdx + 1 },
            () => ({})
        )

        layouts[layoutIdx] = layout

        return this.Controller('good', {
            layouts,
        }) as any
    }

    private CardVc() {
        const id = generateId()
        const cardVc = this.Controller('card', {
            id,
        })

        return { id, cardVc }
    }
}
