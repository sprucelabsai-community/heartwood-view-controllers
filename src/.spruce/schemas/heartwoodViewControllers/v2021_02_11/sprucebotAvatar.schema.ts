import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const sprucebotAvatarSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatarSchema  = {
	id: 'sprucebotAvatar',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Sprucebot avatar',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Size. */
	            'size': {
	                label: 'Size',
	                type: 'select',
	                isRequired: true,
	                defaultValue: "medium",
	                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
	            },
	            /** State of mind. */
	            'stateOfMind': {
	                label: 'State of mind',
	                type: 'select',
	                isRequired: true,
	                defaultValue: "chill",
	                options: {choices: [{"value":"chill","label":"Chill - Sprucebot is saying something informative or a salutation"},{"value":"contemplative","label":"Contemplative - Sprucebot is loading or sending data"},{"value":"accomplished","label":"Accomplished - Sprucebot is celebrating because a process has finished"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(sprucebotAvatarSchema)

export default sprucebotAvatarSchema
