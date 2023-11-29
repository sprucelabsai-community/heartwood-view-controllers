import { assert } from '@sprucelabs/test-utils'
import {
	Card,
	CountdownTimer,
	ViewController,
} from '../../types/heartwood.types'
import renderUtil from '../../utilities/render.utility'
import CountdownTimerViewController from '../../viewControllers/countdownTimer/CountdownTimer.vc'

const countdownTimerAssert = {
	cardRendersCountdownTimer: (vc: ViewController<Card>) => {
		const model = renderUtil.render(vc)
		const section = model.body?.sections?.find((s) => !!s.countdownTimer)
		const controller = section?.countdownTimer?.controller

		assert.isTruthy(controller, `Your card did not render a countdown timer!`)

		return controller as CountdownTimerViewController
	},

	timerStartedWithEndDate: (
		vc: ViewController<CountdownTimer>,
		endDateMs: number
	) => {
		const model = renderUtil.render(vc)
		assert.isTruthy(
			model.endDateMs,
			`Timer was not started! Try 'this.countdownVc.start(...)'`
		)

		assert.isEqual(
			model.endDateMs,
			endDateMs,
			`Timer was started with wrong end date! Expected '${endDateMs}' but got '${model.endDateMs}'!`
		)
	},
}

export default countdownTimerAssert
