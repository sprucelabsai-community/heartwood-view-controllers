import { assertOptions } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import SpyDevice from '../SpyDevice'

const deviceAssert = {
	assertWasVibrated(vc: AbstractViewController<any>) {
		assertOptions({ vc }, ['vc'])
		//@ts-ignore
		const device = vc.getDevice() as SpyDevice
		assert.isAbove(
			device.vibrateCount,
			0,
			"I expected you to vibrate the device and you didn't! What's up, you don't like fun?"
		)
	},

	assertWasNotVibrated(vc: AbstractViewController<any>) {
		assertOptions({ vc }, ['vc'])
		try {
			this.assertWasVibrated(vc)
		} catch {
			return
		}

		assert.fail(
			`You vibrated the device and should not have! Getting a little excited I see!`
		)
	},
}

export default deviceAssert
