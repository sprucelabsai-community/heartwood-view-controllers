import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

export default class AssertingCheckboxesInListsTest extends AbstractViewControllerTest {
	private static readonly cellWithCheckbox = {
		checkboxInput: {
			name: 'test',
		},
	}

	private static readonly rowWithCheckboxInFirstCell = {
		id: 'test',
		cells: [AssertingCheckboxesInListsTest.cellWithCheckbox],
	}

	private static readonly rowWithCheckboxInSecondCell = {
		id: 'test',
		cells: [{}, this.cellWithCheckbox],
	}

	private static readonly rowWithoutCheckbox = {
		id: 'test-2',
		cells: [{}],
	}

	@test()
	protected static hasCheckboxAssertion() {
		assert.isFunction(vcAssert.assertRowRendersCheckBox)
	}

	@test()
	protected static throwsWhenNoCheckbox() {
		this.assertThrows([], 0)
		this.assertThrows([], 1)
		this.assertThrows(
			[this.rowWithCheckboxInFirstCell, this.rowWithoutCheckbox],
			1
		)
	}

	@test()
	protected static passesWhenCheckboxInFirstRowFirstCell() {
		this.assertFound([this.rowWithCheckboxInFirstCell], 0)
		this.assertFound([this.rowWithCheckboxInSecondCell], 0)
	}

	private static assertThrows(
		rows: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[],
		row: number
	) {
		const listVc = this.Controller('list', {
			rows,
		})
		assert.doesThrow(() => vcAssert.assertRowRendersCheckBox(listVc, row))
	}

	private static assertFound(
		rows: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[],
		row: number
	) {
		const listVc = this.Controller('list', {
			rows,
		})
		vcAssert.assertRowRendersCheckBox(listVc, row)
	}
}
