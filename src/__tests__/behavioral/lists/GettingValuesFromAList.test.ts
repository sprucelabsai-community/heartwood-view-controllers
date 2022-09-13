import { test, assert } from '@sprucelabs/test-utils'
import { generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class GettingValuesFromAListTest extends AbstractViewControllerTest {
	@test()
	protected static async valuesDropInIdOfRowsIfExist() {
		const rowId = generateId()
		const name = generateId()
		const value = generateId()

		const vc = this.Controller('list', {
			rows: [
				{
					id: rowId,
					cells: [
						{
							textInput: {
								name,
								value,
							},
						},
					],
				},
			],
		})

		const values = vc.getValues()
		assert.isEqualDeep(values, [
			{
				rowId,
				[name]: value,
			},
		])
	}
}
