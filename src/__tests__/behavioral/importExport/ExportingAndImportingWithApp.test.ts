import {
    assert,
    errorAssert,
    generateId,
    test,
    suite,
} from '@sprucelabs/test-utils'
import {
    importExportSourceApp,
    importExportSourceApp2,
} from '../../../tests/constants'
import AbstractExportAndImportTest from './AbstractExportAndImportTest'

@suite()
export default class ExportingAndImportingWithAppTest extends AbstractExportAndImportTest {
    @test()
    protected async canExportAndImportApp() {
        await this.importFirstApp()
        this.assertFirstAppRendersAsExpected()
    }

    @test()
    protected async canImportExportDifferentApp() {
        await this.importFirstApp()
        await this.importSecondApp()

        //@ts-ignore
        const app = this.views.App('another-namespace')
        //@ts-ignore
        assert.isEqual(app.render(), 'another-team')

        this.assertFirstAppRendersAsExpected()
    }

    @test()
    protected async throwsNiceErrorIfNoAppForNamespace() {
        const namespace = generateId()
        //@ts-ignore
        const err = assert.doesThrow(() => this.views.App(namespace))
        errorAssert.assertError(err, 'APP_NOT_FOUND', {
            namespace,
        })
    }

    @test()
    protected async usesTheBuildAppBuilderToBuildApp() {
        await this.importFirstApp()
        const app = {}

        //@ts-ignore
        this.views.BuildApp = () => {
            return app
        }

        //@ts-ignore
        const builtApp = this.views.App('namespace')
        assert.isEqual(builtApp, app)
    }

    private async importSecondApp() {
        await this.exportAndThenImport(importExportSourceApp2)
    }

    private async importFirstApp() {
        await this.exportAndThenImport(importExportSourceApp)
    }

    private assertFirstAppRendersAsExpected() {
        //@ts-ignore
        const app = this.views.App('namespace')
        //@ts-ignore
        assert.isEqual(app.render(), 'go-team')
    }
}
