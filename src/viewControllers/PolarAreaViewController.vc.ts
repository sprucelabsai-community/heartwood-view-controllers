import { PolarArea, ViewControllerOptions } from '../types/heartwood.types'
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

    public render(): PolarArea {
        return {
            controller: this,
            ...this.model,
        }
    }
}

export type PolarAreaViewControllerOptions = PolarArea
