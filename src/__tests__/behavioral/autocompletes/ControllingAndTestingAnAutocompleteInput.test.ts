import { test, assert } from '@sprucelabs/test'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import autocompleteAssert from '../../../tests/utilities/autocompleteAssert'
import autocompleteInteractor from '../../../tests/utilities/autocompleteInteractor'
import vcAssert from '../../../tests/utilities/vcAssert'
import AutocompleteInputViewController, {
	AutocompleteInputViewControllerOptions,
	AutocompleteSuggestion,
} from '../../../viewControllers/form/AutocompleteInput.vc'

export default class ControllingAnAutocompleteInputTest extends AbstractViewControllerTest {
	private static vc: AutocompleteInputViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc()
	}

	@test()
	protected static passesOptionsThroughToRender() {
		const options: AutocompleteInputViewControllerOptions = {
			hint: generateId(),
			value: generateId(),
		}

		this.vc = this.Vc(options)
		const model = this.renderVc()
		assert.isEqualDeep(model, { ...options, controller: this.vc })
	}

	@test()
	protected static async canGetSetValue() {
		await this.assertGetSetValue('testing')
		await this.assertGetSetValue('waka waka')
	}

	@test()
	protected static async settingValueTriggersRender() {
		await this.setValue('waka')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test('change is triggered 1', 'oy')
	@test('change is triggered 2', 'doooo it')
	protected static async onChangeIsTriggered(value: string) {
		let wasHit = false
		let passedValue: string | undefined

		this.vc = this.Vc({
			onChange: (value) => {
				wasHit = true
				passedValue = value
			},
		})

		assert.isFalse(wasHit)

		await this.setValue(value)

		assert.isTrue(wasHit)
		assert.isEqual(passedValue, value)
	}

	@test()
	protected static async hasFunctionsForHidingAndShowingDropdown() {
		assert.isFunction(this.vc.showSuggestions)
		assert.isFunction(this.vc.hideSuggestions)

		this.vc.showSuggestions([])
		this.vc.hideSuggestions()
	}

	@test('sets suggestions 1', [])
	@test('sets suggestions 2', [{ id: 'test', label: 'me' }])
	protected static async setsSuggestionsToModel(
		suggestions: AutocompleteSuggestion[]
	) {
		this.vc.showSuggestions(suggestions)
		assert.isEqualDeep(this.renderVc().suggestions, suggestions)
	}

	@test()
	protected static async assertShowThrowsWhenMissing() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			autocompleteAssert.assertActionShowsSuggestions()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'action'],
		})
	}

	@test()
	protected static async assertHideThrowsWhenMissing() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			autocompleteAssert.assertActionHidesSuggestions()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'action'],
		})
	}

	@test()
	protected static async assertingShowThrowsIfDropdownNotOpened() {
		await assert.doesThrowAsync(
			() => autocompleteAssert.assertActionShowsSuggestions(this.vc, () => {}),
			'showSuggestions'
		)
	}

	@test()
	protected static async assertingHideThrowsIfDropdownNotOpened() {
		await assert.doesThrowAsync(
			() => autocompleteAssert.assertActionHidesSuggestions(this.vc, () => {}),
			'hideSuggestions'
		)
	}

	@test()
	protected static async assertingShowPassesWhenSuggestionsShown() {
		await this.assertShowsSuggestions()
	}

	@test()
	protected static async assertingHidePassesWhenSuggestionsHidden() {
		await autocompleteAssert.assertActionHidesSuggestions(this.vc, async () => {
			this.vc.hideSuggestions()
		})
	}

	@test()
	protected static async assertionCallsOriginalShowSuggestions() {
		let wasHit = false
		let passedSuggestions: AutocompleteSuggestion[] = []

		this.vc.showSuggestions = (suggestions) => {
			wasHit = true
			passedSuggestions = suggestions
		}

		const suggestions: AutocompleteSuggestion[] = [{ id: 'test', label: 'me' }]

		await this.assertShowsSuggestions(suggestions)

		assert.isTrue(wasHit)
		assert.isEqualDeep(passedSuggestions, suggestions)
	}

	@test("throws when showing suggestions don't match 1", ['one'], ['two'])
	@test("throws when showing suggestions don't match 1", ['two'], ['one'])
	protected static async assertShowThrowsWhenSuggestionIdsDontMatch(
		ids: string[],
		checks: string[]
	) {
		const suggestions = ids.map((id) => ({ id, label: id }))

		await assert.doesThrowAsync(
			() => this.assertShowsSuggestions(suggestions, checks),
			'do not match'
		)
	}

	@test(
		'passes when showing suggestions that match in order',
		['two', 'five'],
		['two', 'five']
	)
	@test(
		'passes when showing suggestions that match out of order',
		['two', 'five'],
		['five', 'two']
	)
	protected static async passesWhenSuggestionIdsDoMatch(
		ids: string[],
		checks: string[]
	) {
		const suggestions = ids.map((id) => ({ id, label: id }))
		await this.assertShowsSuggestions(suggestions, checks)
	}

	@test()
	protected static async autocompleteRendersSelfAsController() {
		const model = this.render(this.vc)
		assert.isEqual(model.controller, this.vc)
	}

	@test()
	protected static async settingValueWithRenderedValueUpdatesModel() {
		const renderedValue = generateId()
		await this.setValue('hey', renderedValue)
		this.assertRenderedValueEquals(renderedValue)
	}

	@test()
	protected static async canSetRenderedValueDirectly() {
		const renderedValue = generateId()
		await this.setRenderedValue(renderedValue)
		this.assertRenderedValueEquals(renderedValue)
	}

	@test()
	protected static async renderedValueTriggersRender() {
		await this.vc.setRenderedValue('aeou')
		vcAssert.assertTriggerRenderCount(this.vc, 1)
	}

	@test()
	protected static async settingValueWithoutRenderedValueDoesNotClearRenderedValue() {
		await this.setRenderedValue('yo')
		await this.setValue('hey')
		this.assertRenderedValueEquals('yo')
	}

	@test()
	protected static async passingNullToSetValueClearsRenderedValue() {
		await this.setRenderedValue('yo')
		await this.setValue('hey', null)
		this.assertRenderedValueEquals(null)
	}

	@test()
	protected static async changingRenderdValueTriggersOnChange() {
		let wasHit = false
		let passedValue: string | undefined
		this.vc = this.Vc({
			onChangeRenderedValue: (value) => {
				passedValue = value
				wasHit = true
			},
		})

		assert.isFalse(wasHit)

		const value = generateId()
		await this.vc.setRenderedValue(value)

		assert.isTrue(wasHit)
		assert.isEqual(passedValue, value)
	}

	@test()
	protected static async interactorThrowsWhenClickingSuggestionMissingRequired() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			autocompleteInteractor.clickSuggestion()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'suggestionId'],
		})
	}

	@test()
	protected static async interactorThrowsWhenSuggestionsNotShowing() {
		await assert.doesThrowAsync(
			() => autocompleteInteractor.clickSuggestion(this.vc, 'test'),
			'showSuggestions'
		)
	}

	@test()
	protected static async interactorThrowsWhenNoMatchOnSuggestions() {
		this.vc.showSuggestions([
			{
				id: 'whatever',
				label: 'you want',
			},
		])

		await assert.doesThrowAsync(
			() => autocompleteInteractor.clickSuggestion(this.vc, 'test'),
			'could not find'
		)
	}

	@test('throws when missing on click 1', 'test')
	@test('throws when missing on click 2', 'whatever')
	protected static async throwsWhenMissingOnClick(id: string) {
		this.vc.showSuggestions([
			{
				id: 'test',
				label: 'test',
			},
			{
				id: 'whatever',
				label: 'oy',
			},
		])

		await assert.doesThrowAsync(
			() => autocompleteInteractor.clickSuggestion(this.vc, id),
			'onClick'
		)
	}

	@test()
	protected static async onClickInvoked() {
		let passedId: string | undefined
		const id = generateId()

		this.vc.showSuggestions([
			{
				id,
				label: 'test',
				onClick: (id) => {
					passedId = id
				},
			},
		])

		await autocompleteInteractor.clickSuggestion(this.vc, id)
		assert.isEqual(passedId, id)
	}

	private static async setRenderedValue(renderedValue: string) {
		await this.vc.setRenderedValue(renderedValue)
	}

	private static assertRenderedValueEquals(renderedValue: string | null) {
		const model = this.render(this.vc)
		assert.isEqual(model.renderedValue, renderedValue)
	}

	private static async assertShowsSuggestions(
		suggestions: AutocompleteSuggestion[] = [],
		expectedSuggestionIds?: string[]
	) {
		await autocompleteAssert.assertActionShowsSuggestions(
			this.vc,
			async () => {
				this.vc.showSuggestions(suggestions)
			},
			expectedSuggestionIds
		)
	}

	private static async assertGetSetValue(value: string) {
		await this.setValue(value)
		assert.isEqual(this.vc.getValue(), value)
	}

	private static async setValue(value: string, renderedValue?: string | null) {
		await this.vc.setValue(value, renderedValue)
	}

	private static renderVc() {
		return this.render(this.vc)
	}

	private static Vc(options?: Partial<AutocompleteInputViewControllerOptions>) {
		return this.Controller('autocompleteInput', {
			...options,
		})
	}
}
