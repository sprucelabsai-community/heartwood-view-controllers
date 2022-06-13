import { ViewControllerOptions } from '../../../types/heartwood.types'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'
import AbstractInputViewController from '../../../viewControllers/form/AbstractInput.vc'
import { TextInput } from './SettingVcsForFieldRendering.test'

export default class SpyTextFieldInput extends AbstractInputViewController<TextInput> {
	public get value() {
		return this.model.value
	}
	public name: string
	public get renderedValue() {
		return this.model.renderedValue
	}
	public model: TextInput

	public constructor(options: ViewControllerOptions & { name: string }) {
		super(options)
		this.name = options.name
		this.model = removeUniversalViewOptions(options)
	}

	public getValue() {}

	public render(): TextInput {
		return this.model
	}
}
