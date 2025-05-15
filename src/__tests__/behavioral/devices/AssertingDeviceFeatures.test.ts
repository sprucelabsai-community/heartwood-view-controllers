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

    @test()
    protected static async knowsWhenOpenedUrl() {
        const url = 'https://spruce.ai'
        this.assertOpenedUrlThrows(url)
        this.openUrl(url)
        this.assertOpenedUrl(url)
        this.assertOpenedUrlThrows('https://spruce.ai/other')
    }

    @test()
    protected static async knowsIfTorchIsOff() {
        assert.doesThrow(() => this.assertTorchIsOn())
        this.assertTorchIsOff()
    }

    @test()
    protected static async knowsWhenTorchTurnedOn() {
        this.turnTorchOn()
        this.assertTorchIsOn()
        assert.doesThrow(() => this.assertTorchIsOff())
    }

    @test()
    protected static async throwsWhenTorchBrightnessDoesNotMatch() {
        this.turnTorchOn()
        assert.doesThrow(() => this.assertTorchIsOn(1.1))

        this.turnTorchOn(0.3)
        this.assertTorchIsOn(0.3)
    }

    private static turnTorchOn(brightness?: number) {
        this.device.turnTorchOn(brightness)
    }

    private static assertTorchIsOn(brightness?: number) {
        return deviceAssert.isTorchOn(this.vc, brightness)
    }

    private static assertTorchIsOff() {
        deviceAssert.isTorchOff(this.vc)
    }

    private static assertOpenedUrlThrows(url: string) {
        assert.doesThrow(() => this.assertOpenedUrl(url))
    }

    private static openUrl(url: string) {
        this.vc.openUrl(url)
    }

    private static assertOpenedUrl(url: string): any {
        return deviceAssert.openedUrl(this.vc, url)
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
