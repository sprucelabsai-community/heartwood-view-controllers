import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ListRow, getInputFromCell, ListCell } from './List.vc'

export class RowViewController {
	private model: ListRow
	private setValueHandler: (name: string, value: any) => void
	private getValuesHandler: () => Record<string, any>

	public constructor(
		options: ListRow & {
			setValueHandler: (name: string, value: any) => void
			getValuesHandler: () => Record<string, any>
		}
	) {
		const { setValueHandler, getValuesHandler, ...model } = options

		this.model = model

		this.setValueHandler = setValueHandler
		this.getValuesHandler = getValuesHandler

		for (const cell of this.model.cells) {
			const input = getInputFromCell(cell)
			if (input?.value) {
				this.setValue(input.name, input.value)
			}
		}
	}

	public setValue(name: string, value: any) {
		return this.setValueHandler(name, value)
	}
	public getValues(): Record<string, any> {
		return this.getValuesHandler()
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.ListRow {
		return {
			...this.model,
			cells: this.model.cells.map((cell) => this.renderCell(cell)),
		}
	}

	private renderCell(
		cell: ListCell
	): SpruceSchemas.Heartwood.v2021_02_11.ListCell {
		const { textInput, selectInput, ...rest } = cell

		const listCell: SpruceSchemas.Heartwood.v2021_02_11.ListCell = {
			...rest,
		}

		if (textInput) {
			listCell.textInput = {
				...textInput,
				setValue: this.setValue.bind(this),
			}
		}

		if (selectInput) {
			listCell.selectInput = {
				...selectInput,
				setValue: this.setValue.bind(this),
			}
		}

		return listCell
	}
}
