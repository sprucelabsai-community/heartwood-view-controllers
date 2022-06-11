import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const toggleInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToggleInputSchema  = {
	id: 'toggleInput',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Toggle input',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
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
	                type: 'boolean',
	                isPrivate: true,
	                options: undefined
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
	                options: {valueType: `(value: boolean) => void | boolean | Promise<void | boolean>`,}
	            },
	            /** On changed rendered value handler. */
	            'onChangeRenderedValue': {
	                label: 'On changed rendered value handler',
	                type: 'raw',
	                options: {valueType: `(value: any) => void | Promise<void>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(toggleInputSchema)

export default toggleInputSchema
