import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import renderUtil from '../../utilities/render.utility'
import AutocompleteInputViewController from '../../viewControllers/form/AutocompleteInput.vc'

const autocompleteInteractor = {
	async clickSuggestion(
		vc: AutocompleteInputViewController,
		suggestionId: string
	) {
		assertOptions({ vc, suggestionId }, ['vc', 'suggestionId'])
		assert.isTrue(
			vc.getIsShowingSuggestions(),
			`You can't click a suggestion until suggestions are showing, try 'vc.showSuggestions(...)'`
		)

		const model = renderUtil.render(vc)
		const match = model.suggestions?.find((s) => s.id === suggestionId)

		assert.isTruthy(
			match,
			`I could not find a suggestion with the id '${suggestionId}'!`
		)

		assert.isFunction(
			match.onClick,
			`I could not click your suggestion because it does not have an 'onClick' set!`
		)

		await match.onClick(suggestionId)
	},
}

export default autocompleteInteractor
