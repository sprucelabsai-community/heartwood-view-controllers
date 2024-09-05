import {
    test,
    assert,
    generateId,
    RecursivePartial,
} from '@sprucelabs/test-utils'
import formAssert from '../../../tests/utilities/formAssert'
import ActiveRecordCardViewController, {
    ActiveRecordCardViewControllerOptions,
} from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'
import AbstractClientSidePagingActiveRecordCard from './AbstractClientSidePagingActiveRecordCardTest'

export default class ActiveRecordCardsWithClientSideSearchTest extends AbstractClientSidePagingActiveRecordCard {
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.setupWithPagingAndSearch()
        ActiveRecordCardViewController.searchDebounceMs = 0
    }

    @test()
    protected static async enablingClientSidePagingAndSearchingEnablesSearchForm() {
        this.assertRendersSearchForm()
    }

    @test()
    protected static async shouldNotRenderSearchFormIfNotEnabled() {
        this.setupCardWithPaging({})
        assert.doesThrow(() => formAssert.cardRendersForm(this.vc, 'search'))
    }

    @test()
    protected static async searchRendersSearchField() {
        formAssert.formRendersField(this.searchFormVc, 'search', {
            type: 'text',
        })
    }

    @test()
    protected static async searchfieldRendersAsSearch() {
        formAssert.formFieldRendersAs(this.searchFormVc, 'search', 'search')
    }

    @test()
    protected static async searchFiltersFirstRow() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(generateId())
        this.assertDoesNotRenderRow(this.locations[0].id)
        await this.setSearchValueAndWait(null)
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async canMatchOnFirstRowOnName() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].name)
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async rendersPartialMatchOnNameInFirstRow() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].name.substring(0, 3))
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async rendersPartialMatchOnIdInFirstRow() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].id.substring(0, 3))
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async canMatchSecondRowOnName() {
        await this.fakeLocationsAndLoad(2)
        await this.setSearchValueAndWait(this.locations[1].name)
        this.assertDoesNotRenderRow(this.locations[0].id)
        this.assertRendersRow(this.locations[1].id)
    }

    @test()
    protected static async searchChangesShouldDebounceOnce() {
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
    protected static async searchChangesShouldRunAgainAfterDebounce() {
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
    protected static async emptyStringResetsSearch() {
        await this.fakeLocationsAndLoad(2)
        await this.setSearchValueAndWait(generateId())
        this.assertDoesNotRenderRow(this.locations[0].id)
        this.assertDoesNotRenderRow(this.locations[1].id)
        await this.setSearchValueAndWait('')
        this.assertRendersRow(this.locations[0].id)
        this.assertRendersRow(this.locations[1].id)
    }

    @test()
    protected static async rendersSearchEvenIfHeaderPassed() {
        this.setupWithPagingAndSearch({
            header: {
                title: 'Go dogs go!',
            },
        })
    }

    @test()
    protected static async searchingIsCaseInsensitive() {
        await this.fakeLocationsAndLoad(1)
        await this.setSearchValueAndWait(this.locations[0].name.toUpperCase())
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async canSearchMultipleTimes() {
        await this.fakeLocationsAndLoad(10)
        await this.setSearchValueAndWait(this.locations[0].name)
        await this.setSearchValueAndWait(this.locations[1].name)
        this.assertRendersRow(this.locations[1].id)
    }

    @test()
    protected static async canSetClientSideSearchPlaceholder() {
        const placeholder = generateId()
        this.setupWithPagingAndSearch({
            paging: {
                searchPlaceholder: placeholder,
            },
        })

        const search = this.searchFormVc.getField('search')
        assert.isEqual(
            search.renderOptions.placeholder,
            placeholder,
            'Placeholder not set'
        )
    }

    @test()
    protected static async searchingDownToOnePageThenClearingSearchBringsBackPager() {
        await this.fakeLocationsAndLoad(20)
        await this.setSearchValueAndWait(this.locations[0].name)
        this.assertRebuildSlideCountEquals(1)
        await this.setSearchValueAndWait('')
        this.assertRebuildSlideCountEquals(2)
        this.assertRendersPager()
    }

    @test()
    protected static async retainsCustoButtonsWhenSearchingAndClearingSearch() {
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

    private static setSearchDebounce() {
        ActiveRecordCardViewController.searchDebounceMs = 100
    }

    private static assertRebuildSlideCountEquals(expected: number) {
        this.vc.assertRebuildSlideCountEquals(expected)
    }

    private static async waitForSearchDebounce() {
        await this.wait(ActiveRecordCardViewController.searchDebounceMs)
    }

    private static assertRendersSearchForm() {
        formAssert.cardRendersForm(this.vc, 'search')
    }

    private static async setSearchValueAndWait(value: string | null) {
        await this.setSearchValue(value)
        await this.waitForSearchDebounce()
    }

    private static async setSearchValue(value: string | null) {
        await this.searchFormVc.setValue('search', value)
    }

    private static get searchFormVc() {
        return this.vc.getSearchFormVc()
    }

    private static setupWithPagingAndSearch(
        options?: RecursivePartial<ActiveRecordCardViewControllerOptions>
    ) {
        this.setupCardVc({
            ...options,
            shouldRenderSearch: true,
            paging: {
                shouldPageClientSide: true,
                pageSize: 10,
                ...options?.paging,
            },
        })
    }
}
