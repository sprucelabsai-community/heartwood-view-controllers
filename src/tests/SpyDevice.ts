import { SchemaError } from '@sprucelabs/schema'
import {
    CachedValue,
    Device,
    TheaterSettingValueTypes,
    TheatreSettingName,
} from '../types/heartwood.types'
import MockAudioController from './MockAudioController'

export default class SpyDevice implements Device {
    public lastCommand?: string
    public vibrateCount = 0
    public lastPhoneCalled?: string
    private cachedValues: Record<string, CachedValue> = {}
    public openedUrl?: string
    public lastCommandPayload?: Record<string, any>
    public allCommands: TrackedCommand[] = []
    private kioskSettings: Partial<
        Record<TheatreSettingName, TheaterSettingValueTypes[TheatreSettingName]>
    > = {}
    private brightness = 0

    public setCachedValue(key: string, value: CachedValue): void {
        this.cachedValues[key] = value
    }

    public openUrl(url: string): void {
        this.openedUrl = url
    }

    public getCachedValue(key: string): CachedValue {
        return this.cachedValues[key]
    }

    public vibrate(): void {
        this.vibrateCount++
    }

    public call(phoneNumber: string): void {
        this.lastPhoneCalled = phoneNumber
    }

    public sendCommand(command: string, payload?: Record<string, any>) {
        this.lastCommand = command
        this.lastCommandPayload = payload
        this.allCommands.push({ command, payload })
    }

    public setTheatreSetting<N extends TheatreSettingName>(
        name: N,
        value: TheaterSettingValueTypes[N]
    ): void {
        this.kioskSettings[name] = value
    }

    public async getTheatreSetting<N extends TheatreSettingName>(
        name: N
    ): Promise<TheaterSettingValueTypes[N] | null> {
        return (
            (this.kioskSettings[name] as TheaterSettingValueTypes[N] | null) ??
            null
        )
    }

    public turnTorchOn(brightness?: number) {
        if (brightness && (brightness > 1 || brightness < 0)) {
            throw new SchemaError({
                code: 'INVALID_PARAMETERS',
                parameters: ['brightness'],
                friendlyMessage:
                    'Brightness on your torch must be between 0 and 1',
            })
        }

        this.brightness = brightness ?? 1
    }

    public getTorchBrightness() {
        return this.brightness
    }

    public turnTorchOff() {
        this.brightness = 0
    }

    public AudioController(audioFileUrl: string): MockAudioController {
        return new MockAudioController(audioFileUrl)
    }
}

interface TrackedCommand {
    command: string
    payload?: Record<string, any>
}
