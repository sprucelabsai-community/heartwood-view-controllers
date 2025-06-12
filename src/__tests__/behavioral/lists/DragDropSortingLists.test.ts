import {
    test,
    suite,
    assert,
    errorAssert,
    generateId,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import ListViewController from '../../../viewControllers/list/List.vc'

@suite()
export default class DragDropSortingListsTest extends AbstractViewControllerTest {
    private vc!: ListViewController
    private didCallDragAndDropSortHandler = false
    private newRowIds?: string[]
    private dragAndDropResponse: boolean | undefined

    @test()
    protected async passesThroughDragAndDropSort() {
        const handler = () => {}
        const vc = this.Controller('list', {
            shouldAllowDragAndDropSorting: true,
            onDragAndDropSort: handler,
        })

        const model = this.render(vc)
        assert.isTrue(
            model.shouldAllowDragAndDropSorting,
            'Expected shouldAllowDragAndDropSorting to be true'
        )
    }

    @test()
    protected async simulatingDropAndDropThrowsWithMissing() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            interactor.dragAndDropListRow()
        )

        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'newRowIds'],
        })
    }

    @test()
    protected async throwsIfTryingToDragAndDropAndDragAndDropIsNotEnabled() {
        const id = generateId()
        this.vc = this.Controller('list', {
            rows: [{ id, cells: [] }],
        })

        await assert.doesThrowAsync(
            () => this.dragAndDrop([id]),
            'shouldAllowDragAndDropSorting'
        )
    }

    @test()
    protected async throwsIfNoDragAndDropHandler() {
        const id = generateId()
        this.vc = this.Controller('list', {
            shouldAllowDragAndDropSorting: true,
            rows: [{ id, cells: [] }],
        })

        await assert.doesThrowAsync(
            () => this.dragAndDrop([id]),
            'onDragAndDropSort'
        )
    }

    @test()
    protected async throwsIfNewRowIdDoesntMatchIdOfCurrentRow() {
        this.setRows([{ id: generateId(), cells: [] }])

        const id = generateId()
        await assert.doesThrowAsync(() => this.dragAndDrop([id]), id)
    }

    @test()
    protected async canReorderOneRowIfIdMatches() {
        const rowId = generateId()
        this.setRows([{ id: rowId, cells: [] }])
        await this.dragAndDrop([rowId])
    }

    @test()
    protected async throwsIfNumberOfRowsDoesNotMatchNewRowIds() {
        const id = generateId()
        this.setRows([{ id, cells: [] }])

        await assert.doesThrowAsync(
            () => this.dragAndDrop([id, generateId()]),
            'must match'
        )

        this.assertDidNotCallHandler()
    }

    @test()
    protected async callsCallbackOnSuccessfulDragAndDrop() {
        const rowId = generateId()
        this.setRows([{ id: rowId, cells: [] }])

        this.assertDidNotCallHandler()
        await this.dragAndDrop([rowId])
        this.assertDidCallHandler()
    }

    @test()
    protected async canDragAndDropTwoRows() {
        const rowId1 = generateId()
        const rowId2 = generateId()
        this.setRows([
            { id: rowId1, cells: [] },
            { id: rowId2, cells: [] },
        ])

        await this.dragAndDrop([rowId1, rowId2])
    }

    @test()
    protected async throwsIfSecondRowIdDoesNotMatch() {
        const rowId1 = generateId()
        const rowId2 = generateId()
        this.setRows([
            { id: rowId1, cells: [] },
            { id: rowId2, cells: [] },
        ])
        const id = generateId()
        await assert.doesThrowAsync(() => this.dragAndDrop([rowId1, id]), id)
        this.assertDidNotCallHandler()
    }

    @test()
    protected async passesNewRowIdsToHandler() {
        const rowId1 = generateId()
        const rowId2 = generateId()
        this.setRows([
            { id: rowId1, cells: [] },
            { id: rowId2, cells: [] },
        ])

        await this.dragAndDrop([rowId2, rowId1])
        assert.isEqualDeep(
            this.newRowIds,
            [rowId2, rowId1],
            'Expected newRowIds to match'
        )
    }

    @test()
    protected async draggingAndDroppingUpdatesRowOrder() {
        const rowId1 = generateId()
        const rowId2 = generateId()

        this.setRows([
            { id: rowId1, cells: [] },
            { id: rowId2, cells: [] },
        ])

        const expected = [rowId2, rowId1]
        await this.dragAndDrop(expected)

        this.assertRenderedRowOrderEquals(expected)
    }

    @test()
    protected async draggingAndDroppingUpdatesRowOrderWithManyRows() {
        const rowId1 = generateId()
        const rowId2 = generateId()
        const rowId3 = generateId()
        const rowId4 = generateId()

        this.setRows([
            { id: rowId1, cells: [] },
            { id: rowId2, cells: [] },
            { id: rowId3, cells: [] },
            { id: rowId4, cells: [] },
        ])

        const newOrder = [rowId3, rowId1, rowId4, rowId2]
        await this.dragAndDrop(newOrder)
        this.assertRenderedRowOrderEquals(newOrder)
    }

    @test()
    protected async returningFalsFromHandlerDoesNotUpdateRowOrder() {
        this.dragAndDropResponse = false
        const rowId1 = generateId()
        const rowId2 = generateId()
        this.setRows([
            { id: rowId1, cells: [] },
            { id: rowId2, cells: [] },
        ])
        const expected = [rowId2, rowId1]
        await this.dragAndDrop(expected)
        this.assertRenderedRowOrderEquals([rowId1, rowId2])
    }

    private assertRenderedRowOrderEquals(expected: string[]) {
        const model = this.render(this.vc)
        assert.isEqualDeep(
            model.rows.map((r) => r.id),
            expected,
            'Expected rows to be reordered'
        )
    }

    private assertDidNotCallHandler() {
        assert.isFalse(
            this.didCallDragAndDropSortHandler,
            'onDragAndDropSort should not be called yet'
        )
    }

    private assertDidCallHandler() {
        assert.isTrue(
            this.didCallDragAndDropSortHandler,
            'Expected onDragAndDropSort to be called'
        )
    }

    private async dragAndDrop(newRowIds: string[]) {
        await interactor.dragAndDropListRow(this.vc, newRowIds)
    }

    private setRows(rows: { id: string; cells: never[] }[]) {
        this.vc = this.Controller('list', {
            shouldAllowDragAndDropSorting: true,
            rows,
            onDragAndDropSort: async (newRowIds: string[]) => {
                this.didCallDragAndDropSortHandler = true
                this.newRowIds = newRowIds
                return this.dragAndDropResponse
            },
        })
    }
}
