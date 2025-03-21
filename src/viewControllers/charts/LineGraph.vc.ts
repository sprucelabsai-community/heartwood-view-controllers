import { assertOptions } from '@sprucelabs/schema'
import {
    ChartDataSet,
    ChartViewController,
    LineGraph,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default class LineGraphViewController
    extends AbstractViewController<LineGraph>
    implements ChartViewController<LineGraph>
{
    private model: LineGraph

    public constructor(
        options: ViewControllerOptions & LineGraphViewControllerOptions
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

    public render(): LineGraph {
        return { ...this.model, controller: this }
    }
}

export type LineGraphViewControllerOptions = Partial<LineGraph>
