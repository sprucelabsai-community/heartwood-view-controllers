import dotenv from 'dotenv'
import AbstractSkillViewController from '../../../../../skillViewControllers/Abstract.svc'
import '../../node_modules/test'

export default class BookFormViewController extends AbstractSkillViewController {
    public static id = 'book-form'

    //@ts-ignore
    public render() {
        //@ts-ignore
        console.log = dotenv

        //@ts-ignore
        global.document = {
            //@ts-ignore
            __hack: true,
        }

        //@ts-ignore
        global.window = {
            //@ts-ignore
            __hack: true,
        }

        return {
            msg: 'what the?',
            //@ts-ignore
            globalHack2Value: global.__hack2,
            setTimeout,
            clearTimeout,
        }
    }
}
