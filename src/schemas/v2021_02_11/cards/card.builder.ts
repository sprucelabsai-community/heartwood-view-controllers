import { buildSchema } from '@sprucelabs/schema'
import cardBodyBuilder from './cardBody.builder'
import cardFooterBuilder from './cardFooter.builder'
import cardHeaderBuilder from './cardHeader.builder'

export default buildSchema({
	id: 'card',
	name: 'Card',
	description: '',
	fields: {
		className: {
			type: 'text',
			isPrivate: true,
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.CardViewController',
			},
		},
		header: {
			type: 'schema',
			label: 'Header',
			options: {
				schema: cardHeaderBuilder,
			},
		},
		shouldFadeIn: {
			type: 'boolean',
			label: 'Fade in',
			defaultValue: true,
		},
		body: {
			type: 'schema',
			label: 'Body',
			hint: 'Card bodies are comprised of sections. You will want at least 1 to get started.',
			options: {
				schema: cardBodyBuilder,
			},
		},
		footer: {
			type: 'schema',
			label: 'Footer',
			options: {
				schema: cardFooterBuilder,
			},
		},
	},
})
