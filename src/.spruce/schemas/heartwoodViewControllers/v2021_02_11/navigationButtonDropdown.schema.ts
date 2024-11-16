import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import navigationDropdownButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/navigationDropdownButton.schema'

const navigationButtonDropdownSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationButtonDropdownSchema  = {
	id: 'navigationButtonDropdown',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
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
	                options: {schema: navigationDropdownButtonSchema_v2021_02_11,}
	            },
	            /** . */
	            'card': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.Card`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(navigationButtonDropdownSchema)

export default navigationButtonDropdownSchema
