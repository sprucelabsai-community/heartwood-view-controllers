import {
    AppViewController,
    ViewControllerOptions,
} from '../types/heartwood.types'

export default abstract class AbstractAppViewController
    implements AppViewController
{
    public constructor(_options: ViewControllerOptions) {}
}
