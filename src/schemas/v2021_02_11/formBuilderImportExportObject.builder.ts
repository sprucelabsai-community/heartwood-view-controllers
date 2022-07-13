import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'formBuilderImportExportObject',
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	name: 'form builder import export object',
	description: '',
	fields: {
		title: {
			type: 'text',
			label: 'Title',
			isRequired: true,
		},
		subtitle: {
			type: 'text',
			label: 'Subtitle',
		},
		pages: {
			type: 'raw',
			isArray: true,
			isRequired: true,
			label: 'Pages',
			options: {
				valueType:
					'SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPage<S>',
			},
		},
	},
})
