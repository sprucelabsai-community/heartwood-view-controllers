import { test, assert, generateId } from '@sprucelabs/test-utils'
import interactor from '../../../tests/utilities/interactor'
import listAssert from '../../../tests/utilities/listAssert'
import pagerAssert from '../../../tests/utilities/pagerAssert'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListRow } from '../../../types/heartwood.types'
import SwipeCardViewController from '../../../viewControllers/SwipeCard.vc'
import { ListLocationsTargetAndPayload } from '../../support/EventFaker'
import AbstractClientSidePagingActiveRecordCard from './AbstractClientSidePagingActiveRecordCardTest'

export default class ActiveRecordCardsWithClientSidePagingTest extends AbstractClientSidePagingActiveRecordCard {
    @test()
    protected static async rendersPagerIfPagingEnabled() {
        pagerAssert.cardRendersPager(this.vc, 'active-pager')
    }

    @test()
    protected static async doesNotRenderPagerIfPagingDisabled() {
        this.setupCardVc()
        pagerAssert.cardDoesNotRenderPager(this.vc)
    }

    @test()
    protected static async rendersSwipeControllerIfPagingEnabled() {
        vcAssert.assertIsSwipeCard(this.vc)
    }

    @test()
    protected static async doesNotCreateListIfPaging() {
        assert.isUndefined(this.vc.getListVc())
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

        const id = this.locations[0].id
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
        await this.loadWithFakedLocations(3)

        this.assertRendersRow(this.locations[0].id)
        this.assertRendersRow(this.locations[1].id)
        this.assertRendersRow(this.locations[2].id)
    }

    @test()
    protected static async pagingIsExpectedWith1Item() {
        this.addFakedLocation()
        this.vc.assertPagerNotConfigured()

        await this.load()

        this.assertTotalPages(1)
        this.assertCurrentPage(0)
    }

    @test()
    protected static async createsSecondPageIfMoreThanPageSize() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(3)

        this.assertTotalPages(2)
    }

    @test()
    protected static async spreadsRowsAcrossMultipleLists() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(3)

        this.assertListRendersRow('list-1', this.locations[2].id)

        const listVc = listAssert.cardRendersList(this.vc, 'list-0')
        listAssert.listDoesNotRenderRow(listVc, this.locations[2].id)
    }

    @test()
    protected static async knowsWhenLoaded() {
        assert.isFalse(this.isLoaded)

        await this.load()

        assert.isTrue(this.isLoaded)
    }

    @test()
    protected static async canGetRecords() {
        await this.loadWithFakedLocations(10)
        const records = this.vc.getRecords()
        assert.isEqualDeep(records, this.locations)
    }

    @test()
    protected static async clickingAPageSwitchesThePresentSlide() {
        await this.loadWithFakedLocations(20)
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

        await this.loadWithFakedLocations(4)

        this.clearFakedLocations()
        this.addFakedLocations(2)

        await this.refresh()

        this.assertTotalPages(1)
    }

    @test()
    protected static async loadingOnlyRendersSwipeOnce() {
        await this.loadWithFakedLocations(30)
        this.assertTriggerRenderCountForSwipe(1)
        await this.refresh()
        this.assertTriggerRenderCountForSwipe(2)
    }

    @test()
    protected static async canRemoveRowFromFirstList() {
        await this.loadWithFakedLocations(3)
        const id = this.locations[0].id
        this.deleteRow(id)
        this.assertDoesNotRenderRow(id)
        this.assertRendersRow(this.locations[1].id)
    }

    @test()
    protected static async canRemoveSecondRowFromFirstList() {
        await this.loadWithFakedLocations(3)
        const id = this.locations[1].id
        this.deleteRow(id)
        this.assertDoesNotRenderRow(id)
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async canRemoveRowFromSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(4)
        const id = this.locations[2].id
        this.deleteRow(id)
        this.assertDoesNotRenderRow(id)
        this.assertRendersRow(this.locations[0].id)
    }

    @test()
    protected static async removingLastRowFromSecondListRemovesSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(3)
        const id = this.locations[2].id
        this.deleteRow(id)
        this.assertTotalPages(1)
    }

    @test()
    protected static async jumpingToSlideUpdatesPager() {
        await this.loadWithFakedLocations(40)
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

        await this.loadWithFakedLocations(4)

        await this.jumpToSlide(1)

        await this.refresh()

        this.assertCurrentPage(1)
    }

    @test()
    protected static async selectRowsInFirstList() {
        await this.loadWithFakedLocations(4)
        this.selectRowAndAssertSelected(this.locations[0].id)
        this.selectRowAndAssertSelected(this.locations[1].id)
    }

    @test()
    protected static async canSelectRowsInSecondList() {
        this.setupCardWithPaging({
            pageSize: 5,
        })
        await this.loadWithFakedLocations(10)
        this.selectRowAndAssertSelected(this.locations[5].id)
    }

    @test()
    protected static async canDeselectRowInFirstList() {
        await this.loadWithFakedLocations(4)
        this.selectRow(this.locations[0].id)
        this.deselectRowAndAssertNotSelected(this.locations[0].id)

        this.selectRow(this.locations[1].id)
        this.deselectRowAndAssertNotSelected(this.locations[1].id)
    }

    @test()
    protected static async canSelectRowInSecondList() {
        this.setupCardWithPaging({
            pageSize: 5,
        })
        await this.loadWithFakedLocations(10)
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
        await this.loadWithFakedLocations(20)
        this.assertTriggerRenderCountForSwipe(1)
        this.deleteRow(this.locations[0].id)
        this.assertTriggerRenderCountForSwipe(2)
    }

    @test()
    protected static async addingRowGoesToFirstListIfOnlyList() {
        await this.loadWithFakedLocations(5)
        const id = generateId()
        this.addRow(id)
        this.assertListRendersRow('list-0', id)
    }

    @test()
    protected static async addRowAddsToSecondListIfSecondListExists() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(4)
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
        await this.loadWithFakedLocations(4)
        this.setSelectedRows([this.locations[0].id, this.locations[1].id])

        this.assertRowIsSelected(this.locations[0].id)
        this.assertRowIsSelected(this.locations[1].id)

        this.setSelectedRows([this.locations[2].id])
        this.assertRowIsSelected(this.locations[2].id)
        this.assertRowIsNotSelected(this.locations[0].id)
    }

    @test()
    protected static async canSetSelectedRowsInSecondList() {
        this.setupCardWithPaging({
            pageSize: 5,
        })

        await this.loadWithFakedLocations(10)

        this.setSelectedRows([this.locations[5].id])
        this.assertRowIsSelected(this.locations[5].id)
    }

    @test()
    protected static async canSetSelectedRowsAcrossLists() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(4)

        this.setSelectedRows([this.locations[0].id, this.locations[2].id])

        this.assertRowIsSelected(this.locations[0].id)
        this.assertRowIsSelected(this.locations[2].id)
    }

    @test()
    protected static async canUpsertRowIntoFirstList() {
        await this.loadWithFakedLocations(5)

        const row: Omit<ListRow, 'id'> = {
            cells: [
                {
                    id: generateId(),
                },
            ],
        }

        const id = this.locations[0].id
        this.upsertRow(id, row)
        this.assertRowEquals(0, 0, id, row)
    }

    @test()
    protected static async canUpsertIntoSecondList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(4)

        const row: Omit<ListRow, 'id'> = {
            columnWidths: ['content', 'fill'],
            cells: [
                {
                    id: generateId(),
                },
            ],
        }

        const id = this.locations[2].id
        this.upsertRow(id, row)
        this.assertRowEquals(1, 0, id, row)
    }

    @test()
    protected static async doesNotInsertRowIntoFirstListIfFoundInSecond() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(4)
        const id = this.locations[2].id

        this.upsertRow(id, { cells: [] })
        this.assertListDoesNotRenderRow('list-0', id)
    }

    @test()
    protected static async upsertAddsToLastListIfNotInAnyList() {
        this.setupCardWithPaging({
            pageSize: 2,
        })

        await this.loadWithFakedLocations(4)

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

        await this.loadWithFakedLocations(4)

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
        await this.loadWithFakedLocations(4)
        const id = generateId()
        this.upsertRow(id, { cells: [] })
        this.assertListRendersRow('list-0', id)
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

    private static renderRow(listIdx: number, rowIdx: number) {
        const model = this.render(this.vc.getListVcs()[listIdx])
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

    private static async loadWithFakedLocations(total: number) {
        this.addFakedLocations(total)
        await this.load()
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

    private static assertDoesNotRenderRow(id: string) {
        this.vc.assertDoesNotRenderRow(id)
    }

    private static deleteRow(id: string) {
        this.vc.deleteRow(id)
    }

    private static assertTriggerRenderCountForSwipe(expected: number) {
        vcAssert.assertTriggerRenderCount(this.swipeVc, expected)
    }

    private static get swipeVc(): SwipeCardViewController {
        return this.vc.getSwipeVc()
    }

    private static async refresh() {
        await this.vc.refresh()
    }

    private static async clickPagerButton(button: number) {
        await interactor.clickPagerButton(this.vc.getPagerVc(), button)
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

    private static assertRendersRow(id: string) {
        this.vc.assertRendersRow(id)
    }
}
