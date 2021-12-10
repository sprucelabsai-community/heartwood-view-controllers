import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
	id: 'stats',
	name: 'Stats',
	fields: {
		valuePrefix: {
			type: 'text',
			label: 'Prefix',
			hint: 'Will be rendered before the value. Could be a $ or something else.',
		},
		shouldFormatValues: {
			type: 'boolean',
			label: 'Format values',
			hint: 'Add commas to numbers.',
		},
		stats: {
			type: 'schema',
			label: 'Stats',
			isRequired: true,
			isArray: true,
			options: {
				schema: {
					id: 'statsStat',
					fields: {
						value: {
							type: 'number',
						},
						label: {
							type: 'text',
						},
					},
				},
			},
		},
	},
})
