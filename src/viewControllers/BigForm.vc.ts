import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	areSchemaValuesValid,
	Schema,
	validateSchemaValues,
} from '@sprucelabs/schema'
import bigFormSchema from '#spruce/schemas/heartwood/v2021_02_11/bigForm.schema'
import FormViewController, { FormViewControllerOptions } from './Form.vc'

type ViewModel<
	S extends Schema
> = SpruceSchemas.Heartwood.v2021_02_11.BigForm<S>

export type BigFormViewControllerOptions<
	S extends Schema
> = FormViewControllerOptions<S> & {
	onSubmitSlide?: ViewModel<S>['onSubmitSlide']
}

export default class BigFormViewController<
	S extends Schema,
	V extends ViewModel<S> = ViewModel<S>
> extends FormViewController<S, V> {
	public isSlideValid(idx: number) {
		const slide = this.viewModel.sections[idx]
		if (slide) {
			const fields = slide.fields
			return areSchemaValuesValid(
				this.viewModel.schema,
				this.viewModel.values,
				{
					fields,
				}
			)
		}

		return false
	}

	public getCurrentSlide(): number {
		return this.viewModel.currentSlide ?? 0
	}

	public async setCurrentSlide(idx: number) {
		this.viewModel.currentSlide = Math.min(
			this.viewModel.sections.length - 1,
			Math.max(0, idx)
		)

		this.triggerRender()

		const firstFieldOfSection = this.viewModel.sections[idx]?.fields[0]
		if (firstFieldOfSection) {
			this.focusInput(firstFieldOfSection)
		}

		this.replaySlideHeading(this.getCurrentSlide())
	}

	public replaySlideHeading(idx: number) {
		console.log('replaySlideHeading not overridden by view', idx)
	}

	public async goForward() {
		await this.setCurrentSlide(this.getCurrentSlide() + 1)
	}

	public async goBack() {
		await this.setCurrentSlide(this.getCurrentSlide() - 1)
	}

	public async handleSubmit() {
		const errorsByField = this.validate()
		const results = await this.viewModel.onSubmitSlide?.({
			values: this.getValues(),
			currentSlide: this.getCurrentSlide(),
			errorsByField,
			controller: this,
			isValid: this.isValid(),
		})

		if (results === false) {
			return
		}

		if (this.isCurrentSlideValid()) {
			await this.goForward()
		} else {
			this.setErrorsByField(errorsByField)
		}
	}

	private isCurrentSlideValid() {
		return this.isSlideValid(this.getCurrentSlide())
	}

	public render(): V {
		const view: V = {
			...this.viewModel,
			onSubmit: this.handleSubmit.bind(this),
		}
		/* Develblock:start */
		validateSchemaValues(bigFormSchema, view)
		/* Develblock:end */

		return view
	}
}
