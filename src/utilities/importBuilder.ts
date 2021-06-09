export function buildLocalTypesImport(): string[] {
	return [`import * as HeartwoodTypes from '../../'`]
}

export function buildRemoteTypesImport(): string[] {
	return [
		`import * as HeartwoodTypes from '@sprucelabs/heartwood-view-controllers'`,
	]
}
