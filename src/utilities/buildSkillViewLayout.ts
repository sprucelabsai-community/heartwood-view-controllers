import { LayoutStyle } from '..'
import { Card } from '../__tests__/behavioral/SplittingCardsIntoLayouts.test'

export default function buildSkillViewLayout(
	layout: LayoutStyle,
	cards: SkillViewLayoutCards
) {
	return {
		layout,
		...cards,
	}
}
interface SkillViewLayoutCards {
	leftCards: Card[]
	rightCards: Card[]
	topCards: Card[]
	bottomCards: Card[]
	topLeftCards: Card[]
}
