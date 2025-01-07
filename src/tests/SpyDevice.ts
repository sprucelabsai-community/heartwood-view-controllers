import { CachedValue, Device } from '../types/heartwood.types'

export default class SpyDevice implements Device {
    public lastCommand?: string
    public vibrateCount = 0
    public lastPhoneCalled?: string
    private cachedValues: Record<string, CachedValue> = {}
    public openedUrl?: string
    public lastCommandPayload?: Record<string, any>
    public allCommands: TrackedCommand[] = []
    private isKioskMode = false

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

    public async getIsKioskModeEnabled(): Promise<boolean> {
        return this.isKioskMode
    }

    public setIsKioskModeEnabled(isKiosk: boolean): void {
        this.isKioskMode = isKiosk
    }
}

interface TrackedCommand {
    command: string
    payload?: Record<string, any>
}
