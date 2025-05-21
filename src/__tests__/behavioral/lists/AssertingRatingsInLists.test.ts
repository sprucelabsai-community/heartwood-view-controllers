import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

function buildRows(total: number, rowIdxForRatings?: number, cellIdx?: number) {
    const cIdx = cellIdx ?? 0
    return new Array(total).fill(0).map((_, rowIdx) => ({
        id: `${new Date().getTime() * Math.random()}`,
        cells: new Array(cIdx + 1).fill(0).map((_, _idx) => ({
            ratingsInput:
                rowIdx === rowIdxForRatings && cIdx === _idx
                    ? {
                          name: 'feelings',
                      }
                    : undefined,
        })),
    }))
}

@suite()
export default class AssertingRatingsInListsTest extends AbstractViewControllerTest {
    @test()
    protected throwWhenNoRatingsRenderedInList() {
        const listVc = this.ListVc(buildRows(1))
        assert.doesThrow(() => vcAssert.assertRowRendersRatings(listVc, 0))
    }

    @test()
    protected throwsWhenPassingBadRow() {
        const listVc = this.ListVc(buildRows(2))
        assert.doesThrow(() => vcAssert.assertRowRendersRatings(listVc, 3))
    }

    @test()
    protected throwsWhenPassingRowWithoutRatings() {
        const listVc = this.ListVc(buildRows(2, 0))
        assert.doesThrow(() => vcAssert.assertRowRendersRatings(listVc, 3))
    }

    @test()
    protected findsInFirstCellOfFirstRow() {
        const listVc = this.ListVc(buildRows(2, 0))
        vcAssert.assertRowRendersRatings(listVc, 0)
    }

    @test()
    protected findsRatingsInSecondCell() {
        const listVc = this.ListVc(buildRows(3, 2, 3))
        vcAssert.assertRowRendersRatings(listVc, 2)
    }

    private ListVc(rows: ListViewControllerOptions['rows'] = []) {
        return this.Controller('list', {
            rows: [...rows],
        })
    }
}
