import { Configuration } from 'webpack'
import ViewControllerExporter from '../viewControllers/ViewControllerExporter'

export default class SpyViewControllerExporter extends ViewControllerExporter {
    public static instance?: SpyViewControllerExporter

    public constructor(cwd: string) {
        super(cwd)
        SpyViewControllerExporter.instance = this
    }

    public getConfig(): Configuration {
        return this.config
    }
}
