import { test, assert } from '@sprucelabs/test'
import { vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListRow } from '../../../viewControllers/list/List.vc'

export default class SelectingRowsInListsTest extends AbstractViewControllerTest {
	@test()
	protected static rowNotSelectedByDefault() {
		const vc = this.Vc()

		assert.isEqualDeep(vc.getSelectedRows(), [])

		assert.doesThrow(() => vcAssert.assertRowIsSelected(vc, 'test'))
		assert.doesThrow(() => vcAssert.assertRowsAreSelected(vc, ['test']))
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

		vcAssert.assertRowIsSelected(vc, rowId)
		vcAssert.assertRowsAreSelected(vc, [rowId])
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
			vcAssert.assertRowsAreSelected(vc, ['start', 'middle'])
		)

		assert.doesThrow(() => vcAssert.assertRowIsNotSelected(vc, 'start'))
		assert.doesThrow(() => vcAssert.assertRowIsNotSelected(vc, 'end'))
		vcAssert.assertRowIsNotSelected(vc, 'middle')
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

		vcAssert.assertRowIsSelected(vc, 'test')
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
		vcAssert.assertRowIsSelected(vc, 'test')

		vc.deselectRow('test')
		vcAssert.assertRowIsNotSelected(vc, 'test')

		vc.selectRow('more')
		vcAssert.assertRowIsSelected(vc, 'more')

		vc.deselectRow('more')
		vcAssert.assertRowIsNotSelected(vc, 'more')
	}

	@test()
	protected static canSetManySelectedAtOnce() {
		const vc = this.Vc([
			{
				id: 'test',
				cells: [],
			},
			{
				id: 'more',
				cells: [],
			},
			{
				id: 'middle',
				cells: [],
			},
			{
				id: 'end',
				cells: [],
			},
		])

		vc.setSelectedRows(['test'])
		vcAssert.assertRowsAreSelected(vc, ['test'])

		vc.setSelectedRows(['middle'])
		vcAssert.assertRowIsNotSelected(vc, 'test')

		vc.setSelectedRows(['more', 'end'])
		vcAssert.assertRowsAreSelected(vc, ['more', 'end'])
		vcAssert.assertRowIsNotSelected(vc, 'middle')
	}

	@test()
	protected static settingSelectedOnRowTriggersRender() {
		const vc = this.Vc([
			{
				id: 'test',
				cells: [],
			},
		])

		const rowVc = vc.getRowVc(0)

		vcAssert.attachTriggerRenderCounter(rowVc)

		rowVc.setIsSelected(true)

		vcAssert.assertTriggerRenderCount(rowVc, 1)
	}

	@test()
	protected static selectedRowsArePersistedBetweenListChanges() {
		const vc = this.Vc([
			{
				id: 'happy',
				cells: [],
			},
			{
				id: 'day',
				cells: [],
			},
		])

		const rowVc = vc.getRowVc('happy')
		rowVc.setIsSelected(true)

		vc.addRow({
			id: 'taco',
			cells: [],
		})

		vcAssert.assertRowIsSelected(vc, 'happy')
	}

	@test()
	protected static rendersIsSelected() {
		const vc = this.Vc([
			{
				id: 'day',
				cells: [],
			},
		])

		const rowVc = vc.getRowVc('day')

		rowVc.setIsSelected(true)
		let model = this.render(vc)
		assert.isTrue(model.rows[0].isSelected)

		rowVc.setIsSelected(false)
		model = this.render(vc)
		assert.isFalse(model.rows[0].isSelected)
	}

	private static Vc(
		rows: ListRow[] = [
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
