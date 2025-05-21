import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import vcAssert from '../../../tests/utilities/vcAssert'
import CalendarViewController from '../../../viewControllers/Calendar.vc'

@suite()
export default class SelectingDaysInMonthViewTest extends AbstractViewControllerTest {
    private vc!: CalendarViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.vc = this.Controller('calendar', {
            view: 'month',
        })
    }

    @test()
    protected throwsWHenMissingVars() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.selectDate())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['year', 'month', 'day'],
        })
    }

    @test()
    protected canSelectAndRenderDate() {
        this.vc.selectDate(2020, 1, 1)
        this.assertSelectedRendered([{ year: 2020, month: 1, day: 1 }])

        this.vc.selectDate(1949, 0, 1)
        this.assertSelectedRendered([
            { year: 2020, month: 1, day: 1 },
            { year: 1949, month: 0, day: 1 },
        ])
    }

    @test()
    protected throwsWhenSelectingSameDateTwice() {
        this.vc.selectDate(2020, 1, 1)

        const err = assert.doesThrow(() => this.vc.selectDate(2020, 1, 1))
        errorAssert.assertError(err, 'DATE_ALREADY_SELECTED', {
            year: 2020,
            month: 1,
            day: 1,
        })
    }

    @test()
    protected noEventsSelectedRenderToStart() {
        this.assertSelectedRendered(undefined)
    }

    @test()
    protected selectingEventTriggersRender() {
        this.vc.selectDate(1000, 10, 10)
        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    @test()
    protected noSelectedDatesToStart() {
        assert.isEqualDeep(this.vc.getSelectedDates(), [])
    }

    @test()
    protected canGetSelectedDate() {
        this.vc.selectDate(2020, 10, 10)
        assert.isEqualDeep(this.vc.getSelectedDates(), [
            {
                year: 2020,
                month: 10,
                day: 10,
            },
        ])

        this.vc.selectDate(2020, 11, 11)
        assert.isEqualDeep(this.vc.getSelectedDates(), [
            {
                year: 2020,
                month: 10,
                day: 10,
            },
            {
                year: 2020,
                month: 11,
                day: 11,
            },
        ])
    }

    @test()
    protected canCheckIfSelected() {
        assert.isFalse(this.vc.isDateSelected(2020, 10, 10))
        this.vc.selectDate(2020, 10, 10)
        assert.isTrue(this.vc.isDateSelected(2020, 10, 10))
        this.vc.selectDate(1990, 1, 1)
        assert.isTrue(this.vc.isDateSelected(1990, 1, 1))
        this.vc.deselectDate(2020, 10, 10)
        assert.isFalse(this.vc.isDateSelected(1990, 1, 2))
        this.vc.selectDate(1990, 1, 2)
        assert.isTrue(this.vc.isDateSelected(1990, 1, 2))
        assert.isFalse(this.vc.isDateSelected(1990, 10, 2))
    }

    @test()
    protected deselectThrowsWhenMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => this.vc.deselectDate())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['year', 'month', 'day'],
        })
    }

    @test('cant deselect event not selected', 2020, 1, 1)
    @test('cant deselect event not selected', 2021, 1, 1)
    protected cantDeselectDateNotSelected(
        year: number,
        month: number,
        day: number
    ) {
        const err = assert.doesThrow(() =>
            this.vc.deselectDate(year, month, day)
        )
        errorAssert.assertError(err, 'DATE_NOT_SELECTED', {
            year,
            month,
            day,
        })
    }

    @test()
    protected canDeselectDate() {
        this.vc.selectDate(2020, 10, 10)
        this.vc.deselectDate(2020, 10, 10)
        this.assertSelectedRendered([])

        this.vc.selectDate(2020, 10, 10)
        this.vc.selectDate(2020, 1, 1)
        this.vc.deselectDate(2020, 1, 1)

        this.assertSelectedRendered([{ year: 2020, month: 10, day: 10 }])
    }

    @test()
    protected deselectingDateTriggersRender() {
        this.vc.selectDate(2020, 1, 1)
        this.vc.deselectDate(2020, 1, 1)
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test()
    protected canClearSelectedDates() {
        this.vc.selectDate(2020, 1, 1)
        this.vc.clearSelectedDates()
        this.assertSelectedRendered([])
        vcAssert.assertTriggerRenderCount(this.vc, 2)
    }

    @test('can set dates 1', [{ year: 2020, month: 10, day: 10 }])
    @test('can set dates 2', [
        { year: 2021, month: 1, day: 1 },
        { year: 1992, month: 2, day: 2 },
    ])
    protected canSetAllSelectedDatesAtOnce(dates: any) {
        this.vc.setSelectedDates(dates)
        this.assertSelectedRendered(dates)
        assert.isNotEqual(this.vc.getSelectedDates(), dates)
    }

    @test()
    protected selectingDateTriggersRender() {
        this.vc.setSelectedDates([
            {
                year: 2020,
                month: 10,
                day: 1,
            },
        ])

        vcAssert.assertTriggerRenderCount(this.vc, 1)
    }

    private assertSelectedRendered(
        expected?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDate[]
    ) {
        assert.isEqualDeep(this.render(this.vc).selectedDates, expected)
        if (expected) {
            assert.isNotEqual(
                this.render(this.vc).selectedDates,
                expected,
                'calendar should copy selected dates, not set directly'
            )
        }
    }
}
