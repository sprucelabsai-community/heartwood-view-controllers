import { assert, errorAssert, generateId, test } from '@sprucelabs/test-utils'
import {
    importExportSourceApp,
    importExportSourceApp2,
} from '../../../tests/constants'
import AbstractExportAndImportTest from './AbstractExportAndImportTest'

export default class ExportingAndImportingWithAppTest extends AbstractExportAndImportTest {
    @test()
    protected static async canExportAndImportApp() {
        await this.importFirstApp()
        this.assertFirstAppRendersAsExpected()
    }

    @test()
    protected static async canImportExportDifferentApp() {
        await this.importFirstApp()
        await this.importSecondApp()

        const app = this.views.App('another-namespace')
        //@ts-ignore
        assert.isEqual(app.render(), 'another-team')

        this.assertFirstAppRendersAsExpected()
    }

    @test()
    protected static async throwsNiceErrorIfNoAppForNamespace() {
        const namespace = generateId()
        const err = assert.doesThrow(() => this.views.App(namespace))
        errorAssert.assertError(err, 'APP_NOT_FOUND', {
            namespace,
        })
    }

    @test()
    protected static async usesTheBuildAppBuilderToBuildApp() {
        await this.importFirstApp()
        const app = {}

        //@ts-ignore
        this.views.BuildApp = () => {
            return app
        }

        const builtApp = this.views.App('namespace')
        assert.isEqual(builtApp, app)
    }

    private static async importSecondApp() {
        await this.exportAndThenImport(importExportSourceApp2)
    }

    private static async importFirstApp() {
        await this.exportAndThenImport(importExportSourceApp)
    }

    private static assertFirstAppRendersAsExpected() {
        const app = this.views.App('namespace')
        //@ts-ignore
        assert.isEqual(app.render(), 'go-team')
    }
}
