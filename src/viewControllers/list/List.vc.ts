import { SpruceError } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ViewControllerOptions } from '../../types/heartwood.types'
import AbstractViewController from '../Abstract.vc'
import ListRowViewController from './ListRow.vc'

type List = Omit<SpruceSchemas.Heartwood.v2021_02_11.List, 'rows'> & {
	rows: ListRow[]
}
export type ListRow = Omit<
	SpruceSchemas.Heartwood.v2021_02_11.ListRow,
	'cells'
> & {
	cells: ListCell[]
}
export type ListCell = Omit<
	SpruceSchemas.Heartwood.v2021_02_11.ListCell,
	'textInput' | 'selectInput'
> & {
	textInput?: ListTextInput
	selectInput?: ListSelectInput
}

type ListTextInput = Omit<
	SpruceSchemas.Heartwood.v2021_02_11.ListTextInput,
	'setValue'
>
type ListSelectInput = Omit<
	SpruceSchemas.Heartwood.v2021_02_11.ListSelectInput,
	'setValue'
>

export type ListViewControllerOptions = Partial<List>

export default class ListViewController extends AbstractViewController<SpruceSchemas.Heartwood.v2021_02_11.List> {
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

	public addRow(row: ListRow & { atIndex?: number }): any {
		if (!row) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: ['cells'],
			})
		}

		if (!Array.isArray(row.cells)) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				parameters: ['cells'],
				friendlyMessage: `You tried to add a bad row to this list!`,
			})
		}

		if (row.atIndex) {
			return this.model.rows.splice(row.atIndex, 0, row)
		} else {
			this.model.rows.push(row)
		}

		this.triggerRender()
	}

	public getRowVc(rowIdx: number) {
		if (!this._rowVcs[rowIdx]) {
			this.assertValidRowIdx(rowIdx)

			this._rowVcs[rowIdx] = new ListRowViewController({
				setValueHandler: async (name: string, value: any) => {
					await this.setValue({ rowIdx, name, value })
				},
				getValuesHandler: () => {
					return this.getRowValues(rowIdx)
				},
				...this.model.rows[rowIdx],
			})
		}
		return this._rowVcs[rowIdx]
	}

	private assertValidRowIdx(rowIdx: number) {
		if (!this.model.rows[rowIdx]?.cells) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `Could not get view conroller for row ${rowIdx} because it does not exist.`,
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
			const input = getInputFromCell(cell)
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
			const input = getInputFromCell(cell)
			if (input?.name === name) {
				input.value = value
				await input.onChange?.(value)
				return
			}
		}

		throw new SpruceError({
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

	public updateRows(rows: ListRow[]) {
		this.model.rows = rows
		this._rowVcs = []
		this.triggerRender()
	}

	public deleteRow(rowIdx: number) {
		this.assertValidRowIdx(rowIdx)
		this.model.rows.splice(rowIdx, 1)
		this._rowVcs = []
		this.triggerRender()
	}

	public render(): SpruceSchemas.Heartwood.v2021_02_11.List {
		return {
			...this.model,
			controller: this,
			rows: this.getRowVcs().map((vc) => vc.render()),
		}
	}
}

export function getInputFromCell(cell: ListCell) {
	return cell.textInput ?? cell.selectInput
}
