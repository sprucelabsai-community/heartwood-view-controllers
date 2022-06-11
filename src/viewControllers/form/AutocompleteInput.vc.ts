import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import AbstractInputViewController from './AbstractInput.vc'

export default class AutocompleteInputViewController extends AbstractInputViewController<ViewModel> {
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
