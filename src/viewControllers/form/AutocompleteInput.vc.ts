import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import AbstractInputViewController from './AbstractInput.vc'

export default class AutocompleteInputViewController extends AbstractInputViewController<ViewModel> {
	private isShowingSuggestions = false

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
