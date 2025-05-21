import { dateUtil, lunch } from '@sprucelabs/calendar-utils'
import { assert, generateId, test, suite } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import calendarInteractor from '../../../tests/utilities/calendarInteractor'
import { ClickCalendarViewOptions } from '../../../types/calendar.types'
import CalendarViewController, {
    CalendarViewControllerOptions,
} from '../../../viewControllers/Calendar.vc'

@suite()
export class InteractingWithCalendarInMonthViewTest extends AbstractViewControllerTest {
    private vc!: CalendarViewController

    @test()
    protected async throwsWhenMissingVars() {
        const err = await assert.doesThrowAsync(() =>
            //@ts-ignore
            calendarInteractor.clickMonthView()
        )
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc', 'dateTimeMs'],
        })
    }

    @test()
    protected async throwsWhenClickingCalendarInDayView() {
        this.vc = this.Controller('calendar', {
            view: 'day',
        })

        await assert.doesThrowAsync(() =>
            calendarInteractor.clickMonthView(this.vc, new Date().getTime())
        )
    }

    @test()
    protected async canClickDayView() {
        this.vc = this.Vc({
            onClickView: () => {},
        })

        await calendarInteractor.clickMonthView(this.vc, new Date().getTime())
    }

    @test()
    protected async throwsIfMissingOnClick() {
        this.vc = this.Vc()

        await assert.doesThrowAsync(() =>
            calendarInteractor.clickMonthView(this.vc, new Date().getTime())
        )
    }

    @test()
    protected async callsOnClick() {
        let wasHit = false
        this.vc = this.Vc({
            onClickView: () => {
                wasHit = true
            },
        })

        await calendarInteractor.clickMonthView(this.vc, new Date().getTime())

        assert.isTrue(wasHit)
    }

    @test('passes expected payload for today', new Date().getTime())
    @test(
        'passes expected payload for tomorrow',
        dateUtil.addDays(new Date().getTime(), 1)
    )
    protected async passesExpectedPayload(date: number) {
        let passedOptions: any
        this.vc = this.Vc({
            onClickView: (options) => {
                passedOptions = options
            },
        })

        await calendarInteractor.clickMonthView(this.vc, date)

        const expected = dateUtil.getStartOfDay(date)
        assert.isEqualDeep(passedOptions, {
            dateTimeMs: expected,
        })
    }

    @test()
    protected async currentMonthMatchesThatOfFirstSelectedDate() {
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
    protected async startDateRetained() {
        const startDate = new Date().getTime()

        this.vc = this.Vc({
            selectedDates: [dateUtil.splitDate(new Date().getTime())],
            startDate,
        })

        assert.isEqual(this.vc.getStartDate(), startDate)
    }

    @test()
    protected async throwsWithMissingOnPress() {
        await assert.doesThrowAsync(() =>
            calendarInteractor.longPressThenDrop(this.vc)
        )
    }

    @test()
    protected async canSimulateLongPressDrop() {
        let passedOptions: ClickCalendarViewOptions | undefined

        this.vc = this.Vc({
            onLongPressViewDrop: (options) => {
                passedOptions = options
            },
        })

        const options = this.generateClickOptions()
        await calendarInteractor.longPressThenDrop(this.vc, options)
        assert.isEqualDeep(passedOptions, options)
    }

    @test()
    protected async canSimulateTouch() {
        await assert.doesThrowAsync(() => calendarInteractor.tapView(this.vc))
    }

    @test()
    protected async tappingTriggersCallback() {
        let passedOptions: ClickCalendarViewOptions | undefined

        this.vc = this.Vc({
            onTapView: (options) => {
                passedOptions = options
            },
        })

        const options = this.generateClickOptions()
        await calendarInteractor.tapView(this.vc, options)
        assert.isEqualDeep(passedOptions, options)
    }

    private generateClickOptions() {
        return {
            dateTimeMs: new Date().getTime(),
            personId: generateId(),
        }
    }

    protected Vc(options?: CalendarViewControllerOptions) {
        return this.Controller('calendar', {
            view: 'month',
            ...options,
        })
    }
}
