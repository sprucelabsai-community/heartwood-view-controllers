import {
    CachedValue,
    Device,
    TheaterSettingValueTypes,
    TheatreSettingName,
} from '../types/heartwood.types'

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
}

interface TrackedCommand {
    command: string
    payload?: Record<string, any>
}
