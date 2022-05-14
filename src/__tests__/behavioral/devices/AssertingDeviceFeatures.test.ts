import { test, assert } from '@sprucelabs/test'
import { errorAssert } from '@sprucelabs/test-utils'
import deviceAssert from '../../../tests/utilities/deviceAssert'
import AbstractDeviceTest from './AbstractDeviceTest'

export default class AssertingDeviceFeaturesTest extends AbstractDeviceTest {
	@test()
	protected static async haveDeviceAssertUtil() {
		assert.isTruthy(deviceAssert)
	}

	@test()
	protected static async hassAssertWasVibrated() {
		assert.isFunction(deviceAssert.assertWasVibrated)
	}

	@test()
	protected static async throwsWhenMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => deviceAssert.assertWasVibrated())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static async passesWhenVibrateWasCalledOnce() {
		this.vc.vibrate()
		this.assertWasVibrated()
	}

	private static assertWasVibrated() {
		deviceAssert.assertWasVibrated(this.vc)
	}

	@test()
	protected static async throwsWhenNotVibrated() {
		assert.doesThrow(() => this.assertWasVibrated())
	}

	@test()
	protected static async passesWhenVibratedMoreThanOnce() {
		this.vc.vibrate()
		this.vc.vibrate()
		this.vc.vibrate()
		this.assertWasVibrated()
	}
}
