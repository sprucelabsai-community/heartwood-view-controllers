import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ViewController, Card, BarChart } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import { pluckAllFromView } from './assertSupport'

const barChartAssert = {
    cardRendersBarChart(cardVc: ViewController<Card>, id?: string) {
        assertOptions({ cardVc }, ['cardVc'])

        const model = renderUtil.render(cardVc)
        const barCharts = pluckAllFromView(model, 'barChart')
        assert.isAbove(
            barCharts.length,
            0,
            `Your card is not rendering a bar chart and should be!`
        )

        let match = barCharts[0]

        if (id) {
            match = barCharts.find((b) => b?.id === id)
            assert.isTruthy(
                match,
                `You are not rendering a bar chart with the id ${id}!`
            )
        }

        return match!.controller!
    },

    dataSetsEqual(
        chartVc: ViewController<BarChart>,
        dataSets: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChartDataSet[]
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

export default barChartAssert
