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
		this.countdownVc.start(10)
		this.assertTimerStartedWithEndDateThrows(1)
	}

	@test()
	protected static async knowsWhenStarted() {
		this.countdownVc.start(1)
		this.assertStartedWithEndDate(1)
		this.countdownVc.start(2)
		this.assertStartedWithEndDate(2)
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
