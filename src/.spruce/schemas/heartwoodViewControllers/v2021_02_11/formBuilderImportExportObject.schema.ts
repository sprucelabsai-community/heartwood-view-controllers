import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const formBuilderImportExportObjectSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportObjectSchema  = {
	id: 'formBuilderImportExportObject',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'form builder import export object',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
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
	                type: 'raw',
	                isRequired: true,
	                isArray: true,
	                options: {valueType: `SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPage<S>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(formBuilderImportExportObjectSchema)

export default formBuilderImportExportObjectSchema
