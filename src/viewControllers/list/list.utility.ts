import { ListCellModel } from './ListCell.vc'

const listUtil = {
	getInputFromCell(cell: ListCellModel) {
		return (
			cell.textInput ??
			cell.selectInput ??
			cell.toggleInput ??
			cell.ratingsInput ??
			cell.checkboxInput
		)
	},
	getElementFromCell(cell: ListCellModel) {
		return this.getInputFromCell(cell) ?? cell.button
	},
}

export default listUtil
