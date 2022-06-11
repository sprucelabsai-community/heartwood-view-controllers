import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import {
	FormFieldViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

export default class AutocompleteInputViewController
	extends AbstractViewController<ViewModel>
	implements FormFieldViewController<ViewModel>
{
	private model: ViewModel

	public constructor(
		options: ViewControllerOptions & AutocompleteInputViewControllerOptions
	) {
		super(options)

		this.model = removeUniversalViewOptions(options)
	}

	public async setValue(value: string, renderedValue?: string | null) {
		this.model.value = value

		if (typeof renderedValue !== 'undefined') {
			this.setRenderedValue(renderedValue)
		} else {
			this.triggerRender()
		}

		await this.model.onChange?.(value)
	}

	public setRenderedValue(renderedValue: any) {
		this.model.renderedValue = renderedValue
		this.triggerRender()
	}

	public getValue() {
		return this.model.value
	}

	public hideSuggestions() {}

	public showSuggestions(suggestions: AutocompleteSuggestion[]) {
		this.model.suggestions = suggestions
	}

	public render(): ViewModel {
		return { ...this.model, controller: this }
	}
}

type ViewModel =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInput
export interface AutocompleteInputViewControllerOptions extends ViewModel {}
export type AutocompleteSuggestion =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteSuggestion
