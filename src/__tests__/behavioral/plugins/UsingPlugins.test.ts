import { buildLog } from '@sprucelabs/spruce-skill-utils'
import { test, suite, assert } from '@sprucelabs/test-utils'
import {
    ViewControllerPlugin,
    ViewControllerPluginOptions,
    ViewControllerPluginsByName,
} from '../../../types/heartwood.types'
import ViewControllerFactory from '../../../viewControllers/ViewControllerFactory'
import AbstractPluginTest, {
    PluginTestViewController,
    SpyPlugin,
} from './AbstractPluginTest'

export class SpyPlugin2 implements ViewControllerPlugin {}

@suite()
export default class UsingPluginsTest extends AbstractPluginTest {
    @test()
    protected async canAddPluginToFactory() {
        this.addPlugin('test', {
            hello: 'world',
        })
    }

    @test()
    protected async pluginIsAvailableInTheViewController() {
        this.addPluginAndAssertSetOnNewVc('test', {
            what: 'the!?',
        })

        this.addPluginAndAssertSetOnNewVc('test2', {
            what: 'the!?',
            hey: 'there',
        })
    }

    @test()
    protected pluginGetsExpectedConstructorOptions() {
        //@ts-ignore
        this.views.log = buildLog('test')

        this.mixinPlugin()

        this.Vc()

        const expectedOptions: ViewControllerPluginOptions = {
            connectToApi:
                PluginTestViewController.constructorOptions!.connectToApi,
            device: PluginTestViewController.constructorOptions!.device,
            dates: PluginTestViewController.constructorOptions!.dates,
            log: PluginTestViewController.constructorOptions!.log,
            maps: PluginTestViewController.constructorOptions!.maps,
            plugins: PluginTestViewController.constructorOptions!.plugins,
        }

        assert.isEqualDeep(SpyPlugin.constructorOptions, expectedOptions)
    }

    @test(
        'can pass plugins to factory constructor 1',
        {
            hey: SpyPlugin,
        },
        'hey',
        SpyPlugin
    )
    @test(
        'can pass plugins to factory constructor 2',
        {
            hey: SpyPlugin2,
        },
        'hey',
        SpyPlugin2
    )
    @test(
        'can pass plugins to factory constructor 3',
        {
            there: SpyPlugin,
            hey: SpyPlugin2,
        },
        'hey',
        SpyPlugin2
    )
    @test(
        'can pass plugins to factory constructor 4',
        {
            there: SpyPlugin,
            hey: SpyPlugin2,
        },
        'there',
        SpyPlugin
    )
    protected async canPassPluginsToFactoryConstructor(
        pluginsByName: ViewControllerPluginsByName,
        key: string,
        Expected: any
    ) {
        ViewControllerFactory.Class = SpyViewControllerFactory

        const views = this.Factory({
            pluginsByName,
        }) as SpyViewControllerFactory

        //@ts-ignore
        assert.isInstanceOf(views.getPlugins()[key], Expected)
    }

    private addPluginAndAssertSetOnNewVc(name: string, plugin: any) {
        this.addPlugin(name, plugin)
        //@ts-ignore
        this.expectedPlugins[name] = plugin

        const vc = this.Vc()
        assert.isEqualDeep(vc.getPlugins(), this.expectedPlugins)
    }

    private addPlugin(name: string, plugin: any) {
        this.views.addPlugin(name, plugin)
    }
}

class SpyViewControllerFactory extends ViewControllerFactory {
    public getPlugins() {
        return this.plugins
    }
}
