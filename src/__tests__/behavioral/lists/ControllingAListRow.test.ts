import { assert, test } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class ControllingAListRowTest extends AbstractViewControllerTest {
	@test()
	protected static rowKnowsIfDeleted() {
		const listVc = this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [],
				},
			],
		})

		const rowVc = listVc.getRowVc(0)
		assert.isFalse(rowVc.getIsDeleted())

		listVc.deleteRow(0)

		assert.isTrue(rowVc.getIsDeleted())
	}
}
