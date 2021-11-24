import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { ViewController } from '../../types/heartwood.types'

type Model = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell

export type ListCellModel = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell,
	'textInput' | 'selectInput'
> & {
	textInput?: ListTextInput | null
	selectInput?: ListSelectInput | null
}

type ListTextInput = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInput,
	'setValue'
>

type ListSelectInput = Omit<
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInput,
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
		const { textInput, selectInput, toggleInput, ...rest } = this.model

		if (textInput) {
			//@ts-ignore
			rest.textInput = {
				...textInput,
				setValue: this.setValue.bind(this),
			}
		}

		if (selectInput) {
			//@ts-ignore
			rest.selectInput = {
				...selectInput,
				setValue: this.setValue.bind(this),
			}
		}

		if (toggleInput) {
			//@ts-ignore
			rest.toggleInput = {
				...toggleInput,
				setValue: this.setValue.bind(this),
			}
		}

		return { ...rest, controller: this }
	}
}
