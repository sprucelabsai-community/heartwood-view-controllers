import { AppController, ViewControllerOptions } from '../types/heartwood.types'

export default abstract class AbstractAppController implements AppController {
    public static id: string
    public constructor(_options: ViewControllerOptions) {}
}
