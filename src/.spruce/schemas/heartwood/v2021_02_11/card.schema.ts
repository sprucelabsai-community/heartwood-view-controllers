import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import cardHeaderSchema from '#spruce/schemas/heartwood/v2021_02_11/cardHeader.schema'
import cardBodySchema from '#spruce/schemas/heartwood/v2021_02_11/cardBody.schema'
import cardFooterSchema from '#spruce/schemas/heartwood/v2021_02_11/cardFooter.schema'

const cardSchema: SpruceSchemas.Heartwood.v2021_02_11.CardSchema  = {
	id: 'card',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Card',
	    fields: {
	            /** . */
	            'className': {
	                type: 'text',
	                isPrivate: true,
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.CardViewController`,}
	            },
	            /** Header. */
	            'header': {
	                label: 'Header',
	                type: 'schema',
	                options: {schema: cardHeaderSchema,}
	            },
	            /** Fade in. */
	            'shouldFadeIn': {
	                label: 'Fade in',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
	            'body': {
	                label: 'Body',
	                type: 'schema',
	                hint: 'Card bodies are comprised of sections. You will want at least 1 to get started.',
	                options: {schema: cardBodySchema,}
	            },
	            /** Footer. */
	            'footer': {
	                label: 'Footer',
	                type: 'schema',
	                options: {schema: cardFooterSchema,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardSchema)

export default cardSchema
