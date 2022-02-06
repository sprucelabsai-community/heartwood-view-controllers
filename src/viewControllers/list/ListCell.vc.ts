import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ViewController } from '../../types/heartwood.types'

type Model = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell

export type ListCellModel = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell,
	'textInput' | 'selectInput'
> & {
	textInput?: ListTextInput | null
	selectInput?: ListSelectInput | null
	ratingsInput?: ListRatingsInput | null
}

type ListTextInput = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInput,
	'setValue'
>

type ListSelectInput = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInput,
	'setValue'
>

type ListRatingsInput = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInput,
	'setValue'
>

type SetValueHandler = (name: string, value: any) => Promise<void>

export default class ListCellViewController implements ViewController<Model> {
	private model: ListCellModel
	private setValueHandler: SetValueHandler

	public constructor(model: ListCellModel & { setValue: SetValueHandler }) {
		const { setValue: setValueHandler, ...rest } = model

		this.setValueHandler = setValueHandler

		this.model = {
			...rest,
		}
	}
	public triggerRender() {}

	public async setValue(name: string, value: any) {
		await this.setValueHandler(name, value)
		this.triggerRender()
	}

	public render(): Model {
		const { ...model } = this.model

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
