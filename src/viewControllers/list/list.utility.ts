import { ListCell } from './List.vc'

const listUtil = {
	getInputFromCell(cell: ListCell) {
		return cell.textInput ?? cell.selectInput
	},
	getElementFromCell(cell: ListCell) {
		return this.getInputFromCell(cell) ?? cell.button
	},
}

export default listUtil
