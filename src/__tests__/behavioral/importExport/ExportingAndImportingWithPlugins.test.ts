import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert, generateId } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
    importExportSourcePlugins1,
    importExportSourcePlugins2,
} from '../../../tests/constants'
import ViewControllerExporter from '../../../viewControllers/ViewControllerExporter'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'
import ViewControllerImporter from '../../../viewControllers/ViewControllerImporter'

export default class ExportingAndImportingWithPluginsTest extends AbstractViewControllerTest {
    private static destination: string
    private static importer: ViewControllerImporter
    protected static views: ViewControllerFactory

    protected static async beforeEach() {
        await super.beforeEach()

        process.env.PLUGIN_1_VALUE = generateId()
        process.env.PLUGIN_2_VALUE = generateId()
        process.env.PLUGIN_3_VALUE = generateId()

        this.destination = diskUtil.resolvePath(
            diskUtil.createRandomTempDir(),
            'bundle.js'
        )

        this.importer = ViewControllerImporter.Importer()
        this.views = this.Factory()
    }

    @test()
    protected static async canExportAndImportPlugins1() {
        await this.exportAndThenImport(importExportSourcePlugins1)

        const pluginsFromVc = this.getPluginsFrom()

        assert.isTruthy(pluginsFromVc.plugin1, 'Plugin1 not found on vc.')

        const value = pluginsFromVc.plugin1.getValue()

        assert.isEqual(value, process.env.PLUGIN_1_VALUE)
    }

    @test()
    protected static async canExportAndImportPlugins2() {
        await this.exportAndThenImport(importExportSourcePlugins2)
        const pluginsFromVc = this.getPluginsFrom('reserve-card')

        assert.isFalsy(pluginsFromVc.plugin1, 'Plugin1 found on vc.')
        assert.isEqual(
            pluginsFromVc.plugin2.getValue(),
            process.env.PLUGIN_2_VALUE
        )
        assert.isEqual(
            pluginsFromVc.plugin3.getValue(),
            process.env.PLUGIN_3_VALUE
        )
    }

    private static getPluginsFrom(id: any = 'reserve') {
        const vc = this.views.Controller(id, {})
        const pluginsFromVc = vc.getPlugins()
        return pluginsFromVc
    }

    private static async exportAndThenImport(sourcePath: string) {
        await this.export(sourcePath)
        this.import()
    }

    private static import() {
        const contents = diskUtil.readFile(this.destination)
        const { controllers, plugins } = this.importer.import(contents)

        this.views.importControllers(controllers, plugins)
    }

    private static async export(sourcePath: string) {
        const pwd = this.resolvePath(sourcePath, '../../')
        const exporter = ViewControllerExporter.Exporter(pwd)
        await exporter.export({
            source: sourcePath,
            destination: this.destination,
        })
    }
}
