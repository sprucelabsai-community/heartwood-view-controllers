import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import dropdownButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/dropdownButton.schema'

const dropdownSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownSchema  = {
	id: 'dropdown',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Dropdown',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Position. */
	            'position': {
	                label: 'Position',
	                type: 'select',
	                options: {choices: [{"label":"Top","value":"top"},{"label":"Right","value":"right"},{"label":"Bottom","value":"bottom"},{"label":"Left","value":"left"}],}
	            },
	            /** . */
	            'items': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: dropdownButtonSchema_v2021_02_11,}
	            },
	            /** . */
	            'card': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.Card`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(dropdownSchema)

export default dropdownSchema
