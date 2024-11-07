import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ViewControllerExporter from '../../../viewControllers/ViewControllerExporter'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'
import ViewControllerImporter from '../../../viewControllers/ViewControllerImporter'

export default abstract class AbstractExportAndImportTest extends AbstractViewControllerTest {
    private static destination: string
    private static importer: ViewControllerImporter
    protected static views: ViewControllerFactory

    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.views = this.Factory()

        this.destination = diskUtil.resolvePath(
            diskUtil.createRandomTempDir(),
            'bundle.js'
        )

        this.importer = ViewControllerImporter.Importer()
    }

    protected static import() {
        const contents = diskUtil.readFile(this.destination)
        const { controllers, plugins } = this.importer.import(contents)
        this.views.importControllers(controllers, plugins)
    }

    protected static async export(sourcePath: string) {
        const pwd = this.resolvePath(sourcePath, '../../')
        const exporter = ViewControllerExporter.Exporter(pwd)
        await exporter.export({
            source: sourcePath,
            destination: this.destination,
        })
    }

    protected static async exportAndThenImport(sourcePath: string) {
        await this.export(sourcePath)
        this.import()
    }
}
