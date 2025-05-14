import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import SpyDevice from '../../../tests/SpyDevice'
import {
    TheaterSettingValueTypes,
    TheatreSettingName,
} from '../../../types/heartwood.types'
import AbstractDeviceTest from './AbstractDeviceTest'

export default class DeviceTest extends AbstractDeviceTest {
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

    @test()
    protected static async canStoreToLocalCache() {
        const key = generateId()
        const value = generateId()
        this.vc.cacheValue(key, value)
        assert.isEqual(this.vc.getCachedValue(key), value)
    }

    @test('can get last url 1', {})
    @test('can get last url 2', { url: 'https://sprucebot.com' })
    protected static async canGetLastCommandSent(payload: Record<string, any>) {
        const command = generateId()

        this.sendCommand(command, payload)

        assert.isEqual(this.device.lastCommand, command)
        assert.isEqualDeep(this.device.lastCommandPayload, payload)
    }

    @test()
    protected static async canGetAllCommandsWithoutPayloads() {
        const commands = [generateId(), generateId(), generateId()]

        await Promise.all(commands.map((command) => this.sendCommand(command)))

        assert.isEqualDeep(
            this.device.allCommands,
            commands.map((c) => ({ command: c, payload: undefined }))
        )
    }

    @test()
    protected static async canGetAllCommandsWithPayloads() {
        const commands = [
            { command: generateId(), payload: { a: 1 } },
            { command: generateId(), payload: { b: 2 } },
            { command: generateId(), payload: { c: 3 } },
        ]

        await Promise.all(
            commands.map((c) => this.sendCommand(c.command, c.payload))
        )
        assert.isEqualDeep(this.device.allCommands, commands)
    }

    @test()
    protected static async canWorkWithKioskMode() {
        assert.isNull(await this.getKioskModeSetting())

        this.setKioskMode(true)

        assert.isTrue(
            await this.getKioskModeSetting(),
            'kiosk mode should be on'
        )

        this.setKioskMode(false)

        await this.assertKioskModeIsOff()
    }

    @test('can set kiosk-mode true', 'kiosk-mode', true)
    @test('can set kiosk-mode false', 'kiosk-mode', false)
    @test('can set load-url', 'load-url', generateId())
    protected static async canSetTheatreSettingsUsingSpy(
        name: TheatreSettingName,
        value: TheaterSettingValueTypes[TheatreSettingName]
    ) {
        this.device.setTheatreSetting(name, value)
        const actual = await this.device.getTheatreSetting(name)
        assert.isEqual(actual, value)
    }

    @test()
    protected static async turningTorchOnForSpySetsBrightnessToOneByDefault() {
        this.turnTorchOn()
        this.assertBrightnessOnSpyEquals(1)
    }

    @test()
    protected static async setDifferentBrightnessOnSpy() {
        this.turnTorchOn(0.1)
        this.assertBrightnessOnSpyEquals(0.1)
    }

    @test()
    protected static async brightenessOnSpyIsZeroWhenNotTurnedOnYet() {
        this.assertBrightnessOnSpyEquals(0)
    }

    @test()
    protected static async turningTorchOffOnSpySetsBrightnessToZero() {
        this.turnTorchOn()
        this.device.turnTorchOff()
        this.assertBrightnessOnSpyEquals(0)
    }

    @test()
    protected static async throwsWhenBrighteness() {
        this.assertThrowsWithBadBrightness(1.1)
        this.assertThrowsWithBadBrightness(1.2)
        this.assertThrowsWithBadBrightness(-0.1)
        this.assertThrowsWithBadBrightness(-0.2)
    }

    private static assertThrowsWithBadBrightness(brightness: number) {
        const err = assert.doesThrow(() => this.device.turnTorchOn(brightness))
        errorAssert.assertError(err, 'INVALID_PARAMETERS', {
            parameters: ['brightness'],
        })
    }

    private static assertBrightnessOnSpyEquals(expected: number) {
        assert.isEqual(this.device.getTorchBrightness(), expected)
    }

    private static turnTorchOn(brightness?: number) {
        this.device.turnTorchOn(brightness)
    }

    private static setKioskMode(on: boolean) {
        this.device.setTheatreSetting('kiosk-mode', on)
    }

    private static async assertKioskModeIsOff() {
        assert.isFalse(
            await this.getKioskModeSetting(),
            'kiosk mode should be off'
        )
    }

    private static async getKioskModeSetting() {
        return await this.device.getTheatreSetting('kiosk-mode')
    }

    private static sendCommand(command: string, payload?: Record<string, any>) {
        this.device.sendCommand(command, payload)
    }

    private static get device() {
        return this.vc.getDevice() as SpyDevice
    }
}
