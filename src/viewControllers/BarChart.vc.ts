import { assertOptions } from '@sprucelabs/schema'
import { BarChart, ViewControllerOptions } from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

export default class BarChartViewController extends AbstractViewController<BarChart> {
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

    public setDataSets(options: BarChart) {
        this.model = assertOptions(options, ['dataSets'])
        this.triggerRender()
    }

    public render(): BarChart {
        return { ...this.model, controller: this }
    }
}

export type BarChartViewControllerOptions = Partial<BarChart>
