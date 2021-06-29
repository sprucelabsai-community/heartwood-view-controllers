import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	areSchemaValuesValid,
	defaultSchemaValues,
	FieldErrorCodes,
	InvalidFieldError,
	InvalidParametersOptions,
	MissingParametersOptions,
	Schema,
	SchemaFieldNames,
	SchemaPartialValues,
	UnexpectedParametersOptions,
	validateSchemaValues,
} from '@sprucelabs/schema'
import SpruceError from '../errors/SpruceError'
import {
	FormErrorsByField,
	ViewController,
	TypedInvalidFieldError,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel<S extends Schema> = SpruceSchemas.Heartwood.v2021_02_11.Form<S>
type Section = ViewModel<Schema>['sections'][number]

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
	protected model: V & {
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

		this.model = {
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
		this.originalValues = { ...(this.model.values ?? {}) }
	}

	public focusInput(named: string) {
		console.log(
			"Focus not set on FormController by heartwood. Can't focus field named:",
			named
		)
	}

	public setValue<N extends SchemaFieldNames<S>>(name: N, value: any): void {
		this._setValue<N>({ name, value })
	}

	private _setValue<N extends SchemaFieldNames<S>>(options: {
		name: N
		value: any
		shouldSetIsDirty?: boolean
	}) {
		const { name, value, shouldSetIsDirty = true } = options

		this.model.values[name] = value
		if (shouldSetIsDirty) {
			this.dirtyFields[name] = true
		}

		const errorsByField = this.validateDirtyFields()

		void this.model.onChange?.({
			controller: this,
			values: this.model.values,
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
		this.model.errorsByField = errorsByField
		this.triggerRender()
	}

	public validate(): FormErrorsByField<S> {
		const errors: Record<string, InvalidFieldError[]> = {}
		try {
			validateSchemaValues(this.model.schema, this.model.values)
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
								code: err.options.code.toLowerCase() as FieldErrorCodes,
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
		return areSchemaValuesValid(this.model.schema, this.model.values)
	}

	public getIsBusy() {
		return this.model.isBusy
	}

	public setIsBusy(isBusy: boolean) {
		this.model.isBusy = isBusy
		this.triggerRender()
	}

	public async submit() {
		const errorsByField = this.validate()
		const results = await this.model.onSubmit?.({
			values: this.model.values,
			errorsByField,
			controller: this,
			isValid: this.isValid(),
		})

		if (results === false) {
			return
		}

		this.model.errorsByField = errorsByField

		const name = Object.keys(errorsByField)[0]
		this.focusInput?.(name)

		this.triggerRender()
	}

	public getErrorsByField(): FormErrorsByField<S> {
		return this.model.errorsByField ?? ({} as FormErrorsByField<S>)
	}

	public hasErrors(): boolean {
		return Object.keys(this.getErrorsByField()).length > 0
	}

	public getValues() {
		return this.model.values
	}

	public showSubmitControls() {
		this.model.shouldShowSubmitControls = true
		this.triggerRender()
	}
	public hideSubmitControls() {
		this.model.shouldShowSubmitControls = false
		this.triggerRender()
	}

	public reset() {
		this.setValues(this.originalValues)
		this.setErrorsByField({})
	}

	public addSection(section: Section) {
		this.model.sections.push(section)
	}

	public resetField<N extends SchemaFieldNames<S>>(name: N): void {
		delete this.dirtyFields[name]
		this._setValue<N>({
			name,
			value: this.originalValues?.[name],
			shouldSetIsDirty: false,
		})
	}

	public setValues(values: SchemaPartialValues<S>) {
		this.model.values = { ...values }
	}

	public getSections() {
		return this.model.sections
	}

	public getTotalSections(): number {
		return this.model.sections.length ?? 0
	}

	public getSection(idx: number) {
		const section = this.model.sections[idx]

		if (!section) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `There is no section ${idx}.`,
				parameters: ['sectionIndex'],
			})
		}

		return section
	}

	public getSchema() {
		return this.model.schema
	}

	public render(): V {
		const view: V = {
			...this.model,
			onSubmit: this.submit.bind(this),
		}

		return view
	}
}
