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
	SchemaFieldsByName,
	SchemaValues,
} from '@sprucelabs/schema'
import cloneDeepWith from 'lodash/cloneDeepWith'
import { defaultSubmitButtonLabel } from '../constants'
import SpruceError from '../errors/SpruceError'
import {
	FormErrorsByField,
	ViewController,
	TypedInvalidFieldError,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel<S extends Schema> = SpruceSchemas.Heartwood.v2021_02_11.Form<S>
type Section<S extends Schema = Schema> = ViewModel<S>['sections'][number]

export type FormViewControllerOptions<S extends Schema> = Pick<
	ViewModel<S>,
	| 'schema'
	| 'sections'
	| 'onSubmit'
	| 'onChange'
	| 'shouldShowCancelButton'
	| 'shouldShowSubmitControls'
	| 'submitButtonLabel'
	| 'values'
	| 'footer'
> &
	Partial<Pick<ViewModel<S>, 'id' | 'isBusy'>>

const cloneExceptControllers = function (obj: Record<string, any>) {
	return cloneDeepWith(obj, (value, key) => {
		if (key === 'controller') {
			return value
		}
	})
}

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

		const modelCopy = cloneExceptControllers(model) as any

		this.model = {
			shouldShowSubmitControls: true,
			shouldShowCancelButton: true,
			submitButtonLabel: defaultSubmitButtonLabel,
			...modelCopy,
			values: {
				...(options.schema ? defaultSchemaValues(options.schema) : {}),
				...modelCopy.values,
			},
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

		if (!this.getSchema().fields?.[name]) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `Can't set \`${name}\` field because it does not exist!`,
				parameters: ['fieldName'],
			})
		}

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

	public shouldShowSubmitControls() {
		return this.model.shouldShowSubmitControls ?? true
	}

	public shouldShowCancelButton() {
		return (
			(this.model.shouldShowCancelButton ?? true) &&
			this.shouldShowSubmitControls()
		)
	}

	public getSubmitButtonLabel() {
		return this.model.submitButtonLabel as string
	}

	public reset() {
		this.setValues(this.originalValues)
		this.setErrorsByField({})
	}

	public addSection(section: Section & { atIndex?: number }) {
		const { atIndex, ...sec } = section
		if (typeof atIndex === 'number') {
			this.model.sections.splice(atIndex, 0, { ...sec })
		} else {
			this.model.sections.push({ ...sec })
		}
		this.triggerRender()
	}

	public updateSection(sectionIdx: number, newSection: Section<S>) {
		const missing: string[] = []

		if (typeof sectionIdx !== 'number') {
			missing.push('sectionIdx')
		}

		if (!newSection) {
			missing.push('newSection')
		}

		if (missing.length) {
			throw new SpruceError({
				code: 'MISSING_PARAMETERS',
				parameters: missing,
			})
		}

		this.assertValidSection(sectionIdx)
		this.model.sections[sectionIdx] = newSection

		this.triggerRender()
	}

	public updateSections(sections: Section<S>[]) {
		this.model.sections = sections
		this.triggerRender()
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
		const section = this.assertValidSection(idx)
		return section
	}

	private assertValidSection(idx: number) {
		const section = this.model.sections[idx]

		if (!section) {
			throw new SpruceError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `There is no section ${idx}.`,
				parameters: ['sectionIdx'],
			})
		}
		return section
	}

	public getSchema() {
		return this.model.schema
	}

	public addFields(options: {
		sectionIdx: number
		fields: SchemaFieldsByName
	}) {
		const { sectionIdx, fields } = options

		const missing: string[] = []

		if (typeof sectionIdx === 'undefined') {
			missing.push('sectionIdx')
		}

		if (!fields) {
			missing.push('fields')
		}

		if (missing.length > 0) {
			throw new SpruceError({ code: 'MISSING_PARAMETERS', parameters: missing })
		}

		const schema = this.getSchema()
		schema.fields = {
			...schema.fields,
			...fields,
		}

		const section = this.getSection(sectionIdx)

		if (!section.fields) {
			section.fields = []
		}

		for (const field of Object.keys(fields)) {
			//@ts-ignore
			section.fields.push({ name: field })
		}

		this.triggerRender()
	}

	public getValue<N extends SchemaFieldNames<S>>(named: N): SchemaValues<S>[N] {
		//@ts-ignore
		return this.getValues()[named]
	}

	public updateFooter(
		footer?: SpruceSchemas.Heartwood.v2021_02_11.CardFooter | null
	) {
		if (!footer) {
			delete this.model.footer
		} else {
			this.model.footer = footer
		}
	}

	public render(): V {
		const view: V = {
			...this.model,
			onSubmit: this.submit.bind(this),
		}

		if (!this.shouldShowSubmitControls()) {
			delete view.footer
		}

		return view
	}
}
