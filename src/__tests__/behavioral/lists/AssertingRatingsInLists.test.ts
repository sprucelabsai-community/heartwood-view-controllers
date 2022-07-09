import { test, assert } from '@sprucelabs/test'
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

export default class AssertingRatingsInListsTest extends AbstractViewControllerTest {
	@test()
	protected static throwWhenNoRatingsRenderedInList() {
		const listVc = this.ListVc(buildRows(1))
		assert.doesThrow(() => vcAssert.assertRowRendersRatings(listVc, 0))
	}

	@test()
	protected static throwsWhenPassingBadRow() {
		const listVc = this.ListVc(buildRows(2))
		assert.doesThrow(() => vcAssert.assertRowRendersRatings(listVc, 3))
	}

	@test()
	protected static throwsWhenPassingRowWithoutRatings() {
		const listVc = this.ListVc(buildRows(2, 0))
		assert.doesThrow(() => vcAssert.assertRowRendersRatings(listVc, 3))
	}

	@test()
	protected static findsInFirstCellOfFirstRow() {
		const listVc = this.ListVc(buildRows(2, 0))
		vcAssert.assertRowRendersRatings(listVc, 0)
	}

	@test()
	protected static findsRatingsInSecondCell() {
		const listVc = this.ListVc(buildRows(3, 2, 3))
		vcAssert.assertRowRendersRatings(listVc, 2)
	}

	private static ListVc(rows: ListViewControllerOptions['rows'] = []) {
		return this.Controller('list', {
			rows: [...rows],
		})
	}
}
