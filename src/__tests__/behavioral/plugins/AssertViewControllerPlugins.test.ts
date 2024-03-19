import { test, assert } from '@sprucelabs/test-utils'
import vcPluginAssert from '../../../tests/utilities/vcPluginAssert'
import {
	ViewControllerPlugin,
	ViewControllerPluginConstructor,
} from '../../../types/heartwood.types'
import AbstractPluginTest, { SpyPlugin } from './AbstractPluginTest'

export default class AssertViewControllerPluginsTest extends AbstractPluginTest {
	@test()
	protected static async throwsWhenPluginNotSet() {
		this.assertPluginInstalledThrows()
	}

	@test()
	protected static async passesWhenPluginSet() {
		this.mixinPlugin()
		this.assertPluginInstalled('spy')
	}

	@test()
	protected static async canFindByProperName() {
		this.mixinPlugin('whatever')
		this.assertPluginInstalledThrows()
		this.assertPluginInstalled('whatever')
	}

	@test()
	protected static async canCheckInstanceOf() {
		this.mixinPlugin()
		this.assertPluginInstalledThrows('spy', StubPlugin)
		this.assertPluginInstalled('spy', SpyPlugin)
	}

	@test()
	protected static async returnsThePlugin() {
		this.mixinPlugin()

		const { plugin, vc } = this.assertPluginInstalled()

		assert.isTruthy(plugin)
		//@ts-ignore
		assert.isEqual(plugin, vc.plugins.spy)
	}

	private static assertPluginInstalledThrows(
		name = 'spy',
		Plugin?: ViewControllerPluginConstructor
	) {
		assert.doesThrow(() => this.assertPluginInstalled(name, Plugin))
	}

	private static assertPluginInstalled(
		named: string = 'spy',
		Plugin?: ViewControllerPluginConstructor
	) {
		const vc = this.Vc()
		const plugin = vcPluginAssert.pluginIsInstalled(vc, named, Plugin)
		return { plugin, vc }
	}
}

class StubPlugin implements ViewControllerPlugin {}
