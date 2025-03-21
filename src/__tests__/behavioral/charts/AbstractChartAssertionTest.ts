import { assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
    CardSection,
    CardViewController,
    ViewController,
} from '../../../types/heartwood.types'
import { BarChartViewControllerOptions } from '../../../viewControllers/charts/BarChart.vc'
import { LineGraphViewControllerOptions } from '../../../viewControllers/charts/LineGraph.vc'

export default abstract class AbstractChartAssertionTest extends AbstractViewControllerTest {
    protected static vcName: 'bar-chart' | 'line-graph'
    protected static sectionKey: 'barChart' | 'lineGraph'

    protected static assertCardRendersChart(
        _cardVc: CardViewController,
        _id?: string
    ): ViewController<any> {
        throw new Error(
            'You must implement assertCardRendersChart(cardVc, id?).'
        )
    }

    protected static Vc(options: Options) {
        if (!this.vcName) {
            throw new Error(
                "You must declare private vcName = 'controller-name' in your test class."
            )
        }
        return this.Controller(this.vcName, options)
    }

    protected static CardVc(sections: CardSection[]) {
        return this.Controller('card', {
            body: {
                sections,
            },
        })
    }

    protected static assertNotRenderingChart(
        sections: CardSection[],
        id?: string
    ) {
        const cardVc = this.CardVc(sections)
        this.assertCardNotRenderingChart(cardVc, id)
    }

    private static assertCardNotRenderingChart(
        cardVc: CardViewController,
        id?: string
    ) {
        assert.doesThrow(
            () => this.assertCardRendersChart(cardVc, id),
            'not rendering'
        )
    }

    protected static assertRendersGraph(sections: CardSection[], id?: string) {
        const cardVc = this.CardVc(sections)
        return this.assertCardRendersChart(cardVc, id)
    }

    protected static assertPassesIfChartInFirstSection() {
        const vc = this.Vc({})
        this.assertRendersGraph([
            {
                [this.sectionKey]: vc.render(),
            },
        ])
    }

    protected static assertPassesIfChartInSecondSection() {
        const vc = this.Vc({})
        this.assertRendersGraph([
            {},
            {
                [this.sectionKey]: vc.render(),
            },
        ])
    }

    protected static assertPassesWithTwoCharts() {
        const vc = this.Vc({})
        const vc2 = this.Vc({})
        this.assertRendersGraph([
            {
                [this.sectionKey]: vc.render(),
            },
            {
                [this.sectionKey]: vc2.render(),
            },
        ])
    }

    protected static assertThrowsIfIdDoesNotMatch() {
        const vc = this.Vc({ id: generateId() })
        this.assertNotRenderingChart(
            [
                {
                    [this.sectionKey]: vc.render(),
                },
            ],
            generateId()
        )
    }

    protected static assertMatchesOnIdInFirstMatch() {
        const id = generateId()
        const vc = this.Vc({ id })
        this.assertRendersGraph(
            [
                {
                    [this.sectionKey]: vc.render(),
                },
            ],
            id
        )
    }

    protected static assertIfChartHasIdButNotChecked() {
        const vc = this.Vc({ id: generateId() })
        this.assertRendersGraph([
            {
                [this.sectionKey]: vc.render(),
            },
        ])
    }

    protected static assertReturnsChartVc() {
        const vc = this.Vc({})
        const cardVc = this.CardVc([
            {
                [this.sectionKey]: vc.render(),
            },
        ])

        const barChart = this.assertCardRendersChart(cardVc)
        assert.isEqual(barChart, vc)
    }

    protected static assertReturnsChartVcWhenMatchingId() {
        const id = generateId()
        const vc = this.Vc({ id })
        const vc2 = this.Vc({})
        const cardVc = this.CardVc([
            {
                [this.sectionKey]: vc2.render(),
            },
            {
                [this.sectionKey]: vc.render(),
            },
        ])

        const barChart = this.assertCardRendersChart(cardVc, id)
        assert.isEqual(barChart, vc)
    }

    protected static assertMatchesIdInSecondSection() {
        const id = generateId()
        const vc = this.Vc({ id })
        const vc2 = this.Vc({})

        this.assertRendersGraph(
            [
                {
                    [this.sectionKey]: vc2.render(),
                },
                {
                    [this.sectionKey]: vc.render(),
                },
            ],
            id
        )
    }
}

type Options = BarChartViewControllerOptions | LineGraphViewControllerOptions
