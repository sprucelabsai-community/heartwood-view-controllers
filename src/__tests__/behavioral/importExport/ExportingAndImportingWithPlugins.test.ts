import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import {
    importExportSourcePlugins1,
    importExportSourcePlugins2,
} from '../../../tests/constants'
import AbstractExportAndImportTest from './AbstractExportAndImportTest'

@suite()
export default class ExportingAndImportingWithPluginsTest extends AbstractExportAndImportTest {
    protected async beforeEach() {
        await super.beforeEach()

        process.env.PLUGIN_1_VALUE = generateId()
        process.env.PLUGIN_2_VALUE = generateId()
        process.env.PLUGIN_3_VALUE = generateId()
    }

    @test()
    protected async canExportAndImportPlugins1() {
        await this.exportAndThenImport(importExportSourcePlugins1)

        const pluginsFromVc = this.getPluginsFrom()

        assert.isTruthy(pluginsFromVc.plugin1, 'Plugin1 not found on vc.')

        const value = pluginsFromVc.plugin1.getValue()

        assert.isEqual(value, process.env.PLUGIN_1_VALUE)
    }

    @test()
    protected async canExportAndImportPlugins2() {
        await this.exportAndThenImport(importExportSourcePlugins2)
        const pluginsFromVc = this.getPluginsFrom('reserve-card')

        assert.isFalsy(pluginsFromVc.plugin1, 'Plugin1 found on vc.')
        assert.isEqual(
            pluginsFromVc.plugin2.getValue(),
            process.env.PLUGIN_2_VALUE
        )
        assert.isEqual(
            pluginsFromVc.plugin3.getValue(),
            process.env.PLUGIN_3_VALUE
        )
    }

    private getPluginsFrom(id: any = 'reserve') {
        const vc = this.views.Controller(id, {})
        const pluginsFromVc = vc.getPlugins()
        return pluginsFromVc
    }
}
