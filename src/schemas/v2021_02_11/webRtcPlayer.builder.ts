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
        shouldAllowCropping: {
            type: 'boolean',
        },
        onCrop: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.WebRtcPlayerCropHandler',
            },
        },
        onStateChange: {
            type: 'raw',
            options: {
                valueType: 'HeartwoodTypes.WebRtcStateChangeHandler',
            },
        },
        crop: {
            type: 'schema',
            options: {
                schema: buildSchema({
                    id: 'webRtcCropPoint',
                    fields: {
                        xPercent: {
                            type: 'number',
                            isRequired: true,
                        },
                        yPercent: {
                            type: 'number',
                            isRequired: true,
                        },
                        widthPercent: {
                            type: 'number',
                            isRequired: true,
                        },
                        heightPercent: {
                            type: 'number',
                            isRequired: true,
                        },
                    },
                }),
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
