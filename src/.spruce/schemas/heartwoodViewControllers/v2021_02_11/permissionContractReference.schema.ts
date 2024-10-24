import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const permissionContractReferenceSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReferenceSchema  = {
	id: 'permissionContractReference',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'raw',
	                options: {valueType: `MercuryTypes.PermissionContractId`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(permissionContractReferenceSchema)

export default permissionContractReferenceSchema
