import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import chartAssert from '../../../../tests/utilities/chartAssert'
import { CardViewController } from '../../../../types/heartwood.types'
import AbstractChartAssertionTest from '../AbstractChartAssertionTest'

@suite()
export default class AssertingBarChartsTest extends AbstractChartAssertionTest {
    protected vcName = 'bar-chart' as const
    protected sectionKey = 'barChart' as const

    @test()
    protected async canCreateAssertingBarCharts() {
        //@ts-ignore
        const err = assert.doesThrow(() => chartAssert.cardRendersBarChart())
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

    @test()
    protected async throwsWhenCheckingDataSets() {
        //@ts-ignore
        const err = assert.doesThrow(() => chartAssert.dataSetsEqual())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['chartVc', 'dataSets'],
        })
    }

    @test()
    protected async throwsWhenDataSetsDoNotMatch() {
        const vc = this.Vc({
            dataSets: [{ dataPoints: [], label: generateId() }],
        })

        assert.doesThrow(() => chartAssert.dataSetsEqual(vc, []), 'not match')
    }

    @test()
    protected async matchesOnFirstDataSet() {
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
    protected async matchesOnSecondDataSet() {
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

    protected assertCardRendersChart(cardVc: CardViewController, id?: string) {
        return chartAssert.cardRendersBarChart(cardVc, id)
    }
}
