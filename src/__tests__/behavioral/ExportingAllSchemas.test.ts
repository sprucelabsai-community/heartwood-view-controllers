import pathUtil from 'path'
import globby from '@sprucelabs/globby'
import { diskUtil, HASH_SPRUCE_BUILD_DIR } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, suite, assert } from '@sprucelabs/test-utils'

@suite()
export default class ExportingAllSchemasTest extends AbstractSpruceTest {
    @test()
    protected async exportsAllSchemas() {
        const builderPattern = this.resolvePath(
            HASH_SPRUCE_BUILD_DIR,
            'schemas',
            '**/*.schema.js'
        )
        const schemas = await globby(builderPattern)

        const indexContents = diskUtil.readFile(
            this.resolvePath('src', 'index.ts')
        )
        const missingImports: string[] = []

        for (const schema of schemas) {
            const builderFileName = pathUtil.basename(schema)
            const schemaFileName = builderFileName.replace(
                '.schema.js',
                '.schema'
            )
            const schemaName = builderFileName.replace('.schema.js', 'Schema')

            const imported = require(schema).default

            const importStatement =
                `export { default as ${schemaName} } from '#spruce` +
                `/schemas/heartwoodViewControllers/v2021_02_11/${schemaFileName}'`

            if (
                imported.namespace === 'HeartwoodViewControllers' &&
                !indexContents.includes(importStatement)
            ) {
                missingImports.push(importStatement)
            }
        }
        assert.isLength(
            missingImports,
            0,
            `Please add the following to src/index.ts:\n\n${missingImports.join(
                '\n'
            )}`
        )
    }
}
