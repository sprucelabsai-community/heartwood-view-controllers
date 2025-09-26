export default class BookSkillViewController {
    public static id = 'book'

    private setInConstructor = 'not set'

    public constructor() {
        this.setInConstructor = 'set!'
        console.log(process.env.SHOULD_NOT_CRASH, '<-- should be undefined')
        console.info(process.env.TACO, '<-- should be defined')
        console.warn('this is a warning')
        console.error('this is an error')   
    }

    public getValueSetInConstructor() {
        return this.setInConstructor
    }

    public render() {
        return `${process.env.TACO}'s are good`
    }
}
