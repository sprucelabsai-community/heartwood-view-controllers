import { test, assert } from '@sprucelabs/test-utils'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { Card, ViewControllerPlugins } from '../../../types/heartwood.types'
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
	public getPlugins() {
		return this.plugins
	}

	public render(): Card {
		return {}
	}
}
