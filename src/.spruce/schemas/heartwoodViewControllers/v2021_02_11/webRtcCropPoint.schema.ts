import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const webRtcCropPointSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcCropPointSchema  = {
	id: 'webRtcCropPoint',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'xPercent': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'yPercent': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'widthPercent': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'heightPercent': {
	                type: 'number',
	                isRequired: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(webRtcCropPointSchema)

export default webRtcCropPointSchema
