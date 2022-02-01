import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import { vcAssert } from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { ListRowModel } from '../../../viewControllers/list/List.vc'
import { ListCellModel } from '../../../viewControllers/list/ListCell.vc'

export default class AssertingCalendarsInListsTest extends AbstractViewControllerTest {
	@test()
	protected static throwsWithMissingParams() {
		//@ts-ignore
		const err = assert.doesThrow(() => vcAssert.assertRowRendersCalendar())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['listVc', 'row'],
		})
	}

	@test()
	protected static knowsIfRenderingInFirstRow() {
		const vc = this.Controller('list', {
			rows: [this.renderRowWithCalendar()],
		})

		vcAssert.assertRowRendersCalendar(vc, 0)
	}

	@test()
	protected static knowsIfRenderingInSecondRow() {
		const vc = this.Controller('list', {
			rows: [{ id: 'second', cells: [] }, this.renderRowWithCalendar()],
		})

		vcAssert.assertRowRendersCalendar(vc, 'first')
	}

	@test()
	protected static knowsIfRenderingInSecondColl() {
		const vc = this.Controller('list', {
			rows: [{ id: 'second', cells: [{}, this.renderCellWithCalendar()] }],
		})

		vcAssert.assertRowRendersCalendar(vc, 'second')
	}

	@test()
	protected static throwsIfCalendarIsInDayView() {
		const vc = this.Controller('list', {
			rows: [this.renderRowWithCalendar('day')],
		})

		assert.doesThrow(() => vcAssert.assertRowRendersCalendar(vc, 0))
	}

	@test()
	protected static throwsIfNotFound() {
		const vc = this.Controller('list', {
			rows: [
				{
					id: 'first',
					cells: [
						{
							text: {
								content: 'go!',
							},
						},
					],
				},
			],
		})

		assert.doesThrow(() => vcAssert.assertRowRendersCalendar(vc, 0))
	}

	private static renderRowWithCalendar(
		view: 'month' | 'day' = 'month'
	): ListRowModel {
		return {
			id: 'first',
			cells: [this.renderCellWithCalendar(view)],
		}
	}

	private static renderCellWithCalendar(
		view: 'month' | 'day' = 'month'
	): ListCellModel {
		return {
			calendar: this.Controller('calendar', {
				view,
			}).render(),
		}
	}
}
