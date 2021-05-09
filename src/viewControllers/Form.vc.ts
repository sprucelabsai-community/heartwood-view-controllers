import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	areSchemaValuesValid,
	defaultSchemaValues,
	InvalidFieldError,
	InvalidParametersOptions,
	MissingParametersOptions,
	Schema,
	SchemaFieldNames,
	SchemaPartialValues,
	UnexpectedParametersOptions,
	validateSchemaValues,
} from '@sprucelabs/schema'
import formSchema from '#spruce/schemas/heartwood/v2021_02_11/form.schema'
import {
	FormErrorsByField,
	ViewController,
	TypedInvalidFieldError,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel<S extends Schema> = SpruceSchemas.Heartwood.v2021_02_11.Form<S>

export type FormViewControllerOptions<S extends Schema> = Pick<
	ViewModel<S>,
	| 'schema'
	| 'sections'
	| 'onSubmit'
	| 'onChange'
	| 'shouldShowCancelButton'
	| 'shouldShowSubmitControls'
	| 'values'
> &
	Partial<Pick<ViewModel<S>, 'id' | 'isBusy'>>

export default class FormViewController<
		S extends Schema,
		V extends ViewModel<S> = ViewModel<S>
	>
	extends AbstractViewController<V>
	implements ViewController<V>
{
	protected viewModel: V & {
		values: SchemaPartialValues<S>
	}

	private dirtyFields: Record<string, boolean> = {}
	private originalValues: SchemaPartialValues<S>

	public constructor(
		options: FormViewControllerOptions<S> & ViewControllerOptions
	) {
		super(options)

		const { id, ...model } = { ...options }

		//@ts-ignore
		delete model.vcFactory
		//@ts-ignore
		delete model.renderInDialogHandler
		//@ts-ignore
		delete model.connectToApi
		//@ts-ignore
		delete model.confirmHandler

		this.viewModel = {
			values: {
				...(options.schema ? defaultSchemaValues(options.schema) : {}),
			},
			shouldShowSubmitControls: true,
			...(model as any),
			id: id ?? `${new Date().getTime()}`,
			errorsByField: {},
			controller: this,
			setValue: this.setValue.bind(this),
		}

		//@ts-ignore
		this.originalValues = { ...(this.viewModel.values ?? {}) }
	}

	public focusInput(named: string) {
		console.log(
			"Focus not set on FormController by heartwood. Can't focus field named:",
			named
		)
	}

	public setValue<N extends SchemaFieldNames<S>>(name: N, value: any): void {
		this.viewModel.values[name] = value
		this.dirtyFields[name] = true
		const errorsByField = this.validateDirtyFields()

		void this.viewModel.onChange?.({
			controller: this,
			values: this.viewModel.values,
			errorsByField,
			isValid: this.isValid(),
		})

		this.setErrorsByField(errorsByField)
	}

	private validateDirtyFields() {
		const errorsByField = this.validate()
		const dirty: any = {}

		for (const field of Object.keys(this.dirtyFields)) {
			//@ts-ignore
			if (errorsByField[field]) {
				//@ts-ignore
				dirty[field] = errorsByField[field]
			}
		}

		return dirty as any
	}

	public setErrors(errors: TypedInvalidFieldError<S>[]): void {
		const errorsByField = {} as any
		for (const error of errors) {
			if (!errorsByField[error.name]) {
				errorsByField[error.name] = []
			}
			errorsByField[error.name].push(error)
		}

		this.setErrorsByField(errorsByField)
	}

	public setErrorsByField(errorsByField: any) {
		this.viewModel.errorsByField = errorsByField
		this.triggerRender()
	}

	public validate(): FormErrorsByField<S> {
		const errors: Record<string, InvalidFieldError[]> = {}
		try {
			validateSchemaValues(this.viewModel.schema, this.viewModel.values)
		} catch (err) {
			if (err.options?.code === 'VALIDATION_FAILED') {
				err.options.errors?.forEach(
					(err: {
						options:
							| MissingParametersOptions
							| InvalidParametersOptions
							| UnexpectedParametersOptions
					}) => {
						const parameters = err.options.parameters
						for (const param of parameters) {
							if (!errors[param]) {
								errors[param] = []
							}

							errors[param].push({
								code: err.options.code.toLowerCase(),
								name: param,
							})
						}
					}
				)
			} else {
				// this.viewModel.onError?.(err.friendMessage ?? err.message)
			}
		}

		return errors as FormErrorsByField<S>
	}

	public isValid() {
		return areSchemaValuesValid(this.viewModel.schema, this.viewModel.values)
	}

	public getIsBusy() {
		return this.viewModel.isBusy
	}

	public setIsBusy(isBusy: boolean) {
		this.viewModel.isBusy = isBusy
		this.triggerRender()
	}

	public async handleSubmit() {
		const errorsByField = this.validate()
		const results = await this.viewModel.onSubmit?.({
			values: this.viewModel.values,
			errorsByField,
			controller: this,
			isValid: this.isValid(),
		})

		if (results === false) {
			return
		}

		this.viewModel.errorsByField = errorsByField

		const name = Object.keys(errorsByField)[0]
		this.focusInput?.(name)

		this.triggerRender()
	}

	public getErrorsByField(): FormErrorsByField<S> {
		return this.viewModel.errorsByField ?? ({} as FormErrorsByField<S>)
	}

	public hasErrors(): boolean {
		return Object.keys(this.getErrorsByField()).length > 0
	}

	public getValues() {
		return this.viewModel.values
	}

	public showSubmitControls() {
		this.viewModel.shouldShowSubmitControls = true
		this.triggerRender()
	}
	public hideSubmitControls() {
		this.viewModel.shouldShowSubmitControls = false
		this.triggerRender()
	}

	public reset() {
		this.setValues(this.originalValues)
		this.setErrorsByField({})
	}

	public setValues(values: SchemaPartialValues<S>) {
		this.viewModel.values = { ...values }
	}

	public render(): V {
		const view: V = {
			...this.viewModel,
			onSubmit: this.handleSubmit.bind(this),
		}

		/* Develblock:start */
		validateSchemaValues(formSchema, view)
		/* Develblock:end */

		return view
	}
}
