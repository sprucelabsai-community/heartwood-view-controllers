import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import SpruceError from '../../errors/SpruceError'
import { ViewController } from '../../types/heartwood.types'
import listUtil from './list.utility'

type Model = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell

type Cell = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell
type SetValueHandler = (name: string, value: any) => Promise<void>

interface CellOptions {
	setValue: SetValueHandler
	getViewModel: () => Cell
}

export default class ListCellViewController implements ViewController<Model> {
	private get model() {
		return this.getViewModelHandler()
	}
	private setValueHandler: SetValueHandler
	private getViewModelHandler: () => SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell

	public constructor(options: Cell & CellOptions) {
		const { setValue: setValueHandler, getViewModel } = options

		this.setValueHandler = setValueHandler
		this.getViewModelHandler = getViewModel
	}
	public triggerRender() {}

	public async setValue(name: string, value: any) {
		await this.setValueHandler(name, value)
		this.triggerRender()
	}

	public getIsDeleted() {
		return !this.model
	}

	public hasInput(name: string): boolean {
		return !!listUtil.getInputFromCell(this.model, name)
	}

	public render(): Model {
		const { ...model } = this.model

		if (this.getIsDeleted()) {
			throw new SpruceError({ code: 'CELL_DELETED' })
		}

		const keys = Object.keys(model)
			.map((key) => {
				//@ts-ignore
				if (!key.endsWith('Input') || !this.model[key]) {
					return false
				}

				return {
					name: key,
					//@ts-ignore
					input: this.model[key],
				}
			})
			.filter((f) => !!f) as { name: string; input: any }[]

		for (const item of keys ?? []) {
			const { name, input } = item
			//@ts-ignore
			model[name] = {
				...input,
				setValue: this.setValue.bind(this),
			}
		}

		return { ...model, controller: this }
	}
}
