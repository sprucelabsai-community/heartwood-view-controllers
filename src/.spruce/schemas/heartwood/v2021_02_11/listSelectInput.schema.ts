
import { SpruceSchemas } from '../../schemas.types'

import selectInputChoiceSchema_v2021_02_11 from '#spruce/schemas/heartwood/v2021_02_11/selectInputChoice.schema'

const listSelectInputSchema: SpruceSchemas.Heartwood.v2021_02_11.ListSelectInputSchema  = {
	id: 'listSelectInput',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: '',
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



export default listSelectInputSchema
