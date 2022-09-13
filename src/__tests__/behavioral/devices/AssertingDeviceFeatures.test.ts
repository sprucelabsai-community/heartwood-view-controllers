import { test, assert } from '@sprucelabs/test-utils'
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
		assert.isFunction(deviceAssert.assertWasNotVibrated)
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
	protected static async throwsWhenMissingForNotVibrated() {
		//@ts-ignore
		const err = assert.doesThrow(() => deviceAssert.assertWasNotVibrated())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static async passesWhenVibrateWasCalledOnce() {
		this.vc.vibrate()
		this.assertWasVibrated()
		assert.doesThrow(() => this.assertWasNotVibrated())
	}

	@test()
	protected static async throwsWhenNotVibrated() {
		assert.doesThrow(() => this.assertWasVibrated())
		this.assertWasNotVibrated()
	}

	@test()
	protected static async passesWhenVibratedMoreThanOnce() {
		this.vc.vibrate()
		this.vc.vibrate()
		this.vc.vibrate()
		this.assertWasVibrated()
		assert.doesThrow(() => this.assertWasNotVibrated())
	}

	private static assertWasVibrated() {
		deviceAssert.assertWasVibrated(this.vc)
	}

	private static assertWasNotVibrated(): any {
		return deviceAssert.assertWasNotVibrated(this.vc)
	}
}
