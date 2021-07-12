import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import builderImportExportPageSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/builderImportExportPage.schema'

const formBuilderImportExportObjectSchema: SpruceSchemas.Heartwood.v2021_02_11.FormBuilderImportExportObjectSchema  = {
	id: 'formBuilderImportExportObject',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'form builder import export object',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Title. */
	            'title': {
	                label: 'Title',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** Subtitle. */
	            'subtitle': {
	                label: 'Subtitle',
	                type: 'text',
	                options: undefined
	            },
	            /** Pages. */
	            'pages': {
	                label: 'Pages',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: builderImportExportPageSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(formBuilderImportExportObjectSchema)

export default formBuilderImportExportObjectSchema
