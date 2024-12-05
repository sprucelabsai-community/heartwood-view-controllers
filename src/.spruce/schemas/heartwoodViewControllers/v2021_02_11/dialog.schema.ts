import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import cardHeaderSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardHeader.schema'
import criticalErrorSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/criticalError.schema'
import cardBodySchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardBody.schema'
import cardFooterSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardFooter.schema'

const dialogSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DialogSchema  = {
	id: 'dialog',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Dialog',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
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
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog>`,}
	            },
	            /** Header. */
	            'header': {
	                label: 'Header',
	                type: 'schema',
	                options: {schema: cardHeaderSchema_v2021_02_11,}
	            },
	            /** Critical error. */
	            'criticalError': {
	                label: 'Critical error',
	                type: 'schema',
	                options: {schema: criticalErrorSchema_v2021_02_11,}
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
	                options: {schema: cardBodySchema_v2021_02_11,}
	            },
	            /** Footer. */
	            'footer': {
	                label: 'Footer',
	                type: 'schema',
	                options: {schema: cardFooterSchema_v2021_02_11,}
	            },
	            /** Visible. */
	            'isVisible': {
	                label: 'Visible',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Show close button. */
	            'shouldShowCloseButton': {
	                label: 'Show close button',
	                type: 'boolean',
	                options: undefined
	            },
	            /** Card controller. */
	            'cardController': {
	                label: 'Card controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>`,}
	            },
	            /** Close callback. Called when the dialog is closed */
	            'onClose': {
	                label: 'Close callback',
	                type: 'raw',
	                hint: 'Called when the dialog is closed',
	                options: {valueType: `() => Promise<void | boolean> | void | boolean`,}
	            },
	            /** Close handler. Called to actually close the dialog */
	            'closeHandler': {
	                label: 'Close handler',
	                type: 'raw',
	                hint: 'Called to actually close the dialog',
	                options: {valueType: `() => Promise<void | boolean> | void | boolean`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(dialogSchema)

export default dialogSchema
