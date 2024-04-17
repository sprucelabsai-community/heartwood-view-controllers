import { buildEsLintConfig } from 'eslint-config-spruce'

export default buildEsLintConfig({
    ignores: [
        'node_modules/**',
        'build/**',
        'esm/**',
        '**/testDirsAndFiles/**',
    ]
})
