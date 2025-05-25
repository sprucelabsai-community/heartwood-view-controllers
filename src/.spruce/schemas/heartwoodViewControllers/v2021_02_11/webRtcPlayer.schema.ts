import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import webRtcCropPointSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/webRtcCropPoint.schema'

const webRtcPlayerSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcPlayerSchema  = {
	id: 'webRtcPlayer',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.WebRtcPlayer>`,}
	            },
	            /** . */
	            'shouldAllowCropping': {
	                type: 'boolean',
	                options: undefined
	            },
	            /** . */
	            'onCrop': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.WebRtcPlayerCropHandler`,}
	            },
	            /** . */
	            'onStateChange': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.WebRtcStateChangeHandler`,}
	            },
	            /** . */
	            'crop': {
	                type: 'schema',
	                options: {schema: webRtcCropPointSchema_v2021_02_11,}
	            },
	            /** . */
	            'connection': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.WebRtcConnection`,}
	            },
	            /** . */
	            'streamer': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.WebRtcStreamer`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(webRtcPlayerSchema)

export default webRtcPlayerSchema
