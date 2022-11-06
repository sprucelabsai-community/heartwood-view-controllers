import { dateUtil, lunch } from '@sprucelabs/calendar-utils'
import { assert, generateId, test } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import interactor from '../../../tests/utilities/interactor'
import { ClickCalendarViewOptions } from '../../../types/calendar.types'
import CalendarViewController, {
	CalendarViewControllerOptions,
} from '../../../viewControllers/Calendar.vc'

export class InteractingWithCalendarInMonthViewTest extends AbstractViewControllerTest {
	private static vc: CalendarViewController

	@test()
	protected static async throwsWhenMissingVars() {
		const err = await assert.doesThrowAsync(() =>
			//@ts-ignore
			interactor.clickCalendarMonthView()
		)
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc', 'dateTimeMs'],
		})
	}

	@test()
	protected static async throwsWhenClickingCalendarInDayView() {
		this.vc = this.Controller('calendar', {
			view: 'day',
		})

		await assert.doesThrowAsync(() =>
			interactor.clickCalendarMonthView(this.vc, new Date().getTime())
		)
	}

	@test()
	protected static async canClickDayView() {
		this.vc = this.Vc({
			onClickView: () => {},
		})

		await interactor.clickCalendarMonthView(this.vc, new Date().getTime())
	}

	@test()
	protected static async throwsIfMissingOnClick() {
		this.vc = this.Vc()

		await assert.doesThrowAsync(() =>
			interactor.clickCalendarMonthView(this.vc, new Date().getTime())
		)
	}

	@test()
	protected static async callsOnClick() {
		let wasHit = false
		this.vc = this.Vc({
			onClickView: () => {
				wasHit = true
			},
		})

		await interactor.clickCalendarMonthView(this.vc, new Date().getTime())

		assert.isTrue(wasHit)
	}

	@test('passes expected payload for today', new Date().getTime())
	@test(
		'passes expected payload for tomorrow',
		dateUtil.addDays(new Date().getTime(), 1)
	)
	protected static async passesExpectedPayload(date: number) {
		let passedOptions: any
		this.vc = this.Vc({
			onClickView: (options) => {
				passedOptions = options
			},
		})

		await interactor.clickCalendarMonthView(this.vc, date)

		const expected = dateUtil.getStartOfDay(date)
		assert.isEqualDeep(passedOptions, {
			dateTimeMs: expected,
		})
	}

	@test()
	protected static async currentMonthMatchesThatOfFirstSelectedDate() {
		const lunchInMonths = dateUtil.addMonths(lunch(), 2)

		this.vc = this.Vc({
			selectedDates: [dateUtil.splitDate(lunchInMonths)],
		})

		const actual = this.vc.getStartDate()
		const expected = dateUtil.getStartOfMonth(lunchInMonths)

		assert.isAbove(actual, expected - 1)
		assert.isBelow(actual, expected + 100)
	}

	@test()
	protected static async startDateRetained() {
		const startDate = new Date().getTime()

		this.vc = this.Vc({
			selectedDates: [dateUtil.splitDate(new Date().getTime())],
			startDate,
		})

		assert.isEqual(this.vc.getStartDate(), startDate)
	}

	@test()
	protected static async throwsWithMissingOnPress() {
		await assert.doesThrowAsync(() => interactor.longPressDropOnView(this.vc))
	}

	@test()
	protected static async canSimulateLongPressDrop() {
		let passedOptions: ClickCalendarViewOptions | undefined

		this.vc = this.Vc({
			onLongPressViewDrop: (options) => {
				passedOptions = options
			},
		})

		const options = {
			dateTimeMs: new Date().getTime(),
			personId: generateId(),
		}
		await interactor.longPressDropOnView(this.vc, options)
		assert.isEqualDeep(passedOptions, options)
	}

	protected static Vc(options?: CalendarViewControllerOptions) {
		return this.Controller('calendar', {
			view: 'month',
			...options,
		})
	}
}
