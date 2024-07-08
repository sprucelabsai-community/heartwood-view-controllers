import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import inputButtonSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/inputButton.schema'

const listRatingsInputSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInputSchema  = {
	id: 'listRatingsInput',
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
	            /** Steps. How many choices does a person have? Defaults to 5. */
	            'steps': {
	                label: 'Steps',
	                type: 'number',
	                hint: 'How many choices does a person have? Defaults to 5.',
	                options: undefined
	            },
	            /** Left Label. The label on the left side of the ratings. Usually assocatiated with the lowest rating. */
	            'leftLabel': {
	                label: 'Left Label',
	                type: 'text',
	                hint: 'The label on the left side of the ratings. Usually assocatiated with the lowest rating.',
	                options: undefined
	            },
	            /** Right Label. The label on the right side of the ratings. Usually associated with the highest rating. */
	            'rightLabel': {
	                label: 'Right Label',
	                type: 'text',
	                hint: 'The label on the right side of the ratings. Usually associated with the highest rating.',
	                options: undefined
	            },
	            /** Middle Label. The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common. */
	            'middleLabel': {
	                label: 'Middle Label',
	                type: 'text',
	                hint: 'The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common.',
	                options: undefined
	            },
	            /** Style. How should I render the ratings? Defaults to 'Star'. */
	            'icon': {
	                label: 'Style',
	                type: 'select',
	                hint: 'How should I render the ratings? Defaults to \'Star\'.',
	                options: {choices: [{"value":"star","label":"Star"},{"value":"radio","label":"Radio Buttons"}],}
	            },
	            /** . */
	            'controller': {
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>`,}
	            },
	            /** Cell button key down handler. */
	            'onKeyDown': {
	                label: 'Cell button key down handler',
	                type: 'raw',
	                options: {valueType: `(options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>`,}
	            },
	            /** . */
	            'setValue': {
	                type: 'raw',
	                options: {valueType: `(name: string, value: number) => Promise<any> | any`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(listRatingsInputSchema)

export default listRatingsInputSchema
