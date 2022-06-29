import { ViewControllerOptions } from '../../../types/heartwood.types'
import removeUniversalViewOptions from '../../../utilities/removeUniversalViewOptions'
import AbstractInputViewController from '../../../viewControllers/form/AbstractInput.vc'
import { TextInput } from './SettingVcsForFieldRendering.test'

export default class SpyTextFieldInput extends AbstractInputViewController<TextInput> {
	public name: string
	public constructorOptions: Record<string, any> = {}
	public get value() {
		return this.model.value
	}
	public get renderedValue() {
		return this.model.renderedValue
	}
	public getModel() {
		return this.model
	}
	public constructor(options: ViewControllerOptions & { name: string }) {
		super(options)
		this.name = options.name
		this.constructorOptions = removeUniversalViewOptions(options)
	}
	public render() {
		return this.model
	}
}
