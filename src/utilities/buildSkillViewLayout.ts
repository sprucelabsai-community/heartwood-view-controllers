import { Card, LayoutStyle } from '../types/heartwood.types'

export default function buildSkillViewLayout<L extends LayoutStyle>(
    layout: L,
    cards: SkillViewLayoutMap[L]
) {
    return {
        layout,
        ...cards,
    }
}

export interface SkillViewLayoutMap {
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

export interface BigLeftLayout {
    leftCards: Card[]
    rightCards?: Card[]
}

export interface BigRightLayout {
    leftCards?: Card[]
    rightCards: Card[]
}

export interface BigTopLayout {
    topCards: Card[]
    bottomCards?: Card[]
}

export interface BigTopLeftLayout {
    leftCards: Card[]
    rightCards?: Card[]
    bottomCards?: Card[]
}

export interface GridLayout {
    cards: Card[]
}
