import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { Card, Layout, LayoutStyle } from '../../types/heartwood.types'
import buildSkillViewLayout from '../../utilities/buildSkillViewLayout'
import splitCardsIntoLayouts from '../../utilities/splitCardsIntoLayouts'

function buildCards(total: number) {
    return new Array(total).fill(0).map(() => ({}))
}

function buildLayout(totalCards: number) {
    return {
        cards: buildCards(totalCards),
    }
}

@suite()
export default class SplittingCardsIntoLayoutsTest extends AbstractViewControllerTest {
    @test('cards to layout 1', 2, buildCards(1), [buildLayout(1)])
    @test('cards to layout 2', 2, buildCards(2), [
        buildLayout(1),
        buildLayout(1),
    ])
    @test('cards to layout 3', 3, buildCards(20), [
        buildLayout(7),
        buildLayout(7),
        buildLayout(6),
    ])
    protected async movedFromOtherModule_ReturnsExpected(
        totalLayouts: number,
        cards: Card[],
        expected: Layout[]
    ) {
        const actual = splitCardsIntoLayouts(cards, totalLayouts)

        assert.isEqualDeep(expected, actual)
        assert.isEqualDeep(actual, expected)
    }

    @test('throws out of range at 0', 0)
    @test('throws out of range at 4', 4)
    @test('throws out of range at 56', 56)
    @test('throws out of range at -3', -3)
    protected cantSetOutOfRange(total: number) {
        assert.doesThrow(() => splitCardsIntoLayouts([], total))
    }

    @test('can build skill view layout big-left', 'big-left')
    @test('can build skill view layout big-right', 'big-right')
    protected async canBuildSkillViewLayout(layout: LayoutStyle) {
        const expected = {
            bottomCards: [],
            leftCards: [],
            rightCards: [],
            topCards: [],
            topLeftCards: [],
        }
        const actual = buildSkillViewLayout(layout, expected)
        assert.isEqualDeep(actual, { layout, ...expected })
    }
}
