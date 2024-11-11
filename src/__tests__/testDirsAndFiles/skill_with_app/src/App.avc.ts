export default class AppViewController {
    public static id = 'namespace'
    public constructorOptions: any

    public constructor(options: any) {
        this.constructorOptions = options
    }

    public render() {
        return 'go-team'
    }
}