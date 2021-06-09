import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	areSchemaValuesValid,
	Schema,
	validateSchemaValues,
} from '@sprucelabs/schema'
import bigFormSchema from '#spruce/schemas/heartwood/v2021_02_11/bigForm.schema'
import normalizeFieldNamesUtil from '../utilities/normalizeFieldNames.utility'
import FormViewController, { FormViewControllerOptions } from './Form.vc'

type ViewModel<S extends Schema> =
	SpruceSchemas.Heartwood.v2021_02_11.BigForm<S>

export type BigFormViewControllerOptions<S extends Schema> =
	FormViewControllerOptions<S> & {
		onSubmitSlide?: ViewModel<S>['onSubmitSlide']
	}

export default class BigFormViewController<
	S extends Schema,
	V extends ViewModel<S> = ViewModel<S>
> extends FormViewController<S, V> {
	public isSlideValid(idx: number) {
		const slide = this.viewModel.sections[idx]
		if (slide) {
			const fields = normalizeFieldNamesUtil.toNames(slide.fields)
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

	public getPresentSlide(): number {
		return this.viewModel.presentSlide ?? 0
	}

	public async jumpToSlide(idx: number) {
		this.viewModel.presentSlide = Math.min(
			this.viewModel.sections.length - 1,
			Math.max(0, idx)
		)

		this.triggerRender()

		const firstFieldOfSection = normalizeFieldNamesUtil.toNames(
			this.viewModel.sections[idx]?.fields ?? []
		)[0]
		if (firstFieldOfSection) {
			this.focusInput(firstFieldOfSection)
		}

		this.replaySlideHeading(this.getPresentSlide())
	}

	public replaySlideHeading(idx: number) {
		console.log('replaySlideHeading not overridden by view', idx)
	}

	public async goForward() {
		await this.jumpToSlide(this.getPresentSlide() + 1)
	}

	public async goBack() {
		await this.jumpToSlide(this.getPresentSlide() - 1)
	}

	public async handleSubmit() {
		const errorsByField = this.validate()
		const results = await this.viewModel.onSubmitSlide?.({
			values: this.getValues(),
			presentSlide: this.getPresentSlide(),
			errorsByField,
			controller: this,
			isValid: this.isValid(),
		})

		if (results === false) {
			return
		}

		if (this.isPresentSlideValid()) {
			await this.goForward()
		} else {
			this.setErrorsByField(errorsByField)
		}
	}

	private isPresentSlideValid() {
		return this.isSlideValid(this.getPresentSlide())
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
