import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import inputButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/inputButton.schema'

const ratingsInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsInputSchema  = {
	id: 'ratingsInput',
	version: 'v2021_02_11',
	namespace: 'HeartwoodViewControllers',
	name: 'ratings input',
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
	                type: 'number',
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
	                options: {valueType: `(value: number) => any | Promise<any>`,}
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
	            /** Can be changed. */
	            'canBeChanged': {
	                label: 'Can be changed',
	                type: 'boolean',
	                options: undefined
	            },
	            /** . */
	            'steps': {
	                type: 'number',
	                options: undefined
	            },
	            /** . */
	            'leftLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'rightLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'middleLabel': {
	                type: 'text',
	                options: undefined
	            },
	            /** . */
	            'icon': {
	                type: 'select',
	                options: {choices: [{"value":"star","label":"Star"},{"value":"radio","label":"Radio"}],}
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(ratingsInputSchema)

export default ratingsInputSchema
