import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import {
	FormFieldViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import removeUniversalViewOptions from '../utilities/removeUniversalViewOptions'
import AbstractViewController from './Abstract.vc'

export default class AutocompleteInputViewController
	extends AbstractViewController<ViewModel>
	implements FormFieldViewController
{
	private model: ViewModel

	public constructor(
		options: ViewControllerOptions & AutocompleteInputViewControllerOptions
	) {
		super(options)
		this.model = removeUniversalViewOptions(options)
	}

	public async setValue(value: string) {
		this.model.value = value
		this.triggerRender()
		await this.model.onChange?.(value)
	}

	public getValue() {
		return this.model.value
	}

	public hideSuggestions() {}

	public showSuggestions(suggestions: AutocompleteSuggestion[]) {
		this.model.suggestions = suggestions
	}

	public render(): ViewModel {
		return this.model
	}
}

type ViewModel = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInput,
	'name'
>
export interface AutocompleteInputViewControllerOptions extends ViewModel {}
export type AutocompleteSuggestion =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteSuggestion
