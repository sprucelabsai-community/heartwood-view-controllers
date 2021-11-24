import { SchemaError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import SpruceError from '../../errors/SpruceError'
import { ViewControllerOptions } from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import listUtil from './list.utility'
import { ListCellModel } from './ListCell.vc'
import ListRowViewController from './ListRow.vc'

type List = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List,
	'rows'
> & {
	rows: ListRowModel[]
}
export type ListRowModel = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow,
	'cells'
> & {
	cells: ListCellModel[]
}

export type ListViewControllerOptions = Partial<List>

export default class ListViewController extends AbstractViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List> {
	private model: List = {
		rows: [],
	}
	private _rowVcs: ListRowViewController[] = []

	public constructor(options: Partial<List> & ViewControllerOptions) {
		super(options)
		this.model = {
			...options,
			rows: options.rows ?? [],
		}
	}

	public getRows() {
		return this.model.rows
	}

	public addRows(rows: ListRowModel[]) {
		for (const row of rows) {
			this.addRow(row)
		}
	}

	public addRow(row: ListRowModel & { atIndex?: number }): void {
		if (!row) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: ['cells'],
			})
		}

		if (!Array.isArray(row.cells)) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['cells'],
				friendlyMessage: `You tried to add a bad row to this list!`,
			})
		}

		if (row.id && this.doesIdExist(row.id)) {
			throw new SpruceError({
				code: 'DUPLICATE_ROW_ID',
				rowId: row.id,
			})
		}

		if (row.atIndex) {
			this.model.rows.splice(row.atIndex, 0, row)
		} else {
			this.model.rows.push(row)
		}

		this._rowVcs = []
		this.triggerRender()
	}

	public getRowVc(row: number | string): ListRowViewController {
		if (typeof row === 'string') {
			return this.getRowVcById(row)
		}

		if (!this._rowVcs[row]) {
			this.assertValidRowIdx(row)

			this._rowVcs[row] = new ListRowViewController({
				setValue: async (name: string, value: any) => {
					await this.setValue({ rowIdx: row, name, value })
				},
				getValues: () => {
					return this.getRowValues(row)
				},
				deleteRow: () => {
					this.deleteRow(row)
				},
				isLastRow: row == this.getTotalRows() - 1,
				...this.model.rows[row],
			})
		}
		return this._rowVcs[row]
	}

	private assertValidRowIdx(rowIdx: number) {
		if (!this.model.rows[rowIdx]?.cells) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `Could not get view controller for row ${rowIdx} because it does not exist.`,
				parameters: ['rowIdx'],
			})
		}
	}

	public getTotalRows(): number {
		return this.model.rows.length
	}

	private getRowValues(rowIdx: number): Record<string, any> {
		const row = this.model.rows[rowIdx]
		const values: Record<string, any> = {}

		for (const cell of row.cells) {
			const input = listUtil.getInputFromCell(cell)
			if (input) {
				values[input.name] = input.value
			}
		}

		return values
	}

	private async setValue(options: {
		rowIdx: number
		name: string
		value: any
	}) {
		const { rowIdx, name, value } = options
		for (const cell of this.model.rows[rowIdx].cells) {
			const input = listUtil.getInputFromCell(cell)
			if (input?.name === name) {
				const onChangeResponse = await input.onChange?.(value)
				if (onChangeResponse !== false) {
					input.value = value
				}
				return
			}
		}

		throw new SchemaError({
			code: 'INVALID_PARAMETERS',
			friendlyMessage: `A field named \`${name}\` does not exist in row ${rowIdx}`,
			parameters: ['fieldName'],
		})
	}

	public getRowVcs() {
		return this.model.rows.map((_, idx) => this.getRowVc(idx))
	}

	public getValues() {
		let values = []

		for (const rowVc of this.getRowVcs()) {
			values.push(rowVc.getValues())
		}

		return values
	}

	public setRows(rows: ListRowModel[]) {
		this.model.rows = rows
		this._rowVcs = []
		this.triggerRender()
	}

	public deleteRow(rowIdx: number | string) {
		if (typeof rowIdx === 'string') {
			this.deleteRowById(rowIdx)
		} else {
			this.assertValidRowIdx(rowIdx)
			this.model.rows.splice(rowIdx, 1)
			this._rowVcs = []
			this.triggerRender()
		}
	}

	private getRowVcById(id: string) {
		const idx = this.getIdxForId(id)
		if (idx === -1) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `Can't find a row with the id \`${id}\`.`,
				parameters: ['rowId'],
			})
		}

		return this.getRowVc(idx)
	}

	private getIdxForId(id: string) {
		return this.model.rows.findIndex((r) => r.id === id)
	}

	public upsertRowById(id: string, row: ListRowModel) {
		const idx = this.getIdxForId(id)
		if (idx === -1) {
			this.addRow({ ...row })
		} else {
			this.model.rows[idx] = { ...row }
			this._rowVcs = []
		}
	}

	public doesIdExist(id: string) {
		const match = this.model.rows.find((r) => r.id === id)
		return !!match
	}

	private deleteRowById(id: string) {
		const vc = this.getRowVc(id)
		vc.delete()
	}

	public deleteAllRows() {
		this.model.rows = []
		this.triggerRender()
		this._rowVcs = []
	}

	public render(): SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List {
		return {
			...this.model,
			controller: this,
			rows: this.getRowVcs().map((vc) => vc.render()),
		}
	}
}
