import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import {
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

	public getValue() {
		return this.model.value
	}

	public abstract render(): Model
}

type ViewModel = Record<string, any> &
	Omit<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Input, 'name'>
