import {
	Schema,
	SchemaFieldNames,
	FieldDefinitions,
	FieldType,
} from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { FieldRenderOptions } from '../types/heartwood.types'

const normalizeFormSectionFieldNamesUtil = {
	toObjects<S extends Schema = Schema>(
		fields: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>['fields'],
		schema?: Schema
	): (FieldRenderOptions<S> &
		Partial<FieldDefinitions> & {
			type: FieldType
			renderedValue?: any | null
		})[] {
		const normalized =
			fields?.map((field) => {
				let f = typeof field === 'string' ? { name: field } : field

				if (schema?.fields?.[f.name]) {
					f = {
						...schema?.fields?.[f.name],
						...f,
					}
				}

				return f
			}) ?? []

		return normalized as any
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
