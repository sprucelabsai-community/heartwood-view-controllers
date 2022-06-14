import { buildDuration, buildSchema } from '@sprucelabs/schema'
import sprucebotAvatarSchema, { sizeChoices } from './sprucebotAvatar.builder'

const sprucebotTypeMessageBuilder = buildSchema({
	id: 'sprucebotTypedMessage',
	name: 'Sprucebot typed message',
	fields: {
		sentences: {
			type: 'schema',
			label: 'Sentences',
			isRequired: true,
			isArray: true,
			hint: 'Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold)',
			options: {
				schema: buildSchema({
					id: 'sprucebotTypedMessageSentence',
					name: 'Sprucebot Typed sentence',
					fields: {
						avatar: {
							type: 'schema',
							hint: 'A way to override the Sprucebot avatar for this sentence',
							options: {
								schema: sprucebotAvatarSchema,
							},
						},
						words: {
							type: 'text',
							label: 'Words',
							hint: 'The words being typed out',
							isRequired: true,
						},
						endDelay: {
							type: 'duration',
							label: 'End delay',
							hint: "How long should I hold on this sentence after it's typed?",
						},
					},
				}),
			},
		},
		avatar: {
			type: 'schema',
			label: 'Default avatar',
			hint: 'How should Sprucebot be rendered by default',
			options: {
				schema: {
					id: 'sprucebotTypedMessageAvatar',
					name: 'Typed message avatar',
					description:
						'Avatar that makes size optional for use with the Sprucebot Typed Message component',
					fields: {
						...sprucebotAvatarSchema.fields,
						size: {
							...sprucebotAvatarSchema.fields.size,
							isRequired: false,
						},
					},
				},
			},
		},
		startDelay: {
			type: 'duration',
			label: 'Start delay',
			hint: 'How long should I wait before starting to type?',
			defaultValue: buildDuration(1000),
		},
		shouldLoop: {
			type: 'boolean',
			label: 'Loop',
		},
		size: {
			type: 'select',
			label: 'Size',
			defaultValue: 'small',
			options: {
				choices: sizeChoices,
			},
		},
		isPlaying: {
			type: 'boolean',
			label: 'Playing',
		},
	},
})

export default sprucebotTypeMessageBuilder
