import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const ratingsSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsSchema  = {
	id: 'ratings',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Ratings',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Value. A number between 0-1. */
	            'value': {
	                label: 'Value',
	                type: 'number',
	                hint: 'A number between 0-1.',
	                options: undefined
	            },
	            /** Can be changed. */
	            'canBeChanged': {
	                label: 'Can be changed',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Callback. */
	            'onChange': {
	                label: 'Callback',
	                type: 'raw',
	                options: {valueType: `(value: number) => any`,}
	            },
	            /** . */
	            'steps': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'leftLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'rightLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'middleLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'icon': {
	                type: 'select',
	                options: {choices: [{"value":"star","label":"Star"},{"value":"radio","label":"Radio"}],}
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(ratingsSchema)

export default ratingsSchema
