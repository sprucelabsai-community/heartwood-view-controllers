import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import buttonBarButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/buttonBarButton.schema'

const buttonBarSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarSchema  = {
	id: 'buttonBar',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Button bar',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ButtonBarViewController`,}
	            },
	            /** Buttons. */
	            'buttons': {
	                label: 'Buttons',
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: buttonBarButtonSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(buttonBarSchema)

export default buttonBarSchema
