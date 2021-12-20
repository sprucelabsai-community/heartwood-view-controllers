import { test, assert } from '@sprucelabs/test'
import { vcAssertUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListRowModel } from '../../../viewControllers/list/List.vc'

export default class SelectingRowsinListsTest extends AbstractViewControllerTest {
	@test()
	protected static rowNotSelectedByDefault() {
		const vc = this.Vc()

		assert.isEqualDeep(vc.getSelectedRows(), [])

		assert.doesThrow(() => vcAssertUtil.assertRowIsSelected(vc, 'test'))
		assert.doesThrow(() => vcAssertUtil.assertRowsAreSelected(vc, ['test']))
	}

	@test()
	protected static isRowSelectedThrowsWhenPassedBadRow() {
		const vc = this.Vc()
		assert.doesThrow(() => vc.isRowSelected('last'))
	}

	@test('can select first row with id first', 'first')
	@test('can select first row with id first', 'second')
	protected static canSelectOneRowAtTheStart(rowId: string) {
		const vc = this.Vc([
			{
				id: rowId,
				isSelected: true,
				cells: [],
			},
		])

		assert.isTrue(vc.isRowSelected(rowId))
		assert.isEqualDeep(vc.getSelectedRows(), [rowId])

		vcAssertUtil.assertRowIsSelected(vc, rowId)
		vcAssertUtil.assertRowsAreSelected(vc, [rowId])
	}

	@test()
	protected static canSelectAFewRowsToStart() {
		const vc = this.Vc([
			{
				id: 'start',
				isSelected: true,
				cells: [],
			},
			{
				id: 'middle',
				cells: [],
			},
			{
				id: 'end',
				isSelected: true,
				cells: [],
			},
		])

		assert.isTrue(vc.isRowSelected('end'))
		assert.isFalse(vc.isRowSelected('middle'))

		assert.isEqualDeep(vc.getSelectedRows(), ['start', 'end'])
		assert.doesThrow(() =>
			vcAssertUtil.assertRowsAreSelected(vc, ['start', 'middle'])
		)

		assert.doesThrow(() => vcAssertUtil.assertRowIsNotSelected(vc, 'start'))
		assert.doesThrow(() => vcAssertUtil.assertRowIsNotSelected(vc, 'end'))
		vcAssertUtil.assertRowIsNotSelected(vc, 'middle')
	}

	@test()
	protected static assertingSelections() {
		const vc = this.Vc([
			{
				id: 'test',
				isSelected: true,
				cells: [],
			},
		])

		vcAssertUtil.assertRowIsSelected(vc, 'test')
	}

	@test()
	protected static canSelectAndDeselectRows() {
		const vc = this.Vc([
			{
				id: 'test',
				cells: [],
			},
			{
				id: 'more',
				cells: [],
			},
		])

		vc.selectRow('test')
		vcAssertUtil.assertRowIsSelected(vc, 'test')

		vc.deselectRow('test')
		vcAssertUtil.assertRowIsNotSelected(vc, 'test')

		vc.selectRow('more')
		vcAssertUtil.assertRowIsSelected(vc, 'more')

		vc.deselectRow('more')
		vcAssertUtil.assertRowIsNotSelected(vc, 'more')
	}

	private static Vc(
		rows: ListRowModel[] = [
			{
				id: 'first',
				cells: [],
			},
		]
	) {
		return this.Controller('list', {
			rows,
		})
	}
}
