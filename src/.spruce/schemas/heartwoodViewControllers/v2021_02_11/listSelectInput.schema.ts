import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import selectInputChoiceSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/selectInputChoice.schema'

const listSelectInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInputSchema  = {
	id: 'listSelectInput',
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
	                type: 'raw',
	                isPrivate: true,
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
	            /** On change handle. */
	            'onChange': {
	                label: 'On change handle',
	                type: 'raw',
	                options: {valueType: `(value?: string) => void | Promise<void>`,}
	            },
	            /** Placeholder. */
	            'placeholder': {
	                label: 'Placeholder',
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'choices': {
	                type: 'schema',
	                isRequired: true,
	                isArray: true,
	                options: {schema: selectInputChoiceSchema_v2021_02_11,}
	            },
	            /** . */
	            'setValue': {
	                type: 'raw',
	                options: {valueType: `(name: string, value: any) => Promise<void> | void`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listSelectInputSchema)

export default listSelectInputSchema
