import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
    ViewController,
    Card,
    BarChart,
    LineGraph,
    ChartDataSet,
    CardSection,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import { pluckAllFromView } from './assertSupport'

const chartAssert = {
    cardRendersLineGraph(cardVc: ViewController<Card>, id?: string) {
        return assertRendersCardRendersCart(
            cardVc,
            'lineGraph',
            'line graph',
            id
        )
    },
    cardRendersBarChart(cardVc: ViewController<Card>, id?: string) {
        return assertRendersCardRendersCart(cardVc, 'barChart', 'bar chart', id)
    },

    dataSetsEqual(
        chartVc: ViewController<BarChart> | ViewController<LineGraph>,
        dataSets: ChartDataSet[]
    ) {
        assertOptions({ chartVc, dataSets }, ['chartVc', 'dataSets'])

        const model = renderUtil.render(chartVc)
        assert.isEqualDeep(
            model.dataSets,
            dataSets,
            `Your bar chart does not match the expected data sets!`
        )
    },
}

export default chartAssert
function assertRendersCardRendersCart(
    cardVc: ViewController<Card>,
    key: keyof CardSection,
    name: string,
    id: string | undefined
) {
    assertOptions({ cardVc }, ['cardVc'])

    const model = renderUtil.render(cardVc)
    const charts = pluckAllFromView(model, key)
    assert.isAbove(
        charts.length,
        0,
        `Your card is not rendering a ${name} and should be!`
    )

    let match = charts[0]

    if (id) {
        //@ts-ignore
        match = charts.find((b) => b?.id === id)
        assert.isTruthy(
            match,
            `You are not rendering a ${name} with the id ${id}!`
        )
    }

    //@ts-ignore
    const vc = match!.controller!
    return vc
}
