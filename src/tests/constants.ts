import pathUtil from 'path'
import { diskUtil } from '@sprucelabs/spruce-skill-utils'
const dotenv = require('dotenv')
dotenv.config()

export const DEMO_NUMBER = process.env.DEMO_NUMBER ?? '**MISSING**'
export const DEMO_NUMBER2 = process.env.DEMO_NUMBER2 ?? '**MISSING**'

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
