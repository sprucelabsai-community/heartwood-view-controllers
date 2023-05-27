import { dateUtil } from '@sprucelabs/calendar-utils'
import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import {
	Calendar,
	CalendarSwipeDirection,
	ClickCalendarViewOptions,
	DropEventOptions,
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

	async clickEvent(
		vc: ViewController<Calendar>,
		eventId: string,
		blockIdx?: number
	) {
		assertOptions({ vc, eventId }, ['vc', 'eventId'])

		const { match, model } = findEvent(vc, eventId)
		const idx = blockIdx ?? 0

		assert.isTruthy(
			match,
			`I could not find an event with the id '${eventId}'.`
		)

		assert.isFunction(
			model.onClickEvent,
			`You gotta set 'onClickEvent' on your calendar to click an event!`
		)

		assert.isTruthy(
			match.timeBlocks?.[idx],
			`I could not find block ${idx} in event '${eventId}.'`
		)

		await model.onClickEvent?.({
			viewController: match.controller as any,
			event: match,
			block: match.timeBlocks[idx],
			blockIdx: idx,
		})

		return match
	},

	async dragAndDropEvent(
		vc: ViewController<Calendar>,
		eventId: string,
		updates: Omit<DropEventOptions, 'event' | 'dragEvent'>
	): Promise<boolean> {
		const { match, model } = findEvent(vc, eventId)

		assert.isTruthy(
			match,
			`I could not find an event with the id of '${eventId}'.`
		)

		assert.isFunction(
			model.onDropEvent,
			`You need to set onDropEvent on your calendar.`
		)

		const results = await model.onDropEvent({
			event: match,
			dragEvent: { ...match, id: 'dragging' },
			...updates,
		})

		assert.isTrue(
			typeof results === 'boolean',
			'You gotta return true or false from onDropEvent.'
		)

		return results as boolean
	},

	async swipe(vc: ViewController<Calendar>, direction: CalendarSwipeDirection) {
		const model = renderUtil.render(vc)
		assert.isTruthy(model.onSwipe, `You gotta set onSwipe() on your calendar!.`)
		await model.onSwipe?.({ direction })
	},
}

export default calendarInteractor

function findEvent(vc: ViewController<Calendar>, eventId: string) {
	const model = renderUtil.render(vc)
	const match = model.events?.find((e) => e.id === eventId)
	return { match, model }
}
