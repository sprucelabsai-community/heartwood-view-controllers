import { ListCellModel } from './ListCell.vc'

const listUtil = {
	getInputFromCell(cell: ListCellModel) {
		return cell.textInput ?? cell.selectInput ?? cell.toggleInput
	},
	getElementFromCell(cell: ListCellModel) {
		return this.getInputFromCell(cell) ?? cell.button
	},
}

export default listUtil
