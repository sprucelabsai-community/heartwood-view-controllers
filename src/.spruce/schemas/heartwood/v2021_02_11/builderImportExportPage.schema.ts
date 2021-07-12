import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import formSectionSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/formSection.schema'

const builderImportExportPageSchema: SpruceSchemas.Heartwood.v2021_02_11.BuilderImportExportPageSchema  = {
	id: 'builderImportExportPage',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
	    fields: {
	            /** Page title. */
	            'title': {
	                label: 'Page title',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Schema. */
	            'schema': {
	                label: 'Schema',
	                type: 'raw',
	                isRequired: true,
	                options: {valueType: `SpruceSchema.Schema`,}
	            },
	            /** Sections. */
	            'sections': {
	                label: 'Sections',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: formSectionSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(builderImportExportPageSchema)

export default builderImportExportPageSchema
