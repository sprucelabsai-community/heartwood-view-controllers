import { buildSchema } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import autocompleteAssert from '../../../tests/utilities/autocompleteAssert'
import autocompleteInteractor from '../../../tests/utilities/autocompleteInteractor'
import vcAssert from '../../../tests/utilities/vcAssert'
import AutocompleteInputViewController, {
    AutocompleteInputViewControllerOptions,
    AutocompleteSuggestion,
} from '../../../viewControllers/form/AutocompleteInput.vc'
import FormViewController from '../../../viewControllers/form/Form.vc'

@suite()
export default class ControllingAnAutocompleteInputTest extends AbstractViewControllerTest {
    private vc!: AutocompleteInputViewController
    private formVc!: FormViewController<TestForm>

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Vc()
    }

    @test()
    protected passesOptionsThroughToRender() {
        const options: AutocompleteInputViewControllerOptions = {
            hint: generateId(),
            label: generateId(),
        }

        this.vc = this.Vc(options)
        const model = this.renderVc()
        assert.doesInclude(model, options)
    }

    @test()
    protected async canGetSetValue() {
        await this.assertGetSetValue('testing')
        await this.assertGetSetValue('waka waka')
    }

    @test()
    protected async settingValueTriggersRender() {
        await this.setValue('waka')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test('change is triggered 1', 'oy')
    @test('change is triggered 2', 'doooo it')
    protected async onChangeIsTriggered(value: string) {
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
    protected async hasFunctionsForHidingAndShowingDropdown() {
        assert.isFunction(this.vc.showSuggestions)
        assert.isFunction(this.vc.hideSuggestions)

        this.vc.showSuggestions([])
        this.vc.hideSuggestions()
    }

    @test('sets suggestions 1', [])
    @test('sets suggestions 2', [{ id: 'test', label: 'me' }])
    protected async setsSuggestionsToModel(
        suggestions: AutocompleteSuggestion[]
    ) {
        this.vc.showSuggestions(suggestions)
        assert.isEqualDeep(this.renderVc().suggestions, suggestions)
    }

    @test()
    protected async assertShowThrowsWhenMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            autocompleteAssert.assertActionShowsSuggestions()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'action'],
        })
    }

    @test()
    protected async assertHideThrowsWhenMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            autocompleteAssert.assertActionHidesSuggestions()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'action'],
        })
    }

    @test()
    protected async assertingShowThrowsIfDropdownNotOpened() {
        await this.assertThrowsNotShowingSuggestionsError(() =>
            autocompleteAssert.actionShowsSuggestions(this.vc, () => {})
        )
    }

    @test()
    protected async assertingHideThrowsIfDropdownNotOpened() {
        await assert.doesThrowAsync(
            () =>
                autocompleteAssert.assertActionHidesSuggestions(
                    this.vc,
                    () => {}
                ),
            'hideSuggestions'
        )
    }

    @test()
    protected async assertingShowPassesWhenSuggestionsShown() {
        await this.assertShowsSuggestions()
    }

    @test()
    protected async assertingHidePassesWhenSuggestionsHidden() {
        await autocompleteAssert.assertActionHidesSuggestions(
            this.vc,
            async () => {
                this.vc.hideSuggestions()
            }
        )
    }

    @test()
    protected async assertionCallsOriginalShowSuggestions() {
        let wasHit = false
        let passedSuggestions: AutocompleteSuggestion[] = []

        this.vc.showSuggestions = (suggestions) => {
            wasHit = true
            passedSuggestions = suggestions
        }

        const suggestions: AutocompleteSuggestion[] = [
            { id: 'test', label: 'me' },
        ]

        await this.assertShowsSuggestions(suggestions)

        assert.isTrue(wasHit)
        assert.isEqualDeep(passedSuggestions, suggestions)
    }

    @test("throws when showing suggestions don't match 1", ['one'], ['two'])
    @test("throws when showing suggestions don't match 1", ['two'], ['one'])
    protected async assertShowThrowsWhenSuggestionIdsDontMatch(
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
    protected async passesWhenSuggestionIdsDoMatch(
        ids: string[],
        checks: string[]
    ) {
        const suggestions = ids.map((id) => ({ id, label: id }))
        await this.assertShowsSuggestions(suggestions, checks)
    }

    @test()
    protected async autocompleteRendersSelfAsController() {
        const model = this.render(this.vc)
        assert.isEqual(model.controller, this.vc)
    }

    @test()
    protected async settingValueWithRenderedValueUpdatesModel() {
        const renderedValue = generateId()
        await this.setValue('hey', renderedValue)
        this.assertRenderedValueEquals(renderedValue)
    }

    @test()
    protected async canSetRenderedValueDirectly() {
        const renderedValue = generateId()
        await this.setRenderedValue(renderedValue)
        this.assertRenderedValueEquals(renderedValue)
    }

    @test()
    protected async renderedValueTriggersRender() {
        await this.vc.setRenderedValue('aeou')
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected async settingValueWithoutRenderedValueDoesNotClearRenderedValue() {
        await this.setRenderedValue('yo')
        await this.setValue('hey')
        this.assertRenderedValueEquals('yo')
    }

    @test()
    protected async passingNullToSetValueClearsRenderedValue() {
        await this.setRenderedValue('yo')
        await this.setValue('hey', null)
        this.assertRenderedValueEquals(null)
    }

    @test()
    protected async changingRenderdValueTriggersOnChange() {
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
    protected async interactorThrowsWhenClickingSuggestionMissingRequired() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            autocompleteInteractor.clickSuggestion()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'suggestionId'],
        })
    }

    @test()
    protected async interactorThrowsWhenSuggestionsNotShowing() {
        await assert.doesThrowAsync(
            () => autocompleteInteractor.clickSuggestion(this.vc, 'test'),
            'showSuggestions'
        )
    }

    @test()
    protected async interactorThrowsWhenNoMatchOnSuggestions() {
        this.showSuggestions([
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
    protected async throwsWhenMissingOnClick(id: string) {
        this.showSuggestions([
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
    protected async onClickInvoked() {
        let passedId: string | undefined
        const id = generateId()

        this.showSuggestions([
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

    @test()
    protected async throwsIfSuggestionIsShowingIsMissingParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            autocompleteAssert.suggestionIsShowing()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'suggestionId'],
        })
    }

    @test()
    protected async throwsIfSuggestionIsNotShowingIsMissingParams() {
        const err = assert.doesThrow(() =>
            //@ts-ignore
            autocompleteAssert.suggestionIsNotShowing()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'suggestionId'],
        })
    }

    @test()
    protected async knowsIfNotRenderingSuggestions() {
        await this.assertThrowsNotShowingSuggestionsError(() =>
            autocompleteAssert.suggestionIsShowing(this.vc, 'id')
        )
        autocompleteAssert.suggestionIsNotShowing(this.vc, 'id')
    }

    @test('throws if suggestion id not found 1', 'test', 'id')
    @test('throws if suggestion id not found 2', 'id', 'test')
    protected async throwsIfSuggestionIsMissing(id: string, lookup: string) {
        this.showSuggestions([{ id, label: 'Hey!' }])
        assert.doesThrow(
            () => autocompleteAssert.suggestionIsShowing(this.vc, lookup),
            'could not find'
        )

        autocompleteAssert.suggestionIsNotShowing(this.vc, lookup)
    }

    @test()
    protected async knowsIfRenderingSuggestion() {
        this.showSuggestions([{ id: 'test', label: 'Hey!' }])
        autocompleteAssert.suggestionIsShowing(this.vc, 'test')
        this.assertDoesNotShowSuggestionThrowsWhenFound('test')
    }

    @test()
    protected async settingRenderedValueToEmptyStringHidesSuggestions() {
        this.showSuggestions([{ id: 'test', label: 'Hey!' }])
        await this.setRenderedValue('hey')

        await autocompleteAssert.actionHidesSuggestions(this.vc, () =>
            this.setRenderedValue('')
        )
    }

    @test()
    protected canFindSuggestionsThatAreNotTheFirst() {
        this.showSuggestions([
            { id: 'test', label: 'Hey!' },
            { id: 'test2', label: 'what the!?' },
        ])
        autocompleteAssert.suggestionIsShowing(this.vc, 'test2')
        this.assertDoesNotShowSuggestionThrowsWhenFound('test2')
    }

    @test()
    protected async settingRenderedValueToNullIfRenderedValueIsAlreadyNullDoesNotSetRenderedValue() {
        let hitCount = 0
        this.vc = this.Vc({
            onChangeRenderedValue: () => {
                hitCount++
            },
        })

        await this.setRenderedValue(null)
        assert.isEqual(hitCount, 1)

        await this.setValue(null)
        assert.isEqual(hitCount, 1)

        this.assertRenderedValueEquals(null)
    }

    @test()
    protected async settingValuesAlwaysOnlySetsRenderedValue() {
        const value = 'Tay'
        await this.setValueOnForm(value)

        this.assertRenderedValueEquals(value)
        this.assertValueEquals(undefined)

        await this.setValueOnForm('')
        this.assertRenderedValueEquals('')
        this.assertValueEquals(undefined)

        await this.setValueOnForm(value)
        this.assertRenderedValueEquals(value)
        this.assertValueEquals(undefined)
    }

    @test()
    protected async throwsWhenManySuggestionsDontMatch() {
        assert.doesThrow(() => this.assertSuggestionsAreShowing(['test']))
        this.showSuggestions([{ id: 'wakawaka', label: 'Hey!' }])
        this.vc.hideSuggestions()
        assert.doesThrow(() => this.assertSuggestionsAreShowing(['wakawaka']))
        this.showSuggestions([
            { id: 'wakawaka', label: 'Hey!' },
            { id: 'test', label: 'Hey!' },
        ])

        assert.doesThrow(() => this.assertSuggestionsAreShowing(['wakawaka']))
        assert.doesThrow(() => this.assertSuggestionsAreShowing(['test']))
    }

    @test()
    protected async canAssertManyOptionsWhenShowing() {
        this.showSuggestions([
            { id: 'test', label: 'Hey!' },
            { id: 'test2', label: 'what the!?' },
        ])

        this.assertSuggestionsAreShowing(['test', 'test2'])

        const id = generateId()
        this.showSuggestions([
            {
                id,
                label: 'Hey',
            },
        ])

        this.assertSuggestionsAreShowing([id])
    }

    private assertSuggestionsAreShowing(suggestions: string[]): any {
        return autocompleteAssert.suggestionsAreShowing(this.vc, suggestions)
    }

    protected async setValueOnForm(value: string) {
        const { setValue } = this.render(this.formVc)
        await setValue('firstName', value)
    }

    private assertDoesNotShowSuggestionThrowsWhenFound(id: string) {
        assert.doesThrow(
            () => autocompleteAssert.suggestionIsNotShowing(this.vc, id),
            `didn't expect to`
        )
    }

    private showSuggestions(suggestions: AutocompleteSuggestion[]) {
        this.vc.showSuggestions(suggestions)
    }

    private async setRenderedValue(renderedValue: string | undefined | null) {
        await this.vc.setRenderedValue(renderedValue)
    }

    private assertRenderedValueEquals(renderedValue: string | null) {
        const model = this.render(this.vc)
        assert.isEqual(model.renderedValue, renderedValue)
    }

    private assertValueEquals(value?: string | null) {
        const model = this.render(this.vc)
        assert.isEqual(model.value, value)
    }

    private async assertShowsSuggestions(
        suggestions: AutocompleteSuggestion[] = [],
        expectedSuggestionIds?: string[]
    ) {
        await autocompleteAssert.actionShowsSuggestions(
            this.vc,
            async () => {
                this.vc.showSuggestions(suggestions)
            },
            expectedSuggestionIds
        )
    }

    private async assertGetSetValue(value: string) {
        await this.setValue(value)
        assert.isEqual(this.vc.getValue(), value)
    }

    private async setValue(
        value: string | null,
        renderedValue?: string | null
    ) {
        await this.vc.setValue(value, renderedValue)
    }

    private renderVc() {
        return this.render(this.vc)
    }

    private Vc(options?: Partial<AutocompleteInputViewControllerOptions>) {
        const autoCompelete = this.Controller('autocompleteInput', {
            ...options,
        })

        this.formVc = this.Controller('form', {
            schema: testFormSchema,
            sections: [
                {
                    fields: [
                        {
                            name: 'firstName',
                            vc: autoCompelete,
                        },
                    ],
                },
            ],
        })

        return autoCompelete
    }

    private async assertThrowsNotShowingSuggestionsError(
        action: () => Promise<void> | void
    ) {
        await assert.doesThrowAsync(action, 'showSuggestions')
    }
}

const testFormSchema = buildSchema({
    id: 'test',
    fields: {
        firstName: {
            type: 'text',
        },
    },
})

type TestForm = typeof testFormSchema
