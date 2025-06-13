import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import cardFooterButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardFooterButton.schema'
import pagerSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/pager.schema'

const cardFooterSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema  = {
	id: 'cardFooter',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter>`,}
	            },
	            /** Buttons. */
	            'buttons': {
	                label: 'Buttons',
	                type: 'schema',
	                isArray: true,
	                options: {schema: cardFooterButtonSchema_v2021_02_11,}
	            },
	            /** Loading. */
	            'isBusy': {
	                label: 'Loading',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Sticky. */
	            'isSticky': {
	                label: 'Sticky',
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
	            /** Pager. */
	            'pager': {
	                label: 'Pager',
	                type: 'schema',
	                options: {schema: pagerSchema_v2021_02_11,}
	            },
	            /** Show border. */
	            'shouldRenderBorder': {
	                label: 'Show border',
	                type: 'boolean',
	                defaultValue: true,
	                options: undefined
	            },
	            /** Layout. */
	            'layout': {
	                label: 'Layout',
	                type: 'select',
	                options: {choices: [{"value":"vertical","label":"Vertical"},{"value":"horizontal","label":"Horizontal"}],}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(cardFooterSchema)

export default cardFooterSchema
