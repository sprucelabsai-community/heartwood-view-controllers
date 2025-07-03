import { Card, LayoutStyle, SkillViewLayout } from '../types/heartwood.types'

export default function buildSkillViewLayout<Style extends LayoutStyle>(
    style: Style,
    cards: SkillViewLayoutMap[Style]
): SkillViewLayout {
    return {
        style,
        ...cards,
    }
}

interface WithHeaderCard {
    headerCard?: Card
}

export interface SkillViewLayoutMap {
    ['one-col']: ColumnBasedLayout
    ['two-col']: ColumnBasedLayout
    ['three-col']: ColumnBasedLayout
    ['big-left']: BigLeftLayout
    ['big-right']: BigRightLayout
    ['big-top']: BigTopLayout
    ['big-top-left']: BigTopLeftLayout
    ['grid']: GridLayout
}

export interface SkillViewLayoutCards {
    leftCards?: Card[]
    rightCards?: Card[]
    topCards?: Card[]
    cards?: Card[]
    bottomCards?: Card[]
}

export interface ColumnBasedLayout extends WithHeaderCard {
    cards: Card[]
}

export interface BigLeftLayout extends WithHeaderCard {
    leftCards: Card[]
    rightCards?: Card[]
}

export interface BigRightLayout extends WithHeaderCard {
    leftCards?: Card[]
    rightCards: Card[]
}

export interface BigTopLayout extends WithHeaderCard {
    topCards: Card[]
    bottomCards?: Card[]
}

export interface BigTopLeftLayout extends WithHeaderCard {
    leftCards: Card[]
    rightCards?: Card[]
    bottomCards?: Card[]
}

export interface GridLayout extends WithHeaderCard {
    cards: Card[]
}
