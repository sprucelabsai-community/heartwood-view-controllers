import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import buttonSchema from '#spruce/schemas/heartwood/v2021_02_11/button.schema'

const dropdownSchema: SpruceSchemas.Heartwood.v2021_02_11.DropdownSchema  = {
	id: 'dropdown',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Dropdown',
	    fields: {
	            /** Position. */
	            'position': {
	                label: 'Position',
	                type: 'select',
	                options: {choices: [{"label":"Bottom","value":"bottom"},{"label":"Top","value":"top"},{"label":"Right","value":"right"}],}
	            },
	            /** . */
	            'items': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: buttonSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(dropdownSchema)

export default dropdownSchema
