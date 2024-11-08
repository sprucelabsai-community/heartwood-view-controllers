import { test } from '@sprucelabs/test-utils'
import { importExportSourceApp } from '../../../tests/constants'
import AbstractExportAndImportTest from './AbstractExportAndImportTest'

export default class ExportingAndImportingWithAppTest extends AbstractExportAndImportTest {
    @test.skip('return to this ASAP')
    protected static async canExportAndImportApp() {
        await this.exportAndThenImport(importExportSourceApp)
    }
}
