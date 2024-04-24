import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const latLngSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LatLngSchema  = {
	id: 'latLng',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'lat': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'lng': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(latLngSchema)

export default latLngSchema
