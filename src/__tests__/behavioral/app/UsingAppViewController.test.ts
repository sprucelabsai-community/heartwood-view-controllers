import { buildLog, Log } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
    AppViewControllerLoadOptions,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import AbstractAppViewController from '../../../viewControllers/Abstract.avc'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'

export default class UsingAppViewControllerTest extends AbstractViewControllerTest {
    private static spyFactory: SpyViewFactory
    protected static async beforeEach(): Promise<void> {
        await super.beforeEach()
        ViewControllerFactory.Class = SpyViewFactory
        this.spyFactory = this.getFactory() as SpyViewFactory
    }

    @test()
    protected static async canBuildApp() {
        const app = this.App()
        assert.isInstanceOf(app, SpyApp)
    }

    @test()
    protected static async constructsAppWithExpectedOptions() {
        this.spyFactory.log = buildLog('test')
        const app = this.App()
        const expected = this.spyFactory.getExpectedConstructorOptions()
        assert.isEqualDeep(app.constructorOptions, expected)
    }

    private static App() {
        return this.spyFactory.BuildApp(SpyApp)
    }
}

class SpyApp extends AbstractAppViewController {
    public constructorOptions: ViewControllerOptions
    public constructor(options: ViewControllerOptions) {
        super(options)
        this.constructorOptions = options
    }

    public async load(_options: AppViewControllerLoadOptions) {}
}

class SpyViewFactory extends ViewControllerFactory {
    public log?: Log
    public getExpectedConstructorOptions() {
        return this.buildViewContructorOptions('app')
    }
}
