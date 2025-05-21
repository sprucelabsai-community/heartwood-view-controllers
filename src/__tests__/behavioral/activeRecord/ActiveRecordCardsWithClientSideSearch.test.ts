import {
    test,
    suite,
    assert,
    generateId,
    RecursivePartial,
} from '@sprucelabs/test-utils'
import formAssert from '../../../tests/utilities/formAssert'
import ActiveRecordCardViewController, {
    ActiveRecordCardViewControllerOptions,
} from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'
import AbstractClientSidePagingActiveRecordCard from './AbstractClientSidePagingActiveRecordCardTest'

@suite()
export default class ActiveRecordCardsWithClientSideSearchTest extends AbstractClientSidePagingActiveRecordCard {
    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.setupWithPagingAndSearch()
        ActiveRecordCardViewController.searchDebounceMs = 0
    }

    @test()
    protected async enablingClientSidePagingAndSearchingEnablesSearchForm() {
        this.assertRendersSearchForm()
    }

    @test()
    protected async shouldNotRenderSearchFormIfNotEnabled() {
        this.setupCardWithPaging({})
        this.vc.assertDoesNotRenderSearchForm()
    }

    @test()
    protected async searchRendersSearchField() {
        formAssert.formRendersField(this.searchFormVc, 'search', {
            type: 'text',
        })
    }

    @test()
    protected async searchfieldRendersAsSearch() {
        formAssert.formFieldRendersAs(this.searchFormVc, 'search', 'search')
    }

    @test()
    protected async searchFiltersFirstRow() {
        await this.assertSearchFiltersFirstRow()
    }

    @test()
    protected async canMatchOnFirstRowOnName() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].name)
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected async rendersPartialMatchOnNameInFirstRow() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].name.substring(0, 3))
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected async rendersPartialMatchOnIdInFirstRow() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].id.substring(0, 3))
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected async canMatchSecondRowOnName() {
        await this.assertSearchCanMatchSecondRow()
    }

    @test()
    protected async searchChangesShouldDebounceOnce() {
        this.setSearchDebounce()
        await this.fakeLocationsAndLoad(2)
        await Promise.all([
            this.setSearchValue(generateId()),
            this.setSearchValue(generateId()),
        ])

        await this.waitForSearchDebounce()
        this.assertRebuildSlideCountEquals(1)
    }

    @test()
    protected async searchChangesShouldRunAgainAfterDebounce() {
        this.setSearchDebounce()
        await this.fakeLocationsAndLoad(2)
        await Promise.all([
            this.setSearchValue(generateId()),
            this.setSearchValue(generateId()),
        ])
        await this.waitForSearchDebounce()
        this.assertRebuildSlideCountEquals(1)
        await this.setSearchValueAndWait(generateId())
        this.assertRebuildSlideCountEquals(2)
    }

    @test()
    protected async emptyStringResetsSearch() {
        await this.fakeLocationsAndLoad(2)
        await this.setSearchValueAndWait(generateId())
        this.assertDoesNotRenderRow(this.locations[0].id)
        this.assertDoesNotRenderRow(this.locations[1].id)
        await this.setSearchValueAndWait('')
        this.assertRendersRow(this.locations[0].id)
        this.assertRendersRow(this.locations[1].id)
    }

    @test()
    protected async rendersSearchEvenIfHeaderPassed() {
        this.setupWithPagingAndSearch({
            header: {
                title: 'Go dogs go!',
            },
        })
    }

    @test()
    protected async searchingIsCaseInsensitive() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].name.toUpperCase())
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected async canSearchMultipleTimes() {
        await this.fakeLocationsAndLoad(10)
        await this.setSearchValueAndWait(this.locations[0].name)
        await this.setSearchValueAndWait(this.locations[1].name)
        this.assertRendersRow(this.locations[1].id)
    }

    @test()
    protected async canSetClientSideSearchPlaceholder() {
        const placeholder = generateId()
        this.setupWithPagingAndSearch({
            search: { placeholder },
            paging: {},
        })

        const search = this.searchFormVc.getField('search')
        assert.isEqual(
            search.renderOptions.placeholder,
            placeholder,
            'Placeholder not set'
        )
    }

    @test()
    protected async searchingDownToOnePageThenClearingSearchBringsBackPager() {
        await this.fakeLocationsAndLoad(20)
        await this.setSearchValueAndWait(this.locations[0].name)
        this.assertRebuildSlideCountEquals(1)
        await this.setSearchValueAndWait('')
        this.assertRebuildSlideCountEquals(2)
        this.assertRendersPager()
    }

    @test()
    protected async retainsCustomButtonsWhenSearchingAndClearingSearch() {
        await this.fakeLocationsAndLoad(20)
        const footer = {
            buttons: [{ id: generateId() }],
        }
        this.setupWithPagingAndSearch({
            footer,
        })

        await this.setSearchValueAndWait(this.locations[0].name)
        await this.setSearchValueAndWait('')

        this.assertRenderedFooterIncludes(footer)
    }

    @test()
    protected async canSearchWithoutPaging() {
        this.setupCardWithSearch()

        await this.fakeLocationsAndLoad(5)
        await this.setSearchValueAndWait(this.locations[0].name)
    }

    @test()
    protected async searchCanMatchFirstRowWithoutPaging() {
        this.setupCardWithSearch()
        await this.assertSearchFiltersFirstRow()
    }

    @test()
    protected async searchCanMatchSecondRowWithoutPaging() {
        this.setupCardWithSearch()
        await this.assertSearchCanMatchSecondRow()
    }

    @test()
    protected async searchCanMatchMultpleRowsWithoutPaging() {
        const name = generateId()
        this.addFakedLocations(5)

        this.locations[0].name = name
        this.locations[1].name = name

        this.setupCardWithSearch()
        await this.load()

        await this.setSearchValueAndWait(name)
        this.assertRendersRow(this.locations[0].id)
        this.assertRendersRow(this.locations[1].id)
    }

    private async assertSearchCanMatchSecondRow() {
        await this.fakeLocationsAndLoad(2)
        await this.setSearchValueAndWait(this.locations[1].name)
        this.assertDoesNotRenderRow(this.locations[0].id)
        this.assertRendersRow(this.locations[1].id)
    }

    private setupCardWithSearch() {
        this.setupCardVc({
            search: { shouldSearchClientSide: true },
        })
    }

    private setSearchDebounce() {
        ActiveRecordCardViewController.searchDebounceMs = 100
    }

    private assertRebuildSlideCountEquals(expected: number) {
        this.vc.assertRebuildSlideCountEquals(expected)
    }

    private async waitForSearchDebounce() {
        await this.wait(ActiveRecordCardViewController.searchDebounceMs)
    }

    private assertRendersSearchForm() {
        this.vc.assertRendersSearchForm()
    }

    private async setSearchValueAndWait(value: string | null) {
        await this.setSearchValue(value)
        await this.waitForSearchDebounce()
    }

    private async setSearchValue(value: string | null) {
        await this.searchFormVc.setValue('search', value)
    }

    private get searchFormVc() {
        const formVc = this.vc.getSearchFormVc()
        assert.isTruthy(formVc, `Search form not found`)
        return formVc
    }

    private async assertSearchFiltersFirstRow() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(generateId())
        this.assertDoesNotRenderRow(this.locations[0].id)
        await this.setSearchValueAndWait(null)
        this.assertRendersRow(this.locations[0].id)
    }

    private setupWithPagingAndSearch(
        options?: RecursivePartial<ActiveRecordCardViewControllerOptions>
    ) {
        this.setupCardVc({
            ...options,
            search: { shouldSearchClientSide: true, ...options?.search },
            paging: {
                shouldPageClientSide: true,
                pageSize: 10,
                ...options?.paging,
            },
        })
    }
}
