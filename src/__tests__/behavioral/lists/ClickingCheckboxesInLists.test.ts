import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'

export default class ClickingCheckboxesInListsTest extends AbstractViewControllerTest {
	@test()
	protected static async hasClickCheckbox() {
		assert.isFunction(interactor.clickCheckboxInRow)
	}

	private static readonly rowWithoutCheckbox = {
		id: 'test',
		cells: [],
	}

	@test()
	protected static async throwsWithoutCheckbox() {
		const listVc = this.ListVc([this.rowWithoutCheckbox])
		await assert.doesThrowAsync(
			() => interactor.clickCheckboxInRow(listVc, 0),
			'checkbox'
		)
	}

	@test()
	protected static async findsInFirstRowFirstCell() {
		const listVc = this.ListVc([this.rowWithCheckboxFirstCell])

		await interactor.clickCheckboxInRow(listVc, 0)
	}

	@test()
	protected static async findsInSecondRow() {
		const listVc = this.ListVc([
			this.rowWithoutCheckbox,
			this.rowWithCheckboxFirstCell,
		])

		await interactor.clickCheckboxInRow(listVc, 1)
	}

	@test()
	protected static async canFindInSecondCell() {
		const listVc = this.ListVc([this.rowWithCheckboxSecondCell])
		await interactor.clickCheckboxInRow(listVc, 0)
	}

	@test()
	protected static async setsValueOnClick() {
		const listVc = this.ListVc([this.rowWithCheckboxFirstCell])
		await interactor.clickCheckboxInRow(listVc, 0)
		assert.isTrue(listVc.getValues()[0].whatever)
	}

	@test()
	protected static async setsValueOnClickByDifferentName() {
		const listVc = this.ListVc([
			{
				id: 'another',
				cells: [
					{
						checkboxInput: {
							name: 'another',
						},
					},
				],
			},
		])
		await interactor.clickCheckboxInRow(listVc, 0)
		assert.isTrue(listVc.getValues()[0].another)
		await interactor.clickCheckboxInRow(listVc, 0)
		assert.isFalse(listVc.getValues()[0].another)
	}

	@test()
	protected static async throwsWhenCantFindByName() {
		const listVc = this.ListVc([
			{
				id: 'another',
				cells: [
					{
						checkboxInput: {
							name: 'another',
						},
					},
					{
						checkboxInput: {
							name: 'last',
						},
					},
				],
			},
		])

		await assert.doesThrowAsync(() =>
			interactor.clickCheckboxInRow(listVc, 0, 'test')
		)

		await assert.doesThrowAsync(() =>
			interactor.clickCheckboxInRow(listVc, 0, 'what')
		)

		await interactor.clickCheckboxInRow(listVc, 0, 'another')
		await interactor.clickCheckboxInRow(listVc, 0, 'last')
	}

	private static get checkboxCell() {
		return {
			checkboxInput: {
				name: 'whatever',
			},
		}
	}

	private static get rowWithCheckboxFirstCell() {
		return {
			id: 'another',
			cells: [this.checkboxCell],
		}
	}

	private static get rowWithCheckboxSecondCell() {
		return {
			id: 'another',
			cells: [{}, this.checkboxCell],
		}
	}

	private static ListVc(
		rows: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[]
	) {
		return this.Controller('list', {
			rows,
		})
	}
}
