import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from '../button.builder'
import cardBodyBuilder from './cardBody.builder'
import cardFooterBuilder from './cardFooter.builder'
import cardHeaderBuilder from './cardHeader.builder'

export default buildSchema({
	id: 'card',
	name: 'Card',
	description: '',
	fields: {
		id: {
			type: 'id',
		},
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
		criticalError: {
			type: 'schema',
			label: 'Critical error',
			options: {
				schema: {
					id: 'criticalError',
					fields: {
						title: {
							type: 'text',
						},
						message: {
							type: 'text',
						},
						buttons: {
							type: 'schema',
							isArray: true,
							options: {
								schema: buttonBuilder,
							},
						},
					},
				},
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
