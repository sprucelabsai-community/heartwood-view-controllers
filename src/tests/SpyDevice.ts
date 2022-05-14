import { Device } from '../types/heartwood.types'

export default class SpyDevice implements Device {
	public vibrateCount = 0
	public vibrate(): void {
		this.vibrateCount++
	}
}
