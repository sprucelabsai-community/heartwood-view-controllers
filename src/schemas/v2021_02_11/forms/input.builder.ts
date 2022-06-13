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
			options: {
				valueType: 'any',
			},
		},
		renderedValue: {
			type: 'raw',
			hint: `If you need the text input to render a value other than what is stored (a person's name vs. their id).`,
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
				valueType: '(value: any) => void | Promise<void | boolean> | boolean',
			},
		},
		onChangeRenderedValue: {
			type: 'raw',
			label: 'On changed rendered value handler',
			options: {
				valueType: '(value: any) => void | Promise<void | boolean> | boolean',
			},
		},
		onFocus: {
			type: 'raw',
			label: 'On focus handler',
			options: {
				valueType: '() => void | Promise<void>',
			},
		},
		onBlur: {
			type: 'raw',
			label: 'On blur handler',
			options: {
				valueType: '() => void | Promise<void>',
			},
		},
	},
})
