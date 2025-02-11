import { Configuration } from 'webpack'
import ViewControllerExporter from '../viewControllers/ViewControllerExporter'

export default class SpyViewControllerExporter extends ViewControllerExporter {
    public getConfig(): Configuration {
        return this.config
    }
}
