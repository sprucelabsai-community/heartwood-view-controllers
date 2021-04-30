import { diskUtil } from '@sprucelabs/spruce-skill-utils'
const dotenv = require('dotenv')
dotenv.config()

export const DEMO_NUMBER = process.env.DEMO_NUMBER ?? '**MISSING**'

export const importExportSource = diskUtil.resolvePath(
	__dirname,
	'..',
	'..',
	'src',
	'__tests__',
	'testDirsAndFiles',
	'skill',
	'src',
	'.spruce',
	'views',
	'views.ts'
)

export const importExportDestination = diskUtil.resolvePath(
	diskUtil.createRandomTempDir(),
	'bundle.js'
)

export const importExportSource_noIds = diskUtil.resolvePath(
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

export const importExportDestination_noIds = diskUtil.resolvePath(
	diskUtil.createRandomTempDir(),
	'bundle.js'
)

export const importExportSource_syntaxError = diskUtil.resolvePath(
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
