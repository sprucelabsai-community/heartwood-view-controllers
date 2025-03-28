import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'webRtcPlayer',
    fields: {
        id: {
            type: 'id',
        },
        controller: {
            type: 'raw',
            options: {
                valueType:
                    'HeartwoodTypes.ViewController<HeartwoodTypes.WebRtcPlayer>',
            },
        },
        streamer: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.WebRtcStreamer',
            },
        },
    },
})
