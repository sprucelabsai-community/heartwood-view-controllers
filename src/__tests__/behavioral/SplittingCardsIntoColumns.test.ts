import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { Card, LayoutStyle, LayoutColumn } from '../../types/heartwood.types'
import buildSkillViewLayout from '../../utilities/buildSkillViewLayout'
import splitCardsIntoColumns from '../../utilities/splitCardsIntoColumns'

function buildCards(total: number) {
    return new Array(total).fill(0).map(() => ({}))
}

@suite()
export default class SplittingCardsIntoLayoutsTest extends AbstractViewControllerTest {
    @test('cards to layout 1', 2, buildCards(1), [buildCards(1)])
    @test('cards to layout 2', 2, buildCards(2), [buildCards(1), buildCards(1)])
    @test('cards to layout 3', 3, buildCards(20), [
        buildCards(7),
        buildCards(7),
        buildCards(6),
    ])
    protected async movedFromOtherModule_ReturnsExpected(
        totalColumns: number,
        cards: Card[],
        expected: LayoutColumn[]
    ) {
        const actual = splitCardsIntoColumns(cards, totalColumns)

        assert.isEqualDeep(expected, actual)
        assert.isEqualDeep(actual, expected)
    }

    @test('throws out of range at 0', 0)
    @test('throws out of range at 4', 4)
    @test('throws out of range at 56', 56)
    @test('throws out of range at -3', -3)
    protected cantSetOutOfRange(total: number) {
        assert.doesThrow(() => splitCardsIntoColumns([], total))
    }

    @test('can build skill view layout big-left', 'big-left')
    @test('can build skill view layout big-right', 'big-right')
    protected async canBuildSkillViewLayout(style: LayoutStyle) {
        const expected = {
            bottomCards: [],
            leftCards: [],
            rightCards: [],
            topCards: [],
            topLeftCards: [],
        }
        const actual = buildSkillViewLayout(style, expected)
        assert.isEqualDeep(actual, { style, ...expected })
    }
}
