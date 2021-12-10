import { SpruceSchemas } from '..'

type Card = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
type Layout = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Layout

export default function splitCardsIntoLayouts(
	cardModels: Card[],
	totalLayouts: number
) {
	if (totalLayouts < 1 || totalLayouts > 3) {
		throw new Error('Splitting cards into layouts requires 1-3 layouts.')
	}

	let layouts: Layout[] = []
	for (let i = totalLayouts; i > 0; i--) {
		const models = cardModels.splice(0, Math.ceil(cardModels.length / i))
		if (models.length > 0) {
			layouts.push({
				cards: [...models],
			})
		}
	}

	return layouts
}
