import { buildSchema } from '@sprucelabs/schema'
import { feedSchema } from '@sprucelabs/spruce-core-schemas'

export default buildSchema({
	id: 'feed',
	name: 'Feed',
	fields: {
		...feedSchema.fields,
		onSubmitMessage: {
			type: 'raw',
			options: {
				valueType: 'HeartwoodTypes.OnSubmitFeedMessageHandler',
			},
		},
		controller: {
			type: 'raw',
			options: {
				valueType:
					'HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed>',
			},
		},
	},
})
