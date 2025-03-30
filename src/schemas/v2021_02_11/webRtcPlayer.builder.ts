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
        connection: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.WebRtcConnection',
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
