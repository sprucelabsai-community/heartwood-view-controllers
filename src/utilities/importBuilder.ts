export function buildLocalTypesImport(): string[] {
	return ['import * as HeartwoodTypes from "#spruce/../types/heartwood.types"']
}

export function buildRemoteTypesImport(): string[] {
	return [
		`import * as HeartwoodTypes from '@sprucelabs/heartwood-view-controllers'`,
	]
}
