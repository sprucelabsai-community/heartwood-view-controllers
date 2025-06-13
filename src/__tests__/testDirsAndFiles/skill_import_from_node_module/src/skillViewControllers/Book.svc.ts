import { name } from './another.mjs'
import { taco } from './hello.cjs'

export default class BookSkillViewController {
    public static id = 'book'

    private setInConstructor = 'not set'

    public constructor() {
        this.setInConstructor = 'set!'
    }

    public getMjsName() {
        return name
    }

    public getJcsTaco() {
        return taco
    }

    public getValueSetInConstructor() {
        return this.setInConstructor
    }

    public render() {
        return 'go-team'
    }
}
