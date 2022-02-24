import { dateUtil } from '@sprucelabs/calendar-utils'
import { assert, test } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import {
	CalendarViewController,
	CalendarViewControllerOptions,
	interactor,
} from '../../..'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'

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
			onClick: () => {},
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
			onClick: () => {
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
			onClick: (options) => {
				passedOptions = options
			},
		})

		await interactor.clickCalendarMonthView(this.vc, date)

		const expected = dateUtil.getStartOfDay(date)
		assert.isEqualDeep(passedOptions, {
			dateTimeMs: expected,
		})
	}

	protected static Vc(options?: CalendarViewControllerOptions) {
		return this.Controller('calendar', {
			view: 'month',
			...options,
		})
	}
}
