import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import ViewControllerExporter from '../../../viewControllers/ViewControllerExporter'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'
import ViewControllerImporter from '../../../viewControllers/ViewControllerImporter'

export default abstract class AbstractExportAndImportTest extends AbstractViewControllerTest {
    private destination!: string
    private importer!: ViewControllerImporter
    protected views!: ViewControllerFactory

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        this.views = this.Factory()

        this.destination = diskUtil.resolvePath(
            diskUtil.createRandomTempDir(),
            'bundle.js'
        )

        this.importer = ViewControllerImporter.Importer()
    }

    protected import() {
        const contents = diskUtil.readFile(this.destination)
        const { controllers, plugins, App } = this.importer.import(contents)
        this.views.importControllers(controllers, plugins)
        if (App) {
            this.views.setAppController(App)
        }
    }

    protected async export(sourcePath: string) {
        const pwd = this.resolvePath(sourcePath, '../../')
        const exporter = ViewControllerExporter.Exporter(pwd)
        await exporter.export({
            source: sourcePath,
            destination: this.destination,
        })
    }

    protected async exportAndThenImport(sourcePath: string) {
        await this.export(sourcePath)
        this.import()
    }
}
