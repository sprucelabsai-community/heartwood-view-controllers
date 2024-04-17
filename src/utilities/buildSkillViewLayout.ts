import { Card, LayoutStyle } from '../types/heartwood.types'

export default function buildSkillViewLayout(
    layout: LayoutStyle,
    cards: SkillViewLayoutCards
) {
    return {
        layout,
        ...cards,
    }
}
export interface SkillViewLayoutCards {
    leftCards?: Card[]
    rightCards?: Card[]
    topCards?: Card[]
    cards?: Card[]
    bottomCards?: Card[]
}
