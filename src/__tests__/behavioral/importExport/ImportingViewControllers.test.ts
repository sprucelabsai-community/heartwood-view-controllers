import { diskUtil } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import * as constants from '../../../tests/constants'
import ViewControllerExporter from '../../../viewControllers/ViewControllerExporter'
import ViewControllerImporter from '../../../viewControllers/ViewControllerImporter'

export default class ViewControllerImporterTest extends AbstractViewControllerTest {
    protected static controllerMap: Record<string, any> = {}
    private static importer: ViewControllerImporter

    public static async beforeAll() {
        await super.beforeAll()

        const exporter = ViewControllerExporter.Exporter(
            constants.importExportCwd
        )

        await exporter.export({
            source: constants.importExportSource,
            destination: constants.importExportDestination,
        })

        await exporter.export({
            source: constants.importExportSourceNoIds,
            destination: constants.importExportDestinationNoIds,
        })

        await exporter.export({
            source: constants.importExportSourceApp,
            destination: constants.importExportDestinationApp,
        })
    }

    protected static async beforeEach() {
        await super.beforeEach()
        this.importer = ViewControllerImporter.Importer()
    }

    @test()
    protected static canCreateViewControllerImporter() {
        assert.isTruthy(this.importer)
    }

    @test('throws with syntax error', 'aosetuh')
    @test('throws with no object in response', '')
    protected static importingInvalidScriptThrows(script: string) {
        const err = assert.doesThrow(() => this.importer.import(script))
        errorAssert.assertError(err, 'INVALID_VIEW_CONTROLLER_SOURCE')
    }

    @test()
    protected static throwsIfMissingPublicStaticIdOnVc() {
        const err = assert.doesThrow(() => this.importControllers('NoIds'))
        errorAssert.assertError(err, 'INVALID_VIEW_CONTROLLER_SOURCE')
        assert.doesInclude(err.message, 'public static readonly id =')
    }

    @test()
    protected static importingValidScripts() {
        const { controllers } = this.importControllers()

        assert.isArray(controllers)
        assert.isLength(controllers, 2)
        assert.isTruthy(controllers[0])
        assert.isEqual(controllers[0].id, 'book')
        assert.isTruthy(controllers[1])
        assert.isEqual(controllers[1].id, 'book-form')
    }

    @test()
    protected static canInstantiateImportedController() {
        const factory = this.importAndGetFactory()

        //@ts-ignore
        const vc = factory.Controller('book', {})
        //@ts-ignore
        const vc2 = factory.Controller('book-form', {})

        assert.isFunction(vc.render)
        assert.isEqual(vc.render(), 'go-team')
        assert.isFunction(vc2.render)

        //@ts-ignore
        assert.isEqual(vc2.render().msg, 'what the?')
    }

    @test()
    protected static cantMessWithGlobalWindow() {
        this.importAndRenderVc()
        //@ts-ignore
        assert.isFalsy(global.window?.__hack)
    }

    @test()
    protected static cantMessWithDocument() {
        this.importAndRenderVc()
        //@ts-ignore
        assert.isFalsy(global.document?.__hack)
    }

    @test()
    protected static cantGetAnyGlobalVars() {
        //@ts-ignore
        global.__hack2 = true
        const model = this.importAndRenderVc()
        //@ts-ignore
        assert.isFalsy(model.globalHack2Value)
    }

    @test()
    protected static canGetTimeoutFunctions() {
        const model = this.importAndRenderVc()

        //@ts-ignore
        assert.isEqual(model.setTimeout, setTimeout)
        //@ts-ignore
        assert.isEqual(model.setInterval, setInterval)
        //@ts-ignore
        assert.isEqual(model.clearTimeout, clearTimeout)
        //@ts-ignore
        assert.isEqual(model.clearInterval, clearInterval)
    }

    @test()
    protected static strangeVarNamesCantCrashIt() {
        const names = ['oh-not', '0', '0there', '1three7']

        names.forEach((n) => {
            //@ts-ignore
            global[n] = true
        })

        this.importAndRenderVc()
    }

    @test()
    protected static constructorIsInvoked() {
        const factory = this.importAndGetFactory()

        //@ts-ignore
        const vc = factory.Controller('book', {})

        //@ts-ignore
        assert.isEqual(vc.getValueSetInConstructor(), 'set!')
    }

    @test()
    protected static canExtendViewControllerImport() {
        ViewControllerImporter.Class = SpyViewControllerImporter
        const instance = ViewControllerImporter.Importer()
        //@ts-ignore
        assert.isInstanceOf(instance, SpyViewControllerImporter)
    }

    @test()
    protected static async canImportAppViewController() {
        const { App } = this.importControllers('App')
        assert.isTruthy(App)
        const app = new App({} as any)
        //@ts-ignore
        assert.isEqual(app.render(), 'go-team')
    }

    private static importAndGetFactory(suffix?: ImportExportSuffix) {
        const { controllers } = this.importControllers(suffix)
        const factory = this.Factory()

        factory.importControllers(controllers)

        return factory
    }

    private static importAndRenderVc() {
        const factory = this.importAndGetFactory()

        //@ts-ignore
        const vc = factory.Controller('book-form', {})
        const model = vc.render()
        return model
    }

    private static importControllers(suffix: ImportExportSuffix = '') {
        const contents = diskUtil.readFile(
            //@ts-ignore
            constants[`importExportDestination${suffix}`]
        )

        const { controllers, App } = this.importer.import(contents)

        return { controllers, App }
    }
}

class SpyViewControllerImporter extends ViewControllerImporter {}

type ImportExportSuffix = '' | 'NoIds' | 'Plugins1' | 'App'
