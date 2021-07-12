import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const textSchema: SpruceSchemas.Heartwood.v2021_02_11.TextSchema  = {
	id: 'text',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Text',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
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

SchemaRegistry.getInstance().trackSchema(textSchema)

export default textSchema
