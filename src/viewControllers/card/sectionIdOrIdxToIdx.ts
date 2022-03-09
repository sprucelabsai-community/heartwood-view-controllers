import { SpruceSchemas } from '#spruce/schemas/schemas.types'

function getSectionIdxFromId(
	sections: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection[],
	id: string
) {
	return sections?.findIndex((s) => s.id === id) ?? -1
}

export default function sectionIdOrIdxToIdx(
	sections:
		| SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection[]
		| null
		| undefined,
	idOrIdx: string | number
) {
	let idx: number
	if (typeof idOrIdx === 'string') {
		idx = getSectionIdxFromId(sections ?? [], idOrIdx)
	} else {
		idx = idOrIdx
	}
	return idx
}
