import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const videoSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.VideoSchema  = {
	id: 'video',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Video',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Source URL. */
	            'src': {
	                label: 'Source URL',
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** MIME type. e.g. video/mp4, video/webm */
	            'type': {
	                label: 'MIME type',
	                type: 'text',
	                hint: 'e.g. video/mp4, video/webm',
	                options: undefined
	            },
	            /** Poster URL. */
	            'posterUrl': {
	                label: 'Poster URL',
	                type: 'text',
	                options: undefined
	            },
	            /** Preload. */
	            'preload': {
	                label: 'Preload',
	                type: 'select',
	                options: {choices: [{"value":"none","label":"None"},{"value":"metadata","label":"Metadata"},{"value":"auto","label":"Auto"}],}
	            },
	            /** Autoplay. */
	            'shouldAutoPlay': {
	                label: 'Autoplay',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Muted. */
	            'isMuted': {
	                label: 'Muted',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Loop video. */
	            'shouldLoop': {
	                label: 'Loop video',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Show controls. */
	            'hasControls': {
	                label: 'Show controls',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Play inline. Use inline playback on mobile (playsInline) */
	            'shouldPlayInline': {
	                label: 'Play inline',
	                type: 'boolean',
	                hint: 'Use inline playback on mobile (playsInline)',
	                options: undefined
	            },
	            /** Start time (s). */
	            'startTime': {
	                label: 'Start time (s)',
	                type: 'number',
	                options: undefined
	            },
	            /** End time (s). */
	            'endTime': {
	                label: 'End time (s)',
	                type: 'number',
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(videoSchema)

export default videoSchema
