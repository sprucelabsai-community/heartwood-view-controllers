import { formatPhoneNumber } from '@sprucelabs/schema'
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
		assert.isFunction(deviceAssert.wasVibrated)
		assert.isFunction(deviceAssert.wasNotVibrated)
	}

	@test()
	protected static async throwsWhenMissing() {
		//@ts-ignore
		const err = assert.doesThrow(() => deviceAssert.wasVibrated())
		errorAssert.assertError(err, 'MISSING_PARAMETERS', {
			parameters: ['vc'],
		})
	}

	@test()
	protected static async throwsWhenMissingForNotVibrated() {
		//@ts-ignore
		const err = assert.doesThrow(() => deviceAssert.wasNotVibrated())
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

	@test()
	protected static async knowsWhenNotCalled() {
		const number = '555-555-5555'
		assert.doesThrow(() => this.assertMadeCall(number))
		this.vc.makeCall(number)
		this.assertMadeCall(number)
		assert.doesThrow(() => this.assertMadeCall('555-555-5500'))
		this.vc.makeCall('555-555-5500')
		this.assertMadeCall('555-555-5500')
		this.assertMadeCall(formatPhoneNumber('555-555-5500'))
	}

	private static assertMadeCall(number: string): any {
		return deviceAssert.madeCall(this.vc, number)
	}

	private static assertWasVibrated() {
		deviceAssert.wasVibrated(this.vc)
	}

	private static assertWasNotVibrated(): any {
		return deviceAssert.wasNotVibrated(this.vc)
	}
}
