import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listDateInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListDateInputSchema  = {
	id: 'listDateInput',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
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
	                type: 'text',
	                options: undefined
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
	                options: {valueType: `(value: string) => void | Promise<void>`,}
	            },
	            /** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
	            'renderedValue': {
	                type: 'text',
	                hint: 'If you need the text input to render a value other than what is stored (a person\'s name vs. their id).',
	                options: undefined
	            },
	            /** On changed rendered value handler. */
	            'onChangeRenderedValue': {
	                label: 'On changed rendered value handler',
	                type: 'raw',
	                options: {valueType: `(value: string) => void | Promise<void>`,}
	            },
	            /** Placeholder. */
	            'placeholder': {
	                label: 'Placeholder',
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'setValue': {
	                type: 'raw',
	                options: {valueType: `(name: string, value: number) => Promise<any> | any`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listDateInputSchema)

export default listDateInputSchema
