import { test, suite, assert } from '@sprucelabs/test-utils'
import vcPluginAssert from '../../../tests/utilities/vcPluginAssert'
import {
    ViewControllerPlugin,
    ViewControllerPluginConstructor,
} from '../../../types/heartwood.types'
import AbstractPluginTest, { SpyPlugin } from './AbstractPluginTest'

@suite()
export default class AssertViewControllerPluginsTest extends AbstractPluginTest {
    @test()
    protected async throwsWhenPluginNotSet() {
        this.assertPluginInstalledThrows()
    }

    @test()
    protected async passesWhenPluginSet() {
        this.mixinPlugin()
        this.assertPluginInstalled('spy')
    }

    @test()
    protected async canFindByProperName() {
        this.mixinPlugin('whatever')
        this.assertPluginInstalledThrows()
        this.assertPluginInstalled('whatever')
    }

    @test()
    protected async canCheckInstanceOf() {
        this.mixinPlugin()
        this.assertPluginInstalledThrows('spy', StubPlugin)
        this.assertPluginInstalled('spy', SpyPlugin)
    }

    @test()
    protected async returnsThePlugin() {
        this.mixinPlugin()

        const { plugin, vc } = this.assertPluginInstalled()

        assert.isTruthy(plugin)
        //@ts-ignore
        assert.isEqual(plugin, vc.plugins.spy)
    }

    private assertPluginInstalledThrows(
        name = 'spy',
        Plugin?: ViewControllerPluginConstructor
    ) {
        assert.doesThrow(() => this.assertPluginInstalled(name, Plugin))
    }

    private assertPluginInstalled(
        named = 'spy',
        Plugin?: ViewControllerPluginConstructor
    ) {
        const vc = this.Vc()
        const plugin = vcPluginAssert.pluginIsInstalled(vc, named, Plugin)
        return { plugin, vc }
    }
}

class StubPlugin implements ViewControllerPlugin {}
