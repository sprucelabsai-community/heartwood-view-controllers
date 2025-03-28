import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



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
	            'streamer': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.WebRtcStreamer`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(webRtcPlayerSchema)

export default webRtcPlayerSchema
