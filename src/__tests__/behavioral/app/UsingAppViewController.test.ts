import { buildLog, Log } from '@sprucelabs/spruce-skill-utils'
import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
    AppControllerLoadOptions,
    ViewControllerOptions,
} from '../../../types/heartwood.types'
import AbstractAppController from '../../../viewControllers/Abstract.ac'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'

export default class UsingAppControllerTest extends AbstractViewControllerTest {
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

    @test()
    protected static async knowsIfHasApp() {
        assert.isFalse(this.hasApp(generateId()))

        SpyApp.id = generateId()
        this.spyFactory.importControllers([], undefined, SpyApp)

        assert.isTrue(this.hasApp(SpyApp.id))
        assert.isFalse(this.hasApp(generateId()))
    }

    @test()
    protected static async havingAnIdProperyOnAppThrows() {
        HasIdApp.id = generateId()
        this.spyFactory.importControllers([], undefined, HasIdApp)
        const err = assert.doesThrow(() => this.spyFactory.App(HasIdApp.id))
        errorAssert.assertError(err, 'INVALID_APP_CONTROLLER', {
            id: HasIdApp.id,
        })
    }

    @test()
    protected static async attachesIdToAppInstance() {
        SpyApp.id = generateId()
        this.spyFactory.importControllers([], undefined, SpyApp)
        const app = this.spyFactory.App(SpyApp.id)
        assert.isEqual(app.id, SpyApp.id)
    }

    private static hasApp(id: string): boolean | null | undefined {
        return this.spyFactory.hasApp(id)
    }

    private static App() {
        return this.spyFactory.BuildApp(SpyApp)
    }
}

class SpyApp extends AbstractAppController {
    public constructorOptions: ViewControllerOptions
    public constructor(options: ViewControllerOptions) {
        super(options)
        this.constructorOptions = options
    }

    public async load(_options: AppControllerLoadOptions) {}
}

class SpyViewFactory extends ViewControllerFactory {
    public log?: Log
    public getExpectedConstructorOptions() {
        return this.buildViewContructorOptions('app')
    }
}

class HasIdApp extends AbstractAppController {
    public id = generateId()
}
