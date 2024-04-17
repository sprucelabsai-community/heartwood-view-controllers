import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import countdownTimerAssert from '../../../tests/utilities/countdownTimerAssert'
import { CardSection } from '../../../types/heartwood.types'
import CountdownTimerViewController from '../../../viewControllers/countdownTimer/CountdownTimer.vc'

export default class AssertingCountdownTimersTest extends AbstractViewControllerTest {
    private static countdownVc: CountdownTimerViewController

    protected static async beforeEach() {
        await super.beforeEach()
        this.countdownVc = this.Controller('countdown-timer', {})
    }

    @test()
    protected static async throwsIfCardDoesNotRenderCountdownTimer() {
        this.assertDoesNotFindTimer([])
        this.assertDoesNotFindTimer([
            {
                countdownTimer: {} as any,
            },
        ])
    }

    @test()
    protected static async passesIfDoesRenderCountdownTimer() {
        this.assertFindsTimer([
            {
                countdownTimer: this.countdownVc.render(),
            },
        ])
        this.assertFindsTimer([
            {},
            {
                countdownTimer: this.countdownVc.render(),
            },
        ])
    }

    @test()
    protected static async returnsTheViewController() {
        const vc = this.assertFindsTimer([
            {
                countdownTimer: this.countdownVc.render(),
            },
        ])

        assert.isEqual(vc, this.countdownVc)
    }

    @test()
    protected static async throwsWhenNotStartedOrEndDateIsWrong() {
        this.assertTimerStartedWithEndDateThrows(1)
        this.start(10)
        this.assertTimerStartedWithEndDateThrows(1)
    }

    @test()
    protected static async knowsWhenStarted() {
        this.start(1)
        this.assertStartedWithEndDate(1)
        this.start(2)
        this.assertStartedWithEndDate(2)
    }

    @test()
    protected static async throwsWhenStartedStartedWithEndDateNotInRange() {
        this.asserthThrowsWhenStartedOutsideOfRange(1, 99)
        this.start(100)
        this.asserthThrowsWhenStartedOutsideOfRange(1, 99)
        this.start(0)
        this.asserthThrowsWhenStartedOutsideOfRange(1, 99)
    }

    @test()
    protected static async canFindIfEndDateInRange() {
        this.start(1)
        this.timerStartedWithEndDateInRangeInclusive(1, 1)
        this.start(100)
        this.timerStartedWithEndDateInRangeInclusive(50, 150)
        this.timerStartedWithEndDateInRangeInclusive(50, 100)
        this.timerStartedWithEndDateInRangeInclusive(100, 150)
        this.timerStartedWithEndDateInRangeInclusive(99, 150)
    }

    private static asserthThrowsWhenStartedOutsideOfRange(
        bottomMs: number,
        topMs: number
    ) {
        assert.doesThrow(() =>
            this.timerStartedWithEndDateInRangeInclusive(bottomMs, topMs)
        )
    }

    private static timerStartedWithEndDateInRangeInclusive(
        startMs: number,
        endMs: number
    ): any {
        return countdownTimerAssert.timerStartedWithEndDateInRangeInclusive(
            this.countdownVc,
            startMs,
            endMs
        )
    }

    private static start(endDateMs: number) {
        this.countdownVc.start(endDateMs)
    }

    private static assertTimerStartedWithEndDateThrows(endDateMs: number) {
        assert.doesThrow(() => this.assertStartedWithEndDate(endDateMs))
    }

    private static assertStartedWithEndDate(endDateMs: number): any {
        return countdownTimerAssert.timerStartedWithEndDate(
            this.countdownVc,
            endDateMs
        )
    }

    private static assertDoesNotFindTimer(sections: CardSection[]) {
        assert.doesThrow(() => this.assertFindsTimer(sections))
    }

    private static assertFindsTimer(sections: CardSection[]) {
        const vc = this.Controller('card', {
            body: {
                sections,
            },
        })

        return countdownTimerAssert.cardRendersCountdownTimer(vc)
    }
}
