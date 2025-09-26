import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
const dotenv = require('dotenv')
dotenv.config({ silent: true })

export const DEMO_NUMBER = process.env.DEMO_NUMBER ?? '**MISSING**'
export const DEMO_NUMBER2 = process.env.DEMO_NUMBER2 ?? '**MISSING**'
export const DEMO_NUMBER_ACTIVE_RECORD =
    process.env.DEMO_NUMBER_ACTIVE_RECORD ?? '**MISSING**'

export const importExportCwd = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill'
)

export const importExportSource =
    '.' +
    pathUtil.sep +
    diskUtil.resolvePath('src', '.spruce', 'views', 'views.ts')

export const importExportSourceNoIds = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_no_ids',
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportSourceApp = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_with_app',
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportSourceApp2 = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_with_app_2',
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportDestinationApp = diskUtil.resolvePath(
    diskUtil.createRandomTempDir(),
    'bundle.js'
)

export const importExportDestinationNoIds = diskUtil.resolvePath(
    diskUtil.createRandomTempDir(),
    'bundle.js'
)

export const importExportDestinationWithDefines = diskUtil.resolvePath(
    diskUtil.createRandomTempDir(),
    'bundle.js'
)

export const importExportSourceSyntaxError = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_syntax_error',
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportDestination = diskUtil.resolvePath(
    diskUtil.createRandomTempDir(),
    'bundle.js'
)

export const buildCwdNodeModulesImport = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_import_from_node_module'
)

export const importExportSourceNodeModulesImport = diskUtil.resolvePath(
    buildCwdNodeModulesImport,
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportSourceWithDefines = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_with_defines',
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportSourcePlugins1 = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_with_plugins_1',
    'src',
    '.spruce',
    'views',
    'views.ts'
)

export const importExportSourcePlugins2 = diskUtil.resolvePath(
    __dirname,
    '..',
    '..',
    'src',
    '__tests__',
    'testDirsAndFiles',
    'skill_with_plugins_2',
    'src',
    '.spruce',
    'views',
    'views.ts'
)
