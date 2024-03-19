import { buildLog } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test-utils'
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

export default class UsingPluginsTest extends AbstractViewControllerTest {
	protected static views: ViewControllerFactory
	private static expectedPlugins: ViewControllerPlugins = {}

	protected static async beforeEach() {
		await super.beforeEach()

		this.expectedPlugins = {}

		this.views = this.getFactory()
		this.views.setController('card', PluginTestViewController)
	}

	@test()
	protected static async canAddPluginToFactory() {
		this.addPlugin('test', {
			hello: 'world',
		})
	}

	@test()
	protected static async pluginIsAvailableInTheViewController() {
		this.addPluginAndAssertSetOnNewVc('test', {
			what: 'the!?',
		})

		this.addPluginAndAssertSetOnNewVc('test2', {
			what: 'the!?',
			hey: 'there',
		})
	}

	@test()
	protected static pluginGetsExpectedConstructorOptions() {
		//@ts-ignore
		this.views.log = buildLog('test')

		this.views.importControllers([], {
			spy: SpyPlugin,
		})

		this.Vc()

		const expectedOptions: ViewControllerPluginOptions = {
			connectToApi: PluginTestViewController.constructorOptions!.connectToApi,
			device: PluginTestViewController.constructorOptions!.device,
			dates: PluginTestViewController.constructorOptions!.dates,
			log: PluginTestViewController.constructorOptions!.log,
			maps: PluginTestViewController.constructorOptions!.maps,
			plugins: PluginTestViewController.constructorOptions!.plugins,
		}

		assert.isEqualDeep(SpyPlugin.constructorOptions, expectedOptions)
	}

	private static addPluginAndAssertSetOnNewVc(name: string, plugin: any) {
		this.addPlugin(name, plugin)
		//@ts-ignore
		this.expectedPlugins[name] = plugin

		const vc = this.Vc()
		assert.isEqualDeep(vc.getPlugins(), this.expectedPlugins)
	}

	private static Vc() {
		return this.views.Controller(
			'card',
			{}
		) as unknown as PluginTestViewController
	}

	private static addPlugin(name: string, plugin: any) {
		this.views.addPlugin(name, plugin)
	}
}

class PluginTestViewController extends AbstractViewController<Card> {
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

class SpyPlugin implements ViewControllerPlugin {
	public static constructorOptions?: ViewControllerPluginOptions

	public constructor(options: ViewControllerPluginOptions) {
		SpyPlugin.constructorOptions = options
	}
}
