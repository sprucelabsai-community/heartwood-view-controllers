export default class BookSkillViewController {
    public static id = 'book'

    private setInConstructor = 'not set'

    public constructor() {
        this.setInConstructor = 'set!'
    }

    public getValueSetInConstructor() {
        return this.setInConstructor
    }

    public render() {
        return 'go-team'
    }
}
