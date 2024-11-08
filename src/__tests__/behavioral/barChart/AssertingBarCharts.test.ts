import { test, assert, errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import barChartAssert from '../../../tests/utilities/barChartAssert'
import { CardSection, CardViewController } from '../../../types/heartwood.types'
import { BarChartViewControllerOptions } from '../../../viewControllers/BarChart.vc'

export default class AssertingBarChartsTest extends AbstractViewControllerTest {
    @test()
    protected static async canCreateAssertingBarCharts() {
        //@ts-ignore
        const err = assert.doesThrow(() => barChartAssert.cardRendersBarChart())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['cardVc'],
        })
    }

    @test()
    protected static async throwsIfCardDoesNotRenderBarChart() {
        this.assertNotRenderingBarChart([])
    }

    @test()
    protected static async passesIfBarChartFound() {
        const vc = this.ChartVc({})
        this.assertRendersBarChart([
            {
                barChart: vc.render(),
            },
        ])
    }

    @test()
    protected static async throwsIfCardHasSectionWithoutBarChart() {
        this.assertNotRenderingBarChart([{}])
    }

    @test()
    protected static async passesIfBarChartInSecondSection() {
        const vc = this.ChartVc({})
        this.assertRendersBarChart([
            {},
            {
                barChart: vc.render(),
            },
        ])
    }

    @test()
    protected static async passesIfTwoBarCharts() {
        const vc = this.ChartVc({})
        const vc2 = this.ChartVc({})
        this.assertRendersBarChart([
            {
                barChart: vc.render(),
            },
            {
                barChart: vc2.render(),
            },
        ])
    }

    @test()
    protected static async throwsIfIdDoesNotMatch() {
        const vc = this.ChartVc({ id: generateId() })
        this.assertNotRenderingBarChart(
            [
                {
                    barChart: vc.render(),
                },
            ],
            generateId()
        )
    }

    @test()
    protected static async matchesIfFirstIdMatches() {
        const id = generateId()
        const vc = this.ChartVc({ id })
        this.assertRendersBarChart(
            [
                {
                    barChart: vc.render(),
                },
            ],
            id
        )
    }

    @test()
    protected static async matchesIfBarChartHasIdButNonePassed() {
        const vc = this.ChartVc({ id: generateId() })
        this.assertRendersBarChart([
            {
                barChart: vc.render(),
            },
        ])
    }

    @test()
    protected static async assertRendersBarChartReturnsBarChart() {
        const vc = this.ChartVc({})
        const cardVc = this.CardVc([
            {
                barChart: vc.render(),
            },
        ])

        const barChart = barChartAssert.cardRendersBarChart(cardVc)
        assert.isEqual(barChart, vc)
    }

    @test()
    protected static async returnsBarChartWhenMatchingId() {
        const id = generateId()
        const vc = this.ChartVc({ id })
        const vc2 = this.ChartVc({})
        const cardVc = this.CardVc([
            {
                barChart: vc2.render(),
            },
            {
                barChart: vc.render(),
            },
        ])

        const barChart = barChartAssert.cardRendersBarChart(cardVc, id)
        assert.isEqual(barChart, vc)
    }

    @test()
    protected static async matchesIfIdInSecondSection() {
        const id = generateId()
        const vc = this.ChartVc({ id })
        const vc2 = this.ChartVc({})

        this.assertRendersBarChart(
            [
                {
                    barChart: vc2.render(),
                },
                {
                    barChart: vc.render(),
                },
            ],
            id
        )
    }

    @test()
    protected static async throwsWhenCheckingDataSets() {
        //@ts-ignore
        const err = assert.doesThrow(() => barChartAssert.dataSetsEqual())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['chartVc', 'dataSets'],
        })
    }

    @test()
    protected static async throwsWhenDataSetsDoNotMatch() {
        const vc = this.ChartVc({
            dataSets: [{ dataPoints: [], label: generateId() }],
        })

        assert.doesThrow(
            () => barChartAssert.dataSetsEqual(vc, []),
            'not match'
        )
    }

    @test()
    protected static async matchesOnFirstDataSet() {
        const label = generateId()
        const expected = [
            { dataPoints: [{ label: generateId(), value: 10 }], label },
        ]
        const vc = this.ChartVc({
            dataSets: expected,
        })

        barChartAssert.dataSetsEqual(vc, expected)
    }

    @test()
    protected static async matchesOnSecondDataSet() {
        const label = generateId()
        const expected = [
            { dataPoints: [{ label: generateId(), value: 10 }], label },
            { dataPoints: [{ label: generateId(), value: 10 }], label },
        ]
        const vc = this.ChartVc({
            dataSets: expected,
        })

        barChartAssert.dataSetsEqual(vc, expected)
    }

    private static ChartVc(options: BarChartViewControllerOptions) {
        return this.Controller('bar-chart', options)
    }

    private static assertRendersBarChart(sections: CardSection[], id?: string) {
        const cardVc = this.CardVc(sections)
        return this.assertCardRenderingBarChart(cardVc, id)
    }

    private static assertNotRenderingBarChart(
        sections: CardSection[],
        id?: string
    ) {
        const cardVc = this.CardVc(sections)
        this.assertCardNotRenderingBarChart(cardVc, id)
    }

    private static CardVc(sections: CardSection[]) {
        return this.Controller('card', {
            body: {
                sections,
            },
        })
    }

    private static assertCardRenderingBarChart(
        cardVc: CardViewController,
        id?: string
    ) {
        return barChartAssert.cardRendersBarChart(cardVc, id)
    }

    private static assertCardNotRenderingBarChart(
        cardVc: CardViewController,
        id?: string
    ) {
        assert.doesThrow(
            () => barChartAssert.cardRendersBarChart(cardVc, id),
            'not rendering'
        )
    }
}
