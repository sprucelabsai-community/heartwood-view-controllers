import { ListCell } from './List.vc'

const listUtil = {
	getInputFromCell(cell: ListCell) {
		return (
			cell.textInput ??
			cell.selectInput ??
			cell.toggleInput ??
			cell.ratingsInput ??
			cell.checkboxInput ??
			cell.dateInput
		)
	},
	getElementFromCell(cell: ListCell) {
		return this.getInputFromCell(cell) ?? cell.button
	},
}

export default listUtil
