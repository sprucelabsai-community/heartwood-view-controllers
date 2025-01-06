import { CachedValue, Device } from '../types/heartwood.types'

export default class SpyDevice implements Device {
    public lastCommand?: string
    public vibrateCount = 0
    public lastPhoneCalled?: string
    private cachedValues: Record<string, CachedValue> = {}
    public openedUrl?: string
    public lastCommandPayload?: Record<string, any>
    public allCommands: TrackedCommand[] = []

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

    public sendCommand(command: string, payload?: Record<string, any>): void {
        this.lastCommand = command
        this.lastCommandPayload = payload
        this.allCommands.push({ command, payload })
    }
}

interface TrackedCommand {
    command: string
    payload?: Record<string, any>
}
