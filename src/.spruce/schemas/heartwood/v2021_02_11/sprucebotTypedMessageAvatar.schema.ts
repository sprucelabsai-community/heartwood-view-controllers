
import { SpruceSchemas } from '../../schemas.types'



const sprucebotTypedMessageAvatarSchema: SpruceSchemas.Heartwood.v2021_02_11.SprucebotTypedMessageAvatarSchema  = {
	id: 'sprucebotTypedMessageAvatar',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Typed message avatar',
	description: 'Avatar that makes size optional for use with the Sprucebot Typed Message component',
	    fields: {
	            /** Size. */
	            'size': {
	                label: 'Size',
	                type: 'select',
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



export default sprucebotTypedMessageAvatarSchema
