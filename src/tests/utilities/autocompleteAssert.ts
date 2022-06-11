import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test'
import AutocompleteInputViewController, {
	AutocompleteSuggestion,
} from '../../viewControllers/form/AutocompleteInput.vc'

const autocompleteAssert = {
	async assertActionShowsSuggestions(
		vc: AutocompleteInputViewController,
		action: () => Promise<void> | void,
		expectedSuggestionIds?: string[]
	) {
		assertOptions({ vc, action }, ['vc', 'action'])

		let wasHit = false
		let passedSuggestions: AutocompleteSuggestion[] = []

		const original = vc.showSuggestions.bind(vc)
		vc.showSuggestions = (suggestions) => {
			wasHit = true
			passedSuggestions = suggestions
			return original(suggestions)
		}

		await action()

		if (expectedSuggestionIds) {
			const actual = passedSuggestions.map((s) => s.id)

			actual.sort()
			expectedSuggestionIds.sort()

			assert.isEqualDeep(
				actual,
				expectedSuggestionIds,
				`The suggestions you passed do not match what I expected!`
			)
		}

		assert.isTrue(
			wasHit,
			`I expected you to call 'vc.showSuggestions(...)', but you didn't!`
		)
	},

	async assertActionHidesSuggestions(
		vc: AutocompleteInputViewController,
		action: () => Promise<void> | void
	) {
		assertOptions({ vc, action }, ['vc', 'action'])

		let wasHit = false

		vc.hideSuggestions = () => {
			wasHit = true
		}

		await action()

		assert.isTruthy(
			wasHit,
			`A was waiting for you to call 'vc.hideSuggestions()', but it never happened!`
		)
	},
}

export default autocompleteAssert
