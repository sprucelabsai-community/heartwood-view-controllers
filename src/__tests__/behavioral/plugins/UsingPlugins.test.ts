import { buildLog } from '@sprucelabs/spruce-skill-utils'
import { test, assert } from '@sprucelabs/test-utils'
import { ViewControllerPluginOptions } from '../../../types/heartwood.types'
import AbstractPluginTest, {
	PluginTestViewController,
	SpyPlugin,
} from './AbstractPluginTest'

export default class UsingPluginsTest extends AbstractPluginTest {
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

		this.mixinPlugin()

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

	private static addPlugin(name: string, plugin: any) {
		this.views.addPlugin(name, plugin)
	}
}
