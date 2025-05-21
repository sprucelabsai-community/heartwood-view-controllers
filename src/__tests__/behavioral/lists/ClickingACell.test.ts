import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

@suite()
export default class ClickingACellTest extends AbstractViewControllerTest {
    @test()
    protected async hasClickCell() {
        assert.isFunction(interactor.clickCell)
    }

    @test()
    protected async cantClickACellWithoutOptions() {
        //@ts-ignore
        const err = await assert.doesThrowAsync(() => interactor.clickCell())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['listVc', 'rowIdxOrId', 'cellIdxOrId'],
        })
    }

    @test()
    protected async throwsWhenClickingCellWithoutOnClick() {
        const vc = this.ListVc({})

        const err = await assert.doesThrowAsync(() =>
            interactor.clickCell(vc, 0, 'second')
        )
        assert.doesInclude(err.message, 'is missing an onClick')
    }

    @test('can click cell in row 0 by name first', 0, 'first')
    @test('can click cell in row 0 by name second', 0, 'second')
    @test('can click cell in row 1 by name square', 1, 'square')
    @test('can click cell in row panda by name square', 'panda', 'square')
    protected async canClickCellInRowById(
        rowIdOrIdx: string | number,
        cellId: string
    ) {
        let wasHit = 'not hit'
        const vc = this.ListVc({
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            id: 'first',
                            onClick: () => {
                                wasHit = 'first'
                            },
                        },
                        {
                            id: 'second',
                            onClick: () => {
                                wasHit = 'second'
                            },
                        },
                    ],
                },
                {
                    id: 'panda',
                    cells: [
                        {
                            id: 'square',
                            onClick: () => {
                                wasHit = 'square'
                            },
                        },
                    ],
                },
            ],
        })

        assert.isEqual(wasHit, 'not hit')
        await interactor.clickCell(vc, rowIdOrIdx, cellId)
        assert.isEqual(wasHit, cellId)
    }

    @test()
    protected async canClickCellInRowByIdx() {
        let wasHit = false
        const vc = this.ListVc({
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            id: 'first',
                            onClick: () => {
                                wasHit = true
                            },
                        },
                        {
                            id: 'second',
                        },
                    ],
                },
            ],
        })

        assert.isFalse(wasHit)
        await interactor.clickCell(vc, 0, 0)
        assert.isTrue(wasHit)
    }

    @test('throws when clicking cell with bad id', 'fifth')
    @test('throws when clicking cell with bad idx', '30')
    protected async throwsWhenClickingCellWithBadCellIdxOrId(
        cellIdxOrId: number | string
    ) {
        const vc = this.ListVc({})

        const err = await assert.doesThrowAsync(() =>
            interactor.clickCell(vc, 0, cellIdxOrId)
        )
        assert.doesInclude(err.message, 'Could not find Cell')
    }

    protected ListVc(options?: Partial<ListViewControllerOptions>) {
        return this.Controller('list', {
            rows: [
                {
                    id: 'first',
                    cells: [
                        {
                            id: 'first',
                            onClick: () => {},
                        },
                        {
                            id: 'second',
                        },
                    ],
                },
            ],
            ...options,
        })
    }
}
