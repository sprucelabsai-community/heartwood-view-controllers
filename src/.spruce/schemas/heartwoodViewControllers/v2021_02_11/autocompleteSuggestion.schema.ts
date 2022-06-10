import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const autocompleteSuggestionSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteSuggestionSchema  = {
	id: 'autocompleteSuggestion',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: '',
	moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
	    fields: {
	            /** . */
	            'id': {
	                type: 'id',
	                isRequired: true,
	                options: undefined
	            },
	            /** . */
	            'label': {
	                type: 'text',
	                isRequired: true,
	                options: undefined
	            },
	            /** On click handler. */
	            'onClick': {
	                label: 'On click handler',
	                type: 'raw',
	                options: {valueType: `(id: string) => void | Promise<void>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(autocompleteSuggestionSchema)

export default autocompleteSuggestionSchema
