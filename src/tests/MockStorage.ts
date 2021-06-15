import { Storage } from '../auth/Authenticator'

export default class MockStorage implements Storage {
	private items: Record<string, string> = {}

	public removeItem(key: string): void {
		delete this.items[key]
	}
	public setItem(key: string, value: string): void {
		this.items[key] = value
	}

	public getItem(key: string): string {
		return this.items[key]
	}
}
