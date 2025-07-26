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
	            /** Style. */
	            'style': {
	                label: 'Style',
	                type: 'select',
	                options: {choices: [{"value":"standard","label":"Standard"},{"value":"informational","label":"Informational"},{"value":"visual","label":"Visual"},{"value":"heading","label":"Heading"}],}
	            },
	            /** Background image. The URL of an image to use as the background of the card. */
	            'backgroundImage': {
	                label: 'Background image',
	                type: 'text',
	                hint: 'The URL of an image to use as the background of the card.',
	                options: undefined
	            },
	            /** Background image size. */
	            'backgroundImageSize': {
	                label: 'Background image size',
	                type: 'select',
	                options: {choices: [{"value":"cover","label":"Cover"},{"value":"contain","label":"Contain"}],}
	            },
	            /** Click handler. */
	            'onClick': {
	                label: 'Click handler',
	                type: 'raw',
	                options: {valueType: `() => Promise<any> | any`,}
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
	            /** Width. */
	            'width': {
	                label: 'Width',
	                type: 'select',
	                defaultValue: "tight",
	                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
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
