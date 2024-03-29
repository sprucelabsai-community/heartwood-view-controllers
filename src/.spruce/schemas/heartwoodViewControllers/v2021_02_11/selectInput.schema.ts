import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import inputButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/inputButton.schema'
import selectInputChoiceSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/selectInputChoice.schema'

const selectInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputSchema  = {
	id: 'selectInput',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'Select input',
	importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
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
	            /** . */
	            'rightButtons': {
	                type: 'schema',
	                isArray: true,
	                options: {schema: inputButtonSchema_v2021_02_11,}
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
	    }
}

SchemaRegistry.getInstance().trackSchema(selectInputSchema)

export default selectInputSchema
