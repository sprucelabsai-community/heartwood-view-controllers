import {
	Schema,
	SchemaFieldNames,
	FieldDefinitions,
	FieldType,
} from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { FieldRenderOptions, FormSection } from '../types/heartwood.types'

type NormalizedField<S extends Schema> = Partial<FieldDefinitions> & {
	type: FieldType
	renderedValue?: any | null
	renderOptions: FieldRenderOptions<S>
}

const normalizeFormSectionFieldNamesUtil = {
	toObjects<S extends Schema = Schema>(
		fields: FormSection<S>['fields'],
		schema?: Schema
	): NormalizedField<S>[] {
		const normalized: NormalizedField<S>[] = []

		fields?.forEach((field) => {
			let f = typeof field === 'string' ? { name: field } : field
			const match = schema?.fields?.[f.name]
			normalized.push({
				...match!,
				renderOptions: f,
			})
		})

		return normalized
	},
	toNames<S extends Schema = Schema>(
		fields: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>['fields']
	) {
		const normalized: SchemaFieldNames<S>[] =
			fields?.map((field) => {
				if (typeof field === 'string') {
					return field
				}

				return field.name
			}) ?? []

		return normalized
	},
}

export default normalizeFormSectionFieldNamesUtil
