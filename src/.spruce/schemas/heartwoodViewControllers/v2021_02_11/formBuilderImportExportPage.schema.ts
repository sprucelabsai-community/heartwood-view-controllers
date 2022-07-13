import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const formBuilderImportExportPageSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPageSchema  = {
	id: 'formBuilderImportExportPage',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
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
	                type: 'raw',
	                isRequired: true,
	                isArray: true,
	                options: {valueType: `SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(formBuilderImportExportPageSchema)

export default formBuilderImportExportPageSchema
