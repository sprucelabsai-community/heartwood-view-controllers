import { test, assert, errorAssert } from '@sprucelabs/test-utils'
import chartAssert from '../../../../tests/utilities/chartAssert'
import { CardViewController } from '../../../../types/heartwood.types'
import AbstractChartAssertionTest from '../AbstractChartAssertionTest'

export default class AssertingLineGraphsTest extends AbstractChartAssertionTest {
    protected static vcName = 'line-graph' as const
    protected static sectionKey = 'lineGraph' as const

    @test()
    protected static async canCreateAssertingBarCharts() {
        //@ts-ignore
        const err = assert.doesThrow(() => chartAssert.cardRendersLineGraph())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected static async throwsIfCardDoesNotRenderBarChart() {
        this.assertNotRenderingChart([])
    }

    @test()
    protected static async passesIfBarChartFound() {
        this.assertPassesIfChartInFirstSection()
    }

    @test()
    protected static async throwsIfCardHasSectionWithoutBarChart() {
        this.assertNotRenderingChart([{}])
    }

    @test()
    protected static async passesIfBarChartInSecondSection() {
        this.assertPassesIfChartInSecondSection()
    }

    @test()
    protected static async passesIfTwoBarCharts() {
        this.assertPassesWithTwoCharts()
    }

    @test()
    protected static async throwsIfIdDoesNotMatch() {
        this.assertThrowsIfIdDoesNotMatch()
    }

    @test()
    protected static async matchesIfFirstIdMatches() {
        this.assertMatchesOnIdInFirstMatch()
    }

    @test()
    protected static async matchesIfBarChartHasIdButNonePassed() {
        this.assertIfChartHasIdButNotChecked()
    }

    @test()
    protected static async assertRendersBarChartReturnsBarChart() {
        this.assertReturnsChartVc()
    }

    @test()
    protected static async returnsBarChartWhenMatchingId() {
        this.assertReturnsChartVcWhenMatchingId()
    }

    @test()
    protected static async matchesIfIdInSecondSection() {
        this.assertMatchesIdInSecondSection()
    }

    protected static assertCardRendersChart(
        cardVc: CardViewController,
        id?: string
    ) {
        return chartAssert.cardRendersLineGraph(cardVc, id)
    }
}
