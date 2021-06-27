import { assert } from '@sprucelabs/test'
import { ViewController } from '../../types/heartwood.types'
import AbstractViewController from '../../viewControllers/Abstract.vc'

type Vc = ViewController<any>

const vcAssertUtil = {
	attachTriggerRenderCounter(vc: Vc) {
		//@ts-ignore
		vc.__renderInvocationCount = 0

		if (vc.triggerRender === AbstractViewController.prototype.triggerRender) {
			vc.triggerRender = () => {
				//@ts-ignore
				vc.__renderInvocationCount++
			}
		}
	},
	assertTriggerRenderCount(vc: Vc, expected: number) {
		//@ts-ignore
		const actual = vc.__renderInvocationCount

		if (typeof actual === 'undefined') {
			assert.fail(
				'View controller was not instantiated using `this.Controller()`, so you must pass it through `vcAssertUtil.attachTriggerRenderCounter(vc)`'
			)
		}

		assert.isEqual(
			actual,
			expected,
			`Expected triggerRender of \`${
				//@ts-ignore
				vc.id
			}\` to be invoked \`${expected}\` time${
				expected === 1 ? '' : 's'
			}, but it was actually invoked \`${actual}\` time${
				actual === 1 ? '' : 's'
			}.`
		)
	},
}

export default vcAssertUtil
