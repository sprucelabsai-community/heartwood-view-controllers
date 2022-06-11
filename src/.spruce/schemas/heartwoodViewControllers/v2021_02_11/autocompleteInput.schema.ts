import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import autocompleteSuggestionSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/autocompleteSuggestion.schema'

const autocompleteInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInputSchema  = {
	id: 'autocompleteInput',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Autocomplete input',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
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
	                options: {valueType: `(value: any) => void | Promise<void>`,}
	            },
	            /** On changed rendered value handler. */
	            'onChangeRenderedValue': {
	                label: 'On changed rendered value handler',
	                type: 'raw',
	                options: {valueType: `(value: any) => void | Promise<void>`,}
	            },
	            /** Placeholder. */
	            'placeholder': {
	                label: 'Placeholder',
	                type: 'text',
	                options: undefined
	            },
	            /** Controller. */
	            'controller': {
	                label: 'Controller',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.FormInputViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInput>`,}
	            },
	            /** . */
	            'suggestions': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: autocompleteSuggestionSchema_v2021_02_11,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(autocompleteInputSchema)

export default autocompleteInputSchema
