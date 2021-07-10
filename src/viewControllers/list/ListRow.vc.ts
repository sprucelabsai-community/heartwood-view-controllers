import { SpruceError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ViewController } from '../../types/heartwood.types'
import { ListRow } from './List.vc'
import ListCellViewController from './ListCell.vc'

export default class ListRowViewController
	implements ViewController<SpruceSchemas.Heartwood.v2021_02_11.ListRow>
{
	private model: ListRow
	private setValueHandler: (name: string, value: any) => void | Promise<void>
	private getValuesHandler: () => Record<string, any>
	private deleteRowHandler: () => void
	private _isLastRow: boolean

	public constructor(
		options: ListRow & {
			setValue: (name: string, value: any) => void | Promise<void>
			getValues: () => Record<string, any>
			deleteRow: () => void
			isLastRow: boolean
		}
	) {
		const { setValue, getValues, deleteRow, isLastRow, ...model } = options

		this.model = model

		this.setValueHandler = setValue
		this.getValuesHandler = getValues
		this.deleteRowHandler = deleteRow
		this._isLastRow = isLastRow
	}

	public async transitionOutHandler() {}
	public triggerRender() {}

	public async setValue(name: string, value: any) {
		await this._setValue(name, value)
		this.triggerRender()
	}

	private async _setValue(name: string, value: any) {
		await this.setValueHandler(name, value)
	}

	public getValues(): Record<string, any> {
		return this.getValuesHandler()
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.ListRow {
		return {
			...this.model,
			controller: this,
			cells: this.model.cells.map((cell, idx) => ({
				...this.getCellVc(idx).render(),
			})),
		}
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

	public isLastRow(): boolean {
		return this._isLastRow
	}

	public async delete() {
		await this.transitionOutHandler()
		this.deleteRowHandler()
	}

	public getCellVc(idx: number) {
		const cell = this.model.cells[idx]

		if (!cell) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['cellIdx'],
			})
		}

		return new ListCellViewController({
			...cell,
			setValue: this._setValue.bind(this),
		})
	}
}
