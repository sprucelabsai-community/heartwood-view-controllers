import { buildSchema } from '@sprucelabs/schema'
import { buttonFields } from '../../constants'

export default buildSchema({
	id: 'dropdown',
	name: 'Dropdown',
	description: '',
	fields: {
		position: {
			type: 'select',
			label: 'Position',
			options: {
				choices: [
					{
						label: 'Top',
						value: 'top',
					},
					{
						label: 'Right',
						value: 'right',
					},
					{
						label: 'Bottom',
						value: 'bottom',
					},
					{
						label: 'Left',
						value: 'left',
					},
				],
			},
		},
		items: {
			type: 'schema',
			isArray: true,
			options: {
				schema: {
					id: 'dropdownButton',
					fields: {
						...buttonFields,
						onClick: {
							type: 'raw',
							label: 'Click handler',
							options: {
								valueType:
									'(dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void',
							},
						},
					},
				},
			},
		},
		card: {
			type: 'raw',
			options: {
				valueType: 'HeartwoodTypes.Card',
			},
		},
	},
})
