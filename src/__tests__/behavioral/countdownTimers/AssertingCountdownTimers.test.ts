import { test, suite, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import countdownTimerAssert from '../../../tests/utilities/countdownTimerAssert'
import { CardSection } from '../../../types/heartwood.types'
import CountdownTimerViewController from '../../../viewControllers/countdownTimer/CountdownTimer.vc'

@suite()
export default class AssertingCountdownTimersTest extends AbstractViewControllerTest {
    private countdownVc!: CountdownTimerViewController

    protected async beforeEach() {
        await super.beforeEach()
        this.countdownVc = this.Controller('countdown-timer', {})
    }

    @test()
    protected async throwsIfCardDoesNotRenderCountdownTimer() {
        this.assertDoesNotFindTimer([])
        this.assertDoesNotFindTimer([
            {
                countdownTimer: {} as any,
            },
        ])
    }

    @test()
    protected async passesIfDoesRenderCountdownTimer() {
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
    protected async returnsTheViewController() {
        const vc = this.assertFindsTimer([
            {
                countdownTimer: this.countdownVc.render(),
            },
        ])

        assert.isEqual(vc, this.countdownVc)
    }

    @test()
    protected async throwsWhenNotStartedOrEndDateIsWrong() {
        this.assertTimerStartedWithEndDateThrows(1)
        this.start(10)
        this.assertTimerStartedWithEndDateThrows(1)
    }

    @test()
    protected async knowsWhenStarted() {
        this.start(1)
        this.assertStartedWithEndDate(1)
        this.start(2)
        this.assertStartedWithEndDate(2)
    }

    @test()
    protected async throwsWhenStartedStartedWithEndDateNotInRange() {
        this.asserthThrowsWhenStartedOutsideOfRange(1, 99)
        this.start(100)
        this.asserthThrowsWhenStartedOutsideOfRange(1, 99)
        this.start(0)
        this.asserthThrowsWhenStartedOutsideOfRange(1, 99)
    }

    @test()
    protected async canFindIfEndDateInRange() {
        this.start(1)
        this.timerStartedWithEndDateInRangeInclusive(1, 1)
        this.start(100)
        this.timerStartedWithEndDateInRangeInclusive(50, 150)
        this.timerStartedWithEndDateInRangeInclusive(50, 100)
        this.timerStartedWithEndDateInRangeInclusive(100, 150)
        this.timerStartedWithEndDateInRangeInclusive(99, 150)
    }

    @test()
    protected async throwsWhenStopNotCalled() {
        this.start(100)
        assert.doesThrow(() =>
            countdownTimerAssert.timerIsStopped(this.countdownVc)
        )
    }

    @test()
    protected knowsWhenTimerIsStopped() {
        this.start(100)
        this.countdownVc.stop()
        countdownTimerAssert.timerIsStopped(this.countdownVc)
    }

    private asserthThrowsWhenStartedOutsideOfRange(
        bottomMs: number,
        topMs: number
    ) {
        assert.doesThrow(() =>
            this.timerStartedWithEndDateInRangeInclusive(bottomMs, topMs)
        )
    }

    private timerStartedWithEndDateInRangeInclusive(
        startMs: number,
        endMs: number
    ): any {
        return countdownTimerAssert.timerStartedWithEndDateInRangeInclusive(
            this.countdownVc,
            startMs,
            endMs
        )
    }

    private start(endDateMs: number) {
        this.countdownVc.start(endDateMs)
    }

    private assertTimerStartedWithEndDateThrows(endDateMs: number) {
        assert.doesThrow(() => this.assertStartedWithEndDate(endDateMs))
    }

    private assertStartedWithEndDate(endDateMs: number): any {
        return countdownTimerAssert.timerStartedWithEndDate(
            this.countdownVc,
            endDateMs
        )
    }

    private assertDoesNotFindTimer(sections: CardSection[]) {
        assert.doesThrow(() => this.assertFindsTimer(sections))
    }

    private assertFindsTimer(sections: CardSection[]) {
        const vc = this.Controller('card', {
            body: {
                sections,
            },
        })

        return countdownTimerAssert.cardRendersCountdownTimer(vc)
    }
}
