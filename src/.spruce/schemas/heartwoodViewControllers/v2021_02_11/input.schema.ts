import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const inputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputSchema  = {
	id: 'input',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Input wrapper',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	description: 'Wraps all inputs in form with things like labels, hints, and error messages.',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                options: undefined
	            },
	            /** . */
	            'name': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'value': {
	                type: 'raw',
	                options: {valueType: `any`,}
	            },
	            /** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
	            'renderedValue': {
	                type: 'raw',
	                hint: 'If you need the text input to render a value other than what is stored (a person\'s name vs. their id).',
	                options: {valueType: `any`,}
	            },
	            /** Label. */
	            'label': {
	                label: 'Label',
	                type: 'text',
	                options: undefined
	            },
	            /** Hint. */
	            'hint': {
	                label: 'Hint',
	                type: 'text',
	                options: undefined
	            },
	            /** Required. */
	            'isRequired': {
	                label: 'Required',
	                type: 'boolean',
	                options: undefined
	            },
	            /** . */
	            'isInteractive': {
	                type: 'boolean',
	                options: undefined
	            },
	            /** On change handler. */
	            'onChange': {
	                label: 'On change handler',
	                type: 'raw',
	                options: {valueType: `(value: any) => void | Promise<void | boolean> | boolean`,}
	            },
	            /** On changed rendered value handler. */
	            'onChangeRenderedValue': {
	                label: 'On changed rendered value handler',
	                type: 'raw',
	                options: {valueType: `(value: any) => void | Promise<void | boolean> | boolean`,}
	            },
	            /** On focus handler. */
	            'onFocus': {
	                label: 'On focus handler',
	                type: 'raw',
	                options: {valueType: `() => void | Promise<void>`,}
	            },
	            /** On blur handler. */
	            'onBlur': {
	                label: 'On blur handler',
	                type: 'raw',
	                options: {valueType: `() => void | Promise<void>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(inputSchema)

export default inputSchema
