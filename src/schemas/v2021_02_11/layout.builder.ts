import { buildSchema } from '@sprucelabs/schema'
import cardBuilder from './cards/card.builder'

export default buildSchema({
	id: 'layout',
	name: 'Layout',
	description: '',
	fields: {
		cards: {
			type: 'schema',
			label: 'Card',
			hint: 'Will render a card in this section',
			isArray: true,
			options: {
				schema: cardBuilder,
			},
		},
		className: {
			type: 'text',
			isPrivate: true,
		},
		shouldRenderAsGrid: {
			type: 'boolean',
			label: 'Grid',
			hint: 'Will force cards to render as grid.',
		},
		width: {
			type: 'select',
			label: 'Width',
			defaultValue: 'tight',
			options: {
				choices: [
					{
						value: 'wide',
						label: 'Wide',
					},
					{
						value: 'tight',
						label: 'Tight',
					},
					{
						value: 'full',
						label: 'Full width',
					},
				],
			},
		},
	},
})
