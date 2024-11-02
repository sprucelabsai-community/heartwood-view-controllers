import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import { ViewController, Card } from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import { pluckAllFromView } from './assertSupport'

const barChartAssert = {
    cardRendersBarChart: (cardVc: ViewController<Card>, id?: string) => {
        assertOptions({ cardVc }, ['cardVc'])

        const model = renderUtil.render(cardVc)
        const barCharts = pluckAllFromView(model, 'barChart')
        assert.isAbove(
            barCharts.length,
            0,
            `Your card is not rendering a bar chart and should be!`
        )

        if (id) {
            assert.isTruthy(
                barCharts.find((b) => b?.id === id),
                `You are not rendering a bar chart with the id ${id}!`
            )
        }
    },
}

export default barChartAssert
