import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import latLngSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/latLng.schema'
import mapPinSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/mapPin.schema'

const mapSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapSchema  = {
	id: 'map',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Map',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'center': {
	                type: 'schema',
	                options: {schema: latLngSchema_v2021_02_11,}
	            },
	            /** . */
	            'zoom': {
	                type: 'select',
	                options: {choices: [{"label":"House/Building","value":"house"},{"label":"Neighborhood Block","value":"block"},{"label":"Long walk","value":"longWalk"},{"label":"Short drive","value":"shortDrive"},{"label":"City","value":"city"},{"label":"State","value":"state"}],}
	            },
	            /** . */
	            'pins': {
	                type: 'schema',
	                isArray: true,
	                minArrayLength: 0,
	                options: {schema: mapPinSchema_v2021_02_11,}
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.MapViewController`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(mapSchema)

export default mapSchema
