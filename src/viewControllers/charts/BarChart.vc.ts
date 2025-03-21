import { assertOptions } from '@sprucelabs/schema'
import {
    BarChart,
    ChartDataSet,
    ChartViewController,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class BarChartViewController
    extends AbstractViewController<BarChart>
    implements ChartViewController<BarChart>
{
    private model: BarChart

    public constructor(
        options: ViewControllerOptions & BarChartViewControllerOptions
    ) {
        super(options)

        const model = removeUniversalViewOptions(options)

        this.model = {
            ...model,
            dataSets: model.dataSets ?? [],
        }
    }

    public setDataSets(dataSets: ChartDataSet[]) {
        assertOptions({ dataSets }, ['dataSets'])
        this.model.dataSets = dataSets
        this.triggerRender()
    }

    public render(): BarChart {
        return { ...this.model, controller: this }
    }
}

export type BarChartViewControllerOptions = Partial<BarChart>
