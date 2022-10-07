import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listTextInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInputSchema  = {
	id: 'listTextInput',
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
	            /** Placeholder. */
	            'placeholder': {
	                label: 'Placeholder',
	                type: 'text',
	                options: undefined
	            },
	            /** Cell button key down handler. */
	            'onKeyDown': {
	                label: 'Cell button key down handler',
	                type: 'raw',
	                options: {valueType: `(options: { rowVc: HeartwoodTypes.ListRowViewController, key: HeartwoodTypes.KeyboardKey }) => any | Promise<any>`,}
	            },
	            /** . */
	            'setValue': {
	                type: 'raw',
	                options: {valueType: `(name: string, value: string) => Promise<any> | any`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listTextInputSchema)

export default listTextInputSchema
