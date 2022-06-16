import {
	FormInputOptions,
	FormInputViewController,
	ViewControllerOptions,
} from '../../types/heartwood.types'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

export default abstract class AbstractInputViewController<
		Model extends ViewModel = ViewModel
	>
	extends AbstractViewController<Model>
	implements FormInputViewController<Model>
{
	protected model: Model

	public constructor(options: ViewControllerOptions & Model) {
		super(options)
		this.model = removeUniversalViewOptions(options as any) as Model
	}

	public async setValue(value: string, renderedValue?: string | null) {
		this.model.value = value

		if (typeof renderedValue !== 'undefined') {
			await this.setRenderedValue(renderedValue)
		} else {
			this.triggerRender()
		}

		await this.model.onChange?.(value)
	}

	public async setRenderedValue(renderedValue: any) {
		this.model.renderedValue = renderedValue
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
		return this.model.value
	}

	public abstract render(): Model
}

type ViewModel = Record<string, any> & FormInputOptions
