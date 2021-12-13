import { test, assert } from '@sprucelabs/test'
import { interactionUtil } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListViewControllerOptions } from '../../../viewControllers/list/List.vc'

export default class ClickingRowsTest extends AbstractViewControllerTest {
	@test()
	protected static async canPassAnyRow() {
		let wasHit = false
		const vc = this.ListVc({
			rows: [
				{
					cells: [],
				},
				{
					onClick: () => {
						wasHit = true
					},
					cells: [],
				},
			],
		})

		await interactionUtil.clickRow(vc, 1)
		assert.isTrue(wasHit)
	}

	protected static ListVc(options?: Partial<ListViewControllerOptions>) {
		return this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [],
				},
			],
			...options,
		})
	}
}
