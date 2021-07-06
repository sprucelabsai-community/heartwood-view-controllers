
import { SpruceSchemas } from '../../schemas.types'



const textSchema: SpruceSchemas.Heartwood.v2021_02_11.TextSchema  = {
	id: 'text',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Text',
	    fields: {
	            /** Text. */
	            'content': {
	                label: 'Text',
	                type: 'text',
	                options: undefined
	            },
	            /** Html. */
	            'html': {
	                label: 'Html',
	                type: 'text',
	                options: undefined
	            },
	            /** Align. */
	            'align': {
	                label: 'Align',
	                type: 'select',
	                defaultValue: "left",
	                options: {choices: [{"value":"left","label":"Left"},{"value":"right","label":"Right"}],}
	            },
	    }
}



export default textSchema
