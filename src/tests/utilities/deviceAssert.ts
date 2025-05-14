import { assertOptions, formatPhoneNumber } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test-utils'
import AbstractViewController from '../../viewControllers/Abstract.vc'
import SpyDevice from '../SpyDevice'

const deviceAssert = {
    wasVibrated(vc: AbstractViewController<any>) {
        assertOptions({ vc }, ['vc'])
        //@ts-ignore
        const device = vc.getDevice() as SpyDevice
        assert.isAbove(
            device.vibrateCount,
            0,
            "I expected you to vibrate the device and you didn't! What's up, you don't like fun?"
        )
    },

    wasNotVibrated(vc: AbstractViewController<any>) {
        assertOptions({ vc }, ['vc'])
        try {
            this.wasVibrated(vc)
        } catch {
            return
        }

        assert.fail(
            `You vibrated the device and should not have! Getting a little excited I see!`
        )
    },

    madeCall(vc: AbstractViewController<any>, number: string) {
        //@ts-ignore
        const device = vc.getDevice() as SpyDevice

        assert.isTruthy(
            device.lastPhoneCalled,
            `You didn't call anyone! I expected you to this.getDevice().call(${number}) someone!`
        )

        assert.isEqual(
            formatPhoneNumber(device.lastPhoneCalled),
            formatPhoneNumber(number),
            `You called ${device.lastPhoneCalled} but I expected you to call ${number}!`
        )
    },

    openedUrl(vc: AbstractViewController<any>, url: string) {
        //@ts-ignore
        const device = vc.getDevice() as SpyDevice
        const openedUrl = device.openedUrl
        assert.isTruthy(
            openedUrl,
            `You didn't open any urls! Try 'this.device.openUrl(...)'`
        )

        assert.isEqual(
            openedUrl,
            url,
            `You opened ${openedUrl} but I expected you to open ${url}!`
        )
    },

    isTorchOff(vc: AbstractViewController<any>) {
        //@ts-ignore
        const device = vc.getDevice() as SpyDevice
        const brightness = device.getTorchBrightness()
        assert.isEqual(
            brightness,
            0,
            `Torch is on! Try 'this.device.turnTorchOff()' to turn it off!`
        )
    },

    isTorchOn(vc: AbstractViewController<any>, expectedBrightness?: number) {
        //@ts-ignore
        const device = vc.getDevice() as SpyDevice
        const brightness = device.getTorchBrightness()
        assert.isTruthy(
            brightness,
            `Torch is off! Try 'this.device.turnTorchOn(...)' to turn it on!`
        )

        if (expectedBrightness) {
            assert.isEqual(
                brightness,
                expectedBrightness,
                `The brightness on your torch is wrong! Try 'this.device.turnTorchOn(${expectedBrightness})'`
            )
        }
    },
}

export default deviceAssert
