import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ViewController } from '../../types/heartwood.types'
import { ListRowModel } from './List.vc'
import ListCellViewController from './ListCell.vc'

export default class ListRowViewController
	implements
		ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow>
{
	private get model() {
		return this.getModelHandler()
	}

	private setValueHandler: (name: string, value: any) => void | Promise<void>
	private getValuesHandler: () => Record<string, any>
	private deleteRowHandler: () => void
	private _isLastRow: boolean
	private setIsSelectedHandler: (isSelected: boolean) => void
	private setIsEnabledHandler: (isEnabled: boolean) => void
	private getModelHandler: () => ListRowModel

	public constructor(
		options: ListRowModel & {
			setValue: (name: string, value: any) => void | Promise<void>
			getValues: () => Record<string, any>
			deleteRow: () => void
			setIsSelected: (isSelected: boolean) => void
			setIsEnabled: (isEnabled: boolean) => void
			getModel: () => ListRowModel
			isLastRow: boolean
		}
	) {
		const {
			setValue,
			getValues,
			deleteRow,
			setIsSelected,
			isLastRow,
			getModel,
			setIsEnabled,
		} = options

		this.getModelHandler = getModel

		this.setValueHandler = setValue
		this.getValuesHandler = getValues
		this.deleteRowHandler = deleteRow
		this.setIsSelectedHandler = setIsSelected
		this.setIsEnabledHandler = setIsEnabled

		this._isLastRow = isLastRow
	}

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

	public getValue(fieldName: string): any {
		const values = this.getValues()

		if (fieldName in values) {
			return values[fieldName]
		}

		throw new SchemaError({
			code: 'INVALID_PARAMETERS',
			parameters: ['fieldName'],
			friendlyMessage: `I could not find an input named ${fieldName} in row ${this.getId()}`,
		})
	}

	public isLastRow(): boolean {
		return this._isLastRow
	}

	public delete() {
		this.deleteRowHandler()
	}

	public getId() {
		return this.model.id
	}

	public getIsSelected(): boolean {
		return this.model.isSelected ?? false
	}

	public setIsEnabled(isEnabled: boolean) {
		this.setIsEnabledHandler(isEnabled)
	}

	public setIsSelected(isSelected: boolean) {
		this.setIsSelectedHandler(isSelected)
		this.triggerRender()
	}

	public getCellVc(idx: number) {
		const cell = this.model.cells[idx]

		if (!cell) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['cellIdx'],
			})
		}

		return new ListCellViewController({
			...cell,
			setValue: this._setValue.bind(this),
		})
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow {
		return {
			...this.model,
			controller: this,
			cells: this.model.cells.map((_cell, idx) => ({
				...this.getCellVc(idx).render(),
			})),
		}
	}
}
