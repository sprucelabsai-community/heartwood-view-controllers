import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from './button.builder'
import lineIconBuilder from './lineIcon.builder'
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
	},
})
