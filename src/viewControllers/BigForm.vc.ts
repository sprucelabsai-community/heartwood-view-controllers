import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { areSchemaValuesValid, Schema } from '@sprucelabs/schema'
import { BigFormOnSubmitOptions } from '../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../utilities/normalizeFieldNames.utility'
import FormViewController, { FormViewControllerOptions } from './form/Form.vc'

type ViewModel<S extends Schema> =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigForm<S>

export type BigFormViewControllerOptions<S extends Schema> =
	FormViewControllerOptions<S> & {
		onSubmitSlide?: ViewModel<S>['onSubmitSlide']
	}

export default class BigFormViewController<
	S extends Schema,
	V extends ViewModel<S> = ViewModel<S>
> extends FormViewController<S, V> {
	public isSlideValid(idx: number) {
		const slide = this.model.sections[idx]
		if (slide) {
			const fields = normalizeFormSectionFieldNamesUtil.toNames(slide.fields)
			return areSchemaValuesValid(this.model.schema, this.model.values, {
				fields,
			})
		}

		return false
	}

	public setOnSubmit(cb: V['onSubmit']) {
		this.model.onSubmit = cb
	}

	public setOnSubmitSlide(cb: V['onSubmitSlide']) {
		this.model.onSubmitSlide = cb
	}

	public getPresentSlide(): number {
		return this.model.presentSlide ?? 0
	}

	public async jumpToSlide(idx: number) {
		this.model.presentSlide = Math.min(
			this.getTotalSlides() - 1,
			Math.max(0, idx)
		)

		this.triggerRender()

		const firstFieldOfSection = normalizeFormSectionFieldNamesUtil.toNames(
			this.model.sections[idx]?.fields ?? []
		)[0]
		if (firstFieldOfSection) {
			this.focusInput(firstFieldOfSection)
		}

		this.replaySlideHeading(this.getPresentSlide())
	}

	public getTotalSlides() {
		return this.model.sections.length
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public replaySlideHeading(idx: number) {}

	public async goForward() {
		await this.jumpToSlide(this.getPresentSlide() + 1)
	}

	public async goBack() {
		await this.jumpToSlide(this.getPresentSlide() - 1)
	}

	public async submit() {
		const { options, errorsByField } = this.buildOnSubmitOptions()

		const results = await this.model.onSubmitSlide?.(options)

		if (results === false) {
			return
		}

		if (this.getIsLastSlide()) {
			await this.model.onSubmit?.(options)
		}

		if (this.isPresentSlideValid()) {
			await this.goForward()
		} else {
			this.setErrorsByField(errorsByField)
		}
	}

	private buildOnSubmitOptions() {
		const errorsByField = this.validate()
		const options: BigFormOnSubmitOptions<S> = {
			values: this.getValues(),
			presentSlide: this.getPresentSlide(),
			errorsByField,
			controller: this,
			isValid: this.isValid(),
		}
		return { options, errorsByField }
	}

	public getIsLastSlide() {
		return this.getPresentSlide() === this.getTotalSlides() - 1
	}

	private isPresentSlideValid() {
		return this.isSlideValid(this.getPresentSlide())
	}

	public render(): V {
		const view: V = {
			...this.model,
			onSubmit: this.submit.bind(this),
		}

		return view
	}
}
