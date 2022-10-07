import { ListCell } from '../../types/heartwood.types'

const inputFields = [
	'textInput',
	'selectInput',
	'toggleInput',
	'ratingsInput',
	'checkboxInput',
	'dateInput',
] as const

const listUtil = {
	getInputFromCell(cell: ListCell, name?: string) {
		return cell[
			inputFields.find((n) => !!cell[n] && (!name || cell[n]?.name === name))!
		]
	},
}

export default listUtil
