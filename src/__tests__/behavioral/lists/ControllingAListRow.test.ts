import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class ControllingAListRowTest extends AbstractViewControllerTest {
	@test()
	protected static rowKnowsIfDeleted() {
		const { rowVc, listVc } = this.ListVcWithRowVc()

		assert.isFalse(rowVc.getIsDeleted())

		listVc.deleteRow(0)

		assert.isTrue(rowVc.getIsDeleted())
	}

	@test()
	protected static renderingADeletedRowThrows() {
		const { rowVc } = this.ListVcWithRowVc()
		rowVc.delete()
		assert.isTrue(rowVc.getIsDeleted())

		const err = assert.doesThrow(() => this.render(rowVc))

		errorAssert.assertError(err, 'ROW_DELETED')
	}

	@test()
	protected static everyRowKnowsIfItsDeleted() {
		const { listVc } = this.ListVcWithRowVc([
			{
				id: 'second',
				cells: [],
			},
		])

		const firstVc = listVc.getRowVc('first')
		const secondVc = listVc.getRowVc('second')

		firstVc.delete()

		assert.isTrue(firstVc.getIsDeleted())
		assert.isFalse(secondVc.getIsDeleted())
	}

	@test()
	protected static async allMethodsOnRowVcHonorChangingRowIdxs() {
		const { listVc } = this.ListVcWithRowVc([
			{
				id: 'second',
				cells: [],
				isSelected: false,
				isEnabled: false,
			},
			{
				id: 'third',
				isEnabled: true,
				isSelected: true,
				cells: [
					{
						textInput: {
							name: 'willBeDeleted',
							value: 'Yes!',
						},
					},
				],
			},
		])
		const firstVc = listVc.getRowVc('first')
		const secondVc = listVc.getRowVc('second')
		const thirdVc = listVc.getRowVc('third')

		firstVc.delete()

		assert.isFalse(secondVc.getIsSelected())
		assert.isFalse(secondVc.getIsEnabled())
		assert.isTrue(thirdVc.getIsSelected())
		assert.isTrue(thirdVc.getIsEnabled())

		assert.isEqualDeep(thirdVc.getValues(), { willBeDeleted: 'Yes!' })

		await thirdVc.setValue('willBeDeleted', 'No!')
		assert.isEqualDeep(thirdVc.getValues(), { willBeDeleted: 'No!' })

		thirdVc.setIsEnabled(false)
		assert.isFalse(thirdVc.getIsEnabled())

		secondVc.setIsSelected(true)
		assert.isTrue(secondVc.getIsSelected())

		thirdVc.delete()
		assert.isTrue(thirdVc.getIsDeleted())
	}

	private static ListVcWithRowVc(
		rows?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[]
	) {
		const listVc = this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [],
				},
				...(rows ?? []),
			],
		})

		const rowVc = listVc.getRowVc(0)
		return { rowVc, listVc }
	}
}
