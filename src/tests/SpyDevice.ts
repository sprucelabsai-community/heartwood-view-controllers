import { Device } from '../types/heartwood.types'

export default class SpyDevice implements Device {
	public vibrateCount = 0
	public lastPhoneCalled?: string

	public vibrate(): void {
		this.vibrateCount++
	}

	public call(phoneNumber: string): void {
		this.lastPhoneCalled = phoneNumber
	}
}
