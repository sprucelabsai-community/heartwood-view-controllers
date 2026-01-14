export default class FakeStorage implements Storage {
    private items: Record<string, string> = {}

    public get length(): number {
        return Object.keys(this.items).length
    }

    public clear(): void {
        this.items = {}
    }

    public removeItem(key: string): void {
        delete this.items[key]
    }

    public setItem(key: string, value: string): void {
        this.items[key] = value
    }

    public getItem(key: string): string | null {
        if (!Object.prototype.hasOwnProperty.call(this.items, key)) {
            return null
        }

        return this.items[key]
    }

    public key(index: number): string | null {
        const keys = Object.keys(this.items)
        return keys[index] ?? null
    }
}
