import { formatPhoneNumber } from '@sprucelabs/schema'
import { test, suite, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import deviceAssert from '../../../tests/utilities/deviceAssert'
import AbstractDeviceTest from './AbstractDeviceTest'

@suite()
export default class AssertingDeviceFeaturesTest extends AbstractDeviceTest {
    @test()
    protected async haveDeviceAssertUtil() {
        assert.isTruthy(deviceAssert)
    }

    @test()
    protected async hassAssertWasVibrated() {
        assert.isFunction(deviceAssert.wasVibrated)
        assert.isFunction(deviceAssert.wasNotVibrated)
    }

    @test()
    protected async throwsWhenMissing() {
        //@ts-ignore
        const err = assert.doesThrow(() => deviceAssert.wasVibrated())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async throwsWhenMissingForNotVibrated() {
        //@ts-ignore
        const err = assert.doesThrow(() => deviceAssert.wasNotVibrated())
        errorAssert.assertError(err, 'MISSING_PARAMETERS', {
            parameters: ['vc'],
        })
    }

    @test()
    protected async passesWhenVibrateWasCalledOnce() {
        this.vc.vibrate()
        this.assertWasVibrated()
        assert.doesThrow(() => this.assertWasNotVibrated())
    }

    @test()
    protected async throwsWhenNotVibrated() {
        assert.doesThrow(() => this.assertWasVibrated())
        this.assertWasNotVibrated()
    }

    @test()
    protected async passesWhenVibratedMoreThanOnce() {
        this.vc.vibrate()
        this.vc.vibrate()
        this.vc.vibrate()
        this.assertWasVibrated()
        assert.doesThrow(() => this.assertWasNotVibrated())
    }

    @test()
    protected async knowsWhenNotCalled() {
        const number = '555-555-5555'
        assert.doesThrow(() => this.assertMadeCall(number))
        this.vc.makeCall(number)
        this.assertMadeCall(number)
        assert.doesThrow(() => this.assertMadeCall('555-555-5500'))
        this.vc.makeCall('555-555-5500')
        this.assertMadeCall('555-555-5500')
        this.assertMadeCall(formatPhoneNumber('555-555-5500'))
    }

    @test()
    protected async knowsWhenOpenedUrl() {
        const url = 'https://spruce.ai'
        this.assertOpenedUrlThrows(url)
        this.openUrl(url)
        this.assertOpenedUrl(url)
        this.assertOpenedUrlThrows('https://spruce.ai/other')
    }

    @test()
    protected async knowsIfTorchIsOff() {
        assert.doesThrow(() => this.assertTorchIsOn())
        this.assertTorchIsOff()
    }

    @test()
    protected async knowsWhenTorchTurnedOn() {
        this.turnTorchOn()
        this.assertTorchIsOn()
        assert.doesThrow(() => this.assertTorchIsOff())
    }

    @test()
    protected async throwsWhenTorchBrightnessDoesNotMatch() {
        this.turnTorchOn()
        assert.doesThrow(() => this.assertTorchIsOn(1.1))

        this.turnTorchOn(0.3)
        this.assertTorchIsOn(0.3)
    }

    private turnTorchOn(brightness?: number) {
        this.device.turnTorchOn(brightness)
    }

    private assertTorchIsOn(brightness?: number) {
        return deviceAssert.isTorchOn(this.vc, brightness)
    }

    private assertTorchIsOff() {
        deviceAssert.isTorchOff(this.vc)
    }

    private assertOpenedUrlThrows(url: string) {
        assert.doesThrow(() => this.assertOpenedUrl(url))
    }

    private openUrl(url: string) {
        this.vc.openUrl(url)
    }

    private assertOpenedUrl(url: string): any {
        return deviceAssert.openedUrl(this.vc, url)
    }

    private assertMadeCall(number: string): any {
        return deviceAssert.madeCall(this.vc, number)
    }

    private assertWasVibrated() {
        deviceAssert.wasVibrated(this.vc)
    }

    private assertWasNotVibrated(): any {
        return deviceAssert.wasNotVibrated(this.vc)
    }
}
