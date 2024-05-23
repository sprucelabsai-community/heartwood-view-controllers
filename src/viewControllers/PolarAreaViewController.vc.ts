import {
    PolarArea,
    PolarAreaDataItem,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

export default class PolarAreaViewController extends AbstractViewController<PolarArea> {
    private model: PolarArea

    public constructor(
        options: ViewControllerOptions & PolarAreaViewControllerOptions
    ) {
        super(options)

        const { data } = options

        this.model = {
            data,
        }
    }

    public setData(data: PolarAreaDataItem[]) {
        this.model.data = [...data]
        this.triggerRender()
    }

    public render(): PolarArea {
        return {
            controller: this,
            ...this.model,
        }
    }
}

export type PolarAreaViewControllerOptions = PolarArea
