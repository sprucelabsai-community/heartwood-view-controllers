import { assert, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import { ListCell, ListRow } from '../../../types/heartwood.types'

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
	): ListRow {
		return {
			id: 'first',
			cells: [this.renderCellWithCalendar(view)],
		}
	}

	private static renderCellWithCalendar(
		view: 'month' | 'day' = 'month'
	): ListCell {
		return {
			calendar: this.Controller('calendar', {
				view,
			}).render(),
		}
	}
}
