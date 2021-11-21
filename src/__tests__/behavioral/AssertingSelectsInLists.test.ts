import { test, assert } from '@sprucelabs/test'
import { vcAssertUtil } from '../..'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'

export default class AssertingSelectsInListsTest extends AbstractViewControllerTest {
	protected static controllerMap = {}

	@test()
	protected static throwsIfRowDoesNotHaveSelect() {
		assert.isFunction(vcAssertUtil.assertRowRendersSelect)
	}

	@test()
	protected static throwsIfCantFindRow() {
		const vc = this.ListVc()

		assert.doesThrow(() => vcAssertUtil.assertRowRendersSelect(vc, 'not-found'))
	}

	@test()
	protected static canFindSelectInARandomRowId() {
		const row1Id = `${new Date().getTime()}`
		const vc = this.ListVc({
			row1Id,
		})

		vcAssertUtil.assertRowRendersSelect(vc, row1Id)
	}

	@test()
	protected static cantFindSelectInRowThatDoesNotHaveOne() {
		const vc = this.ListVc({})
		assert.doesThrow(() => vcAssertUtil.assertRowRendersSelect(vc, 'last'))
	}

	@test()
	protected static async canFindSelectInCellAfterFirst() {
		const vc = this.ListVc({})
		vcAssertUtil.assertRowRendersSelect(vc, 'middle')
	}

	private static ListVc(options?: { row1Id?: string; row2Id?: string }) {
		return this.Controller('list', {
			rows: [
				{
					id: options?.row1Id ?? 'first',
					cells: [
						{
							selectInput: {
								name: 'favoriteColor',
								choices: [],
							},
						},
					],
				},
				{
					id: 'middle',
					cells: [
						{},
						{},
						{
							selectInput: {
								name: 'state',
								choices: [],
							},
						},
					],
				},
				{
					id: options?.row2Id ?? 'last',
					cells: [{}],
				},
			],
		})
	}
}
