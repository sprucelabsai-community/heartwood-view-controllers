import {
    AppViewController,
    ViewControllerOptions,
} from '../types/heartwood.types'

export default abstract class AbstractAppViewController
    implements AppViewController
{
    public static id: string
    public constructor(_options: ViewControllerOptions) {}
}
