import { buildSchema } from '@sprucelabs/schema'
import buttonBuilder from '../button.builder'
import cardBodyBuilder from './cardBody.builder'
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
				schema: buildSchema({
					id: 'cardFooter',
					fields: {
						controller: {
							type: 'raw',
							label: 'Controller',
							options: {
								valueType:
									'HeartwoodTypes.ViewController<SpruceSchemas.Heartwood.v2021_02_11.CardFooter>',
							},
						},
						buttons: {
							type: 'schema',
							label: 'Buttons',
							isArray: true,
							options: {
								schema: buttonBuilder,
							},
						},
						isLoading: {
							type: 'boolean',
							label: 'Loading',
						},
						isEnabled: {
							type: 'boolean',
							label: 'Loading',
							defaultValue: true,
						},
						shouldRenderBorder: {
							type: 'boolean',
							label: 'Show border',
							defaultValue: true,
						},
					},
				}),
			},
		},
	},
})
