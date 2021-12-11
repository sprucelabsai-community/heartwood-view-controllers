import { test, assert } from '@sprucelabs/test'
import { vcAssertUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

function buildRows(total: number, rowIdxForRatings?: number, cellIdx?: number) {
	const cIdx = cellIdx ?? 0
	return new Array(total).fill(0).map((_, rowIdx) => ({
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
		assert.doesThrow(() => vcAssertUtil.assertRowRendersRatings(listVc, 0))
	}

	@test()
	protected static throwsWhenPassingBadRow() {
		const listVc = this.ListVc(buildRows(2))
		assert.doesThrow(() => vcAssertUtil.assertRowRendersRatings(listVc, 3))
	}

	@test()
	protected static throwsWhenPassingRowWithoutRatings() {
		const listVc = this.ListVc(buildRows(2, 0))
		assert.doesThrow(() => vcAssertUtil.assertRowRendersRatings(listVc, 3))
	}

	@test()
	protected static findsInFirstCellOfFirstRow() {
		const listVc = this.ListVc(buildRows(2, 0))
		vcAssertUtil.assertRowRendersRatings(listVc, 0)
	}

	@test()
	protected static findsRatingsInSecondCell() {
		const listVc = this.ListVc(buildRows(3, 2, 3))
		vcAssertUtil.assertRowRendersRatings(listVc, 2)
	}

	private static ListVc(rows: ListViewControllerOptions['rows'] = []) {
		return this.Controller('list', {
			rows: [...rows],
		})
	}
}
