import { test, assert } from '@sprucelabs/test-utils'
import { importExportSourceApp } from '../../../tests/constants'
import AbstractExportAndImportTest from './AbstractExportAndImportTest'

export default class ExportingAndImportingWithAppTest extends AbstractExportAndImportTest {
    @test()
    protected static async canExportAndImportApp() {
        await this.exportAndThenImport(importExportSourceApp)
    }
}
