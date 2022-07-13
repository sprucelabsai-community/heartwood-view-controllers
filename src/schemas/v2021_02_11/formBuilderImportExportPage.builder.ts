export const formBuilderImportExportPage = {
	id: 'formBuilderImportExportPage',
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	fields: {
		title: {
			type: 'text',
			label: 'Page title',
			isRequired: true,
		},
		schema: {
			type: 'raw',
			label: 'Schema',
			isRequired: true,
			options: {
				valueType: 'SpruceSchema.Schema',
			},
		},
		sections: {
			type: 'raw',
			label: 'Sections',
			isRequired: true,
			isArray: true,
			options: {
				valueType:
					'SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>',
			},
		},
	},
}

export default formBuilderImportExportPage
