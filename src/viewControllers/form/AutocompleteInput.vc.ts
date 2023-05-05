import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { FormInputOptions, ViewControllerOptions } from '../..'
import AbstractInputViewController from './AbstractInput.vc'

export default class AutocompleteInputViewController extends AbstractInputViewController<ViewModel> {
	private isShowingSuggestions = false

	public constructor(options: ViewControllerOptions & FormInputOptions) {
		super({
			...options,
			onChangeRenderedValue: (value) => {
				if (value === '') {
					this.hideSuggestions()
				}
				return options.onChangeRenderedValue?.(value)
			},
		})
	}

	public hideSuggestions() {
		this.isShowingSuggestions = false
	}

	public showSuggestions(suggestions: AutocompleteSuggestion[]) {
		this.model = {
			...this.model,
			suggestions,
		}
		this.isShowingSuggestions = true
	}

	public getRenderedValue() {
		return super.getRenderedValue() ?? ''
	}

	public getIsShowingSuggestions() {
		return this.isShowingSuggestions
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
