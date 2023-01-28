import { SpruceSchemas } from '@sprucelabs/mercury-types'
import {
	areSchemaValuesValid,
	defaultSchemaValues,
	FieldError,
	Schema,
	SchemaFieldNames,
	SchemaPartialValues,
	validateSchemaValues,
	SchemaFieldsByName,
	SchemaValues,
	FieldDefinitions,
	SchemaError,
	assertOptions,
	cloneDeep,
} from '@sprucelabs/schema'
import { defaultSubmitButtonLabel } from '../../constants'
import SpruceError from '../../errors/SpruceError'
import {
	FormErrorsByField,
	ViewController,
	TypedFieldError,
	ViewControllerOptions,
	FieldRenderOptions,
	FormOnChangeOptions,
	FormWillChangeOptions,
	FormInputViewController,
	FormSection,
	TriggerRender,
} from '../../types/heartwood.types'
import normalizeFormSectionFieldNamesUtil from '../../utilities/normalizeFieldNames.utility'
import removeUniversalViewOptions from '../../utilities/removeUniversalViewOptions'
import AbstractViewController from '../Abstract.vc'

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
	private willChangeHandler?: (
		options: FormWillChangeOptions<S>
	) => Promise<boolean | void | undefined> | boolean | void | undefined
	private pendingSets: Record<string, any> = {}
	private triggerRendersByField: Partial<
		Record<SchemaFieldNames<S>, TriggerRender>
	> = {}
	private triggerRenderOnFooter?: TriggerRender

	public constructor(
		options: FormViewControllerOptions<S> & ViewControllerOptions
	) {
		super(options)

		const { id, onWillChange, ...model } = removeUniversalViewOptions(options)

		const modelCopy = cloneAndRetainControllers(model) as any

		this.willChangeHandler = onWillChange ?? undefined

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
			setValue: (name, value) =>
				this._setValue({ name, value, shouldSetRenderedValueIfExists: true }),
		}

		//@ts-ignore
		this.originalValues = { ...(this.model.values ?? {}) }

		if (options.isEnabled === false) {
			this.model.footer = {
				...this.model.footer,
				isEnabled: false,
			}
		}

		this.decorateFieldVcs()
	}

	private decorateFieldVcs() {
		this.getVisibleFields().forEach((name) => {
			const vc = this._getFieldVc(name)
			if (vc) {
				vc.setHandlers({
					setValue: async (value) =>
						this._setValue({ name, value, shouldCallSetValueOnFieldVc: false }),
					getValue: () => this.getValue(name),
					getModel: () => this.getField(name).compiledOptions,
					setModel: (model) => {
						delete model.value
						this.setField(name, {
							//@ts-ignore
							fieldDefinition: model,
						})
					},
				})
			}
		})
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public focusInput(named: string) {}

	public async setValue<N extends SchemaFieldNames<S>>(
		name: N,
		value: SchemaPartialValues<S>[N]
	) {
		return this._setValue<N>({ name, value })
	}

	private async _setValue<N extends SchemaFieldNames<S>>(options: {
		name: N
		value: SchemaPartialValues<S>[N]
		shouldSetIsDirty?: boolean
		shouldSetRenderedValueIfExists?: boolean
		shouldCallSetValueOnFieldVc?: boolean
	}) {
		let {
			name,
			value,
			shouldSetIsDirty = true,
			shouldSetRenderedValueIfExists = false,
			shouldCallSetValueOnFieldVc = true,
		} = options

		if (value === this.model.values[name] && !this.pendingSets[name]) {
			return
		}

		this.assertValidFieldName(name)

		this.pendingSets[name] = value
		this.triggerRenderForInput(name)

		if (shouldCallSetValueOnFieldVc) {
			//@ts-ignore
			const shouldBail = await this.emitWillChange({ [name]: value })

			if (shouldBail === false) {
				this.deletePendingValue(name)
				this.triggerRenderForInput(name)
				return
			}
		}

		if (this.pendingSets[name] !== value) {
			return
		}

		this.deletePendingValue(name)

		let shouldSetValueLocally = true

		if (this.isFieldBeingRendered(name)) {
			const vc = this._getFieldVc(name)
			if (vc) {
				const renderedValue = vc.getRenderedValue?.()
				const shouldSetRenderedValue =
					shouldSetRenderedValueIfExists &&
					typeof renderedValue !== 'undefined' &&
					renderedValue !== null

				if (shouldSetRenderedValue) {
					shouldSetIsDirty = false
					shouldSetValueLocally = false

					await vc.setRenderedValue?.(value)
				} else if (shouldCallSetValueOnFieldVc) {
					return vc.setValue?.(value)
				}
			}
		}

		if (shouldSetValueLocally) {
			this.model.values[name] = value
		}

		if (shouldSetIsDirty) {
			this.dirtyFields[name] = true
		}

		const errorsByField = this.validateDirtyFields()
		this.setErrorsByField(errorsByField)

		if (shouldSetValueLocally) {
			await this.emitOnChange(errorsByField)
		}

		this.triggerRenderForInput(name)
		this.triggerRenderOnFooter?.()
	}

	private deletePendingValue(name: SchemaFieldNames<S>) {
		delete this.pendingSets[name]
	}

	private triggerRenderForInput(name: SchemaFieldNames<S>) {
		this.getTriggerRenderForInput(name)?.()
	}

	private assertValidFieldName(name: SchemaFieldNames<S>) {
		if (!this.getSchema().fields?.[name]) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `Can't set \`${name}\` field because it does not exist!`,
				parameters: ['fieldName'],
			})
		}
	}

	private isFieldBeingRendered(name: SchemaFieldNames<S>) {
		const { sectionIdx } = this.getSectionAndFieldForFieldNamed(name)
		const isBeingRendered = sectionIdx > -1
		return isBeingRendered
	}

	public setTriggerRenderForInput(
		fieldName: SchemaFieldNames<S>,
		cb: TriggerRender
	) {
		this.assertValidFieldName(fieldName)
		this.triggerRendersByField[fieldName] = cb
	}

	public setTriggerRenderForFooter(cb: TriggerRender) {
		this.triggerRenderOnFooter = cb
	}

	private getTriggerRenderForInput(fieldName: SchemaFieldNames<S>) {
		this.assertValidFieldName(fieldName)
		return this.triggerRendersByField[fieldName]
	}

	public getFieldVc(fieldName: SchemaFieldNames<S>): FormInputViewController {
		const vc = this._getFieldVc(fieldName)
		if (!vc) {
			throw new SpruceError({
				code: 'NO_FIELD_VC_SET',
				fieldName,
			})
		}

		return vc
	}

	private _getFieldVc(fieldName: SchemaFieldNames<S>) {
		const field = this.getField(fieldName)
		const vc = field.compiledOptions.vc
		return vc as FormInputViewController & {
			_originalSetValue?: FormInputViewController['setValue']
		}
	}

	private async emitWillChange(changes: SchemaPartialValues<S>) {
		return await this.willChangeHandler?.({
			...this.buildChangeOptions({ includePendingValues: false }),
			changes,
		})
	}

	private async emitOnChange(errorsByField: any) {
		return this.model.onChange?.(this.buildChangeOptions({ errorsByField }))
	}

	private buildChangeOptions(options: {
		errorsByField?: FormErrorsByField<S>
		includePendingValues?: boolean
	}): FormOnChangeOptions<S> {
		const { errorsByField = {}, includePendingValues = true } = options
		return {
			controller: this,
			values: this.getValues({
				shouldIncludePendingValues: includePendingValues,
			}),
			errorsByField,
			isValid: this.isValid(),
		}
	}

	public async setValues(values: SchemaPartialValues<S>) {
		const shouldBail = await this.emitWillChange(values)

		if (shouldBail === false) {
			return
		}

		this.model.values = { ...values }
		const errorsByField = this.validateDirtyFields()

		await this.emitOnChange(errorsByField)

		this.triggerRender()
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

		return dirty as FormErrorsByField<S>
	}

	public setErrors(errors: TypedFieldError<S>[]): void {
		const errorsByField = {} as any
		for (const error of errors) {
			if (!errorsByField[error.name]) {
				errorsByField[error.name] = []
			}
			errorsByField[error.name].push(error)
		}

		this.setErrorsByField(errorsByField)
	}

	public setErrorsByField(errorsByField: FormErrorsByField<S>) {
		this.model.errorsByField = errorsByField
	}

	public validate(): FormErrorsByField<S> {
		const errorsByField: Record<string, FieldError[]> = {}
		try {
			validateSchemaValues(this.model.schema, this.model.values, {
				fields: this.getVisibleFields(),
			})
		} catch (err: any) {
			if (
				err instanceof SchemaError &&
				err.options?.code === 'VALIDATION_FAILED'
			) {
				err.options.errors?.forEach((err) => {
					if (!errorsByField[err.name]) {
						errorsByField[err.name] = []
					}

					errorsByField[err.name].push(err)
				})
			}
		}

		return errorsByField as FormErrorsByField<S>
	}

	public isValid() {
		return areSchemaValuesValid(this.model.schema, this.model.values, {
			fields: this.getVisibleFields(),
		})
	}

	private getVisibleFields(): SchemaFieldNames<S>[] {
		const fields = []

		for (const section of this.model.sections ?? []) {
			if (section.fields) {
				//@ts-ignore
				fields.push(...section.fields.map((f) => f.name || f))
			}
		}

		return fields as any
	}

	public disable() {
		this.model.footer = {
			...this.model.footer,
			isEnabled: false,
		}
		this.triggerRender()
	}

	public enable() {
		this.model.footer = {
			...this.model.footer,
			isEnabled: true,
		}
		this.triggerRender()
	}

	public getIsBusy() {
		return this.model.isBusy
	}

	public setIsBusy(isBusy: boolean) {
		this.model.isBusy = isBusy
		this.triggerRender()
	}

	public getIsDirty() {
		return Object.keys(this.dirtyFields).length > 0
	}

	public async submit() {
		const errorsByField = this.validate()
		const results = await this.model.onSubmit?.({
			values: this.getValues(),
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

	public hideSubmitControls() {
		this.model.shouldShowSubmitControls = false
		this.triggerRender()
	}

	public getShowSubmitControls() {
		this.model.shouldShowSubmitControls = true
		this.triggerRender()
	}

	public getShouldShowSubmitControls() {
		return this.model.shouldShowSubmitControls ?? true
	}

	public getShouldShowCancelButton() {
		return (
			(this.model.shouldShowCancelButton ?? true) &&
			this.getShouldShowSubmitControls()
		)
	}

	public showSubmitControls() {
		return this.getShowSubmitControls()
	}

	/**
	 * @deprecated shouldShowSubmitControls -> getShouldShowSubmitControls
	 */
	public shouldShowSubmitControls() {
		return this.getShouldShowSubmitControls()
	}

	/**
	 * @deprecated shouldShowCancelButton -> getShouldShowCancelButton
	 */
	public shouldShowCancelButton() {
		return this.getShouldShowCancelButton()
	}

	public getSubmitButtonLabel() {
		return this.model.submitButtonLabel as string
	}

	public async reset() {
		this.setErrorsByField({})
		await this.setValues(this.originalValues)
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

	public setSectionTitle(sectionIdx: number, title: string) {
		this.setSection(sectionIdx, {
			...this.getSection(sectionIdx),
			title,
		})
	}

	public setField(
		fieldName: SchemaFieldNames<S>,
		updates: {
			newName?: string
			fieldDefinition?: FieldDefinitions
			renderOptions?: Partial<FieldRenderOptions<Schema>>
		}
	) {
		const { newName } = updates ?? {}
		const missing: string[] = []
		let passedFieldName = fieldName

		if (!fieldName) {
			missing.push('fieldName')
		}

		if (!updates) {
			missing.push('updates')
		}

		if (missing.length) {
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: missing,
			})
		}

		const schema = this.getSchema()
		const oldDefinition = schema.fields?.[passedFieldName]

		if (!oldDefinition) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				friendlyMessage: `You can't update the field ${fieldName} because it does not exist.`,
				parameters: ['fieldName'],
			})
		}

		if (!schema.fields) {
			schema.fields = {}
		}

		if (newName) {
			schema.fields[newName] = schema.fields[passedFieldName]
			delete schema.fields[passedFieldName]
			passedFieldName = newName as any
		}

		if (updates.fieldDefinition) {
			//@ts-ignore
			schema.fields[passedFieldName] = updates.fieldDefinition
		}

		if (updates.renderOptions || newName) {
			let { sectionIdx, fieldIdx } =
				this.getSectionAndFieldForFieldNamed(fieldName)

			const newFields = [...(this.getSection(sectionIdx).fields ?? [])]

			newFields.splice(fieldIdx, 1, {
				...updates.renderOptions,
				name: passedFieldName,
			})

			this.setSection(sectionIdx, {
				...this.getSection(sectionIdx),
				fields: newFields,
			})
		}
	}

	public getField<N extends SchemaFieldNames<S>>(
		fieldName: N
	): { compiledOptions: CompiledFieldOptions<S, N> } {
		const { sectionIdx, fieldIdx } =
			this.getSectionAndFieldForFieldNamed(fieldName)

		if (sectionIdx === -1) {
			throw new SchemaError({
				code: 'INVALID_PARAMETERS',
				parameters: ['fieldName'],
				friendlyMessage: `I could not find a field being rendered called \`${fieldName}\``,
			})
		}

		const renderOptions = normalizeFormSectionFieldNamesUtil.toObjects(
			this.getSection(sectionIdx).fields ?? [],
			this.getSchema()
		)?.[fieldIdx]

		const options = {
			...renderOptions,
		}

		const isInPending = fieldName in this.pendingSets

		if (isInPending && 'renderedValue' in options) {
			options.renderedValue = this.pendingSets[fieldName]
		}

		return {
			compiledOptions: options as CompiledFieldOptions<S, N>,
		}
	}

	private getSectionAndFieldForFieldNamed(fieldName: string) {
		let fieldIdx = -1

		const sectionIdx = this.getSections().findIndex((s) => {
			const normalized = normalizeFormSectionFieldNamesUtil.toObjects(
				s.fields ?? []
			)

			fieldIdx = normalized.findIndex((n) => n.name === fieldName)

			return fieldIdx > -1
		})

		return { sectionIdx, fieldIdx }
	}

	public setSection(section: number | string, newSection: Section<S>) {
		assertOptions({ section, newSection }, ['section', 'newSection'])
		const old = this.assertValidSection(section)

		let idx =
			typeof section === 'string'
				? this.getSections().findIndex((s) => s.id === section)
				: section

		if (old.id) {
			newSection.id = old.id
		}
		this.model.sections[idx] = newSection

		this.triggerRender()
	}

	public removeSection(section: number | string) {
		this.assertValidSection(section)
		const sections = this.getSections().filter(
			(s, idx) => s.id !== section && idx !== section
		)
		this.setSections(sections)
	}

	public setSections(sections: Section<S>[]) {
		this.model.sections = sections
		this.triggerRender()
	}

	public async resetField<N extends SchemaFieldNames<S>>(name: N) {
		delete this.dirtyFields[name]
		await this._setValue<N>({
			name,
			value: this.originalValues?.[name] as any,
			shouldSetIsDirty: false,
		})
	}

	public getSections() {
		return this.model.sections
	}

	public getTotalSections(): number {
		return this.model.sections.length ?? 0
	}

	public getSection(idx: number | string) {
		return this.assertValidSection(idx)
	}

	private assertValidSection(idx: number | string) {
		let section: FormSection<S> | undefined

		if (typeof idx === 'string') {
			section = this.model.sections.find((s) => s.id === idx)
		} else {
			section = this.model.sections[idx]
		}

		if (!section) {
			throw new SchemaError({
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
			throw new SchemaError({
				code: 'MISSING_PARAMETERS',
				parameters: missing,
			})
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

	public getValue<N extends SchemaFieldNames<S>>(
		named: N,
		options?: GetValueOptions
	): SchemaValues<S>[N] {
		//@ts-ignore
		return this.getValues(options)[named]
	}

	public getValues(options?: GetValueOptions) {
		const { shouldIncludePendingValues: includePendingValues = false } =
			options ?? {}

		const visibleFields = this.getVisibleFields()
		const values = {}

		for (const field of visibleFields) {
			//@ts-ignore
			values[field] =
				includePendingValues && field in this.pendingSets
					? this.pendingSets[field]
					: this.model.values[field]
		}

		return values as SchemaPartialValues<S>
	}

	public setFooter(
		footer?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter | null
	) {
		if (!footer) {
			delete this.model.footer
		} else {
			this.model.footer = footer
		}
	}

	public isEnabled() {
		return this.model.footer?.isEnabled !== false
	}

	public render(): V {
		const view: V = {
			...this.model,
			onSubmit: async () => {
				if (this.isEnabled()) {
					await this.submit()
				}
			},
		}

		if (!this.getShouldShowSubmitControls()) {
			delete view.footer
		}

		return view
	}
}

type ViewModel<S extends Schema> =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<S>
type Section<S extends Schema = Schema> = ViewModel<S>['sections'][number]

export type FormViewControllerOptions<S extends Schema> = Pick<
	ViewModel<S>,
	| 'schema'
	| 'sections'
	| 'onSubmit'
	| 'onChange'
	| 'onCancel'
	| 'onWillChange'
	| 'shouldShowCancelButton'
	| 'shouldShowSubmitControls'
	| 'submitButtonLabel'
	| 'values'
	| 'footer'
	| 'isBusy'
	| 'isEnabled'
> &
	Partial<Pick<ViewModel<S>, 'id' | 'isBusy'>>

const cloneAndRetainControllers = function (obj: Record<string, any>) {
	return cloneDeep(obj, (value, key) => {
		if (key === 'controller' || key === 'vc') {
			return value
		}
	})
}

type GetValueOptions = {
	shouldIncludePendingValues?: boolean
}

type CompiledFieldOptions<
	S extends Schema,
	N extends SchemaFieldNames<S>
> = S['fields'][N] & FieldRenderOptions<S>
