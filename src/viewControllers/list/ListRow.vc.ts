import { SpruceError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ViewController } from '../../types/heartwood.types'
import { ListRow, ListCell } from './List.vc'

export default class ListRowViewController
	implements ViewController<SpruceSchemas.Heartwood.v2021_02_11.ListRow>
{
	private model: ListRow
	private setValueHandler: (name: string, value: any) => void | Promise<void>
	private getValuesHandler: () => Record<string, any>
	private deleteRowHandler: () => void

	public constructor(
		options: ListRow & {
			setValue: (name: string, value: any) => void | Promise<void>
			getValues: () => Record<string, any>
			deleteRow: () => void
		}
	) {
		const { setValue, getValues, deleteRow, ...model } = options

		this.model = model

		this.setValueHandler = setValue
		this.getValuesHandler = getValues
		this.deleteRowHandler = deleteRow
	}

	public triggerRender() {}

	public async setValue(name: string, value: any) {
		await this.setValueHandler(name, value)
		this.triggerRender()
	}

	public getValues(): Record<string, any> {
		return this.getValuesHandler()
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.ListRow {
		return {
			...this.model,
			controller: this,
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

	public getValue(fieldName: string): any {
		const values = this.getValues()

		if (fieldName in values) {
			return values[fieldName]
		}

		throw new SpruceError({
			code: 'INVALID_PARAMETERS',
			parameters: ['fieldName'],
		})
	}

	public delete() {
		this.deleteRowHandler()
	}
}
