const fakeStorage = {
    length: 0,
    clear: () => {},
    getItem: (_key: string) => null,
    key: (_index: number) => null,
    removeItem: (_key: string) => {},
    setItem: (_key: string, _value: string) => {},
}

export default fakeStorage
