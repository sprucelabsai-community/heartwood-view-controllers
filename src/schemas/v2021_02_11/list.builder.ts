import { buildSchema } from '@sprucelabs/schema'
import listCellBuilder from './listCell.builder'

export default buildSchema({
	id: 'list',
	name: 'list',
	description: '',
	fields: {
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
				choices: [
					{ label: 'Standard', value: 'standard' },
					{ label: 'Tall', value: 'tall' },
				],
			},
		},
		rows: {
			type: 'schema',
			label: 'Rows',
			options: {
				schema: {
					id: 'listRow',
					fields: {
						cells: {
							type: 'schema',
							label: 'Cells',
							isArray: true,
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
