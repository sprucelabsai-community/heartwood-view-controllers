import { CardSection } from '../../types/heartwood.types'

function getSectionIdxFromId(sections: CardSection[], id: string) {
    return sections?.findIndex((s) => s.id === id) ?? -1
}

export default function sectionIdOrIdxToIdx(
    sections: CardSection[] | null | undefined,
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
