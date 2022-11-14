import { dateUtil } from '@sprucelabs/calendar-utils'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
	Calendar,
	ClickCalendarViewOptions,
	ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import { getVcName } from './assertSupport'

const calendarInteractor = {
	async longPressThenDrop(
		vc: ViewController<Calendar>,
		options?: ClickCalendarViewOptions
	) {
		const { onLongPressViewDrop } = renderUtil.render(vc)

		assert.isTruthy(
			onLongPressViewDrop,
			`You gotta set 'onLongPressViewDrop' in your calendar's constructor options.`
		)
		await onLongPressViewDrop?.({ ...options })
	},

	async tapView(
		vc: ViewController<Calendar>,
		options?: ClickCalendarViewOptions
	) {
		const { onTapView } = renderUtil.render(vc)

		assert.isTruthy(
			onTapView,
			`You gotta set 'onTapView' in your calendar's constructor options.`
		)
		await onTapView?.({ ...options })
	},

	async clickMonthView(vc: ViewController<Calendar>, dateTimeMs: number) {
		assertOptions({ vc, dateTimeMs }, ['vc', 'dateTimeMs'])

		const model = renderUtil.render(vc)

		assert.isEqual(
			model.view,
			'month',
			`Your calendar '${getVcName(
				vc
			)}' needs it's view set to 'month', it's currently set to ${
				model.view ?? '***empty***'
			}`
		)

		assert.isFunction(
			model.onClickView,
			`You have to set 'onClickView' on your calendar!`
		)

		await model.onClickView?.({
			dateTimeMs: dateUtil.getStartOfDay(dateTimeMs),
		})
	},

	async clickDayView(
		vc: ViewController<Calendar>,
		dateTimeMs: number,
		personId?: string
	) {
		assertOptions({ vc, dateTimeMs }, ['vc', 'dateTimeMs'])

		const model = renderUtil.render(vc)

		assert.isEqual(
			model.view,
			'day',
			`Your calendar '${getVcName(
				vc
			)}' needs it's view set to 'day', it's currently set to ${
				model.view ?? '***empty***'
			}`
		)

		if (personId) {
			const personMatch = model?.people?.find((p) => p?.id === personId)

			assert.isTruthy(
				personMatch,
				`I could not find a person with the id of ${personId}.`
			)
		}

		assert.isFunction(
			model.onClickView,
			`You have to set 'onClick' on your calendar!`
		)

		await model.onClickView?.({
			dateTimeMs,
			personId,
		})
	},
}

export default calendarInteractor
