import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import sprucebotAvatarSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/sprucebotAvatar.schema'

const sprucebotTypedMessageSentenceSchema: SpruceSchemas.Heartwood.v2021_02_11.SprucebotTypedMessageSentenceSchema  = {
	id: 'sprucebotTypedMessageSentence',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Sprucebot Typed sentence',
	    fields: {
	            /** . A way to override the Sprucebot avatar for this sentence */
	            'avatar': {
	                type: 'schema',
	                hint: 'A way to override the Sprucebot avatar for this sentence',
	                options: {schema: sprucebotAvatarSchema_v2021_02_11,}
	            },
	            /** Words. The words being typed out */
	            'words': {
	                label: 'Words',
	                type: 'text',
	                isRequired: true,
	                hint: 'The words being typed out',
	                options: undefined
	            },
	            /** End delay. How long should I hold on this sentence after it's typed? */
	            'endDelay': {
	                label: 'End delay',
	                type: 'duration',
	                hint: 'How long should I hold on this sentence after it\'s typed?',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(sprucebotTypedMessageSentenceSchema)

export default sprucebotTypedMessageSentenceSchema
