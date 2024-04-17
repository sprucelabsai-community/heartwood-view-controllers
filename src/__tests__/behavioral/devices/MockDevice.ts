import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { assert } from '@sprucelabs/test-utils'
import SpyDevice from '../../../tests/SpyDevice'
import { CachedValue, Card } from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'

export default class MockDeviceViewController extends AbstractViewController<Card> {
    public call(_phoneNumber: string): void {}
    public setCachedValue(_key: string, _value: CachedValue): void {}
    public cacheValue(key: string, value: string) {
        this.getDevice().setCachedValue(key, value)
    }

    public getCachedValue(key: string) {
        return this.getDevice().getCachedValue(key)
    }

    public assertHasDeviceInstance() {
        assert.isTruthy(this.getDevice())
    }

    public getDevice() {
        return super.getDevice() as SpyDevice
    }

    public vibrate() {
        this.getDevice().vibrate()
    }

    public makeCall(number: string) {
        this.getDevice().call(number)
    }

    public assertVibrateCount(total: number) {
        assert.isEqual(this.getDevice().vibrateCount, total)
    }

    public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card {
        return {}
    }
}
