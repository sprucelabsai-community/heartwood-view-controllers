import { test, assert } from '@sprucelabs/test-utils'
import SpyDevice from '../../../tests/SpyDevice'
import AbstractDeviceTest from './AbstractDeviceTest'

export default class ControllingDevicesNativeFeaturesTest extends AbstractDeviceTest {
	@test()
	protected static async canGetDevice() {
		this.vc.assertHasDeviceInstance()
	}

	@test()
	protected static async deviceIsInstanceOfTestDevice() {
		assert.isTrue(this.device instanceof SpyDevice)
	}

	@test()
	protected static async tracksTimesVibrateIsCalled() {
		this.vc.assertVibrateCount(0)
		this.vc.vibrate()
		this.vc.assertVibrateCount(1)
	}

	private static get device() {
		return this.vc.getDevice() as SpyDevice
	}
}
