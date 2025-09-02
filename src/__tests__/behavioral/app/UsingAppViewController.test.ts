import { buildLog, Log } from '@sprucelabs/spruce-skill-utils'
import {
    test,
    suite,
    assert,
    generateId,
    errorAssert,
} from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import navigationAssert from '../../../tests/utilities/navigationAssert'
import {
    ToastHandler,
    ToastMessage,
    ViewControllerOptions,
    ViewControllerPlugins,
} from '../../../types/heartwood.types'
import AbstractAppController from '../../../viewControllers/Abstract.ac'
import CardViewController, {
    CardViewControllerOptions,
} from '../../../viewControllers/card/Card.vc'
import NavigationViewController from '../../../viewControllers/navigation/Navigation.vc'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'

@suite()
export default class UsingAppControllerTest extends AbstractViewControllerTest {
    private spyFactory!: SpyViewFactory
    private app!: SpyApp

    protected async beforeEach(): Promise<void> {
        await super.beforeEach()
        ViewControllerFactory.Class = SpyViewFactory
        this.spyFactory = this.getFactory() as SpyViewFactory
        this.app = this.App()
    }

    @test()
    protected async canBuildApp() {
        const app = this.App()
        assert.isInstanceOf(app, SpyApp)
    }

    @test()
    protected async constructsAppWithExpectedOptions() {
        this.spyFactory.log = buildLog('test')
        const app = this.App()
        const expected = this.spyFactory.getExpectedConstructorOptions()
        assert.isEqualDeep(app.constructorOptions, expected)
    }

    @test()
    protected async knowsIfHasApp() {
        assert.isFalse(this.hasApp(generateId()))

        SpyApp.id = generateId()
        this.spyFactory.setAppController(SpyApp)

        assert.isTrue(this.hasApp(SpyApp.id))
        assert.isFalse(this.hasApp(generateId()))
    }

    @test()
    protected async havingAnIdProperyOnAppThrows() {
        HasIdApp.id = generateId()
        this.spyFactory.setAppController(HasIdApp)
        //@ts-ignore
        const err = assert.doesThrow(() => this.spyFactory.App(HasIdApp.id))
        errorAssert.assertError(err, 'INVALID_APP_CONTROLLER', {
            id: HasIdApp.id,
        })
    }

    @test()
    protected async attachesIdToAppInstance() {
        SpyApp.id = generateId()
        this.spyFactory.setAppController(SpyApp)
        //@ts-ignore
        const app = this.spyFactory.App(SpyApp.id)
        //@ts-ignore
        assert.isEqual(app.id, SpyApp.id)
    }

    @test()
    protected async setsLocalProps() {
        this.spyFactory.plugins = {}
        const app = this.App()

        //@ts-ignore
        assert.isEqual(app.plugins, this.spyFactory.plugins)
    }

    @test()
    protected async toastSentToToastHandler() {
        let passedOptions: ToastMessage | undefined
        this.spyFactory.toastHandler = (options) => {
            passedOptions = options
        }
        const app = this.App()
        const expected = {
            message: generateId(),
        }
        app.toast(expected)
        assert.isEqual(
            passedOptions,
            expected,
            'Toast options not passed to handler'
        )
    }

    @test()
    protected async canRenderNavigation() {
        const app = this.App()
        navigationAssert.appRendersNavigation(app)
        assert.doesThrow(() => navigationAssert.appDoesNotRenderNavigation(app))
    }

    @test()
    protected async canAssertDoesNotRenderNavigation() {
        this.app.disableNavigation()
        navigationAssert.appDoesNotRenderNavigation(this.app)
        assert.doesThrow(() => navigationAssert.appRendersNavigation(this.app))
    }

    @test()
    protected async canGetOtherViewsFromApp() {
        const options: CardViewControllerOptions = {
            header: {
                title: generateId(),
            },
        }
        const card = this.app.Controller('card', options)
        assert.isTrue(card instanceof CardViewController)
        assert.doesInclude(this.render(card).header, options.header)
    }

    @test()
    protected async canConnectToApi() {
        assert.isEqual(
            this.app.getConnectToApi(),
            this.spyFactory.getConnectToApi()
        )
    }

    private hasApp(id: string): boolean | null | undefined {
        return this.spyFactory.hasApp(id)
    }

    protected App() {
        return this.spyFactory.BuildApp(SpyApp)
    }
}

class SpyApp extends AbstractAppController {
    public constructorOptions!: ViewControllerOptions
    private nav?: NavigationViewController

    public constructor(options: ViewControllerOptions) {
        super(options)
        this.constructorOptions = options
        this.nav = this.Controller('navigation', {})
    }

    public disableNavigation() {
        delete this.nav
    }

    public toast(options: ToastMessage) {
        super.toast(options)
    }

    public renderNavigation() {
        return this.nav?.render() ?? null
    }

    public getConnectToApi() {
        return this.connectToApi
    }
}

class SpyViewFactory extends ViewControllerFactory {
    public log?: Log
    public plugins: ViewControllerPlugins = {}
    public toastHandler!: ToastHandler

    public getExpectedConstructorOptions() {
        return this.buildViewContructorOptions('app')
    }
    public getConnectToApi() {
        return this.connectToApi
    }
}

class HasIdApp extends AbstractAppController {
    public id = generateId()
}

declare module '../../../types/heartwood.types' {
    interface AppControllerMap {
        test: SpyApp
    }
}
