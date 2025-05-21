import { test, suite, assert, errorAssert } from '@sprucelabs/test-utils'
import chartAssert from '../../../../tests/utilities/chartAssert'
import { CardViewController } from '../../../../types/heartwood.types'
import AbstractChartAssertionTest from '../AbstractChartAssertionTest'

@suite()
export default class AssertingLineGraphsTest extends AbstractChartAssertionTest {
    protected vcName = 'line-graph' as const
    protected sectionKey = 'lineGraph' as const

    @test()
    protected async canCreateAssertingBarCharts() {
        //@ts-ignore
        const err = assert.doesThrow(() => chartAssert.cardRendersLineGraph())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected async throwsIfCardDoesNotRenderBarChart() {
        this.assertNotRenderingChart([])
    }

    @test()
    protected async passesIfBarChartFound() {
        this.assertPassesIfChartInFirstSection()
    }

    @test()
    protected async throwsIfCardHasSectionWithoutBarChart() {
        this.assertNotRenderingChart([{}])
    }

    @test()
    protected async passesIfBarChartInSecondSection() {
        this.assertPassesIfChartInSecondSection()
    }

    @test()
    protected async passesIfTwoBarCharts() {
        this.assertPassesWithTwoCharts()
    }

    @test()
    protected async throwsIfIdDoesNotMatch() {
        this.assertThrowsIfIdDoesNotMatch()
    }

    @test()
    protected async matchesIfFirstIdMatches() {
        this.assertMatchesOnIdInFirstMatch()
    }

    @test()
    protected async matchesIfBarChartHasIdButNonePassed() {
        this.assertIfChartHasIdButNotChecked()
    }

    @test()
    protected async assertRendersBarChartReturnsBarChart() {
        this.assertReturnsChartVc()
    }

    @test()
    protected async returnsBarChartWhenMatchingId() {
        this.assertReturnsChartVcWhenMatchingId()
    }

    @test()
    protected async matchesIfIdInSecondSection() {
        this.assertMatchesIdInSecondSection()
    }

    protected assertCardRendersChart(cardVc: CardViewController, id?: string) {
        return chartAssert.cardRendersLineGraph(cardVc, id)
    }
}
