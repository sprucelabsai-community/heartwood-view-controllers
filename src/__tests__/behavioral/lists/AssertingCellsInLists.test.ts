import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

@suite()
export default class AssertingCellsInListsTest extends AbstractViewControllerTest {
    @test()
    protected throwsMissingParams() {
        //@ts-ignore
        const err = assert.doesThrow(() => vcAssert.assertRowRendersCell())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'row', 'cell'],
        })
    }

    @test('passes when it can find a row 0 by idx cell 0 by id', 0, 'first')
    @test('passes when it can find a row 0 by idx cell 0 by idx', 0, 0)
    @test(
        'passes when it can find a row 0 by id cell 1 by id',
        'first',
        'second'
    )
    @test(
        'passes when it can find a row 1 by id cell 0 by id"',
        'second',
        'third'
    )
    @test('passes when it can find a row 1 by idx cell 1 by id', 1, 'third')
    protected passesWhenFindingCell(
        rowIdxOrId: string | number,
        cellIdxOrId: string | number
    ) {
        const vc = this.ListVc({})

        vcAssert.assertRowRendersCell(vc, rowIdxOrId, cellIdxOrId)
    }

    @test('fails when it cant find a cell "notACell" in row 0', 0, 'notACell')
    @test('fails when it cant find a cell 30', 0, 30)
    @test('fails when it cant find a cell "first" in row 1', 1, 'first')
    @test(
        'fails when it cant find a cell "second" in row 1',
        'second',
        'second'
    )
    @test('fails when it cant find a cell "first" in row 0', 0, 'first', {
        rows: [{ id: 'first', cells: [{ id: 'notfirst' }] }],
    })
    protected failsWhenCouldntFindingCell(
        rowIdxOrId: string | number,
        cellIdxOrId: string | number,
        options?: Partial<ListViewControllerOptions>
    ) {
        const vc = this.ListVc({ ...options })

        const err = assert.doesThrow(() =>
            vcAssert.assertRowRendersCell(vc, rowIdxOrId, cellIdxOrId)
        )
        assert.doesInclude(err.message, `Could not find Cell '${cellIdxOrId}'`)
    }

    private ListVc(options?: Partial<ListViewControllerOptions>) {
        return this.Controller('list', {
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            id: 'first',
                        },
                        {
                            id: 'second',
                        },
                    ],
                },
                {
                    id: 'second',
                    cells: [
                        {
                            id: 'third',
                        },
                        {
                            id: 'forth',
                        },
                    ],
                },
            ],
            ...options,
        })
    }
}
