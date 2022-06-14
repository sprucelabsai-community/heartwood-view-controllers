import { buildSchema } from '@sprucelabs/schema'
import sprucebotTypeMessageBuilder from './sprucebotTypedMessage.builder'

export default buildSchema({
	id: 'talkingSprucebot',
	name: 'Talking sprucebot',
	description: '',
	fields: {
		id: { type: 'id' },
		...sprucebotTypeMessageBuilder.fields,
		onComplete: {
			type: 'raw',
			label: 'Completion handler',
			options: {
				valueType: '() => Promise<void> | void',
			},
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.TalkingSprucebotViewController',
			},
		},
	},
})
