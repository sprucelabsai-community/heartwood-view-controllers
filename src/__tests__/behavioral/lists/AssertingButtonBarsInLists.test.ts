import { assert, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListCell, ListRow } from '../../../types/heartwood.types'

export default class AssertingButtonBarsInListsTest extends AbstractViewControllerTest {
	@test()
	protected static throwsMissingParams() {
		//@ts-ignore
		const err = assert.doesThrow(() => vcAssert.assertRowRendersButtonBar())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['listVc', 'row'],
		})
	}

	@test()
	protected static passesWhenFindingButtonBar() {
		const vc = this.Controller('list', {
			rows: [this.renderRowWithButtonBar()],
		})

		vcAssert.assertRowRendersButtonBar(vc, 0)
	}

	@test()
	protected static async throwsWhenCantFindRow() {
		const vc = this.Controller('list', {
			rows: [],
		})
		assert.doesThrow(() => vcAssert.assertRowRendersButtonBar(vc, 0))
	}

	@test()
	protected static wontFindIfInDifferentRow() {
		const vc = this.Controller('list', {
			rows: [this.renderRowWithButtonBar(), { id: 'waka', cells: [] }],
		})

		assert.doesThrow(() => vcAssert.assertRowRendersButtonBar(vc, 1))
	}

	@test()
	protected static canFindInDifferentRow() {
		const vc = this.Controller('list', {
			rows: [{ id: 'waka', cells: [] }, this.renderRowWithButtonBar()],
		})

		assert.doesThrow(() => vcAssert.assertRowRendersButtonBar(vc, 2))
	}

	@test()
	protected static canFindButtonBarInDifferentCell() {
		const vc = this.Controller('list', {
			rows: [
				{
					id: 'waka',
					cells: [{ text: { content: 'hey' } }, this.renderCellWithButtonBar()],
				},
			],
		})

		vcAssert.assertRowRendersButtonBar(vc, 0)
	}

	@test()
	protected static returnsButtonBarController() {
		const buttonBarVc = this.Controller('buttonBar', {
			buttons: [
				{
					id: 'first',
				},
			],
		})

		const vc = this.Controller('list', {
			rows: [{ id: 'waka', cells: [{ buttonBar: buttonBarVc.render() }] }],
		})

		const match = vcAssert.assertRowRendersButtonBar(vc, 0)
		assert.isEqual(match, buttonBarVc)
	}

	private static renderRowWithButtonBar(): ListRow {
		return {
			id: 'first',
			cells: [this.renderCellWithButtonBar()],
		}
	}

	private static renderCellWithButtonBar(): ListCell {
		return {
			buttonBar: this.Controller('buttonBar', {
				buttons: [
					{
						id: 'first',
					},
				],
			}).render(),
		}
	}
}
