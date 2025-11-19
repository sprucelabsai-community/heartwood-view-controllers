import { buildSchema } from '@sprucelabs/schema'

export default buildSchema({
    id: 'video',
    name: 'Video',
    fields: {
        src: {
            type: 'text',
            label: 'Source URL',
            isRequired: true,
        },
        type: {
            type: 'text',
            label: 'MIME type',
            hint: 'e.g. video/mp4, video/webm',
        },
        posterUrl: {
            type: 'text',
            label: 'Poster URL',
        },
        preload: {
            type: 'select',
            label: 'Preload',
            options: {
                choices: [
                    { value: 'none', label: 'None' },
                    { value: 'metadata', label: 'Metadata' },
                    { value: 'auto', label: 'Auto' },
                ],
            },
        },
        shouldAutoPlay: {
            type: 'boolean',
            label: 'Autoplay',
        },
        isMuted: {
            type: 'boolean',
            label: 'Muted',
        },
        shouldLoop: {
            type: 'boolean',
            label: 'Loop video',
        },
        hasControls: {
            type: 'boolean',
            label: 'Show controls',
            defaultValue: true,
        },
        shouldPlayInline: {
            type: 'boolean',
            label: 'Play inline',
            hint: 'Use inline playback on mobile (playsInline)',
        },
    },
})
