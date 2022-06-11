import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'input',
	name: 'Input wrapper',
	description:
		'Wraps all inputs in form with things like labels, hints, and error messages.',
	fields: {
		id: {
			type: 'id',
		},
		name: {
			type: 'text',
			isRequired: true,
		},
		value: {
			type: 'raw',
			isPrivate: true,
			options: {
				valueType: 'any',
			},
		},
		label: {
			type: 'text',
			label: 'Label',
		},
		hint: {
			type: 'text',
			label: 'Hint',
		},
		isRequired: {
			type: 'boolean',
			label: 'Required',
		},
		isInteractive: {
			type: 'boolean',
		},
		onChange: {
			type: 'raw',
			label: 'On change handler',
			options: {
				valueType: '(value: any) => void | Promise<void>',
			},
		},
		onChangeRenderedValue: {
			type: 'raw',
			label: 'On changed rendered value handler',
			options: {
				valueType: '(value: any) => void | Promise<void>',
			},
		},
	},
})
