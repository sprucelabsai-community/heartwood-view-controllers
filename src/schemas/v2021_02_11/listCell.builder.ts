import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from './button.builder'
import textInputBuilder from './forms/textInput.builder'
import lineIconBuilder from './lineIcon.builder'
import selectInputBuilder from './selectInput.builder'
import textBuilder from './text.builder'

export default buildSchema({
	id: 'listCell',
	name: 'List Cell',
	description: '',
	fields: {
		text: {
			type: 'schema',
			label: 'Text',
			options: {
				schema: textBuilder,
			},
		},
		subText: {
			type: 'schema',
			label: 'Subtext',
			options: {
				schema: textBuilder,
			},
		},
		image: {
			type: 'text',
			label: 'Image url',
		},
		button: {
			type: 'schema',
			label: 'Button',
			options: {
				schema: buttonBuilder,
			},
		},
		lineIcon: {
			type: 'select',
			label: 'Line icon',
			options: {
				...lineIconBuilder.fields.name.options,
			},
		},
		textInput: {
			type: 'schema',
			label: 'Text input',
			options: {
				schema: {
					id: 'listTextInput',
					fields: {
						...textInputBuilder.fields,
						setValue: {
							type: 'raw',
							options: {
								valueType: '(name: string, value: any) => void',
							},
						},
					},
				},
			},
		},
		selectInput: {
			type: 'schema',
			label: 'Select input',
			options: {
				schema: {
					id: 'listSelectInput',
					fields: {
						...selectInputBuilder.fields,
						setValue: {
							type: 'raw',
							options: {
								valueType: '(name: string, value: any) => void',
							},
						},
					},
				},
			},
		},
	},
})
