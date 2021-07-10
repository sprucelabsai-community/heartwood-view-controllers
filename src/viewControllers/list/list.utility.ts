import { ListCellModel } from './ListCell.vc'

const listUtil = {
	getInputFromCell(cell: ListCellModel) {
		return cell.textInput ?? cell.selectInput
	},
	getElementFromCell(cell: ListCellModel) {
		return this.getInputFromCell(cell) ?? cell.button
	},
}

export default listUtil
