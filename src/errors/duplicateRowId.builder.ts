import { buildErrorSchema } from '@sprucelabs/schema'

export default buildErrorSchema({
	id: 'duplicateRowId',
	name: 'Duplicate row id',
	fields: {
		rowId: {
			type: 'id',
			isRequired: true,
		},
	},
})
