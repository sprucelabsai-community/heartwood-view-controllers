import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, assert } from '@sprucelabs/test'
import { errorAssert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import ListViewController, {
	ListViewControllerOptions,
} from '../../../viewControllers/list/List.vc'

export default class AssertingCheckboxTogglesRowEnabledTest extends AbstractViewControllerTest {
	protected static vc: ListViewController

	@test()
	protected static async hasFunction() {
		assert.isFunction(vcAssert.assertCheckboxTogglesRowEnabled)
	}

	@test()
	protected static async throwsWhenMissingParams() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			vcAssert.assertCheckboxTogglesRowEnabled()
		)

		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['listVc', 'row'],
		})
	}

	@test()
	protected static async throwsWhenNoCheckboxFound() {
		this.vc = this.ListVc({ rows: [this.renderRow()] })
		await assert.doesThrowAsync(() => this.assertToggles(), 'first cell')
	}

	@test()
	protected static async throwsWhenCheckboxDoesNotToggleEnabled() {
		this.vc = this.ListVcWithCheckboxOnChange(() => {})
		await assert.doesThrowAsync(() => this.assertToggles(), 'toggle')
	}

	@test()
	protected static async throwsWhenNoCheckbox() {
		this.vc = this.ListVc({
			rows: [
				this.renderRow([
					{
						id: 'yes',
					},
				]),
			],
		})
		await assert.doesThrowAsync(() => this.assertToggles(), 'first cell')
	}

	@test()
	protected static async passesWhenListChangesRowEnabled() {
		this.vc = this.ListVcWithCheckboxOnChange(() => {
			this.vc.getRowVc(0).setIsEnabled(false)
		})

		await this.assertToggles()
	}

	@test()
	protected static async passesWhenCheckingSecondRow() {
		this.vc = this.ListVc({
			rows: [
				{ id: 'yay', cells: [] },
				this.renderRowWithCheckboxInFirstCell(() => {
					this.vc.getRowVc(1).setIsEnabled(false)
				}),
			],
		})

		await this.assertToggles(1)
	}

	@test()
	protected static async passesWhenDisabledRowIsEnabled() {
		this.vc = this.ListVcWithCheckboxOnChange(() => {
			this.vc.getRowVc(0).setIsEnabled(true)
		})
		this.vc.getRowVc(0).setIsEnabled(false)
		await this.assertToggles()
	}

	private static assertToggles(row: string | number = 0) {
		return vcAssert.assertCheckboxTogglesRowEnabled(this.vc, row)
	}

	private static ListVcWithCheckboxOnChange(onChange: () => void) {
		return this.ListVc({
			rows: [this.renderRowWithCheckboxInFirstCell(onChange)],
		})
	}

	private static renderRowWithCheckboxInFirstCell(
		onChange: () => void
	): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow {
		return this.renderRow([
			{
				checkboxInput: {
					name: 'first',
					onChange,
				},
			},
		])
	}

	private static renderRow(cells: Cell[] = []): Row {
		return { id: generateId(), cells }
	}

	private static ListVc(options?: ListViewControllerOptions) {
		return this.Controller('list', { ...options })
	}
}

type Row = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow
type Cell = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell
