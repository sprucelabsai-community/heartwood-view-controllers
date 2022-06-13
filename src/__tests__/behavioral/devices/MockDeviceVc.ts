import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert } from '@sprucelabs/test'
import SpyDevice from '../../../tests/SpyDevice'
import { Card } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'

export default class MockDeviceVc extends AbstractViewController<Card> {
	public assertHasDeviceInstance() {
		assert.isTruthy(this.getDevice())
	}

	public getDevice() {
		return super.getDevice() as SpyDevice
	}

	public vibrate() {
		this.getDevice().vibrate()
	}

	public assertVibrateCount(total: number) {
		assert.isEqual(this.getDevice().vibrateCount, total)
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
		return {}
	}
}
