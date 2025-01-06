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

        this.sendCommand(command, payload)

        assert.isEqual(this.device.lastCommand, command)
        assert.isEqualDeep(this.device.lastCommandPayload, payload)
    }

    @test()
    protected static async canGetAllCommandsWithoutPayloads() {
        const commands = [generateId(), generateId(), generateId()]
        commands.forEach((command) => this.sendCommand(command))
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
        commands.forEach((c) => this.sendCommand(c.command, c.payload))
        assert.isEqualDeep(this.device.allCommands, commands)
    }

    private static sendCommand(command: string, payload?: Record<string, any>) {
        this.device.sendCommand(command, payload)
    }

    private static get device() {
        return this.vc.getDevice() as SpyDevice
    }
}
