import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import {
    Card,
    ViewControllerOptions,
    ViewControllerPlugin,
    ViewControllerPluginOptions,
    ViewControllerPlugins,
} from '../../../types/heartwood.types'
import AbstractViewController from '../../../viewControllers/Abstract.vc'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'

export default class AbstractPluginTest extends AbstractViewControllerTest {
    protected views!: ViewControllerFactory
    protected expectedPlugins: ViewControllerPlugins = {}

    protected async beforeEach() {
        await super.beforeEach()

        this.expectedPlugins = {}

        this.views = this.getFactory()
        this.views.setController('card', PluginTestViewController)
    }

    protected mixinPlugin(name = 'spy') {
        this.views.importControllers([], {
            [name]: SpyPlugin,
        })
    }

    protected Vc() {
        return this.views.Controller(
            'card',
            {}
        ) as unknown as PluginTestViewController
    }
}

export class PluginTestViewController extends AbstractViewController<Card> {
    public static constructorOptions?: ViewControllerOptions

    public constructor(options: ViewControllerOptions) {
        super(options)
        PluginTestViewController.constructorOptions = options
    }

    public getPlugins() {
        return this.plugins
    }

    public render(): Card {
        return {}
    }
}

export class SpyPlugin implements ViewControllerPlugin {
    public static constructorOptions?: ViewControllerPluginOptions

    public constructor(options: ViewControllerPluginOptions) {
        SpyPlugin.constructorOptions = options
    }
}
