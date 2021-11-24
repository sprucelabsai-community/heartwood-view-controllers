import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'



const listToggleInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInputSchema  = {
	id: 'listToggleInput',
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
	                type: 'boolean',
	                isPrivate: true,
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
	            /** On change handler. */
	            'onChange': {
	                label: 'On change handler',
	                type: 'raw',
	                options: {valueType: `(value?: boolean) => void | boolean | Promise<void | boolean>`,}
	            },
	            /** . */
	            'setValue': {
	                type: 'raw',
	                options: {valueType: `(name: string, value: any) => Promise<void> | void`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listToggleInputSchema)

export default listToggleInputSchema
