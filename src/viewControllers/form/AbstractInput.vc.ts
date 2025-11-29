import {
    FormInputHandlers,
    FormInputOptions,
    FormInputViewController,
    ViewControllerOptions,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default abstract class AbstractInputViewController<
    Model extends ViewModel = ViewModel,
>
    extends AbstractViewController<Model>
    implements FormInputViewController<Model>
{
    private setValueHandler?: (value: any) => Promise<void>
    private getValueHandler?: () => any
    private setModelHandler?: (model: Model) => void
    private getModelHandler?: () => Model

    private constructorModel: Model

    public constructor(options: ViewControllerOptions & Model) {
        super(options)
        this.constructorModel = removeUniversalViewOptions(
            options as any
        ) as Model
    }

    public setHandlers(options: FormInputHandlers<Model>): void {
        const { getValue, setValue, setModel, getModel } = options

        this.getValueHandler = getValue
        this.setValueHandler = setValue
        this.setModelHandler = setModel
        this.getModelHandler = getModel

        this.setModelHandler({
            ...this.getModelHandler(),
            ...this.constructorModel,
        })
    }

    public async setValue(
        value: string | null | undefined,
        renderedValue?: string | null
    ) {
        if (this.getValue() === value) {
            return
        }

        await this.setValueHandler?.(value)

        if (typeof renderedValue !== 'undefined' || value === null) {
            await this.setRenderedValue(renderedValue ?? null)
        } else {
            this.triggerRender()
        }

        await this.model.onChange?.(value)
    }

    public async setRenderedValue(renderedValue: any) {
        if (this.getRenderedValue() === renderedValue) {
            return
        }

        this.setModelHandler?.({
            ...this.model,
            renderedValue,
        })

        await this.model.onChangeRenderedValue?.(renderedValue)

        this.triggerRender()
    }

    public getRenderedValue() {
        return this.model.renderedValue
    }

    public async didFocus() {
        return this.model.onFocus?.()
    }

    public async didBlur() {
        return this.model.onBlur?.()
    }

    public getValue() {
        return this.getValueHandler?.() ?? null
    }

    protected get model() {
        return this.getModelHandler?.() ?? ({} as any)
    }

    protected set model(model: Model) {
        this.setModelHandler?.(model)
    }

    public render(): Model {
        return this.model
    }
}

type ViewModel = Record<string, any> & FormInputOptions
