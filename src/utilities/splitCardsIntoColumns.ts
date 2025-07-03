import { Card, LayoutColumn } from '../types/heartwood.types'

export default function splitCardsIntoColumns(
    cardModels: Card[],
    totalColumns: number
) {
    if (totalColumns < 1 || totalColumns > 3) {
        throw new Error('Splitting cards into columns requires 1-3 columns.')
    }

    const columns: LayoutColumn[] = []
    for (let i = totalColumns; i > 0; i--) {
        const models = cardModels.splice(0, Math.ceil(cardModels.length / i))
        if (models.length > 0) {
            columns.push([...models])
        }
    }

    return columns
}
