import { Schema, SchemaFieldNames } from '@sprucelabs/schema'
import { SpruceSchemas } from '@sprucelabs/spruce-core-schemas'
import { FieldRenderOptions } from '../types/heartwood.types'

const normalizeFormSectionFieldNamesUtil = {
	toObject<S extends Schema = Schema>(
		fields: SpruceSchemas.Heartwood.v2021_02_11.FormSection<S>['fields']
	) {
		const normalized: FieldRenderOptions<S>[] =
			fields?.map((field) => {
				if (typeof field === 'string') {
					return { name: field }
				}

				return field
			}) ?? []

		return normalized
	},
	toNames<S extends Schema = Schema>(
		fields: SpruceSchemas.Heartwood.v2021_02_11.FormSection<S>['fields']
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
