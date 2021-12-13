import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'ratings',
	name: 'Ratings',
	fields: {
		value: {
			type: 'number',
			label: 'Value',
			hint: 'A number between 0-1.',
		},
		canBeChanged: {
			type: 'boolean',
			label: 'Can be changed',
		},
		onChange: {
			type: 'raw',
			label: 'Callback',
			options: {
				valueType: '(value: number) => any',
			},
		},
		renderAs: {
			type: 'select',
			label: 'Stars or Smilies',
			options: {
				choices: [
					{
						value: 'stars',
						label: 'Stars',
					},
					{
						value: 'smilies',
						label: 'Smilies',
					},
				],
			},
		},
	},
})
