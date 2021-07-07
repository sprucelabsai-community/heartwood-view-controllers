import { buildSchema } from '@sprucelabs/schema'
import formSectionBuilder from './formSection.builder'

export default buildSchema({
	id: 'formBuilderImportExportObject',
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
			type: 'schema',
			label: 'Pages',
			isRequired: true,
			isArray: true,
			options: {
				schema: {
					id: 'builderImportExportPage',
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
							type: 'schema',
							label: 'Sections',
							isRequired: true,
							isArray: true,
							options: {
								schema: formSectionBuilder,
							},
						},
					},
				},
			},
		},
	},
})
