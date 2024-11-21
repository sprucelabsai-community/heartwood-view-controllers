import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import permissionContractReferenceSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/permissionContractReference.schema'
import routerDestinationSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/routerDestination.schema'

const navigationRouteSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationRouteSchema  = {
	id: 'navigationRoute',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'viewPermissionContract': {
	                type: 'schema',
	                options: {schema: permissionContractReferenceSchema_v2021_02_11,}
	            },
	            /** . */
	            'destination': {
	                type: 'schema',
	                isRequired: true,
	                options: {schema: routerDestinationSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(navigationRouteSchema)

export default navigationRouteSchema
