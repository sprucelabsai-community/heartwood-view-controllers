import pathUtil from 'path'
import { diskUtil, HASH_SPRUCE_DIR } from '@sprucelabs/spruce-skill-utils'
import AbstractSpruceTest, { test, assert } from '@sprucelabs/test'
import globby from 'globby'

export default class ExportingAllSchemasTest extends AbstractSpruceTest {
	@test()
	protected static async exportsAllSchemas() {
		const builderPattern = this.resolvePath(
			HASH_SPRUCE_DIR,
			'schemas',
			'**/*.schema.ts'
		)
		const schemas = await globby(builderPattern)

		const indexContents = diskUtil.readFile(this.resolvePath('src', 'index.ts'))
		const missingImports: string[] = []
		for (const schema of schemas) {
			const builderFileName = pathUtil.basename(schema)
			const schemaFileName = builderFileName.replace('.schema.ts', '.schema')
			const schemaName = builderFileName.replace('.schema.ts', 'Schema')

			const importStatement =
				`export { default as ${schemaName} } from '#spruce` +
				`/schemas/heartwoodViewControllers/v2021_02_11/${schemaFileName}'`

			if (!indexContents.includes(importStatement)) {
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
