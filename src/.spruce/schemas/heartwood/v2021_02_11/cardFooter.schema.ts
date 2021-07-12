import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import buttonSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/button.schema'

const cardFooterSchema: SpruceSchemas.Heartwood.v2021_02_11.CardFooterSchema  = {
	id: 'cardFooter',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.Heartwood.v2021_02_11.CardFooter>`,}
	            },
	            /** Buttons. */
	            'buttons': {
	                label: 'Buttons',
	                type: 'schema',
	                isArray: true,
	                options: {schema: buttonSchema_v2021_02_11,}
	            },
	            /** Loading. */
	            'isLoading': {
	                label: 'Loading',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Loading. */
	            'isEnabled': {
	                label: 'Loading',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Show border. */
	            'shouldRenderBorder': {
	                label: 'Show border',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardFooterSchema)

export default cardFooterSchema
