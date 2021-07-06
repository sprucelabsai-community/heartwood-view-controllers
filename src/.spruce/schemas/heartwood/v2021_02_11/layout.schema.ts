
import { SpruceSchemas } from '../../schemas.types'

import cardSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/card.schema'

const layoutSchema: SpruceSchemas.Heartwood.v2021_02_11.LayoutSchema  = {
	id: 'layout',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Layout',
	    fields: {
	            /** Card. Will render a card in this section */
	            'cards': {
	                label: 'Card',
	                type: 'schema',
	                hint: 'Will render a card in this section',
	                isArray: true,
	                options: {schema: cardSchema_v2021_02_11,}
	            },
	            /** . */
	            'className': {
	                type: 'text',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Grid. Will force cards to render as grid. */
	            'shouldRenderAsGrid': {
	                label: 'Grid',
	                type: 'boolean',
	                hint: 'Will force cards to render as grid.',
	                options: undefined
	            },
	            /** Width. */
	            'width': {
	                label: 'Width',
	                type: 'select',
	                defaultValue: "tight",
	                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
	            },
	    }
}



export default layoutSchema
