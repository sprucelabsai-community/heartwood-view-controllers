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
	            /** Steps. How many choices does a person have? Defaults to 5. */
	            'steps': {
	                label: 'Steps',
	                type: 'number',
	                hint: 'How many choices does a person have? Defaults to 5.',
	                options: undefined
	            },
	            /** Left Label. The label on the left side of the ratings. Usually assocatiated with the lowest rating. */
	            'leftLabel': {
	                label: 'Left Label',
	                type: 'text',
	                hint: 'The label on the left side of the ratings. Usually assocatiated with the lowest rating.',
	                options: undefined
	            },
	            /** Right Label. The label on the right side of the ratings. Usually associated with the highest rating. */
	            'rightLabel': {
	                label: 'Right Label',
	                type: 'text',
	                hint: 'The label on the right side of the ratings. Usually associated with the highest rating.',
	                options: undefined
	            },
	            /** Middle Label. The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common. */
	            'middleLabel': {
	                label: 'Middle Label',
	                type: 'text',
	                hint: 'The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common.',
	                options: undefined
	            },
	            /** Style. How should I render the ratings? Defaults to 'Star'. */
	            'icon': {
	                label: 'Style',
	                type: 'select',
	                hint: 'How should I render the ratings? Defaults to \'Star\'.',
	                options: {choices: [{"value":"star","label":"Star"},{"value":"radio","label":"Radio Buttons"}],}
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
