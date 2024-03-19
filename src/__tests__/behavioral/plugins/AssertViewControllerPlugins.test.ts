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
		this.mixinSpy()
		this.assertPluginInstalled('spy')
	}

	@test()
	protected static async canFindByProperName() {
		this.mixinSpy('whatever')
		this.assertPluginInstalledThrows()
		this.assertPluginInstalled('whatever')
	}

	@test()
	protected static async canCheckInstanceOf() {
		this.mixinSpy()
		this.assertPluginInstalledThrows('spy', StubPlugin)
		this.assertPluginInstalled('spy', SpyPlugin)
	}

	private static assertPluginInstalledThrows(
		name = 'spy',
		Plugin?: ViewControllerPluginConstructor
	) {
		assert.doesThrow(() => this.assertPluginInstalled(name, Plugin))
	}

	private static assertPluginInstalled(
		named: string,
		Plugin?: ViewControllerPluginConstructor
	): any {
		return vcPluginAssert.pluginIsInstalled(this.Vc(), named, Plugin)
	}
}

class StubPlugin implements ViewControllerPlugin {}
