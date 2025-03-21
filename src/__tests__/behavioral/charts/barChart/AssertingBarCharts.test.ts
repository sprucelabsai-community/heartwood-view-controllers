import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import chartAssert from '../../../../tests/utilities/chartAssert'
import { CardViewController } from '../../../../types/heartwood.types'
import AbstractChartAssertionTest from '../AbstractChartAssertionTest'

export default class AssertingBarChartsTest extends AbstractChartAssertionTest {
    protected static vcName = 'bar-chart' as const
    protected static sectionKey = 'barChart' as const

    @test()
    protected static async canCreateAssertingBarCharts() {
        //@ts-ignore
        const err = assert.doesThrow(() => chartAssert.cardRendersBarChart())
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

    @test()
    protected static async throwsWhenCheckingDataSets() {
        //@ts-ignore
        const err = assert.doesThrow(() => chartAssert.dataSetsEqual())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['chartVc', 'dataSets'],
        })
    }

    @test()
    protected static async throwsWhenDataSetsDoNotMatch() {
        const vc = this.Vc({
            dataSets: [{ dataPoints: [], label: generateId() }],
        })

        assert.doesThrow(() => chartAssert.dataSetsEqual(vc, []), 'not match')
    }

    @test()
    protected static async matchesOnFirstDataSet() {
        const label = generateId()
        const expected = [
            { dataPoints: [{ label: generateId(), value: 10 }], label },
        ]
        const vc = this.Vc({
            dataSets: expected,
        })

        chartAssert.dataSetsEqual(vc, expected)
    }

    @test()
    protected static async matchesOnSecondDataSet() {
        const label = generateId()
        const expected = [
            { dataPoints: [{ label: generateId(), value: 10 }], label },
            { dataPoints: [{ label: generateId(), value: 10 }], label },
        ]
        const vc = this.Vc({
            dataSets: expected,
        })

        chartAssert.dataSetsEqual(vc, expected)
    }

    protected static assertCardRendersChart(
        cardVc: CardViewController,
        id?: string
    ) {
        return chartAssert.cardRendersBarChart(cardVc, id)
    }
}
