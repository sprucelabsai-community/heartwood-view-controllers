import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import renderUtil from '../../utilities/render.utility'
import AutocompleteInputViewController, {
    AutocompleteSuggestion,
} from '../../viewControllers/form/AutocompleteInput.vc'

const autocompleteAssert = {
    /**
     * @deprecated autocompleteAssert.assertActionShowsSuggestions(...) -> autocompleteAssert.actionShowsSuggestions(...)
     */
    async assertActionShowsSuggestions(
        vc: AutocompleteInputViewController,
        action: () => Promise<any> | any,
        expectedSuggestionIds?: string[]
    ) {
        return this.actionShowsSuggestions(vc, action, expectedSuggestionIds)
    },

    async actionShowsSuggestions(
        vc: AutocompleteInputViewController,
        action: () => Promise<any> | any,
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

    /**
     * @deprecated autocompleteAssert.assertActionHidesSuggestions(...) -> autocompleteAssert.actionHidesSuggestions(...)
     */
    async assertActionHidesSuggestions(
        vc: AutocompleteInputViewController,
        action: () => Promise<any> | any
    ) {
        return this.actionHidesSuggestions(vc, action)
    },

    async actionHidesSuggestions(
        vc: AutocompleteInputViewController,
        action: () => Promise<any> | any
    ) {
        assertOptions({ vc, action }, ['vc', 'action'])

        let wasHit = false

        vc.hideSuggestions = () => {
            wasHit = true
        }

        await action()

        assert.isTruthy(
            wasHit,
            `I was waiting for you to call 'vc.hideSuggestions()', but it never happened!`
        )
    },

    suggestionsAreShowing(
        vc: AutocompleteInputViewController,
        suggestionIds: string[]
    ) {
        assert.isTrue(
            vc.getIsShowingSuggestions(),
            "You aren't showing an suggestions. Try 'vc.showSuggestions(...)' to show suggestions!"
        )

        const { suggestions } = renderUtil.render(vc)
        const ids = suggestions?.map((s) => s.id) || []
        assert.isEqualDeep(
            ids,
            suggestionIds,
            `The suggestions you passed do not match what I expected!`
        )
    },

    suggestionIsShowing(
        vc: AutocompleteInputViewController,
        suggestionId: string
    ) {
        assertOptions({ vc, suggestionId }, ['vc', 'suggestionId'])

        assert.isTrue(
            vc.getIsShowingSuggestions(),
            "You aren't showing an suggestions. Try 'vc.showSuggestions(...)' to show suggestions!"
        )

        const { suggestions } = renderUtil.render(vc)

        assert.isTruthy(
            suggestions?.find((s) => s.id === suggestionId),
            `I could not find a suggestion with the id of '${suggestionId}'!`
        )
    },

    suggestionIsNotShowing(
        vc: AutocompleteInputViewController,
        suggestionId: string
    ) {
        assertOptions({ vc, suggestionId }, ['vc', 'suggestionId'])
        try {
            this.suggestionIsShowing(vc, suggestionId)
        } catch {
            return
        }

        assert.fail(
            `I found a suggestion with the id of '${suggestionId}' and didn't expect to!`
        )
    },
}

export default autocompleteAssert
