import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'button',
	name: 'Button',
	description: '',
	fields: {
		label: {
			type: 'text',
			label: 'Label',
		},
		controller: {
			type: 'raw',
			options: {
				valueType: 'HeartwoodTypes.ButtonController',
			},
		},
		isSelected: {
			type: 'boolean',
			label: 'Selected',
		},
		isEnabled: {
			type: 'boolean',
			label: 'Selected',
			defaultValue: true,
		},
		shouldQueueShow: {
			type: 'boolean',
			label: 'Add to fade-in queue.',
			hint: 'Fade in effect could change.',
		},
		type: {
			type: 'select',
			label: 'Type',
			defaultValue: 'secondary',
			options: {
				choices: [
					{
						value: 'primary',
						label: 'Primary',
					},
					{
						value: 'secondary',
						label: 'Secondary',
					},
				],
			},
		},
		image: {
			type: 'text',
			label: 'Image',
		},
		dropdown: {
			type: 'schema',
			label: 'Dropdown',
			options: {
				schemaId: { id: 'dropdown' },
			},
		},
		onClick: {
			type: 'raw',
			label: 'Click handler',
			options: {
				valueType: '() => Promise<void> | void',
			},
		},
	},
})
