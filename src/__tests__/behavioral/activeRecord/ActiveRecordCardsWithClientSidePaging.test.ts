import { Location } from '@sprucelabs/spruce-core-schemas'
import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import buildActiveRecordCard from '../../../builders/buildActiveRecordCard'
import AbstractSkillViewController from '../../../skillViewControllers/Abstract.svc'
import interactor, { PagerButton } from '../../../tests/utilities/interactor'
import listAssert from '../../../tests/utilities/listAssert'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import {
    CardFooter,
    CardHeader,
    List,
    ListRow,
    RowValues,
    SkillView,
    SkillViewControllerId,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import ActiveRecordCardViewController from '../../../viewControllers/activeRecord/ActiveRecordCard.vc'
import { NoResultsRow } from '../../../viewControllers/activeRecord/ActiveRecordList.vc'
import SwipeCardViewController from '../../../viewControllers/SwipeCard.vc'
import { ListLocationsTargetAndPayload } from '../../support/EventFaker'
import AbstractClientSidePagingActiveRecordCard, {
    SpyPager,
    SpySwipeCard,
} from './AbstractClientSidePagingActiveRecordCardTest'

export default class ActiveRecordCardsWithClientSidePagingTest extends AbstractClientSidePagingActiveRecordCard {
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        SwipeCardViewController.swipeDelay = 0
        ActiveRecordCardViewController.setShouldThrowOnResponseError(false)
    }

    @test()
    protected static async rendersPagerIfPagingEnabled() {
        this.assertRendersPager()
        pagerAssert.cardRendersPager(this.vc, 'active-pager')
    }

    @test()
    protected static async doesNotRenderPagerIfPagingDisabled() {
        this.setupCardVc()
        this.assertDoesNotRenderPager()
    }

    @test()
    protected static async rendersSwipeControllerIfPagingEnabled() {
        vcAssert.assertIsSwipeCard(this.vc)
    }

    @test()
    protected static async doesNotCreateListIfPaging() {
        //@ts-ignore
        assert.isUndefined(this.vc.listVc)
    }

    @test()
    protected static async getCardReturnsSwipeCard() {
        const { controller } = this.render(this.vc)
        assert.isEqual(controller, this.vc.getCardVc())
    }

    @test()
    protected static async swipeCardRendersList() {
        await this.load()
        listAssert.cardRendersList(this.vc)
    }

    @test()
    protected static async loadsResultsIntoFirstList() {
        this.addFakedLocation()

        await this.load()

        const id = this.locationIds[0]
        this.assertRendersRow(id)
    }

    @test()
    protected static async usesRowRendererToPopulateList() {
        this.addFakedLocation()

        let passedRow: Record<string, any> | undefined

        const expectedRow: ListRow = {
            id: generateId(),
            cells: [],
        }

        this.setupCardVc({
            paging: {
                pageSize: 10,
                shouldPageClientSide: true,
            },
            rowTransformer: (row: any) => {
                passedRow = row
                return expectedRow
            },
        })

        await this.load()

        assert.isEqualDeep(passedRow, this.locations[0])
        this.assertRendersRow(expectedRow.id)
    }

    @test()
    protected static async firstListRendersMultpleRows() {
        await this.fakeLocationsAndLoad(3)

        this.assertRendersRow(this.locationIds[0])
        this.assertRendersRow(this.locationIds[1])
        this.assertRendersRow(this.locationIds[2])
    }

    @test()
    protected static async pagingIsExpectedWith2Pages() {
        this.addFakedLocations(15)
        this.vc.assertPagerNotConfigured()

        await this.load()

        this.assertTotalPages(2)
        this.assertCurrentPage(0)
    }

    @test()
    protected static async createsSecondPageIfMoreThanPageSize() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(3)

        this.assertTotalPages(2)
    }

    @test()
    protected static async spreadsRowsAcrossMultipleLists() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(3)

        this.assertListRendersRow('list-1', this.locationIds[2])

        const listVc = listAssert.cardRendersList(this.vc, 'list-0')
        listAssert.listDoesNotRenderRow(listVc, this.locationIds[2])
    }

    @test()
    protected static async knowsWhenLoaded() {
        assert.isFalse(this.isLoaded)

        await this.load()

        assert.isTrue(this.isLoaded)
    }

    @test()
    protected static async canGetRecords() {
        await this.fakeLocationsAndLoad(10)
        const records = this.vc.getRecords()
        assert.isEqualDeep(records, this.locations)
    }

    @test()
    protected static async clickingAPageSwitchesThePresentSlide() {
        await this.fakeLocationsAndLoad(20)
        this.assertTotalPages(2)
        await this.clickPagerButton(1)
        this.vc.assertCurrentPage(1)
    }

    @test()
    protected static async refreshingAddsAdditionalSlides() {
        await this.load()
        this.addFakedLocations(20)
        await this.refresh()
        this.assertTotalPages(2)
    }

    @test()
    protected static async refreshingRemoveExtraSlides() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(6)

        this.clearFakedLocations()
        this.addFakedLocations(4)

        await this.refresh()

        this.assertTotalPages(2)
    }

    @test()
    protected static async loadingOnlyRendersSwipeOnce() {
        await this.fakeLocationsAndLoad(30)
        this.assertTriggerRenderCountForSwipe(1)
        await this.refresh()
        this.assertTriggerRenderCountForSwipe(2)
    }

    @test()
    protected static async canRemoveRowFromFirstList() {
        await this.fakeLocationsAndLoad(3)
        const id = this.locationIds[0]
        this.deleteRow(id)
        this.assertDoesNotRenderRow(id)
        this.assertRendersRow(this.locationIds[1])
    }

    @test()
    protected static async canRemoveSecondRowFromFirstList() {
        await this.fakeLocationsAndLoad(3)
        const id = this.locationIds[1]
        this.deleteRow(id)
        this.assertDoesNotRenderRow(id)
        this.assertRendersRow(this.locationIds[0])
    }

    @test()
    protected static async canRemoveRowFromSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)
        const id = this.locationIds[2]
        this.deleteRow(id)
        this.assertDoesNotRenderRow(id)
        this.assertRendersRow(this.locationIds[0])
    }

    @test()
    protected static async removingLastRowFromSecondListRemovesSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(3)
        const id = this.locationIds[2]
        this.deleteRow(id)
        this.assertTotalPages(1)
    }

    @test()
    protected static async jumpingToSlideUpdatesPager() {
        await this.fakeLocationsAndLoad(40)
        await this.jumpToSlide(1)
        this.assertCurrentPage(1)
        await this.jumpToSlide(0)
        this.assertCurrentPage(0)
    }

    @test()
    protected static async currentPageIsMaintainedOnRefresh() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)

        await this.jumpToSlide(1)

        await this.refresh()

        this.assertCurrentPage(1)
    }

    @test()
    protected static async selectRowsInFirstList() {
        await this.fakeLocationsAndLoad(4)
        this.selectRowAndAssertSelected(this.locationIds[0])
        this.selectRowAndAssertSelected(this.locationIds[1])
    }

    @test()
    protected static async canSelectRowsInSecondList() {
        this.setupCardWithPaging({
            pageSize: 5,
        })
        await this.fakeLocationsAndLoad(10)
        this.selectRowAndAssertSelected(this.locations[5].id)
    }

    @test()
    protected static async canDeselectRowInFirstList() {
        await this.fakeLocationsAndLoad(4)
        this.selectRow(this.locationIds[0])
        this.deselectRowAndAssertNotSelected(this.locationIds[0])

        this.selectRow(this.locationIds[1])
        this.deselectRowAndAssertNotSelected(this.locationIds[1])
    }

    @test()
    protected static async canSelectRowInSecondList() {
        this.setupCardWithPaging({
            pageSize: 5,
        })
        await this.fakeLocationsAndLoad(10)
        this.selectRow(this.locations[5].id)
        this.deselectRowAndAssertNotSelected(this.locations[5].id)
    }

    @test()
    protected static async settingTargetUpdatesTarget() {
        const target = {
            organizationId: generateId(),
        }

        this.vc.setTarget(target)

        await this.load()

        this.assertListLocationsTargetAndPayload({ target })
    }

    @test()
    protected static async settingPayloadUpdatesPayload() {
        const payload: ListLocationsTargetAndPayload['payload'] = {
            shouldOnlyShowWhereIAmEmployed: true,
        }

        this.setPayload(payload)

        await this.load()

        this.assertListLocationsTargetAndPayload({ payload })
    }

    @test()
    protected static async deleteRowShouldOnlyRenderOnce() {
        await this.fakeLocationsAndLoad(20)
        this.assertTriggerRenderCountForSwipe(1)
        this.deleteRow(this.locationIds[0])
        this.assertTriggerRenderCountForSwipe(2)
    }

    @test()
    protected static async addingRowGoesToFirstListIfOnlyList() {
        await this.fakeLocationsAndLoad(5)
        const id = generateId()
        this.addRow(id)
        this.assertListRendersRow('list-0', id)
    }

    @test()
    protected static async addRowAddsToSecondListIfSecondListExists() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)
        const id = generateId()

        this.addRow(id)
        this.assertListRendersRow('list-1', id)
        this.assertListDoesNotRenderRow('list-0', id)
    }

    @test()
    protected static getPayloadGetsPayload() {
        this.setPayloadAndAssertGetReturnsExpected({
            shouldOnlyShowWhereIAmEmployed: true,
        })

        this.setPayloadAndAssertGetReturnsExpected({
            paging: {
                pageSize: 100,
            },
        })
    }

    @test()
    protected static setsTargetAndGetsTarget() {
        this.setTargetAndAssertGetReturnsExpected({
            organizationId: generateId(),
        })

        this.setTargetAndAssertGetReturnsExpected({
            locationIds: [generateId()],
        })
    }

    @test()
    protected static async canSetSelectedRowsInFirstList() {
        await this.fakeLocationsAndLoad(4)
        this.setSelectedRows([this.locationIds[0], this.locationIds[1]])

        this.assertRowIsSelected(this.locationIds[0])
        this.assertRowIsSelected(this.locationIds[1])

        this.setSelectedRows([this.locationIds[2]])
        this.assertRowIsSelected(this.locationIds[2])
        this.assertRowIsNotSelected(this.locationIds[0])
    }

    @test()
    protected static async canSetSelectedRowsInSecondList() {
        this.setupCardWithPaging({
            pageSize: 5,
        })

        await this.fakeLocationsAndLoad(10)

        this.setSelectedRows([this.locations[5].id])
        this.assertRowIsSelected(this.locations[5].id)
    }

    @test()
    protected static async canSetSelectedRowsAcrossLists() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)

        this.setSelectedRows([this.locationIds[0], this.locationIds[2]])

        this.assertRowIsSelected(this.locationIds[0])
        this.assertRowIsSelected(this.locationIds[2])
    }

    @test()
    protected static async canUpsertRowIntoFirstList() {
        await this.fakeLocationsAndLoad(5)

        const row: Omit<ListRow, 'id'> = {
            cells: [
                {
                    id: generateId(),
                },
            ],
        }

        const id = this.locationIds[0]
        this.upsertRow(id, row)
        this.assertRowEquals(0, 0, id, row)
    }

    @test()
    protected static async canUpsertIntoSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)

        const row: Omit<ListRow, 'id'> = {
            columnWidths: ['content', 'fill'],
            cells: [
                {
                    id: generateId(),
                },
            ],
        }

        const id = this.locationIds[2]
        this.upsertRow(id, row)
        this.assertRowEquals(1, 0, id, row)
    }

    @test()
    protected static async doesNotInsertRowIntoFirstListIfFoundInSecond() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)
        const id = this.locationIds[2]

        this.upsertRow(id, { cells: [] })
        this.assertListDoesNotRenderRow('list-0', id)
    }

    @test()
    protected static async upsertAddsToLastListIfNotInAnyList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)

        const row: ListRow = {
            id: generateId(),
            cells: [],
            columnWidths: ['content', 'fill'],
        }

        this.upsertRowAndAssertAddedToSecondList(row)
    }

    @test()
    protected static async upsertAddsToSecondListWithDifferentRow() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)

        const row: ListRow = {
            id: generateId(),
            cells: [
                {
                    text: {
                        content: generateId(),
                    },
                },
            ],
            style: 'critical',
        }

        this.upsertRowAndAssertAddedToSecondList(row)
    }

    @test()
    protected static async addsToFirstListIfOnlyOneList() {
        await this.fakeLocationsAndLoad(4)
        const id = generateId()
        this.upsertRow(id, { cells: [] })
        this.assertListRendersRow('list-0', id)
    }

    @test()
    protected static async canGetFirstRowVcFromFirstList() {
        await this.fakeLocationsAndLoad(4)
        this.assertRowVcEqualsSameFromListAtIndex(this.locationIds[0], 0)
    }

    @test()
    protected static async canGetFirstRowVcFromSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.fakeLocationsAndLoad(4)
        this.assertRowVcEqualsSameFromListAtIndex(this.locationIds[2], 1)
    }

    @test()
    protected static async canGetSecondRowInFirstVc() {
        await this.fakeLocationsAndLoad(4)
        this.assertRowVcEqualsSameFromListAtIndex(this.locationIds[1], 0)
    }

    @test()
    protected static async throwsIfRowVcNotFound() {
        await this.fakeLocationsAndLoad(4)
        const err = assert.doesThrow(() => this.getRowVc(generateId()))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['rowId'],
        })
    }

    @test('passes through header 1', {
        title: 'passes through header',
    })
    @test('passes through header 2', {
        subtitle: 'and a subheader',
    })
    @test('passes through header 3', {
        title: 'go dogs',
        icon: 'add',
    })
    protected static async passesHeaderToSwipeCard(header: CardHeader) {
        this.setupCardVc({
            header,
            paging: {
                shouldPageClientSide: true,
                pageSize: 10,
            },
        })

        const model = this.render(this.vc)
        assert.doesInclude(model.header, header)
    }

    @test()
    protected static async passesThroughId() {
        const model = this.render(this.vc)
        assert.isEqual(model.id, this.id)
    }

    @test()
    protected static async eventThrowingAddsErrorRowToFirstList() {
        const msg = generateId()

        await this.makeListLocationsThrow(msg)
        await this.load()

        this.assertRendersErrorRow()
        this.vc.assertRowRendersContent('error', msg)
    }

    @test()
    protected static async errorOnRefreshClearsOutPastLists() {
        await this.fakeLocationsAndLoad(30)
        await this.makeListLocationsThrow()
        await this.refresh()

        this.assertRendersErrorRow()
        this.vc.assertTotalSlides(1)
    }

    @test()
    protected static async footerAndPageGoAwayIfError() {
        await this.fakeLocationsAndLoad(30)
        await this.makeListLocationsThrow()
        await this.refresh()

        this.vc.assertPagerIsCleared()
        this.assertDoesNotRenderFooter()
    }

    @test()
    protected static async doesNotRenderFooterIfOnlyOnePage() {
        await this.fakeLocationsAndLoad(5)
        this.assertDoesNotRenderFooter()
    }

    @test()
    protected static async footerOptionsArePassedThrough() {
        const footer = this.setupWithPagingAndFooter({
            isEnabled: true,
            isSticky: true,
            buttons: [
                {
                    id: generateId(),
                },
            ],
        })

        await this.fakeLocationsAndLoad(5)
        this.assertRendersFooter()
        this.assertRenderedFooterIncludes(footer)
    }

    @test()
    protected static async footerMixesInWithPager() {
        const footer = this.setupWithPagingAndFooter({
            isEnabled: false,
            isSticky: false,
            buttons: [],
        })

        await this.fakeLocationsAndLoad(30)
        this.assertRendersFooter()
        this.assertRendersPager()
        this.assertRenderedFooterIncludes(footer)
    }

    @test()
    protected static async stillRendersFooterIfButtonsPassedOnError() {
        const footer = this.setupWithPagingAndFooter({
            isEnabled: false,
            isSticky: false,
            buttons: [],
        })
        await this.makeListLocationsThrow()
        await this.fakeLocationsAndLoad(30)

        this.assertRendersFooter()
        this.assertRenderedFooterIncludes(footer)
    }

    @test()
    protected static async pagerIsNotRenderedIfOnlyOnePageAndFooterButtons() {
        this.setupWithPagingAndFooter({
            isEnabled: true,
            isSticky: true,
            buttons: [
                {
                    id: generateId(),
                },
            ],
        })

        await this.fakeLocationsAndLoad(5)
        this.vc.assertPagerIsCleared()
    }

    @test()
    protected static async canUseCardAssertToFindCardByIdWhenPaging() {
        const id = generateId()
        this.getFactory().setController('testing', TestSkillView)
        const vc = this.Controller('testing' as SkillViewControllerId, {
            //@ts-ignore
            activeCardId: id,
        }) as TestSkillView

        vcAssert.assertSkillViewRendersCard(vc, id)
    }

    @test()
    protected static async gettingTheListVcThrowsHelpfulErrorWithPaging() {
        this.setupCardWithPaging()
        assert.doesThrow(() => this.vc.getListVc(), 'paging')
    }

    @test('renders no results row 1', { cells: [] })
    @test('renders no results row 2', {
        cells: [{ text: { content: generateId() } }],
        columnWidths: ['content'],
    })
    protected static async rendersNoRecordsRowIfNoRecords(
        noResultsRow: NoResultsRow
    ) {
        this.setupCardVc({
            noResultsRow,
            paging: {
                shouldPageClientSide: true,
                pageSize: 10,
            },
        })

        this.client.emit = async () => ({
            responses: [],
            totalErrors: 0,
            totalContracts: 0,
            totalResponses: 0,
        })

        await this.load()
        this.assertRendersRow('no-records')
        this.assertDoesNotRenderRow('error')

        this.assertNoResultsRowRendersAs(noResultsRow)
    }

    @test()
    protected static async defaultNoResultsRowRendersAsExpected() {
        await this.client.on('list-locations::v2020_12_25', () => ({
            locations: [],
        }))

        await this.load()
        this.assertNoResultsRowRendersAs({
            cells: [
                {
                    text: {
                        content: 'No results found!',
                    },
                },
            ],
        })
    }

    @test()
    protected static async doesNotRenderNoResultsRowOnError() {
        await this.makeListLocationsThrow()
        await this.load()
        this.assertDoesNotRenderRow('no-records')
    }

    @test()
    protected static async doNotRenderFooterIfOnlyOnePage() {
        await this.fakeLocationsAndLoad(5)
        this.assertDoesNotRenderFooter()
    }

    @test()
    protected static async elegantlyHandlesDelayedSwipeChange() {
        await this.fakeLocationsLoadAndResetPagingCounts()
        await this.clickPagerButtonAndWait('next')
        this.assertChangeCounts(1)

        await this.clickPagerButtonAndWait('previous')
        this.assertChangeCounts(2)
    }

    @test()
    protected static async elegantlyHandlePageChange() {
        await this.fakeLocationsLoadAndResetPagingCounts()
        await this.jumpToSlideAndWait(1)
        this.assertChangeCounts(1)
    }

    @test()
    protected static async shouldThrowErrorIfSetToWithPageClientSide() {
        ActiveRecordCardViewController.setShouldThrowOnResponseError(true)
        await this.eventFaker.fakeListLocations(() =>
            assert.fail('forced fail')
        )

        this.setupCardWithPaging({})

        await assert.doesThrowAsync(() => this.load())
    }

    @test()
    protected static async doesNotContinuouslyBuildUpListVcs() {
        await this.fakeLocationsAndLoad(30)
        await this.refresh()
        await this.refresh()
        assert.isLength(this.vc.getListVcs(), 3)
    }

    @test()
    protected static async canSetValueOnFirstList() {
        const name = generateId()
        const value = generateId()

        this.setupVcWithInput({ shouldPageClientSide: true, name })

        await this.fakeLocationsAndLoad(2)
        await this.assertSettingRowValueSetsCorrectly(0, name, value)
        await this.assertSettingRowValueSetsCorrectly(1, name, value)
    }

    @test()
    protected static async canSetValueOnSecondList() {
        this.setupVcWithInput({ shouldPageClientSide: true, name: 'myInput' })
        await this.fakeLocationsAndLoad(20)
        await this.assertSettingRowValueSetsCorrectly(15, 'myInput', 'go dogs')
    }

    @test()
    protected static async getValuesReturnsValuesFromFirstListAndFirstRow() {
        const name = generateId()
        const value = generateId()

        this.setupVcWithInput({ shouldPageClientSide: true, name })
        await this.fakeLocationsAndLoad(1)

        await this.setValue(0, name, value)
        this.assertListValuesEqual([
            { rowId: this.locationIds[0], [name]: value },
        ])
    }

    @test()
    protected static async getValuesMixesInSecondListValues() {
        this.setupVcWithInput({ shouldPageClientSide: true, name: 'inputName' })
        await this.fakeLocationsAndLoad(20)

        const expected = this.locations.map((location) => ({
            rowId: location.id,
            inputName: undefined,
        })) as RowValues[]

        const value1 = generateId()
        const value2 = generateId()

        await this.setValue(1, 'inputName', value1)
        await this.setValue(15, 'inputName', value2)

        expected[1].inputName = value1
        expected[15].inputName = value2

        this.assertListValuesEqual(expected)
    }

    @test('passes through column widths 1', ['content', 'fill'])
    @test('passes through column widths 2', ['fill', 'content'])
    protected static async columnWidthsPassedThroughToLists(
        columnWidths: List['columnWidths']
    ) {
        this.setupCardVc({
            columnWidths,
            paging: {
                shouldPageClientSide: true,
                pageSize: 10,
            },
        })

        await this.fakeLocationsAndLoad(4)

        const model = this.render(this.listVcs[0])
        assert.isEqualDeep(model.columnWidths, columnWidths)
    }

    private static assertListValuesEqual(expected: RowValues[]) {
        assert.isEqualDeep(this.listValues, expected)
    }

    private static get listValues() {
        return this.vc.getValues()
    }

    private static setupVcWithInput(options: {
        shouldPageClientSide: boolean
        name: string
    }) {
        const { shouldPageClientSide, name } = options
        this.setupCardVc({
            paging: {
                shouldPageClientSide,
                pageSize: 10,
            },
            rowTransformer: (location: Location) => {
                return {
                    id: location.id,
                    cells: [
                        {
                            textInput: {
                                name,
                            },
                        },
                    ],
                } as ListRow
            },
        })
    }

    private static async assertSettingRowValueSetsCorrectly(
        idx: number,
        name: string,
        value: string
    ) {
        await this.setValue(idx, name, value)
        this.assertRowValueEquals(idx, name, value)
    }

    private static assertRowValueEquals(
        idx: number,
        name: string,
        value: string
    ) {
        const vc = this.vc.getRowVc(this.locationIds[idx])
        const actualFromRowVc = vc.getValue(name)
        assert.isEqual(
            actualFromRowVc,
            value,
            `The value of ${name} was not set correctly in row ${idx}`
        )

        const actualFromActiveCard = this.vc.getValue(
            this.locationIds[idx],
            name
        )

        assert.isEqual(
            actualFromActiveCard,
            value,
            `The value returned from the active card was not correct for ${name}`
        )
    }

    private static async setValue(rowIdx: number, name: string, value: string) {
        await this.vc.setValue(this.locationIds[rowIdx], name, value)
    }

    private static async jumpToSlideAndWait(expected: number) {
        await this.jumpToSlide(expected)
        await this.wait(5)
    }

    private static assertChangeCounts(expected: number) {
        this.assertJumpToSlideCount(expected)
        this.assertSetCurrentPageCount(expected)
    }

    private static async fakeLocationsLoadAndResetPagingCounts() {
        await this.fakeLocationsAndLoad(30)
        await this.wait(10)
        this.resetPagingCounts()
    }

    private static async clickPagerButtonAndWait(button: PagerButton) {
        await this.clickPagerButton(button)
        await this.wait(5)
    }

    private static resetPagingCounts() {
        this.swipeVc.jumpToSlideCount = 0
        this.pagerVc.setCurrentPageCount = 0
    }

    private static assertSetCurrentPageCount(expected: number) {
        assert.isEqual(
            this.pagerVc.setCurrentPageCount,
            expected,
            'pagerVc.setCurrentPageCount(...) was called the wrong amount of times'
        )
    }

    private static assertJumpToSlideCount(expected: number) {
        assert.isEqual(
            this.swipeVc.jumpToSlideCount,
            expected,
            `this.swipeVc.jumpToSlide(...) was called the wrong amount of times`
        )
    }

    private static setupWithPagingAndFooter(footer: CardFooter) {
        this.setupCardVc({
            footer,
            paging: {
                pageSize: 10,
                shouldPageClientSide: true,
            },
        })

        return footer
    }

    private static assertNoResultsRowRendersAs(noResultsRow: NoResultsRow) {
        const {
            rows: [model],
        } = this.render(this.listVcs[0])

        assert.doesInclude(model, noResultsRow)
    }

    private static assertRendersErrorRow() {
        this.vc.assertRendersRow('error')
    }

    private static get listVcs() {
        return this.vc.getListVcs()
    }

    private static async makeListLocationsThrow(msg?: string) {
        await this.client.on('list-locations::v2020_12_25', () => {
            assert.fail(msg ?? 'Oh no!')
            return {
                locations: [],
            }
        })
    }

    private static assertRowVcEqualsSameFromListAtIndex(
        id: string,
        listIdx: number
    ) {
        const listVc = this.getRowVc(id)
        const expected = this.listVcs[listIdx].getRowVc(id)
        assert.isEqual(listVc, expected)
    }

    private static assertDoesNotRenderFooter() {
        this.vc.assertDoesNotRenderFooter()
    }

    private static getRowVc(id: string) {
        return this.vc.getRowVc(id)
    }

    private static upsertRowAndAssertAddedToSecondList(row: ListRow) {
        const { id, ...rest } = row
        this.upsertRow(id, rest)
        this.assertListRendersRow('list-1', id)
        this.assertRowEquals(1, 2, id, rest)
    }

    private static assertRowEquals(
        listIdx: number,
        rowIdx: number,
        id: string,
        newRow: Omit<ListRow, 'id'>
    ) {
        const row = this.renderRow(listIdx, rowIdx)
        assert.isEqualDeep(row, { id, ...newRow })
    }

    private static upsertRow(id: string, newCell: Omit<ListRow, 'id'>) {
        this.vc.upsertRow(id, newCell)
    }

    private static get locationIds() {
        return this.locations.map((l) => l.id)
    }

    private static renderRow(listIdx: number, rowIdx: number) {
        const model = this.render(this.listVcs[listIdx])
        delete model.rows[rowIdx].controller
        delete model.rows[rowIdx].cells?.[0]?.controller
        return model.rows[rowIdx]
    }

    private static setSelectedRows(selected: string[]) {
        this.vc.setSelectedRows(selected)
    }

    private static setTargetAndAssertGetReturnsExpected(
        target: ListLocationsTargetAndPayload['target']
    ) {
        this.vc.setTarget(target ?? undefined)
        assert.isEqualDeep(this.vc.getTarget(), target)
    }

    private static setPayloadAndAssertGetReturnsExpected(
        payload: ListLocationsTargetAndPayload['payload']
    ) {
        this.setPayload(payload)
        assert.isEqualDeep(this.vc.getPayload(), payload)
    }

    private static setPayload(
        payload: ListLocationsTargetAndPayload['payload']
    ) {
        this.vc.setPayload(payload ?? undefined)
    }

    private static assertListDoesNotRenderRow(listId: string, row: string) {
        const listVc = listAssert.cardRendersList(this.vc, listId)
        listAssert.listDoesNotRenderRow(listVc, row)
    }

    private static addRow(id: string) {
        this.vc.addRow({ id, cells: [] })
    }

    private static assertListLocationsTargetAndPayload(targetAndPayload: {
        target?: ListLocationsTargetAndPayload['target']
        payload?: ListLocationsTargetAndPayload['payload']
    }) {
        assert.isEqualDeep(this.listLocationsTargetAndPayload, {
            target: targetAndPayload.target,
            payload: targetAndPayload.payload,
        })
    }

    private static deselectRowAndAssertNotSelected(id: string) {
        this.vc.deselectRow(id)
        this.assertRowIsNotSelected(id)
    }

    private static selectRowAndAssertSelected(id: string) {
        this.selectRow(id)
        this.assertRowIsSelected(id)
    }

    private static assertRowIsSelected(id: string) {
        this.vc.assertRowSelected(id)
    }

    private static assertRowIsNotSelected(id: string) {
        this.vc.assertRowIsNotSelected(id)
    }

    private static selectRow(id: string) {
        this.vc.selectRow(id)
    }

    private static async jumpToSlide(side: number) {
        await this.swipeVc.jumpToSlide(side)
    }

    private static deleteRow(id: string) {
        this.vc.deleteRow(id)
    }

    private static assertTriggerRenderCountForSwipe(expected: number) {
        vcAssert.assertTriggerRenderCount(this.swipeVc, expected)
    }

    private static get swipeVc() {
        return this.vc.getSwipeVc() as unknown as SpySwipeCard
    }

    private static async refresh() {
        await this.vc.refresh()
    }

    private static async clickPagerButton(button: PagerButton) {
        await interactor.clickPagerButton(this.pagerVc, button)
    }

    private static get pagerVc(): SpyPager {
        return this.vc.getPagerVc() as SpyPager
    }

    private static get isLoaded(): boolean {
        return this.vc.getIsLoaded()
    }

    private static assertListRendersRow(listId: string, row: string) {
        const listVc = listAssert.cardRendersList(this.vc, listId)
        listAssert.listRendersRow(listVc, row)
    }

    private static assertCurrentPage(expected: number) {
        this.vc.assertCurrentPage(expected)
    }

    private static assertTotalPages(expected: number) {
        this.vc.assertTotalPages(expected)
    }

    private static assertRendersFooter() {
        this.vc.assertRendersFooter()
    }

    private static assertDoesNotRenderPager() {
        this.vc.assertDoesNotRenderPager()
    }
}

class TestSkillView extends AbstractSkillViewController {
    private activeCardVc: ActiveRecordCardViewController

    public constructor(
        options: ViewControllerOptions & { activeCardId: string }
    ) {
        super(options)
        const { activeCardId } = options
        this.activeCardVc = this.Controller(
            'active-record-card',
            buildActiveRecordCard({
                id: activeCardId,
                eventName: 'list-skills::v2020_12_25',
                responseKey: 'skills',
                rowTransformer: (skill) => ({ id: skill.id, cells: [] }),
                paging: {
                    shouldPageClientSide: true,
                    pageSize: 10,
                },
            })
        )
    }

    public render(): SkillView {
        return {
            layouts: [
                {
                    cards: [this.activeCardVc.render()],
                },
            ],
        }
    }
}
