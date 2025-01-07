import { test, assert, generateId } from '@sprucelabs/test-utils'
import SpyDevice from '../../../tests/SpyDevice'
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

        await this.sendCommand(command, payload)

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
        await this.assertKioskModeIsOff()

        this.setKioskMode(true)

        assert.isTrue(
            await this.device.getIsKioskModeEnabled(),
            'kiosk mode should be on'
        )

        this.setKioskMode(false)

        await this.assertKioskModeIsOff()
    }

    private static setKioskMode(on: boolean) {
        this.device.setIsKioskModeEnabled(on)
    }

    private static async assertKioskModeIsOff() {
        assert.isFalse(
            await this.device.getIsKioskModeEnabled(),
            'kiosk mode should be off'
        )
    }

    private static async sendCommand(
        command: string,
        payload?: Record<string, any>
    ) {
        await this.device.sendCommand(command, payload)
    }

    private static get device() {
        return this.vc.getDevice() as SpyDevice
    }
}
