import { buildSchema } from '@sprucelabs/schema'
import listCellBuilder from './listCell.builder'

const heightChoices = [
	{ label: 'Standard', value: 'standard' },
	{ label: 'Tall', value: 'tall' },
	{ label: 'Content', value: 'content' },
]
export default buildSchema({
	id: 'list',
	name: 'list',
	description: '',
	fields: {
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.ListViewController',
			},
		},
		shouldRenderRowDividers: {
			type: 'boolean',
			label: 'Render row dividers',
		},
		columnWidths: {
			type: 'raw',
			label: 'Column widths',
			isArray: true,
			options: {
				valueType: `number | 'fill' | 'content'`,
			},
		},
		defaultRowHeight: {
			type: 'select',
			label: 'Row height',
			options: {
				choices: heightChoices,
			},
		},
		rows: {
			type: 'schema',
			label: 'Rows',
			isArray: true,
			isRequired: true,
			minArrayLength: 0,
			options: {
				schema: {
					id: 'listRow',
					fields: {
						controller: {
							type: 'raw',
							label: 'Controller',
							options: {
								valueType: 'HeartwoodTypes.ListRowViewController',
							},
						},
						height: {
							type: 'select',
							label: 'Row height',
							options: {
								choices: heightChoices,
							},
						},
						id: {
							type: 'id',
							label: 'Id',
						},
						cells: {
							type: 'schema',
							label: 'Cells',
							isArray: true,
							isRequired: true,
							options: {
								schema: listCellBuilder,
							},
						},
					},
				},
			},
		},
	},
})
