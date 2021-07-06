import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import dropdownButtonSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/dropdownButton.schema'
import cardSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/card.schema'

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
	                options: {schema: dropdownButtonSchema_v2021_02_11,}
	            },
	            /** . */
	            'card': {
	                type: 'schema',
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(dropdownSchema)

export default dropdownSchema
