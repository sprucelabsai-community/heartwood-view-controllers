import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import AutocompleteInputViewController, {
	AutocompleteInputViewControllerOptions,
	AutocompleteSuggestion,
} from '../../../viewControllers/AutocompleteInput.vc'

export default class ControllingAnAutocompleteInputTest extends AbstractViewControllerTest {
	private static vc: AutocompleteInputViewController

	protected static async beforeEach() {
		await super.beforeEach()
		this.vc = this.Vc()
	}

	@test()
	protected static passesOptionsThroughToRender() {
		const options: AutocompleteInputViewControllerOptions = {
			name: generateId(),
			hint: generateId(),
			value: generateId(),
		}

		this.vc = this.Vc(options)
		const model = this.renderVc()
		assert.isEqualDeep(model, options)
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

	private static async assertGetSetValue(value: string) {
		await this.setValue(value)
		assert.isEqual(this.vc.getValue(), value)
	}

	private static async setValue(value: string) {
		await this.vc.setValue(value)
	}

	private static renderVc() {
		return this.render(this.vc)
	}

	private static Vc(options?: Partial<AutocompleteInputViewControllerOptions>) {
		return this.Controller('autocompleteInput', {
			name: 'test',
			...options,
		})
	}
}

function generateId(): string {
	return `${new Date().getTime() * Math.random()}`
}
