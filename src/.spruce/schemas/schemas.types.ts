/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable import/order */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'

import * as HeartwoodTypes from '../../'
import * as MercuryTypes from '@sprucelabs/mercury-types'

declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToggleInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: boolean | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: boolean) => void | boolean | Promise<void | boolean>) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
		}

		interface ToggleInputSchema extends SpruceSchema.Schema {
			id: 'toggleInput',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Toggle input',
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
			                options: {valueType: `(value: boolean) => void | boolean | Promise<void | boolean>`,}
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
			            },
			    }
		}

		interface ToggleInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToggleInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface TextInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: string | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Placeholder. */
				'placeholder'?: string | undefined | null
		}

		interface TextInputSchema extends SpruceSchema.Schema {
			id: 'textInput',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Text input',
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
			            /** . */
			            'rightButtons': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
			            },
			            /** Placeholder. */
			            'placeholder': {
			                label: 'Placeholder',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface TextInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface RatingsInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: number | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: number) => any | Promise<any>) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Can be changed. */
				'canBeChanged'?: boolean | undefined | null
				/** Steps. How many choices does a person have? Defaults to 5. */
				'steps'?: number | undefined | null
				/** Left Label. The label on the left side of the ratings. Usually assocatiated with the lowest rating. */
				'leftLabel'?: string | undefined | null
				/** Right Label. The label on the right side of the ratings. Usually associated with the highest rating. */
				'rightLabel'?: string | undefined | null
				/** Middle Label. The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common. */
				'middleLabel'?: string | undefined | null
				/** Style. How should I render the ratings? Defaults to 'Star'. */
				'icon'?: ("star" | "radio") | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>) | undefined | null
		}

		interface RatingsInputSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			    }
		}

		interface RatingsInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface PhoneInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: (any) | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
		}

		interface PhoneInputSchema extends SpruceSchema.Schema {
			id: 'phoneInput',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Phone input',
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
			            },
			    }
		}

		interface PhoneInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PhoneInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		/** Wraps all inputs in form with things like labels, hints, and error messages. */
		interface Input {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: (any) | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
		}

		interface InputSchema extends SpruceSchema.Schema {
			id: 'input',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Input wrapper',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			description: 'Wraps all inputs in form with things like labels, hints, and error messages.',
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
			            },
			    }
		}

		interface InputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface WebRtcCropPoint {
			
				
				'xPercent': number
				
				'yPercent': number
				
				'widthPercent': number
				
				'heightPercent': number
		}

		interface WebRtcCropPointSchema extends SpruceSchema.Schema {
			id: 'webRtcCropPoint',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'xPercent': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'yPercent': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'widthPercent': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'heightPercent': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface WebRtcCropPointEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcCropPointSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface WebRtcPlayer {
			
				
				'id'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<HeartwoodTypes.WebRtcPlayer>) | undefined | null
				
				'shouldAllowCropping'?: boolean | undefined | null
				
				'onCrop'?: (HeartwoodTypes.WebRtcPlayerCropHandler) | undefined | null
				
				'onStateChange'?: (HeartwoodTypes.WebRtcStateChangeHandler) | undefined | null
				
				'crop'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcCropPoint | undefined | null
				
				'connection'?: (HeartwoodTypes.WebRtcConnection) | undefined | null
				
				'streamer'?: (HeartwoodTypes.WebRtcStreamer) | undefined | null
		}

		interface WebRtcPlayerSchema extends SpruceSchema.Schema {
			id: 'webRtcPlayer',
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
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.WebRtcPlayer>`,}
			            },
			            /** . */
			            'shouldAllowCropping': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'onCrop': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.WebRtcPlayerCropHandler`,}
			            },
			            /** . */
			            'onStateChange': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.WebRtcStateChangeHandler`,}
			            },
			            /** . */
			            'crop': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcCropPointSchema,}
			            },
			            /** . */
			            'connection': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.WebRtcConnection`,}
			            },
			            /** . */
			            'streamer': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.WebRtcStreamer`,}
			            },
			    }
		}

		interface WebRtcPlayerEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.WebRtcPlayerSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToastMessage {
			
				/** Message. */
				'message': string
				/** Style. */
				'style'?: ("info" | "success" | "warning" | "critical") | undefined | null
				/** Is Sticky. */
				'isSticky'?: boolean | undefined | null
		}

		interface ToastMessageSchema extends SpruceSchema.Schema {
			id: 'toastMessage',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Toast message',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Message. */
			            'message': {
			                label: 'Message',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"info","label":"info"},{"value":"success","label":"success"},{"value":"warning","label":"warning"},{"value":"critical","label":"critical"}],}
			            },
			            /** Is Sticky. */
			            'isSticky': {
			                label: 'Is Sticky',
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		interface ToastMessageEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToastMessageSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Theme {
			
				
				'name': string
				
				'props': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeProps
		}

		interface ThemeSchema extends SpruceSchema.Schema {
			id: 'theme',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Theme',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'name': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'props': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemePropsSchema,}
			            },
			    }
		}

		interface ThemeEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardStyle {
			
				/** Card Body Background Color. The background color of the body of the card. */
				'bodyBackgroundColor'?: string | undefined | null
				/** Card Body Foreground Color. The color of the text of the body of the card. */
				'bodyForegroundColor'?: string | undefined | null
				/** Header Background Color. The background color of the card's header. */
				'headerBackgroundColor'?: string | undefined | null
				/** Header Foreground Color. The color of the text in the card's header. */
				'headerForegroundColor'?: string | undefined | null
				/** Footer Background Color. The background color of the card's footer. */
				'footerBackgroundColor'?: string | undefined | null
				/** Footer Foreground Color. The color of the text in the card's footer. */
				'footerForegroundColor'?: string | undefined | null
				/** Fonts. The fonts used in the card. */
				'fonts'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeFonts | undefined | null
		}

		interface CardStyleSchema extends SpruceSchema.Schema {
			id: 'cardStyle',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Card Body Background Color. The background color of the body of the card. */
			            'bodyBackgroundColor': {
			                label: 'Card Body Background Color',
			                type: 'text',
			                hint: 'The background color of the body of the card.',
			                options: undefined
			            },
			            /** Card Body Foreground Color. The color of the text of the body of the card. */
			            'bodyForegroundColor': {
			                label: 'Card Body Foreground Color',
			                type: 'text',
			                hint: 'The color of the text of the body of the card.',
			                options: undefined
			            },
			            /** Header Background Color. The background color of the card's header. */
			            'headerBackgroundColor': {
			                label: 'Header Background Color',
			                type: 'text',
			                hint: 'The background color of the card\'s header.',
			                options: undefined
			            },
			            /** Header Foreground Color. The color of the text in the card's header. */
			            'headerForegroundColor': {
			                label: 'Header Foreground Color',
			                type: 'text',
			                hint: 'The color of the text in the card\'s header.',
			                options: undefined
			            },
			            /** Footer Background Color. The background color of the card's footer. */
			            'footerBackgroundColor': {
			                label: 'Footer Background Color',
			                type: 'text',
			                hint: 'The background color of the card\'s footer.',
			                options: undefined
			            },
			            /** Footer Foreground Color. The color of the text in the card's footer. */
			            'footerForegroundColor': {
			                label: 'Footer Foreground Color',
			                type: 'text',
			                hint: 'The color of the text in the card\'s footer.',
			                options: undefined
			            },
			            /** Fonts. The fonts used in the card. */
			            'fonts': {
			                label: 'Fonts',
			                type: 'schema',
			                hint: 'The fonts used in the card.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeFontsSchema,}
			            },
			    }
		}

		interface CardStyleEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyleSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardStyles {
			
				/** Informational. */
				'informational'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyle | undefined | null
				/** Visual. */
				'visual'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyle | undefined | null
				/** Heading. */
				'heading'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyle | undefined | null
		}

		interface CardStylesSchema extends SpruceSchema.Schema {
			id: 'cardStyles',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Informational. */
			            'informational': {
			                label: 'Informational',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyleSchema,}
			            },
			            /** Visual. */
			            'visual': {
			                label: 'Visual',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyleSchema,}
			            },
			            /** Heading. */
			            'heading': {
			                label: 'Heading',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyleSchema,}
			            },
			    }
		}

		interface CardStylesEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStylesSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FontFamily {
			
				/** Name. What is the name of the font family? e.g. "Arial" or "Headers". This will be the name you can apply to different parts of the theme. */
				'name': string
				/** Source. The URL to the font file (otf, ttf, etc.). Must be publicly accessible. */
				'src': string
		}

		interface FontFamilySchema extends SpruceSchema.Schema {
			id: 'fontFamily',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Name. What is the name of the font family? e.g. "Arial" or "Headers". This will be the name you can apply to different parts of the theme. */
			            'name': {
			                label: 'Name',
			                type: 'text',
			                isRequired: true,
			                hint: 'What is the name of the font family? e.g. "Arial" or "Headers". This will be the name you can apply to different parts of the theme.',
			                options: undefined
			            },
			            /** Source. The URL to the font file (otf, ttf, etc.). Must be publicly accessible. */
			            'src': {
			                label: 'Source',
			                type: 'text',
			                isRequired: true,
			                hint: 'The URL to the font file (otf, ttf, etc.). Must be publicly accessible.',
			                options: undefined
			            },
			    }
		}

		interface FontFamilyEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontFamilySchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FontSetting {
			
				/** Font Family. The name of the font family to use. This should match the name you set in the font families section of the theme. */
				'fontFamily'?: string | undefined | null
				/** Font Size. The size of the font. e.g. "16px" or "1em". */
				'fontSize'?: string | undefined | null
		}

		interface FontSettingSchema extends SpruceSchema.Schema {
			id: 'fontSetting',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Font Family. The name of the font family to use. This should match the name you set in the font families section of the theme. */
			            'fontFamily': {
			                label: 'Font Family',
			                type: 'text',
			                hint: 'The name of the font family to use. This should match the name you set in the font families section of the theme.',
			                options: undefined
			            },
			            /** Font Size. The size of the font. e.g. "16px" or "1em". */
			            'fontSize': {
			                label: 'Font Size',
			                type: 'text',
			                hint: 'The size of the font. e.g. "16px" or "1em".',
			                options: undefined
			            },
			    }
		}

		interface FontSettingEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ThemeFonts {
			
				/** Header One Font. The font used for the largest headers. */
				'headerOneFont'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
				/** Alternative Header Font. The font used for the alternative headers. These are rendered next to the header one font, but are usually smaller. */
				'altHeaderFont'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
				/** Header Two Font. The font used for the second largest headers. */
				'headerTwoFont'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
				/** Header Three Font. The font used for third largest headers. */
				'headerThreeFont'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
				/** Body Font. The font used for the body text on all cards, toolbelt, etc. */
				'bodyFont'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
				/** Footer Font. The font used for footers (but can be overriden by card footer styles). */
				'footerFont'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
		}

		interface ThemeFontsSchema extends SpruceSchema.Schema {
			id: 'themeFonts',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Header One Font. The font used for the largest headers. */
			            'headerOneFont': {
			                label: 'Header One Font',
			                type: 'schema',
			                hint: 'The font used for the largest headers.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			            /** Alternative Header Font. The font used for the alternative headers. These are rendered next to the header one font, but are usually smaller. */
			            'altHeaderFont': {
			                label: 'Alternative Header Font',
			                type: 'schema',
			                hint: 'The font used for the alternative headers. These are rendered next to the header one font, but are usually smaller.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			            /** Header Two Font. The font used for the second largest headers. */
			            'headerTwoFont': {
			                label: 'Header Two Font',
			                type: 'schema',
			                hint: 'The font used for the second largest headers.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			            /** Header Three Font. The font used for third largest headers. */
			            'headerThreeFont': {
			                label: 'Header Three Font',
			                type: 'schema',
			                hint: 'The font used for third largest headers.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			            /** Body Font. The font used for the body text on all cards, toolbelt, etc. */
			            'bodyFont': {
			                label: 'Body Font',
			                type: 'schema',
			                hint: 'The font used for the body text on all cards, toolbelt, etc.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			            /** Footer Font. The font used for footers (but can be overriden by card footer styles). */
			            'footerFont': {
			                label: 'Footer Font',
			                type: 'schema',
			                hint: 'The font used for footers (but can be overriden by card footer styles).',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			    }
		}

		interface ThemeFontsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeFontsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ControlBar {
			
				/** Control bar color 1. The foreground color of the control bar. */
				'foregroundColor'?: string | undefined | null
				/** Control bar color 2. The background color of the control bar. */
				'backgroundColor'?: string | undefined | null
				/** Control bar font. The font used in the control bar. */
				'font'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSetting | undefined | null
				/** Control bar size. */
				'size'?: ("medium" | "large") | undefined | null
		}

		interface ControlBarSchema extends SpruceSchema.Schema {
			id: 'controlBar',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Control bar color 1. The foreground color of the control bar. */
			            'foregroundColor': {
			                label: 'Control bar color 1',
			                type: 'text',
			                hint: 'The foreground color of the control bar.',
			                options: undefined
			            },
			            /** Control bar color 2. The background color of the control bar. */
			            'backgroundColor': {
			                label: 'Control bar color 2',
			                type: 'text',
			                hint: 'The background color of the control bar.',
			                options: undefined
			            },
			            /** Control bar font. The font used in the control bar. */
			            'font': {
			                label: 'Control bar font',
			                type: 'schema',
			                hint: 'The font used in the control bar.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontSettingSchema,}
			            },
			            /** Control bar size. */
			            'size': {
			                label: 'Control bar size',
			                type: 'select',
			                options: {choices: [{"value":"medium","label":"Standard"},{"value":"large","label":"Large"}],}
			            },
			    }
		}

		interface ControlBarEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ControlBarSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface StatusIndicatorColors {
			
				/** Color 1. */
				'color1'?: string | undefined | null
				/** Color 2. */
				'color2'?: string | undefined | null
				/** Color 3. */
				'color3'?: string | undefined | null
				/** Color 4. */
				'color4'?: string | undefined | null
				/** Color 5. */
				'color5'?: string | undefined | null
		}

		interface StatusIndicatorColorsSchema extends SpruceSchema.Schema {
			id: 'statusIndicatorColors',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Status indicator colors',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Color 1. */
			            'color1': {
			                label: 'Color 1',
			                type: 'text',
			                options: undefined
			            },
			            /** Color 2. */
			            'color2': {
			                label: 'Color 2',
			                type: 'text',
			                options: undefined
			            },
			            /** Color 3. */
			            'color3': {
			                label: 'Color 3',
			                type: 'text',
			                options: undefined
			            },
			            /** Color 4. */
			            'color4': {
			                label: 'Color 4',
			                type: 'text',
			                options: undefined
			            },
			            /** Color 5. */
			            'color5': {
			                label: 'Color 5',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface StatusIndicatorColorsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorColorsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ThemeProps {
			
				/** Card corner style. */
				'borderRadius'?: ("rounded" | "square") | undefined | null
				/** Color 1. Used to color anything overlayed on the background (color1Inverse or color1InverseGradient). */
				'color1'?: string | undefined | null
				/** Color 1 (inverse). Background color of the view if color1InverseGradient is not set */
				'color1Inverse'?: string | undefined | null
				/** Color 1 Gradient (inverse). Background griedent applied to view. */
				'color1InverseGradient'?: string | undefined | null
				/** Color 2. The color of text inside of cards and lists. */
				'color2'?: string | undefined | null
				/** Color 2 (compliment). The color of headers in card bodies and lists. Defaults to color2. */
				'color2Compliment'?: string | undefined | null
				/** Color 2. The color of overlays ontop of a card. */
				'color2Transparent'?: string | undefined | null
				/** Color. Background color of cards. */
				'color2Inverse'?: string | undefined | null
				/** Color 2 (inverse with transparency). Background color used when some transparency is needed for context. */
				'color2InverseTransparent'?: string | undefined | null
				/** Color 3. Titles of cards. */
				'color3'?: string | undefined | null
				/** Color 3 (compliment). Subtitles of cards. */
				'color3Compliment'?: string | undefined | null
				/** Color 3 (inverse). Background for headers of cards. */
				'color3Inverse'?: string | undefined | null
				/** Color 4. Foreground for buttons and menu items. */
				'color4'?: string | undefined | null
				/** Color 4 (compliment). Borders for buttons and menu items. */
				'color4Compliment'?: string | undefined | null
				/** Color 4 (compliment, transparent). Lighter version of borders, outlines, and highlights */
				'color4ComplimentTransparent'?: string | undefined | null
				/** Color 4 (inverse). Background for buttons and menu items. */
				'color4Inverse'?: string | undefined | null
				/** Color 4 (inverse, compliment). Background for buttons and menu items */
				'color4InverseCompliment'?: string | undefined | null
				
				'controlBar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ControlBar | undefined | null
				/** Tool belt color 2. The background color of the tool belts. */
				'toolBeltColor2'?: string | undefined | null
				/** Success color 1. Success messages overlayed on a background colored with successColor1Inverse. */
				'successColor1'?: string | undefined | null
				/** Success color 2. The background used when rendering success messages. */
				'successColor1Inverse'?: string | undefined | null
				/** Error color 1. Errors overlayed on a background colored with errorColor1Inverse. */
				'errorColor1'?: string | undefined | null
				/** Error color 2. The background used when rendering errors. */
				'errorColor1Inverse'?: string | undefined | null
				/** Warning color 1. Warnings overlayed on a background colored with warningColor1Inverse. */
				'warningColor1'?: string | undefined | null
				/** Warning color 2. The background used when rendering tarnings. */
				'warningColor1Inverse'?: string | undefined | null
				
				'calendarEvents'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColors | undefined | null
				/** Footer Icon Url. The url of the icon to show in the footer. Must be publicly served in some way */
				'footerIconUrl'?: string | undefined | null
				
				'statusIndicators'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorColors | undefined | null
				
				'fontFamilies'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontFamily[] | undefined | null
				
				'fonts'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeFonts | undefined | null
				
				'cardStyles'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStyles | undefined | null
				/** Stylesheet Url. The url of the stylesheet to apply to the theme. Must be publicly served in some way and will be loaded after the core stylesheets. */
				'stylesheetUrl'?: string | undefined | null
		}

		interface ThemePropsSchema extends SpruceSchema.Schema {
			id: 'themeProps',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Card corner style. */
			            'borderRadius': {
			                label: 'Card corner style',
			                type: 'select',
			                options: {choices: [{"value":"rounded","label":"Rounded"},{"value":"square","label":"Square"}],}
			            },
			            /** Color 1. Used to color anything overlayed on the background (color1Inverse or color1InverseGradient). */
			            'color1': {
			                label: 'Color 1',
			                type: 'text',
			                hint: 'Used to color anything overlayed on the background (color1Inverse or color1InverseGradient).',
			                options: undefined
			            },
			            /** Color 1 (inverse). Background color of the view if color1InverseGradient is not set */
			            'color1Inverse': {
			                label: 'Color 1 (inverse)',
			                type: 'text',
			                hint: 'Background color of the view if color1InverseGradient is not set',
			                options: undefined
			            },
			            /** Color 1 Gradient (inverse). Background griedent applied to view. */
			            'color1InverseGradient': {
			                label: 'Color 1 Gradient (inverse)',
			                type: 'text',
			                hint: 'Background griedent applied to view.',
			                options: undefined
			            },
			            /** Color 2. The color of text inside of cards and lists. */
			            'color2': {
			                label: 'Color 2',
			                type: 'text',
			                hint: 'The color of text inside of cards and lists.',
			                options: undefined
			            },
			            /** Color 2 (compliment). The color of headers in card bodies and lists. Defaults to color2. */
			            'color2Compliment': {
			                label: 'Color 2 (compliment)',
			                type: 'text',
			                hint: 'The color of headers in card bodies and lists. Defaults to color2.',
			                options: undefined
			            },
			            /** Color 2. The color of overlays ontop of a card. */
			            'color2Transparent': {
			                label: 'Color 2',
			                type: 'text',
			                hint: 'The color of overlays ontop of a card.',
			                options: undefined
			            },
			            /** Color. Background color of cards. */
			            'color2Inverse': {
			                label: 'Color',
			                type: 'text',
			                hint: 'Background color of cards.',
			                options: undefined
			            },
			            /** Color 2 (inverse with transparency). Background color used when some transparency is needed for context. */
			            'color2InverseTransparent': {
			                label: 'Color 2 (inverse with transparency)',
			                type: 'text',
			                hint: 'Background color used when some transparency is needed for context.',
			                options: undefined
			            },
			            /** Color 3. Titles of cards. */
			            'color3': {
			                label: 'Color 3',
			                type: 'text',
			                hint: 'Titles of cards.',
			                options: undefined
			            },
			            /** Color 3 (compliment). Subtitles of cards. */
			            'color3Compliment': {
			                label: 'Color 3 (compliment)',
			                type: 'text',
			                hint: 'Subtitles of cards.',
			                options: undefined
			            },
			            /** Color 3 (inverse). Background for headers of cards. */
			            'color3Inverse': {
			                label: 'Color 3 (inverse)',
			                type: 'text',
			                hint: 'Background for headers of cards.',
			                options: undefined
			            },
			            /** Color 4. Foreground for buttons and menu items. */
			            'color4': {
			                label: 'Color 4',
			                type: 'text',
			                hint: 'Foreground for buttons and menu items.',
			                options: undefined
			            },
			            /** Color 4 (compliment). Borders for buttons and menu items. */
			            'color4Compliment': {
			                label: 'Color 4 (compliment)',
			                type: 'text',
			                hint: 'Borders for buttons and menu items.',
			                options: undefined
			            },
			            /** Color 4 (compliment, transparent). Lighter version of borders, outlines, and highlights */
			            'color4ComplimentTransparent': {
			                label: 'Color 4 (compliment, transparent)',
			                type: 'text',
			                hint: 'Lighter version of borders, outlines, and highlights',
			                options: undefined
			            },
			            /** Color 4 (inverse). Background for buttons and menu items. */
			            'color4Inverse': {
			                label: 'Color 4 (inverse)',
			                type: 'text',
			                hint: 'Background for buttons and menu items.',
			                options: undefined
			            },
			            /** Color 4 (inverse, compliment). Background for buttons and menu items */
			            'color4InverseCompliment': {
			                label: 'Color 4 (inverse, compliment)',
			                type: 'text',
			                hint: 'Background for buttons and menu items',
			                options: undefined
			            },
			            /** . */
			            'controlBar': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ControlBarSchema,}
			            },
			            /** Tool belt color 2. The background color of the tool belts. */
			            'toolBeltColor2': {
			                label: 'Tool belt color 2',
			                type: 'text',
			                hint: 'The background color of the tool belts.',
			                options: undefined
			            },
			            /** Success color 1. Success messages overlayed on a background colored with successColor1Inverse. */
			            'successColor1': {
			                label: 'Success color 1',
			                type: 'text',
			                hint: 'Success messages overlayed on a background colored with successColor1Inverse.',
			                options: undefined
			            },
			            /** Success color 2. The background used when rendering success messages. */
			            'successColor1Inverse': {
			                label: 'Success color 2',
			                type: 'text',
			                hint: 'The background used when rendering success messages.',
			                options: undefined
			            },
			            /** Error color 1. Errors overlayed on a background colored with errorColor1Inverse. */
			            'errorColor1': {
			                label: 'Error color 1',
			                type: 'text',
			                hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
			                options: undefined
			            },
			            /** Error color 2. The background used when rendering errors. */
			            'errorColor1Inverse': {
			                label: 'Error color 2',
			                type: 'text',
			                hint: 'The background used when rendering errors.',
			                options: undefined
			            },
			            /** Warning color 1. Warnings overlayed on a background colored with warningColor1Inverse. */
			            'warningColor1': {
			                label: 'Warning color 1',
			                type: 'text',
			                hint: 'Warnings overlayed on a background colored with warningColor1Inverse.',
			                options: undefined
			            },
			            /** Warning color 2. The background used when rendering tarnings. */
			            'warningColor1Inverse': {
			                label: 'Warning color 2',
			                type: 'text',
			                hint: 'The background used when rendering tarnings.',
			                options: undefined
			            },
			            /** . */
			            'calendarEvents': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorsSchema,}
			            },
			            /** Footer Icon Url. The url of the icon to show in the footer. Must be publicly served in some way */
			            'footerIconUrl': {
			                label: 'Footer Icon Url',
			                type: 'text',
			                hint: 'The url of the icon to show in the footer. Must be publicly served in some way',
			                options: undefined
			            },
			            /** . */
			            'statusIndicators': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorColorsSchema,}
			            },
			            /** . */
			            'fontFamilies': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FontFamilySchema,}
			            },
			            /** . */
			            'fonts': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeFontsSchema,}
			            },
			            /** . */
			            'cardStyles': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardStylesSchema,}
			            },
			            /** Stylesheet Url. The url of the stylesheet to apply to the theme. Must be publicly served in some way and will be loaded after the core stylesheets. */
			            'stylesheetUrl': {
			                label: 'Stylesheet Url',
			                type: 'text',
			                hint: 'The url of the stylesheet to apply to the theme. Must be publicly served in some way and will be loaded after the core stylesheets.',
			                options: undefined
			            },
			    }
		}

		interface ThemePropsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemePropsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SprucebotTypedMessage {
			
				/** Sentences. Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold) */
				'sentences': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentence[]
				/** Default avatar. How should Sprucebot be rendered by default */
				'avatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatar | undefined | null
				/** Start delay. How long should I wait before starting to type? */
				'startDelay'?: SpruceSchema.DurationFieldValue | undefined | null
				/** Loop. */
				'shouldLoop'?: boolean | undefined | null
				/** Size. */
				'size'?: ("small" | "medium" | "large") | undefined | null
				/** Playing. */
				'isPlaying'?: boolean | undefined | null
		}

		interface SprucebotTypedMessageSchema extends SpruceSchema.Schema {
			id: 'sprucebotTypedMessage',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Sprucebot typed message',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Sentences. Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold) */
			            'sentences': {
			                label: 'Sentences',
			                type: 'schema',
			                isRequired: true,
			                hint: 'Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold)',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentenceSchema,}
			            },
			            /** Default avatar. How should Sprucebot be rendered by default */
			            'avatar': {
			                label: 'Default avatar',
			                type: 'schema',
			                hint: 'How should Sprucebot be rendered by default',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatarSchema,}
			            },
			            /** Start delay. How long should I wait before starting to type? */
			            'startDelay': {
			                label: 'Start delay',
			                type: 'duration',
			                hint: 'How long should I wait before starting to type?',
			                defaultValue: {"hours":0,"minutes":0,"seconds":1,"ms":0},
			                options: undefined
			            },
			            /** Loop. */
			            'shouldLoop': {
			                label: 'Loop',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Size. */
			            'size': {
			                label: 'Size',
			                type: 'select',
			                defaultValue: "small",
			                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
			            },
			            /** Playing. */
			            'isPlaying': {
			                label: 'Playing',
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		interface SprucebotTypedMessageEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SkillView {
			
				
				'id'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.SkillViewController) | undefined | null
				/** Center vertically. */
				'shouldCenterVertically'?: boolean | undefined | null
				/** Full screen. */
				'isFullScreen'?: boolean | undefined | null
				
				'title'?: string | undefined | null
				
				'subtitle'?: string | undefined | null
				
				'description'?: string | undefined | null
				/** Width. */
				'width'?: ("wide" | "tight" | "full") | undefined | null
				/** Layout. */
				'layouts'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayout[] | undefined | null
		}

		interface SkillViewSchema extends SpruceSchema.Schema {
			id: 'skillView',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Skill view',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.SkillViewController`,}
			            },
			            /** Center vertically. */
			            'shouldCenterVertically': {
			                label: 'Center vertically',
			                type: 'boolean',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Full screen. */
			            'isFullScreen': {
			                label: 'Full screen',
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'subtitle': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'description': {
			                type: 'text',
			                options: undefined
			            },
			            /** Width. */
			            'width': {
			                label: 'Width',
			                type: 'select',
			                defaultValue: "tight",
			                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
			            },
			            /** Layout. */
			            'layouts': {
			                label: 'Layout',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayoutSchema,}
			            },
			    }
		}

		interface SkillViewEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SelectInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: (any) | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Placeholder. */
				'placeholder'?: string | undefined | null
				
				'choices': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoice[]
		}

		interface SelectInputSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoiceSchema,}
			            },
			    }
		}

		interface SelectInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ProgressNavigatorStep {
			
				
				'id': string
				
				'label': string
				
				'isComplete'?: boolean | undefined | null
				
				'hasError'?: boolean | undefined | null
		}

		interface ProgressNavigatorStepSchema extends SpruceSchema.Schema {
			id: 'progressNavigatorStep',
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
			            /** . */
			            'isComplete': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'hasError': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		interface ProgressNavigatorStepEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorStepSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ProgressNavigator {
			
				
				'currentStepId'?: string | undefined | null
				
				'processLabel'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<HeartwoodTypes.ProgressNavigator>) | undefined | null
				
				'steps': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorStep[]
		}

		interface ProgressNavigatorSchema extends SpruceSchema.Schema {
			id: 'progressNavigator',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Progress Navigator',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'currentStepId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'processLabel': {
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.ProgressNavigator>`,}
			            },
			            /** . */
			            'steps': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorStepSchema,}
			            },
			    }
		}

		interface ProgressNavigatorEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressNavigatorSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface NavigationButtonDropdown {
			
				/** Position. */
				'position'?: ("top" | "right" | "bottom" | "left") | undefined | null
				
				'items'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationDropdownButton[] | undefined | null
				
				'card'?: (HeartwoodTypes.Card) | undefined | null
		}

		interface NavigationButtonDropdownSchema extends SpruceSchema.Schema {
			id: 'navigationButtonDropdown',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Position. */
			            'position': {
			                label: 'Position',
			                type: 'select',
			                options: {choices: [{"label":"Top","value":"top"},{"label":"Right","value":"right"},{"label":"Bottom","value":"bottom"},{"label":"Left","value":"left"}],}
			            },
			            /** . */
			            'items': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationDropdownButtonSchema,}
			            },
			            /** . */
			            'card': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.Card`,}
			            },
			    }
		}

		interface NavigationButtonDropdownEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationButtonDropdownSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface RouterDestination {
			
				
				'id': (HeartwoodTypes.SkillViewControllerId)
				
				'args'?: (Record<string, any>) | undefined | null
		}

		interface RouterDestinationSchema extends SpruceSchema.Schema {
			id: 'routerDestination',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'router destination',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `HeartwoodTypes.SkillViewControllerId`,}
			            },
			            /** . */
			            'args': {
			                type: 'raw',
			                options: {valueType: `Record<string, any>`,}
			            },
			    }
		}

		interface RouterDestinationEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestinationSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface PermissionContractReference {
			
				
				'id'?: (MercuryTypes.PermissionContractId) | undefined | null
		}

		interface PermissionContractReferenceSchema extends SpruceSchema.Schema {
			id: 'permissionContractReference',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Permission contract reference',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'raw',
			                options: {valueType: `MercuryTypes.PermissionContractId`,}
			            },
			    }
		}

		interface PermissionContractReferenceEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReferenceSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface NavigationButton {
			
				/** Line icon. */
				'lineIcon': ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out")
				
				'id': string
				
				'viewPermissionContract'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReference | undefined | null
				/** Destination skill view controller. */
				'destination'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestination | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Dropdown. */
				'dropdown'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationButtonDropdown | undefined | null
		}

		interface NavigationButtonSchema extends SpruceSchema.Schema {
			id: 'navigationButton',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Navigation button',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** . */
			            'id': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'viewPermissionContract': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReferenceSchema,}
			            },
			            /** Destination skill view controller. */
			            'destination': {
			                label: 'Destination skill view controller',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestinationSchema,}
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Dropdown. */
			            'dropdown': {
			                label: 'Dropdown',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationButtonDropdownSchema,}
			            },
			    }
		}

		interface NavigationButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface NavigationDropdownButton {
			
				
				'id'?: string | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean | undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean | undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any) | undefined | null
				
				'hint'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "tertiary" | "destructive") | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
				'selectedLineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Line icon position. */
				'lineIconPosition'?: ("left" | "bottom") | undefined | null
				/** Click handler. */
				'onClick'?: ((dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void) | undefined | null
				/** Style. */
				'style'?: ("button" | "link") | undefined | null
				
				'viewPermissionContract'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReference | undefined | null
				/** Destination skill view controller. */
				'destination'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestination | undefined | null
		}

		interface NavigationDropdownButtonSchema extends SpruceSchema.Schema {
			id: 'navigationDropdownButton',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Navigation dropdown button',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonController`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Add to fade-in queue.. Fade in effect could change. */
			            'shouldQueueShow': {
			                label: 'Add to fade-in queue.',
			                type: 'boolean',
			                hint: 'Fade in effect could change.',
			                options: undefined
			            },
			            /** Show hint icon. */
			            'shouldShowHintIcon': {
			                label: 'Show hint icon',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Click handler for hint icon. */
			            'onClickHintIcon': {
			                label: 'Click handler for hint icon',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** . */
			            'hint': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"tertiary","label":"Tertiary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
			            'selectedLineIcon': {
			                label: 'Selected line icon',
			                type: 'select',
			                hint: 'Only applies when the button is selected. Will override line icon if one is set.',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Line icon position. */
			            'lineIconPosition': {
			                label: 'Line icon position',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"bottom","label":"Bottom"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `(dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void`,}
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"button","label":"Button"},{"value":"link","label":"Link"}],}
			            },
			            /** . */
			            'viewPermissionContract': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReferenceSchema,}
			            },
			            /** Destination skill view controller. */
			            'destination': {
			                label: 'Destination skill view controller',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestinationSchema,}
			            },
			    }
		}

		interface NavigationDropdownButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationDropdownButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface NavigationRoute {
			
				
				'viewPermissionContract'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReference | undefined | null
				
				'destination': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestination
		}

		interface NavigationRouteSchema extends SpruceSchema.Schema {
			id: 'navigationRoute',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'viewPermissionContract': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PermissionContractReferenceSchema,}
			            },
			            /** . */
			            'destination': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RouterDestinationSchema,}
			            },
			    }
		}

		interface NavigationRouteEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationRouteSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Navigation {
			
				/** Render button labels. Should the button labels be rendered? */
				'shouldRenderButtonLabels'?: boolean | undefined | null
				/** Is visible. Should the navigation be visible? Defaults to true. */
				'isVisible'?: boolean | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>) | undefined | null
				
				'buttons'?: (HeartwoodTypes.NavigationItem)[] | undefined | null
				
				'additionalValidRoutes'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationRoute[] | undefined | null
		}

		interface NavigationSchema extends SpruceSchema.Schema {
			id: 'navigation',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Navigation',
			importsWhenRemote: ['import * as MercuryTypes from \'@sprucelabs/mercury-types\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Render button labels. Should the button labels be rendered? */
			            'shouldRenderButtonLabels': {
			                label: 'Render button labels',
			                type: 'boolean',
			                hint: 'Should the button labels be rendered?',
			                options: undefined
			            },
			            /** Is visible. Should the navigation be visible? Defaults to true. */
			            'isVisible': {
			                label: 'Is visible',
			                type: 'boolean',
			                hint: 'Should the navigation be visible? Defaults to true.',
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.Navigation>`,}
			            },
			            /** . */
			            'buttons': {
			                type: 'raw',
			                isArray: true,
			                options: {valueType: `HeartwoodTypes.NavigationItem`,}
			            },
			            /** . */
			            'additionalValidRoutes': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationRouteSchema,}
			            },
			    }
		}

		interface NavigationEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.NavigationSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface LockScreen {
			
				
				'id'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreen>) | undefined | null
				/** Center vertically. */
				'shouldCenterVertically'?: boolean | undefined | null
				/** Full screen. */
				'isFullScreen'?: boolean | undefined | null
				
				'title'?: string | undefined | null
				
				'subtitle'?: string | undefined | null
				
				'description'?: string | undefined | null
				/** Width. */
				'width'?: ("wide" | "tight" | "full") | undefined | null
				/** Layout. */
				'layouts'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayout[] | undefined | null
				/** Card controller. */
				'skillViewController'?: (HeartwoodTypes.SkillViewController) | undefined | null
		}

		interface LockScreenSchema extends SpruceSchema.Schema {
			id: 'lockScreen',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'lock screen',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreen>`,}
			            },
			            /** Center vertically. */
			            'shouldCenterVertically': {
			                label: 'Center vertically',
			                type: 'boolean',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Full screen. */
			            'isFullScreen': {
			                label: 'Full screen',
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'subtitle': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'description': {
			                type: 'text',
			                options: undefined
			            },
			            /** Width. */
			            'width': {
			                label: 'Width',
			                type: 'select',
			                defaultValue: "tight",
			                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
			            },
			            /** Layout. */
			            'layouts': {
			                label: 'Layout',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayoutSchema,}
			            },
			            /** Card controller. */
			            'skillViewController': {
			                label: 'Card controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.SkillViewController`,}
			            },
			    }
		}

		interface LockScreenEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LockScreenSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Card {
			
				
				'id'?: string | undefined | null
				
				'className'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.CardViewController) | undefined | null
				/** Header. */
				'header'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader | undefined | null
				/** Critical error. */
				'criticalError'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError | undefined | null
				/** Fade in. */
				'shouldFadeIn'?: boolean | undefined | null
				/** Style. */
				'style'?: ("standard" | "informational" | "visual" | "heading") | undefined | null
				/** Background image. The URL of an image to use as the background of the card. */
				'backgroundImage'?: string | undefined | null
				/** Background image size. */
				'backgroundImageSize'?: ("cover" | "contain") | undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
				'body'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody | undefined | null
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter | undefined | null
		}

		interface CardSchema extends SpruceSchema.Schema {
			id: 'card',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Card',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.CardViewController`,}
			            },
			            /** Header. */
			            'header': {
			                label: 'Header',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeaderSchema,}
			            },
			            /** Critical error. */
			            'criticalError': {
			                label: 'Critical error',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalErrorSchema,}
			            },
			            /** Fade in. */
			            'shouldFadeIn': {
			                label: 'Fade in',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"standard","label":"Standard"},{"value":"informational","label":"Informational"},{"value":"visual","label":"Visual"},{"value":"heading","label":"Heading"}],}
			            },
			            /** Background image. The URL of an image to use as the background of the card. */
			            'backgroundImage': {
			                label: 'Background image',
			                type: 'text',
			                hint: 'The URL of an image to use as the background of the card.',
			                options: undefined
			            },
			            /** Background image size. */
			            'backgroundImageSize': {
			                label: 'Background image size',
			                type: 'select',
			                options: {choices: [{"value":"cover","label":"Cover"},{"value":"contain","label":"Contain"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
			            'body': {
			                label: 'Body',
			                type: 'schema',
			                hint: 'Card bodies are comprised of sections. You will want at least 1 to get started.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBodySchema,}
			            },
			            /** Footer. */
			            'footer': {
			                label: 'Footer',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema,}
			            },
			    }
		}

		interface CardEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToolBeltTool {
			
				/** Id. */
				'id': string
				/** Icon. */
				'lineIcon': ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out")
				/** Card. */
				'card': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
		}

		interface ToolBeltToolSchema extends SpruceSchema.Schema {
			id: 'toolBeltTool',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** Icon. */
			            'lineIcon': {
			                label: 'Icon',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Card. */
			            'card': {
			                label: 'Card',
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			    }
		}

		interface ToolBeltToolEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltToolSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToolBelt {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ToolBeltViewController) | undefined | null
				/** Icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				
				'shouldRenderAllToolsAtOnce'?: boolean | undefined | null
				
				'onCloseToolBelt'?: (HeartwoodTypes.ToolBeltCloseHandler) | undefined | null
				
				'iconLabel'?: string | undefined | null
				
				'renderAs'?: ("default" | "icon") | undefined | null
				/** Tools. */
				'tools': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltTool[]
		}

		interface ToolBeltSchema extends SpruceSchema.Schema {
			id: 'toolBelt',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Tool belt',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ToolBeltViewController`,}
			            },
			            /** Icon. */
			            'lineIcon': {
			                label: 'Icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** . */
			            'shouldRenderAllToolsAtOnce': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'onCloseToolBelt': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ToolBeltCloseHandler`,}
			            },
			            /** . */
			            'iconLabel': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'renderAs': {
			                type: 'select',
			                options: {choices: [{"value":"default","label":"Default"},{"value":"icon","label":"Icon"}],}
			            },
			            /** Tools. */
			            'tools': {
			                label: 'Tools',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltToolSchema,}
			            },
			    }
		}

		interface ToolBeltEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SkillViewLayout {
			
				
				'headerCard'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card | undefined | null
				
				'leftCards'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card[] | undefined | null
				
				'rightCards'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card[] | undefined | null
				
				'topCards'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card[] | undefined | null
				
				'cards'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card[] | undefined | null
				
				'bottomCards'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card[] | undefined | null
				
				'style'?: ("one-col" | "two-col" | "three-col" | "big-left" | "big-right" | "big-top" | "big-top-left" | "grid") | undefined | null
		}

		interface SkillViewLayoutSchema extends SpruceSchema.Schema {
			id: 'skillViewLayout',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Layout',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'headerCard': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'leftCards': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'rightCards': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'topCards': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'cards': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'bottomCards': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'style': {
			                type: 'select',
			                options: {choices: [{"value":"one-col","label":"One column"},{"value":"two-col","label":"Two columns"},{"value":"three-col","label":"Three columns"},{"value":"big-left","label":"Big left"},{"value":"big-right","label":"Big right"},{"value":"big-top","label":"Big top"},{"value":"big-top-left","label":"Big top left"},{"value":"grid","label":"Grid"}],}
			            },
			    }
		}

		interface SkillViewLayoutEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewLayoutSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface LineIcon {
			
				/** Name. */
				'name': ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out")
		}

		interface LineIconSchema extends SpruceSchema.Schema {
			id: 'lineIcon',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Line icon',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			    }
		}

		interface LineIconEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineIconSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FormBuilderImportExportPage<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				/** Page title. */
				'title': string
				/** Schema. */
				'schema': (SpruceSchema.Schema)
				/** Sections. */
				'sections': (SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>)[]
		}

		interface FormBuilderImportExportPageSchema extends SpruceSchema.Schema {
			id: 'formBuilderImportExportPage',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
			    fields: {
			            /** Page title. */
			            'title': {
			                label: 'Page title',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Schema. */
			            'schema': {
			                label: 'Schema',
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `SpruceSchema.Schema`,}
			            },
			            /** Sections. */
			            'sections': {
			                label: 'Sections',
			                type: 'raw',
			                isRequired: true,
			                isArray: true,
			                options: {valueType: `SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>`,}
			            },
			    }
		}

		interface FormBuilderImportExportPageEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPageSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FormBuilderImportExportObject<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				/** Title. */
				'title': string
				/** Subtitle. */
				'subtitle'?: string | undefined | null
				/** Pages. */
				'pages': (SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPage<S>)[]
		}

		interface FormBuilderImportExportObjectSchema extends SpruceSchema.Schema {
			id: 'formBuilderImportExportObject',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'form builder import export object',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
			    fields: {
			            /** Title. */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Subtitle. */
			            'subtitle': {
			                label: 'Subtitle',
			                type: 'text',
			                options: undefined
			            },
			            /** Pages. */
			            'pages': {
			                label: 'Pages',
			                type: 'raw',
			                isRequired: true,
			                isArray: true,
			                options: {valueType: `SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportPage<S>`,}
			            },
			    }
		}

		interface FormBuilderImportExportObjectEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportObjectSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FancyIcon {
			
				/** Name. */
				'name': ("accesibility" | "add" | "address_book" | "administrator" | "airbrush" | "airplane" | "alarm" | "alien" | "american_express" | "analysis" | "analysis_1" | "archive" | "art_palette" | "artificial_intelligence" | "artificial_intelligence_1" | "at" | "atm" | "attachment" | "audio" | "audio_knob" | "auricular_phone" | "back" | "backup" | "balance" | "band_aid" | "bank" | "barcode" | "basketball" | "battery" | "beer" | "bell" | "bicycle" | "bill" | "binoculars" | "birthday" | "bitcoin" | "blog" | "bluetooth" | "bomb" | "book" | "bookmark" | "box" | "brain" | "brainstorm" | "briefcase" | "briefcase_money" | "broken_heart" | "broken_link" | "brush_tip" | "bus" | "cake" | "calculator" | "calendar" | "car" | "cat" | "certificate" | "champagne" | "chat" | "chat_1" | "check" | "check_1" | "chip" | "cirrus" | "city" | "city_1" | "citybank" | "clicker" | "clip" | "clipboard" | "clock" | "cloud" | "cloud_1" | "cloud_computing" | "cloud_computing_1" | "cloudy" | "cocktail" | "code" | "coffee_cup" | "coin_dollar" | "coin_pound" | "coins" | "coinstack" | "collaboration" | "command" | "company" | "compass" | "compose" | "computer_graphics" | "connection" | "contract" | "contract_1" | "contrast" | "control" | "control_game" | "copy" | "costumer" | "coupon" | "crash" | "creative" | "credit_card" | "credit_card1" | "credit_card_2" | "cross" | "cursor" | "dashboard" | "database" | "delete" | "dentistry" | "diary" | "diet" | "digital_campaing" | "digital_key" | "diners_club" | "disc" | "discount" | "dish" | "dish_1" | "dislike" | "divider" | "doctor" | "dog" | "dollar_coin" | "dollar_sign" | "dowload" | "down_arrow" | "download" | "edit" | "edit_file" | "editor" | "education" | "eject" | "emergency" | "employed" | "encrypted_database" | "encrypted_folder" | "encrypted_internet_conection" | "encrypted_mail" | "encryption" | "encypted_terminal" | "enterprice" | "equal" | "erase_file" | "erase_sabe" | "error_database" | "error_search" | "error_terminal" | "euro_sign" | "exit" | "external_link" | "facebook" | "feedback" | "file" | "fill" | "finger_print" | "firewall" | "flag" | "flash" | "flash_auto" | "flash_red_eye" | "flashlight" | "folder_gallery" | "folder" | "football" | "forbidden" | "french_fries" | "funnel" | "gallery" | "game_control" | "games_card_clubs" | "games_card_diamonds" | "games_card_hearts" | "games_card_spades" | "gift" | "girl" | "gmail" | "gold" | "graduated" | "group" | "hamburguer" | "hand" | "hand_note" | "hand_point" | "hand_shake" | "headphones" | "heart" | "heart_1" | "help" | "hide" | "high_five" | "hold" | "home" | "homework" | "hotel" | "hourglass" | "house" | "icon" | "id_card" | "idea" | "infinity" | "info" | "information" | "innovation" | "instagram" | "internet" | "internet_1" | "internet_error" | "key" | "key_1" | "kiss" | "lamp" | "laptop" | "layers" | "layers_1" | "layout" | "left_arrow" | "light_bulb" | "like" | "like_1" | "line_chart" | "link" | "linkeding" | "list" | "local_network" | "location" | "locked" | "magazine" | "magic_wand" | "magnet" | "mail" | "mail_account" | "mail_error" | "map_location" | "maps" | "marker" | "master_data" | "mastercard" | "medicine" | "menu" | "mic" | "microphone" | "microphone_1" | "microscope" | "money_bag" | "money" | "money_1" | "money_report" | "money_report_1" | "monitor" | "more" | "multiple_user" | "multiple_users" | "music_library" | "music_player" | "music_volume_high" | "music_volume_low" | "music_volume_medium" | "music_volume_mute" | "musical_note" | "mute_mic" | "network" | "newspaper" | "note" | "notebook" | "notification" | "old_phone" | "online_pay" | "open_book" | "open_box" | "open_hand" | "p2p" | "pallete" | "paper_plane" | "paper_plane_1" | "passage_of_time" | "pause" | "payment" | "paypal" | "pen_drive" | "perspective" | "pet_paw_print" | "phone_book" | "phone_receiver" | "photo_camera" | "picture" | "pie_chart" | "piggy_bank" | "pinterest" | "piracy" | "pizza" | "placeholder" | "plan" | "plane" | "play_buttom" | "plus" | "police_car" | "power_on_off" | "presentation" | "preview" | "preview_1" | "previous" | "price_tag" | "print_fax" | "project_management" | "project_management_1" | "promotion" | "purse" | "quality" | "radar" | "radioactive" | "rainy" | "rating" | "receipt" | "recluitment" | "recognition" | "record" | "recycle" | "red_eye" | "reload" | "reload_1" | "repair" | "report" | "research" | "responsive" | "restaurant" | "resume" | "reunion" | "right_arrow" | "risk" | "rotate" | "route" | "runner_man" | "sabe" | "sabe_error" | "safety_box_open" | "satellite" | "school" | "scissors" | "screw" | "search" | "send" | "send_file" | "send_file_1" | "send_money" | "send_package" | "server" | "settings" | "settings_1" | "share" | "shield" | "ship" | "shipped" | "shop" | "shopping" | "shopping_bag" | "shopping_car" | "shuffle" | "sign" | "sketch" | "sketch_1" | "skip" | "smartphone" | "snapchat" | "sniffer" | "social_media" | "spam" | "speech_bubble" | "spray" | "star" | "start_up" | "stats_line_chart" | "stethoscope" | "stop" | "stop_watch" | "storage" | "street" | "student" | "study" | "sun_glasses" | "suppport" | "switch" | "tablet" | "tabs" | "tap_gesture" | "target" | "telephone_call" | "television" | "terminal" | "terminal_2" | "think" | "toast" | "toast_1" | "tools" | "traffic_light" | "transfer_data" | "trash" | "treasure_chest" | "trojan" | "twitter" | "two_players" | "university" | "unlock" | "up_arrow" | "upload" | "vector" | "view" | "vintage_phone" | "visa" | "volume_control" | "wallet" | "wallet_1" | "warning" | "warning_briefcase" | "warning_chemistry" | "warning_database" | "warning_dowload" | "warning_folder" | "warning_location" | "warning_mail" | "warning_package" | "warning_search" | "warning_shipped" | "warning_terminal" | "warning_trash" | "web_design" | "web_domain_registration" | "web_search" | "web_search_1" | "website" | "weight" | "whatsapp" | "wheelchair" | "wifi" | "windows" | "wine_cup" | "wordpress" | "worldwide" | "youtube" | "zcash" | "zipped_folder" | "zoom_in" | "zoom_out" | "loading")
				/** Size. */
				'size'?: ("medium" | "extraLarge") | undefined | null
		}

		interface FancyIconSchema extends SpruceSchema.Schema {
			id: 'fancyIcon',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Fancy icon',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Name. */
			            'name': {
			                label: 'Name',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"accesibility","label":"accesibility"},{"value":"add","label":"add"},{"value":"address_book","label":"address_book"},{"value":"administrator","label":"administrator"},{"value":"airbrush","label":"airbrush"},{"value":"airplane","label":"airplane"},{"value":"alarm","label":"alarm"},{"value":"alien","label":"alien"},{"value":"american_express","label":"american_express"},{"value":"analysis","label":"analysis"},{"value":"analysis_1","label":"analysis_1"},{"value":"archive","label":"archive"},{"value":"art_palette","label":"art_palette"},{"value":"artificial_intelligence","label":"artificial_intelligence"},{"value":"artificial_intelligence_1","label":"artificial_intelligence_1"},{"value":"at","label":"at"},{"value":"atm","label":"atm"},{"value":"attachment","label":"attachment"},{"value":"audio","label":"audio"},{"value":"audio_knob","label":"audio_knob"},{"value":"auricular_phone","label":"auricular_phone"},{"value":"back","label":"back"},{"value":"backup","label":"backup"},{"value":"balance","label":"balance"},{"value":"band_aid","label":"band_aid"},{"value":"bank","label":"bank"},{"value":"barcode","label":"barcode"},{"value":"basketball","label":"basketball"},{"value":"battery","label":"battery"},{"value":"beer","label":"beer"},{"value":"bell","label":"bell"},{"value":"bicycle","label":"bicycle"},{"value":"bill","label":"bill"},{"value":"binoculars","label":"binoculars"},{"value":"birthday","label":"birthday"},{"value":"bitcoin","label":"bitcoin"},{"value":"blog","label":"blog"},{"value":"bluetooth","label":"bluetooth"},{"value":"bomb","label":"bomb"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"box","label":"box"},{"value":"brain","label":"brain"},{"value":"brainstorm","label":"brainstorm"},{"value":"briefcase","label":"briefcase"},{"value":"briefcase_money","label":"briefcase_money"},{"value":"broken_heart","label":"broken_heart"},{"value":"broken_link","label":"broken_link"},{"value":"brush_tip","label":"brush_tip"},{"value":"bus","label":"bus"},{"value":"cake","label":"cake"},{"value":"calculator","label":"calculator"},{"value":"calendar","label":"calendar"},{"value":"car","label":"car"},{"value":"cat","label":"cat"},{"value":"certificate","label":"certificate"},{"value":"champagne","label":"champagne"},{"value":"chat","label":"chat"},{"value":"chat_1","label":"chat_1"},{"value":"check","label":"check"},{"value":"check_1","label":"check_1"},{"value":"chip","label":"chip"},{"value":"cirrus","label":"cirrus"},{"value":"city","label":"city"},{"value":"city_1","label":"city_1"},{"value":"citybank","label":"citybank"},{"value":"clicker","label":"clicker"},{"value":"clip","label":"clip"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"cloud","label":"cloud"},{"value":"cloud_1","label":"cloud_1"},{"value":"cloud_computing","label":"cloud_computing"},{"value":"cloud_computing_1","label":"cloud_computing_1"},{"value":"cloudy","label":"cloudy"},{"value":"cocktail","label":"cocktail"},{"value":"code","label":"code"},{"value":"coffee_cup","label":"coffee_cup"},{"value":"coin_dollar","label":"coin_dollar"},{"value":"coin_pound","label":"coin_pound"},{"value":"coins","label":"coins"},{"value":"coinstack","label":"coinstack"},{"value":"collaboration","label":"collaboration"},{"value":"command","label":"command"},{"value":"company","label":"company"},{"value":"compass","label":"compass"},{"value":"compose","label":"compose"},{"value":"computer_graphics","label":"computer_graphics"},{"value":"connection","label":"connection"},{"value":"contract","label":"contract"},{"value":"contract_1","label":"contract_1"},{"value":"contrast","label":"contrast"},{"value":"control","label":"control"},{"value":"control_game","label":"control_game"},{"value":"copy","label":"copy"},{"value":"costumer","label":"costumer"},{"value":"coupon","label":"coupon"},{"value":"crash","label":"crash"},{"value":"creative","label":"creative"},{"value":"credit_card","label":"credit_card"},{"value":"credit_card1","label":"credit_card1"},{"value":"credit_card_2","label":"credit_card_2"},{"value":"cross","label":"cross"},{"value":"cursor","label":"cursor"},{"value":"dashboard","label":"dashboard"},{"value":"database","label":"database"},{"value":"delete","label":"delete"},{"value":"dentistry","label":"dentistry"},{"value":"diary","label":"diary"},{"value":"diet","label":"diet"},{"value":"digital_campaing","label":"digital_campaing"},{"value":"digital_key","label":"digital_key"},{"value":"diners_club","label":"diners_club"},{"value":"disc","label":"disc"},{"value":"discount","label":"discount"},{"value":"dish","label":"dish"},{"value":"dish_1","label":"dish_1"},{"value":"dislike","label":"dislike"},{"value":"divider","label":"divider"},{"value":"doctor","label":"doctor"},{"value":"dog","label":"dog"},{"value":"dollar_coin","label":"dollar_coin"},{"value":"dollar_sign","label":"dollar_sign"},{"value":"dowload","label":"dowload"},{"value":"down_arrow","label":"down_arrow"},{"value":"download","label":"download"},{"value":"edit","label":"edit"},{"value":"edit_file","label":"edit_file"},{"value":"editor","label":"editor"},{"value":"education","label":"education"},{"value":"eject","label":"eject"},{"value":"emergency","label":"emergency"},{"value":"employed","label":"employed"},{"value":"encrypted_database","label":"encrypted_database"},{"value":"encrypted_folder","label":"encrypted_folder"},{"value":"encrypted_internet_conection","label":"encrypted_internet_conection"},{"value":"encrypted_mail","label":"encrypted_mail"},{"value":"encryption","label":"encryption"},{"value":"encypted_terminal","label":"encypted_terminal"},{"value":"enterprice","label":"enterprice"},{"value":"equal","label":"equal"},{"value":"erase_file","label":"erase_file"},{"value":"erase_sabe","label":"erase_sabe"},{"value":"error_database","label":"error_database"},{"value":"error_search","label":"error_search"},{"value":"error_terminal","label":"error_terminal"},{"value":"euro_sign","label":"euro_sign"},{"value":"exit","label":"exit"},{"value":"external_link","label":"external_link"},{"value":"facebook","label":"facebook"},{"value":"feedback","label":"feedback"},{"value":"file","label":"file"},{"value":"fill","label":"fill"},{"value":"finger_print","label":"finger_print"},{"value":"firewall","label":"firewall"},{"value":"flag","label":"flag"},{"value":"flash","label":"flash"},{"value":"flash_auto","label":"flash_auto"},{"value":"flash_red_eye","label":"flash_red_eye"},{"value":"flashlight","label":"flashlight"},{"value":"folder_gallery","label":"folder_gallery"},{"value":"folder","label":"folder"},{"value":"football","label":"football"},{"value":"forbidden","label":"forbidden"},{"value":"french_fries","label":"french_fries"},{"value":"funnel","label":"funnel"},{"value":"gallery","label":"gallery"},{"value":"game_control","label":"game_control"},{"value":"games_card_clubs","label":"games_card_clubs"},{"value":"games_card_diamonds","label":"games_card_diamonds"},{"value":"games_card_hearts","label":"games_card_hearts"},{"value":"games_card_spades","label":"games_card_spades"},{"value":"gift","label":"gift"},{"value":"girl","label":"girl"},{"value":"gmail","label":"gmail"},{"value":"gold","label":"gold"},{"value":"graduated","label":"graduated"},{"value":"group","label":"group"},{"value":"hamburguer","label":"hamburguer"},{"value":"hand","label":"hand"},{"value":"hand_note","label":"hand_note"},{"value":"hand_point","label":"hand_point"},{"value":"hand_shake","label":"hand_shake"},{"value":"headphones","label":"headphones"},{"value":"heart","label":"heart"},{"value":"heart_1","label":"heart_1"},{"value":"help","label":"help"},{"value":"hide","label":"hide"},{"value":"high_five","label":"high_five"},{"value":"hold","label":"hold"},{"value":"home","label":"home"},{"value":"homework","label":"homework"},{"value":"hotel","label":"hotel"},{"value":"hourglass","label":"hourglass"},{"value":"house","label":"house"},{"value":"icon","label":"icon"},{"value":"id_card","label":"id_card"},{"value":"idea","label":"idea"},{"value":"infinity","label":"infinity"},{"value":"info","label":"info"},{"value":"information","label":"information"},{"value":"innovation","label":"innovation"},{"value":"instagram","label":"instagram"},{"value":"internet","label":"internet"},{"value":"internet_1","label":"internet_1"},{"value":"internet_error","label":"internet_error"},{"value":"key","label":"key"},{"value":"key_1","label":"key_1"},{"value":"kiss","label":"kiss"},{"value":"lamp","label":"lamp"},{"value":"laptop","label":"laptop"},{"value":"layers","label":"layers"},{"value":"layers_1","label":"layers_1"},{"value":"layout","label":"layout"},{"value":"left_arrow","label":"left_arrow"},{"value":"light_bulb","label":"light_bulb"},{"value":"like","label":"like"},{"value":"like_1","label":"like_1"},{"value":"line_chart","label":"line_chart"},{"value":"link","label":"link"},{"value":"linkeding","label":"linkeding"},{"value":"list","label":"list"},{"value":"local_network","label":"local_network"},{"value":"location","label":"location"},{"value":"locked","label":"locked"},{"value":"magazine","label":"magazine"},{"value":"magic_wand","label":"magic_wand"},{"value":"magnet","label":"magnet"},{"value":"mail","label":"mail"},{"value":"mail_account","label":"mail_account"},{"value":"mail_error","label":"mail_error"},{"value":"map_location","label":"map_location"},{"value":"maps","label":"maps"},{"value":"marker","label":"marker"},{"value":"master_data","label":"master_data"},{"value":"mastercard","label":"mastercard"},{"value":"medicine","label":"medicine"},{"value":"menu","label":"menu"},{"value":"mic","label":"mic"},{"value":"microphone","label":"microphone"},{"value":"microphone_1","label":"microphone_1"},{"value":"microscope","label":"microscope"},{"value":"money_bag","label":"money_bag"},{"value":"money","label":"money"},{"value":"money_1","label":"money_1"},{"value":"money_report","label":"money_report"},{"value":"money_report_1","label":"money_report_1"},{"value":"monitor","label":"monitor"},{"value":"more","label":"more"},{"value":"multiple_user","label":"multiple_user"},{"value":"multiple_users","label":"multiple_users"},{"value":"music_library","label":"music_library"},{"value":"music_player","label":"music_player"},{"value":"music_volume_high","label":"music_volume_high"},{"value":"music_volume_low","label":"music_volume_low"},{"value":"music_volume_medium","label":"music_volume_medium"},{"value":"music_volume_mute","label":"music_volume_mute"},{"value":"musical_note","label":"musical_note"},{"value":"mute_mic","label":"mute_mic"},{"value":"network","label":"network"},{"value":"newspaper","label":"newspaper"},{"value":"note","label":"note"},{"value":"notebook","label":"notebook"},{"value":"notification","label":"notification"},{"value":"old_phone","label":"old_phone"},{"value":"online_pay","label":"online_pay"},{"value":"open_book","label":"open_book"},{"value":"open_box","label":"open_box"},{"value":"open_hand","label":"open_hand"},{"value":"p2p","label":"p2p"},{"value":"pallete","label":"pallete"},{"value":"paper_plane","label":"paper_plane"},{"value":"paper_plane_1","label":"paper_plane_1"},{"value":"passage_of_time","label":"passage_of_time"},{"value":"pause","label":"pause"},{"value":"payment","label":"payment"},{"value":"paypal","label":"paypal"},{"value":"pen_drive","label":"pen_drive"},{"value":"perspective","label":"perspective"},{"value":"pet_paw_print","label":"pet_paw_print"},{"value":"phone_book","label":"phone_book"},{"value":"phone_receiver","label":"phone_receiver"},{"value":"photo_camera","label":"photo_camera"},{"value":"picture","label":"picture"},{"value":"pie_chart","label":"pie_chart"},{"value":"piggy_bank","label":"piggy_bank"},{"value":"pinterest","label":"pinterest"},{"value":"piracy","label":"piracy"},{"value":"pizza","label":"pizza"},{"value":"placeholder","label":"placeholder"},{"value":"plan","label":"plan"},{"value":"plane","label":"plane"},{"value":"play_buttom","label":"play_buttom"},{"value":"plus","label":"plus"},{"value":"police_car","label":"police_car"},{"value":"power_on_off","label":"power_on_off"},{"value":"presentation","label":"presentation"},{"value":"preview","label":"preview"},{"value":"preview_1","label":"preview_1"},{"value":"previous","label":"previous"},{"value":"price_tag","label":"price_tag"},{"value":"print_fax","label":"print_fax"},{"value":"project_management","label":"project_management"},{"value":"project_management_1","label":"project_management_1"},{"value":"promotion","label":"promotion"},{"value":"purse","label":"purse"},{"value":"quality","label":"quality"},{"value":"radar","label":"radar"},{"value":"radioactive","label":"radioactive"},{"value":"rainy","label":"rainy"},{"value":"rating","label":"rating"},{"value":"receipt","label":"receipt"},{"value":"recluitment","label":"recluitment"},{"value":"recognition","label":"recognition"},{"value":"record","label":"record"},{"value":"recycle","label":"recycle"},{"value":"red_eye","label":"red_eye"},{"value":"reload","label":"reload"},{"value":"reload_1","label":"reload_1"},{"value":"repair","label":"repair"},{"value":"report","label":"report"},{"value":"research","label":"research"},{"value":"responsive","label":"responsive"},{"value":"restaurant","label":"restaurant"},{"value":"resume","label":"resume"},{"value":"reunion","label":"reunion"},{"value":"right_arrow","label":"right_arrow"},{"value":"risk","label":"risk"},{"value":"rotate","label":"rotate"},{"value":"route","label":"route"},{"value":"runner_man","label":"runner_man"},{"value":"sabe","label":"sabe"},{"value":"sabe_error","label":"sabe_error"},{"value":"safety_box_open","label":"safety_box_open"},{"value":"satellite","label":"satellite"},{"value":"school","label":"school"},{"value":"scissors","label":"scissors"},{"value":"screw","label":"screw"},{"value":"search","label":"search"},{"value":"send","label":"send"},{"value":"send_file","label":"send_file"},{"value":"send_file_1","label":"send_file_1"},{"value":"send_money","label":"send_money"},{"value":"send_package","label":"send_package"},{"value":"server","label":"server"},{"value":"settings","label":"settings"},{"value":"settings_1","label":"settings_1"},{"value":"share","label":"share"},{"value":"shield","label":"shield"},{"value":"ship","label":"ship"},{"value":"shipped","label":"shipped"},{"value":"shop","label":"shop"},{"value":"shopping","label":"shopping"},{"value":"shopping_bag","label":"shopping_bag"},{"value":"shopping_car","label":"shopping_car"},{"value":"shuffle","label":"shuffle"},{"value":"sign","label":"sign"},{"value":"sketch","label":"sketch"},{"value":"sketch_1","label":"sketch_1"},{"value":"skip","label":"skip"},{"value":"smartphone","label":"smartphone"},{"value":"snapchat","label":"snapchat"},{"value":"sniffer","label":"sniffer"},{"value":"social_media","label":"social_media"},{"value":"spam","label":"spam"},{"value":"speech_bubble","label":"speech_bubble"},{"value":"spray","label":"spray"},{"value":"star","label":"star"},{"value":"start_up","label":"start_up"},{"value":"stats_line_chart","label":"stats_line_chart"},{"value":"stethoscope","label":"stethoscope"},{"value":"stop","label":"stop"},{"value":"stop_watch","label":"stop_watch"},{"value":"storage","label":"storage"},{"value":"street","label":"street"},{"value":"student","label":"student"},{"value":"study","label":"study"},{"value":"sun_glasses","label":"sun_glasses"},{"value":"suppport","label":"suppport"},{"value":"switch","label":"switch"},{"value":"tablet","label":"tablet"},{"value":"tabs","label":"tabs"},{"value":"tap_gesture","label":"tap_gesture"},{"value":"target","label":"target"},{"value":"telephone_call","label":"telephone_call"},{"value":"television","label":"television"},{"value":"terminal","label":"terminal"},{"value":"terminal_2","label":"terminal_2"},{"value":"think","label":"think"},{"value":"toast","label":"toast"},{"value":"toast_1","label":"toast_1"},{"value":"tools","label":"tools"},{"value":"traffic_light","label":"traffic_light"},{"value":"transfer_data","label":"transfer_data"},{"value":"trash","label":"trash"},{"value":"treasure_chest","label":"treasure_chest"},{"value":"trojan","label":"trojan"},{"value":"twitter","label":"twitter"},{"value":"two_players","label":"two_players"},{"value":"university","label":"university"},{"value":"unlock","label":"unlock"},{"value":"up_arrow","label":"up_arrow"},{"value":"upload","label":"upload"},{"value":"vector","label":"vector"},{"value":"view","label":"view"},{"value":"vintage_phone","label":"vintage_phone"},{"value":"visa","label":"visa"},{"value":"volume_control","label":"volume_control"},{"value":"wallet","label":"wallet"},{"value":"wallet_1","label":"wallet_1"},{"value":"warning","label":"warning"},{"value":"warning_briefcase","label":"warning_briefcase"},{"value":"warning_chemistry","label":"warning_chemistry"},{"value":"warning_database","label":"warning_database"},{"value":"warning_dowload","label":"warning_dowload"},{"value":"warning_folder","label":"warning_folder"},{"value":"warning_location","label":"warning_location"},{"value":"warning_mail","label":"warning_mail"},{"value":"warning_package","label":"warning_package"},{"value":"warning_search","label":"warning_search"},{"value":"warning_shipped","label":"warning_shipped"},{"value":"warning_terminal","label":"warning_terminal"},{"value":"warning_trash","label":"warning_trash"},{"value":"web_design","label":"web_design"},{"value":"web_domain_registration","label":"web_domain_registration"},{"value":"web_search","label":"web_search"},{"value":"web_search_1","label":"web_search_1"},{"value":"website","label":"website"},{"value":"weight","label":"weight"},{"value":"whatsapp","label":"whatsapp"},{"value":"wheelchair","label":"wheelchair"},{"value":"wifi","label":"wifi"},{"value":"windows","label":"windows"},{"value":"wine_cup","label":"wine_cup"},{"value":"wordpress","label":"wordpress"},{"value":"worldwide","label":"worldwide"},{"value":"youtube","label":"youtube"},{"value":"zcash","label":"zcash"},{"value":"zipped_folder","label":"zipped_folder"},{"value":"zoom_in","label":"zoom_in"},{"value":"zoom_out","label":"zoom_out"},{"value":"loading","label":"loading"}],}
			            },
			            /** Size. */
			            'size': {
			                label: 'Size',
			                type: 'select',
			                options: {choices: [{"value":"medium","label":"medium"},{"value":"extraLarge","label":"Extra lange"}],}
			            },
			    }
		}

		interface FancyIconEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FancyIconSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Dialog {
			
				
				'id'?: string | undefined | null
				
				'className'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog>) | undefined | null
				/** Header. */
				'header'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader | undefined | null
				/** Critical error. */
				'criticalError'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError | undefined | null
				/** Fade in. */
				'shouldFadeIn'?: boolean | undefined | null
				/** Style. */
				'style'?: ("standard" | "informational" | "visual" | "heading") | undefined | null
				/** Background image. The URL of an image to use as the background of the card. */
				'backgroundImage'?: string | undefined | null
				/** Background image size. */
				'backgroundImageSize'?: ("cover" | "contain") | undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
				'body'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody | undefined | null
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter | undefined | null
				/** Visible. */
				'isVisible'?: boolean | undefined | null
				/** Show close button. */
				'shouldShowCloseButton'?: boolean | undefined | null
				/** Width. */
				'width'?: ("wide" | "tight" | "full") | undefined | null
				/** Card controller. */
				'cardController'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>) | undefined | null
				/** Close callback. Called when the dialog is closed */
				'onClose'?: (() => Promise<void | boolean> | void | boolean) | undefined | null
				/** Close handler. Called to actually close the dialog */
				'closeHandler'?: (() => Promise<void | boolean> | void | boolean) | undefined | null
		}

		interface DialogSchema extends SpruceSchema.Schema {
			id: 'dialog',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Dialog',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog>`,}
			            },
			            /** Header. */
			            'header': {
			                label: 'Header',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeaderSchema,}
			            },
			            /** Critical error. */
			            'criticalError': {
			                label: 'Critical error',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalErrorSchema,}
			            },
			            /** Fade in. */
			            'shouldFadeIn': {
			                label: 'Fade in',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"standard","label":"Standard"},{"value":"informational","label":"Informational"},{"value":"visual","label":"Visual"},{"value":"heading","label":"Heading"}],}
			            },
			            /** Background image. The URL of an image to use as the background of the card. */
			            'backgroundImage': {
			                label: 'Background image',
			                type: 'text',
			                hint: 'The URL of an image to use as the background of the card.',
			                options: undefined
			            },
			            /** Background image size. */
			            'backgroundImageSize': {
			                label: 'Background image size',
			                type: 'select',
			                options: {choices: [{"value":"cover","label":"Cover"},{"value":"contain","label":"Contain"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
			            'body': {
			                label: 'Body',
			                type: 'schema',
			                hint: 'Card bodies are comprised of sections. You will want at least 1 to get started.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBodySchema,}
			            },
			            /** Footer. */
			            'footer': {
			                label: 'Footer',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema,}
			            },
			            /** Visible. */
			            'isVisible': {
			                label: 'Visible',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Show close button. */
			            'shouldShowCloseButton': {
			                label: 'Show close button',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Width. */
			            'width': {
			                label: 'Width',
			                type: 'select',
			                defaultValue: "tight",
			                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
			            },
			            /** Card controller. */
			            'cardController': {
			                label: 'Card controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>`,}
			            },
			            /** Close callback. Called when the dialog is closed */
			            'onClose': {
			                label: 'Close callback',
			                type: 'raw',
			                hint: 'Called when the dialog is closed',
			                options: {valueType: `() => Promise<void | boolean> | void | boolean`,}
			            },
			            /** Close handler. Called to actually close the dialog */
			            'closeHandler': {
			                label: 'Close handler',
			                type: 'raw',
			                hint: 'Called to actually close the dialog',
			                options: {valueType: `() => Promise<void | boolean> | void | boolean`,}
			            },
			    }
		}

		interface DialogEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DialogSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Portal {
			
				/** HTML. */
				'html'?: string | undefined | null
				/** URI. */
				'uri'?: string | undefined | null
		}

		interface PortalSchema extends SpruceSchema.Schema {
			id: 'portal',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** HTML. */
			            'html': {
			                label: 'HTML',
			                type: 'text',
			                options: undefined
			            },
			            /** URI. */
			            'uri': {
			                label: 'URI',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface PortalEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PortalSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface LineGraph {
			
				
				'id'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ChartViewController<HeartwoodTypes.LineGraph>) | undefined | null
				
				'dataSets': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSet[]
		}

		interface LineGraphSchema extends SpruceSchema.Schema {
			id: 'lineGraph',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Line graph',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ChartViewController<HeartwoodTypes.LineGraph>`,}
			            },
			            /** . */
			            'dataSets': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSetSchema,}
			            },
			    }
		}

		interface LineGraphEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineGraphSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Feed {
			
				
				'items': SpruceSchemas.Spruce.v2020_07_22.FeedItem[]
				
				'onSubmitMessage'?: (HeartwoodTypes.OnSubmitFeedMessageHandler) | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed>) | undefined | null
		}

		interface FeedSchema extends SpruceSchema.Schema {
			id: 'feed',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Feed',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'items': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.Spruce.v2020_07_22.FeedItemSchema,}
			            },
			            /** . */
			            'onSubmitMessage': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.OnSubmitFeedMessageHandler`,}
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed>`,}
			            },
			    }
		}

		interface FeedEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FeedSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardSection {
			
				
				'id'?: string | undefined | null
				/** Title. */
				'title'?: string | undefined | null
				/** Complete. When being rendered as a slide, this will signify the step is complete. */
				'isComplete'?: boolean | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>) | undefined | null
				/** Padding. */
				'shouldBePadded'?: boolean | undefined | null
				/** Center content. */
				'shouldContentBeCentered'?: boolean | undefined | null
				/** Card section item. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				
				'video'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Video | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Form. */
				'form'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any> | undefined | null
				/** Talking Sprucebot. */
				'talkingSprucebot'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebot | undefined | null
				/** Big form. */
				'bigForm'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigForm<any> | undefined | null
				/** Map. */
				'map'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Map | undefined | null
				/** Buttons. */
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[] | undefined | null
				/** Button bar. */
				'buttonBar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar | undefined | null
				/** List. */
				'list'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List | undefined | null
				/** Calendar. */
				'calendar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar | undefined | null
				/** Stats. */
				'stats'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Stats | undefined | null
				/** Countdown timer. */
				'countdownTimer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CountdownTimer | undefined | null
				/** Progress. */
				'progress'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Progress | undefined | null
				/** Ratings. */
				'ratings'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings | undefined | null
				/** Receipt. */
				'receipt'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Receipt | undefined | null
				/** Polar radar. */
				'polarArea'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarArea | undefined | null
				/** Feed. */
				'feed'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Feed | undefined | null
				/** Pager. */
				'pager'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Pager | undefined | null
				/** Bar chart. */
				'barChart'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChart | undefined | null
				/** Line graph. */
				'lineGraph'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineGraph | undefined | null
				/** Grid. */
				'shouldRenderContentsAsGrid'?: boolean | undefined | null
				/** Grid size. */
				'gridSize'?: ("small" | "medium" | "large") | undefined | null
				/** . Will render content in an iframe in the body of the card. */
				'portal'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Portal | undefined | null
				
				'webRtcPlayer'?: (HeartwoodTypes.WebRtcPlayer) | undefined | null
				/** Alignment. */
				'alignment'?: ("left" | "center" | "right") | undefined | null
				/** Style. */
				'style'?: ("standard" | "primary" | "secondary") | undefined | null
				/** Layout. */
				'layout'?: ("vertical" | "horizontal") | undefined | null
		}

		interface CardSectionSchema extends SpruceSchema.Schema {
			id: 'cardSection',
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
			            /** Title. */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                options: undefined
			            },
			            /** Complete. When being rendered as a slide, this will signify the step is complete. */
			            'isComplete': {
			                label: 'Complete',
			                type: 'boolean',
			                hint: 'When being rendered as a slide, this will signify the step is complete.',
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                isPrivate: true,
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>`,}
			            },
			            /** Padding. */
			            'shouldBePadded': {
			                label: 'Padding',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Center content. */
			            'shouldContentBeCentered': {
			                label: 'Center content',
			                type: 'boolean',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Card section item. */
			            'text': {
			                label: 'Card section item',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'video': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.VideoSchema,}
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Form. */
			            'form': {
			                label: 'Form',
			                type: 'schema',
			                options: {typeSuffix: `<any>`,schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSchema,}
			            },
			            /** Talking Sprucebot. */
			            'talkingSprucebot': {
			                label: 'Talking Sprucebot',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebotSchema,}
			            },
			            /** Big form. */
			            'bigForm': {
			                label: 'Big form',
			                type: 'schema',
			                options: {typeSuffix: `<any>`,schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSchema,}
			            },
			            /** Map. */
			            'map': {
			                label: 'Map',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapSchema,}
			            },
			            /** Buttons. */
			            'buttons': {
			                label: 'Buttons',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonSchema,}
			            },
			            /** Button bar. */
			            'buttonBar': {
			                label: 'Button bar',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarSchema,}
			            },
			            /** List. */
			            'list': {
			                label: 'List',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSchema,}
			            },
			            /** Calendar. */
			            'calendar': {
			                label: 'Calendar',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSchema,}
			            },
			            /** Stats. */
			            'stats': {
			                label: 'Stats',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsSchema,}
			            },
			            /** Countdown timer. */
			            'countdownTimer': {
			                label: 'Countdown timer',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CountdownTimerSchema,}
			            },
			            /** Progress. */
			            'progress': {
			                label: 'Progress',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressSchema,}
			            },
			            /** Ratings. */
			            'ratings': {
			                label: 'Ratings',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsSchema,}
			            },
			            /** Receipt. */
			            'receipt': {
			                label: 'Receipt',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSchema,}
			            },
			            /** Polar radar. */
			            'polarArea': {
			                label: 'Polar radar',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaSchema,}
			            },
			            /** Feed. */
			            'feed': {
			                label: 'Feed',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FeedSchema,}
			            },
			            /** Pager. */
			            'pager': {
			                label: 'Pager',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PagerSchema,}
			            },
			            /** Bar chart. */
			            'barChart': {
			                label: 'Bar chart',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChartSchema,}
			            },
			            /** Line graph. */
			            'lineGraph': {
			                label: 'Line graph',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineGraphSchema,}
			            },
			            /** Grid. */
			            'shouldRenderContentsAsGrid': {
			                label: 'Grid',
			                type: 'boolean',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Grid size. */
			            'gridSize': {
			                label: 'Grid size',
			                type: 'select',
			                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
			            },
			            /** . Will render content in an iframe in the body of the card. */
			            'portal': {
			                type: 'schema',
			                hint: 'Will render content in an iframe in the body of the card.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PortalSchema,}
			            },
			            /** . */
			            'webRtcPlayer': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.WebRtcPlayer`,}
			            },
			            /** Alignment. */
			            'alignment': {
			                label: 'Alignment',
			                type: 'select',
			                defaultValue: "left",
			                options: {choices: [{"value":"left","label":"Left"},{"value":"center","label":"Center"},{"value":"right","label":"Right"}],}
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"standard","label":"Standard"},{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"}],}
			            },
			            /** Layout. */
			            'layout': {
			                label: 'Layout',
			                type: 'select',
			                options: {choices: [{"value":"vertical","label":"Vertical"},{"value":"horizontal","label":"Horizontal"}],}
			            },
			    }
		}

		interface CardSectionEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSectionSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardBody {
			
				/** Show section separators. This will make each section render with a border. */
				'shouldShowSectionSeparators'?: boolean | undefined | null
				/** Busy. */
				'isBusy'?: boolean | undefined | null
				/** Swipe controller. */
				'swipeController'?: ((controller: HeartwoodTypes.SwipeController) => void) | undefined | null
				/** Swipe. */
				'shouldEnableSectionSwiping'?: boolean | undefined | null
				/** Swipe break into cards on landscape. */
				'shouldSwipeBreakIntoCardsOnLandscape'?: boolean | undefined | null
				/** Select slide title handler. */
				'onSelectSlideTitle'?: ((id: number) => void) | undefined | null
				/** Slide change callback. */
				'onChangeSlide'?: ((slide: number) => void) | undefined | null
				/** Render sections as grid. */
				'shouldRenderSectionsAsGrid'?: boolean | undefined | null
				/** Sections. */
				'sections'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection[] | undefined | null
		}

		interface CardBodySchema extends SpruceSchema.Schema {
			id: 'cardBody',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Show section separators. This will make each section render with a border. */
			            'shouldShowSectionSeparators': {
			                label: 'Show section separators',
			                type: 'boolean',
			                hint: 'This will make each section render with a border.',
			                options: undefined
			            },
			            /** Busy. */
			            'isBusy': {
			                label: 'Busy',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Swipe controller. */
			            'swipeController': {
			                label: 'Swipe controller',
			                type: 'raw',
			                options: {valueType: `(controller: HeartwoodTypes.SwipeController) => void`,}
			            },
			            /** Swipe. */
			            'shouldEnableSectionSwiping': {
			                label: 'Swipe',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Swipe break into cards on landscape. */
			            'shouldSwipeBreakIntoCardsOnLandscape': {
			                label: 'Swipe break into cards on landscape',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Select slide title handler. */
			            'onSelectSlideTitle': {
			                label: 'Select slide title handler',
			                type: 'raw',
			                options: {valueType: `(id: number) => void`,}
			            },
			            /** Slide change callback. */
			            'onChangeSlide': {
			                label: 'Slide change callback',
			                type: 'raw',
			                options: {valueType: `(slide: number) => void`,}
			            },
			            /** Render sections as grid. */
			            'shouldRenderSectionsAsGrid': {
			                label: 'Render sections as grid',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Sections. */
			            'sections': {
			                label: 'Sections',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSectionSchema,}
			            },
			    }
		}

		interface CardBodyEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBodySchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface PolarAreaDataItem {
			
				
				'label': string
				
				'value': number
		}

		interface PolarAreaDataItemSchema extends SpruceSchema.Schema {
			id: 'polarAreaDataItem',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'label': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'value': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface PolarAreaDataItemEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaDataItemSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface PolarArea {
			
				
				'id'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.PolarAreaViewController) | undefined | null
				
				'data': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaDataItem[]
		}

		interface PolarAreaSchema extends SpruceSchema.Schema {
			id: 'polarArea',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Polar Area',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.PolarAreaViewController`,}
			            },
			            /** . */
			            'data': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaDataItemSchema,}
			            },
			    }
		}

		interface PolarAreaEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PolarAreaSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ReceiptTotal {
			
				
				'label': string
				
				'value': string
				
				'shouldBeEmphasized'?: boolean | undefined | null
				
				'shouldBeCalledOut'?: boolean | undefined | null
		}

		interface ReceiptTotalSchema extends SpruceSchema.Schema {
			id: 'receiptTotal',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'label': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'value': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'shouldBeEmphasized': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'shouldBeCalledOut': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		interface ReceiptTotalEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptTotalSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ReceiptLineItem {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'description'?: string | undefined | null
				
				'quantity': string
				
				'totalPrice': string
		}

		interface ReceiptLineItemSchema extends SpruceSchema.Schema {
			id: 'receiptLineItem',
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
			            'description': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'quantity': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'totalPrice': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface ReceiptLineItemEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptLineItemSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ReceiptSection {
			
				
				'title'?: string | undefined | null
				
				'lineItems'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptLineItem[] | undefined | null
		}

		interface ReceiptSectionSchema extends SpruceSchema.Schema {
			id: 'receiptSection',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'lineItems': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptLineItemSchema,}
			            },
			    }
		}

		interface ReceiptSectionEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSectionSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ReceiptHeader {
			
				
				'title'?: string | undefined | null
				
				'subtitle'?: string | undefined | null
		}

		interface ReceiptHeaderSchema extends SpruceSchema.Schema {
			id: 'receiptHeader',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'subtitle': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface ReceiptHeaderEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptHeaderSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Receipt {
			
				
				'header'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptHeader | undefined | null
				
				'sections'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSection[] | undefined | null
				
				'totals'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptTotal[] | undefined | null
		}

		interface ReceiptSchema extends SpruceSchema.Schema {
			id: 'receipt',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Receipt',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'header': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptHeaderSchema,}
			            },
			            /** . */
			            'sections': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSectionSchema,}
			            },
			            /** . */
			            'totals': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptTotalSchema,}
			            },
			    }
		}

		interface ReceiptEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ReceiptSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Ratings {
			
				/** Value. A number between 0-1. */
				'value'?: number | undefined | null
				/** Can be changed. */
				'canBeChanged'?: boolean | undefined | null
				/** Callback. */
				'onChange'?: ((value: number) => any) | undefined | null
				/** Steps. How many choices does a person have? Defaults to 5. */
				'steps'?: number | undefined | null
				/** Left Label. The label on the left side of the ratings. Usually assocatiated with the lowest rating. */
				'leftLabel'?: string | undefined | null
				/** Right Label. The label on the right side of the ratings. Usually associated with the highest rating. */
				'rightLabel'?: string | undefined | null
				/** Middle Label. The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common. */
				'middleLabel'?: string | undefined | null
				/** Style. How should I render the ratings? Defaults to 'Star'. */
				'icon'?: ("star" | "radio") | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>) | undefined | null
		}

		interface RatingsSchema extends SpruceSchema.Schema {
			id: 'ratings',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Ratings',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Value. A number between 0-1. */
			            'value': {
			                label: 'Value',
			                type: 'number',
			                hint: 'A number between 0-1.',
			                options: undefined
			            },
			            /** Can be changed. */
			            'canBeChanged': {
			                label: 'Can be changed',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Callback. */
			            'onChange': {
			                label: 'Callback',
			                type: 'raw',
			                options: {valueType: `(value: number) => any`,}
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
			    }
		}

		interface RatingsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ProgressDetails {
			
				
				'title'?: string | undefined | null
				
				'subtitle'?: string | undefined | null
		}

		interface ProgressDetailsSchema extends SpruceSchema.Schema {
			id: 'progressDetails',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'subtitle': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface ProgressDetailsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressDetailsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Progress {
			
				
				'id'?: string | undefined | null
				/** Title. Rendered in the center of the circle indicator! */
				'title'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ProgressViewController) | undefined | null
				/** Percent complete. A number from zero to 1 */
				'percentComplete'?: number | undefined | null
				/** Details. */
				'details'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressDetails | undefined | null
		}

		interface ProgressSchema extends SpruceSchema.Schema {
			id: 'progress',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Progress',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Title. Rendered in the center of the circle indicator! */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                hint: 'Rendered in the center of the circle indicator!',
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ProgressViewController`,}
			            },
			            /** Percent complete. A number from zero to 1 */
			            'percentComplete': {
			                label: 'Percent complete',
			                type: 'number',
			                hint: 'A number from zero to 1',
			                options: undefined
			            },
			            /** Details. */
			            'details': {
			                label: 'Details',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressDetailsSchema,}
			            },
			    }
		}

		interface ProgressEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface StatsStat {
			
				
				'value'?: (number | string) | undefined | null
				
				'label'?: string | undefined | null
		}

		interface StatsStatSchema extends SpruceSchema.Schema {
			id: 'statsStat',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'value': {
			                type: 'raw',
			                options: {valueType: `number | string`,}
			            },
			            /** . */
			            'label': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface StatsStatEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsStatSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Stats {
			
				/** Prefix. Will be rendered before the value. Could be a $ or something else. */
				'valuePrefix'?: string | undefined | null
				/** Format values. Add commas to numbers. */
				'shouldFormatValues'?: boolean | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Stats>) | undefined | null
				/** Stats. */
				'stats': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsStat[]
		}

		interface StatsSchema extends SpruceSchema.Schema {
			id: 'stats',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Stats',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Prefix. Will be rendered before the value. Could be a $ or something else. */
			            'valuePrefix': {
			                label: 'Prefix',
			                type: 'text',
			                hint: 'Will be rendered before the value. Could be a $ or something else.',
			                options: undefined
			            },
			            /** Format values. Add commas to numbers. */
			            'shouldFormatValues': {
			                label: 'Format values',
			                type: 'boolean',
			                hint: 'Add commas to numbers.',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Stats>`,}
			            },
			            /** Stats. */
			            'stats': {
			                label: 'Stats',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsStatSchema,}
			            },
			    }
		}

		interface StatsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface MapPin {
			
				
				'title'?: string | undefined | null
				
				'subtitle'?: string | undefined | null
				
				'address': SpruceSchema.AddressFieldValue
				
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[] | undefined | null
		}

		interface MapPinSchema extends SpruceSchema.Schema {
			id: 'mapPin',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'subtitle': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'address': {
			                type: 'address',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'buttons': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonSchema,}
			            },
			    }
		}

		interface MapPinEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapPinSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface LatLng {
			
				
				'lat': number
				
				'lng': number
		}

		interface LatLngSchema extends SpruceSchema.Schema {
			id: 'latLng',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'lat': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'lng': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface LatLngEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LatLngSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Map {
			
				
				'center'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LatLng | undefined | null
				
				'zoom'?: ("house" | "block" | "longWalk" | "shortDrive" | "city" | "state") | undefined | null
				
				'pins'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapPin[] | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.MapViewController) | undefined | null
		}

		interface MapSchema extends SpruceSchema.Schema {
			id: 'map',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Map',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'center': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LatLngSchema,}
			            },
			            /** . */
			            'zoom': {
			                type: 'select',
			                options: {choices: [{"label":"House/Building","value":"house"},{"label":"Neighborhood Block","value":"block"},{"label":"Long walk","value":"longWalk"},{"label":"Short drive","value":"shortDrive"},{"label":"City","value":"city"},{"label":"State","value":"state"}],}
			            },
			            /** . */
			            'pins': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapPinSchema,}
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.MapViewController`,}
			            },
			    }
		}

		interface MapEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.MapSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface BigForm<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'id': string
				
				'className'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.BigFormViewController<S>) | undefined | null
				
				'schema': (S)
				/** Submit handler. */
				'onSubmit'?: (HeartwoodTypes.SubmitHandler<S>) | undefined | null
				/** Cancel handler. */
				'onCancel'?: (() => void | Promise<void>) | undefined | null
				/** Will change handler. */
				'onWillChange'?: ((options: HeartwoodTypes.FormWillChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined) | undefined | null
				/** Change handler. */
				'onChange'?: ((options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void) | undefined | null
				/** Values. The values you want the form to have. Control is given to the FormViewController after render. */
				'values'?: (SpruceSchema.SchemaPartialValues<S>) | undefined | null
				/** Errors by field. */
				'errorsByField'?: (HeartwoodTypes.FormErrorsByField<S>) | undefined | null
				/** Show submit controls. */
				'shouldRenderSubmitControls'?: boolean | undefined | null
				/** Show cancel button. */
				'shouldRenderCancelButton'?: boolean | undefined | null
				/** Submit button label. */
				'submitButtonLabel'?: string | undefined | null
				/** Cancel button label. */
				'cancelButtonLabel'?: string | undefined | null
				/** Busy. */
				'isBusy'?: boolean | undefined | null
				/** Enabled. */
				'isEnabled'?: boolean | undefined | null
				/** Set value handler. */
				'setValue': ((name: SpruceSchema.SchemaFieldNames<S>, value: any) => void)
				/** Form sections. */
				'sections': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSection<S>[]
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter | undefined | null
				
				'sprucebotAvatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatar | undefined | null
				
				'shouldRenderFirstFieldsLabel'?: boolean | undefined | null
				
				'talkingSprucebot'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebot | undefined | null
				/** Render slide titles. */
				'shouldRenderSlideTitles'?: boolean | undefined | null
				/** Present slide. The slide showing now! */
				'presentSlide'?: number | undefined | null
				/** Submit handler. */
				'onSubmitSlide'?: (HeartwoodTypes.SubmitSlideHandler<S>) | undefined | null
		}

		interface BigFormSchema extends SpruceSchema.Schema {
			id: 'bigForm',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Big form',
			importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
			    fields: {
			            /** . */
			            'id': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.BigFormViewController<S>`,}
			            },
			            /** . */
			            'schema': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `S`,}
			            },
			            /** Submit handler. */
			            'onSubmit': {
			                label: 'Submit handler',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.SubmitHandler<S>`,}
			            },
			            /** Cancel handler. */
			            'onCancel': {
			                label: 'Cancel handler',
			                type: 'raw',
			                options: {valueType: `() => void | Promise<void>`,}
			            },
			            /** Will change handler. */
			            'onWillChange': {
			                label: 'Will change handler',
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.FormWillChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined`,}
			            },
			            /** Change handler. */
			            'onChange': {
			                label: 'Change handler',
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void`,}
			            },
			            /** Values. The values you want the form to have. Control is given to the FormViewController after render. */
			            'values': {
			                label: 'Values',
			                type: 'raw',
			                hint: 'The values you want the form to have. Control is given to the FormViewController after render.',
			                options: {valueType: `SpruceSchema.SchemaPartialValues<S>`,}
			            },
			            /** Errors by field. */
			            'errorsByField': {
			                label: 'Errors by field',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.FormErrorsByField<S>`,}
			            },
			            /** Show submit controls. */
			            'shouldRenderSubmitControls': {
			                label: 'Show submit controls',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Show cancel button. */
			            'shouldRenderCancelButton': {
			                label: 'Show cancel button',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Submit button label. */
			            'submitButtonLabel': {
			                label: 'Submit button label',
			                type: 'text',
			                defaultValue: "Go!",
			                options: undefined
			            },
			            /** Cancel button label. */
			            'cancelButtonLabel': {
			                label: 'Cancel button label',
			                type: 'text',
			                defaultValue: "Cancel",
			                options: undefined
			            },
			            /** Busy. */
			            'isBusy': {
			                label: 'Busy',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Enabled. */
			            'isEnabled': {
			                label: 'Enabled',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Set value handler. */
			            'setValue': {
			                label: 'Set value handler',
			                type: 'raw',
			                isPrivate: true,
			                isRequired: true,
			                options: {valueType: `(name: SpruceSchema.SchemaFieldNames<S>, value: any) => void`,}
			            },
			            /** Form sections. */
			            'sections': {
			                label: 'Form sections',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {typeSuffix: `<S>`,schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSectionSchema,}
			            },
			            /** Footer. */
			            'footer': {
			                label: 'Footer',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema,}
			            },
			            /** . */
			            'sprucebotAvatar': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatarSchema,}
			            },
			            /** . */
			            'shouldRenderFirstFieldsLabel': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'talkingSprucebot': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebotSchema,}
			            },
			            /** Render slide titles. */
			            'shouldRenderSlideTitles': {
			                label: 'Render slide titles',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Present slide. The slide showing now! */
			            'presentSlide': {
			                label: 'Present slide',
			                type: 'number',
			                hint: 'The slide showing now!',
			                defaultValue: 0,
			                options: undefined
			            },
			            /** Submit handler. */
			            'onSubmitSlide': {
			                label: 'Submit handler',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.SubmitSlideHandler<S>`,}
			            },
			    }
		}

		interface BigFormEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		/** Avatar that makes size optional for use with the Sprucebot Typed Message component */
		interface SprucebotTypedMessageAvatar {
			
				/** Size. */
				'size'?: ("small" | "medium" | "large") | undefined | null
				/** State of mind. */
				'stateOfMind': ("chill" | "contemplative" | "accomplished")
		}

		interface SprucebotTypedMessageAvatarSchema extends SpruceSchema.Schema {
			id: 'sprucebotTypedMessageAvatar',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Typed message avatar',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			description: 'Avatar that makes size optional for use with the Sprucebot Typed Message component',
			    fields: {
			            /** Size. */
			            'size': {
			                label: 'Size',
			                type: 'select',
			                defaultValue: "medium",
			                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
			            },
			            /** State of mind. */
			            'stateOfMind': {
			                label: 'State of mind',
			                type: 'select',
			                isRequired: true,
			                defaultValue: "chill",
			                options: {choices: [{"value":"chill","label":"Chill - Sprucebot is saying something informative or a salutation"},{"value":"contemplative","label":"Contemplative - Sprucebot is loading or sending data"},{"value":"accomplished","label":"Accomplished - Sprucebot is celebrating because a process has finished"}],}
			            },
			    }
		}

		interface SprucebotTypedMessageAvatarEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatarSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SprucebotAvatar {
			
				/** Size. */
				'size': ("small" | "medium" | "large")
				/** State of mind. */
				'stateOfMind': ("chill" | "contemplative" | "accomplished")
		}

		interface SprucebotAvatarSchema extends SpruceSchema.Schema {
			id: 'sprucebotAvatar',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Sprucebot avatar',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Size. */
			            'size': {
			                label: 'Size',
			                type: 'select',
			                isRequired: true,
			                defaultValue: "medium",
			                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
			            },
			            /** State of mind. */
			            'stateOfMind': {
			                label: 'State of mind',
			                type: 'select',
			                isRequired: true,
			                defaultValue: "chill",
			                options: {choices: [{"value":"chill","label":"Chill - Sprucebot is saying something informative or a salutation"},{"value":"contemplative","label":"Contemplative - Sprucebot is loading or sending data"},{"value":"accomplished","label":"Accomplished - Sprucebot is celebrating because a process has finished"}],}
			            },
			    }
		}

		interface SprucebotAvatarEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatarSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SprucebotTypedMessageSentence {
			
				/** . A way to override the Sprucebot avatar for this sentence */
				'avatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatar | undefined | null
				/** Words. The words being typed out */
				'words': string
				/** End delay. How long should I hold on this sentence after it's typed? */
				'endDelay'?: SpruceSchema.DurationFieldValue | undefined | null
		}

		interface SprucebotTypedMessageSentenceSchema extends SpruceSchema.Schema {
			id: 'sprucebotTypedMessageSentence',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Sprucebot Typed sentence',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . A way to override the Sprucebot avatar for this sentence */
			            'avatar': {
			                type: 'schema',
			                hint: 'A way to override the Sprucebot avatar for this sentence',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatarSchema,}
			            },
			            /** Words. The words being typed out */
			            'words': {
			                label: 'Words',
			                type: 'text',
			                isRequired: true,
			                hint: 'The words being typed out',
			                options: undefined
			            },
			            /** End delay. How long should I hold on this sentence after it's typed? */
			            'endDelay': {
			                label: 'End delay',
			                type: 'duration',
			                hint: 'How long should I hold on this sentence after it\'s typed?',
			                options: undefined
			            },
			    }
		}

		interface SprucebotTypedMessageSentenceEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentenceSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface TalkingSprucebot {
			
				
				'id'?: string | undefined | null
				/** Sentences. Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold) */
				'sentences': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentence[]
				/** Default avatar. How should Sprucebot be rendered by default */
				'avatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatar | undefined | null
				/** Start delay. How long should I wait before starting to type? */
				'startDelay'?: SpruceSchema.DurationFieldValue | undefined | null
				/** Loop. */
				'shouldLoop'?: boolean | undefined | null
				/** Size. */
				'size'?: ("small" | "medium" | "large") | undefined | null
				/** Playing. */
				'isPlaying'?: boolean | undefined | null
				/** Completion handler. */
				'onComplete'?: (() => Promise<void> | void) | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.TalkingSprucebotViewController) | undefined | null
		}

		interface TalkingSprucebotSchema extends SpruceSchema.Schema {
			id: 'talkingSprucebot',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Talking sprucebot',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Sentences. Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold) */
			            'sentences': {
			                label: 'Sentences',
			                type: 'schema',
			                isRequired: true,
			                hint: 'Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold)',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentenceSchema,}
			            },
			            /** Default avatar. How should Sprucebot be rendered by default */
			            'avatar': {
			                label: 'Default avatar',
			                type: 'schema',
			                hint: 'How should Sprucebot be rendered by default',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatarSchema,}
			            },
			            /** Start delay. How long should I wait before starting to type? */
			            'startDelay': {
			                label: 'Start delay',
			                type: 'duration',
			                hint: 'How long should I wait before starting to type?',
			                defaultValue: {"hours":0,"minutes":0,"seconds":1,"ms":0},
			                options: undefined
			            },
			            /** Loop. */
			            'shouldLoop': {
			                label: 'Loop',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Size. */
			            'size': {
			                label: 'Size',
			                type: 'select',
			                defaultValue: "small",
			                options: {choices: [{"value":"small","label":"Small"},{"value":"medium","label":"Medium"},{"value":"large","label":"Large"}],}
			            },
			            /** Playing. */
			            'isPlaying': {
			                label: 'Playing',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Completion handler. */
			            'onComplete': {
			                label: 'Completion handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<void> | void`,}
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.TalkingSprucebotViewController`,}
			            },
			    }
		}

		interface TalkingSprucebotEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebotSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CriticalError {
			
				
				'title'?: string | undefined | null
				
				'message'?: string | undefined | null
				
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[] | undefined | null
		}

		interface CriticalErrorSchema extends SpruceSchema.Schema {
			id: 'criticalError',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'title': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'message': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'buttons': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonSchema,}
			            },
			    }
		}

		interface CriticalErrorEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalErrorSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Form<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'id': string
				
				'className'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.FormViewController<S>) | undefined | null
				
				'schema': (S)
				/** Submit handler. */
				'onSubmit'?: (HeartwoodTypes.SubmitHandler<S>) | undefined | null
				/** Cancel handler. */
				'onCancel'?: (() => void | Promise<void>) | undefined | null
				/** Will change handler. */
				'onWillChange'?: ((options: HeartwoodTypes.FormWillChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined) | undefined | null
				/** Change handler. */
				'onChange'?: ((options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void) | undefined | null
				/** Values. The values you want the form to have. Control is given to the FormViewController after render. */
				'values'?: (SpruceSchema.SchemaPartialValues<S>) | undefined | null
				/** Errors by field. */
				'errorsByField'?: (HeartwoodTypes.FormErrorsByField<S>) | undefined | null
				/** Show submit controls. */
				'shouldRenderSubmitControls'?: boolean | undefined | null
				/** Show cancel button. */
				'shouldRenderCancelButton'?: boolean | undefined | null
				/** Submit button label. */
				'submitButtonLabel'?: string | undefined | null
				/** Cancel button label. */
				'cancelButtonLabel'?: string | undefined | null
				/** Busy. */
				'isBusy'?: boolean | undefined | null
				/** Enabled. */
				'isEnabled'?: boolean | undefined | null
				/** Set value handler. */
				'setValue': ((name: SpruceSchema.SchemaFieldNames<S>, value: any) => void)
				/** Form sections. */
				'sections': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>[]
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter | undefined | null
		}

		interface FormSchema extends SpruceSchema.Schema {
			id: 'form',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Form',
			importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
			    fields: {
			            /** . */
			            'id': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.FormViewController<S>`,}
			            },
			            /** . */
			            'schema': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `S`,}
			            },
			            /** Submit handler. */
			            'onSubmit': {
			                label: 'Submit handler',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.SubmitHandler<S>`,}
			            },
			            /** Cancel handler. */
			            'onCancel': {
			                label: 'Cancel handler',
			                type: 'raw',
			                options: {valueType: `() => void | Promise<void>`,}
			            },
			            /** Will change handler. */
			            'onWillChange': {
			                label: 'Will change handler',
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.FormWillChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined`,}
			            },
			            /** Change handler. */
			            'onChange': {
			                label: 'Change handler',
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void`,}
			            },
			            /** Values. The values you want the form to have. Control is given to the FormViewController after render. */
			            'values': {
			                label: 'Values',
			                type: 'raw',
			                hint: 'The values you want the form to have. Control is given to the FormViewController after render.',
			                options: {valueType: `SpruceSchema.SchemaPartialValues<S>`,}
			            },
			            /** Errors by field. */
			            'errorsByField': {
			                label: 'Errors by field',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.FormErrorsByField<S>`,}
			            },
			            /** Show submit controls. */
			            'shouldRenderSubmitControls': {
			                label: 'Show submit controls',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Show cancel button. */
			            'shouldRenderCancelButton': {
			                label: 'Show cancel button',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Submit button label. */
			            'submitButtonLabel': {
			                label: 'Submit button label',
			                type: 'text',
			                defaultValue: "Go!",
			                options: undefined
			            },
			            /** Cancel button label. */
			            'cancelButtonLabel': {
			                label: 'Cancel button label',
			                type: 'text',
			                defaultValue: "Cancel",
			                options: undefined
			            },
			            /** Busy. */
			            'isBusy': {
			                label: 'Busy',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Enabled. */
			            'isEnabled': {
			                label: 'Enabled',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Set value handler. */
			            'setValue': {
			                label: 'Set value handler',
			                type: 'raw',
			                isPrivate: true,
			                isRequired: true,
			                options: {valueType: `(name: SpruceSchema.SchemaFieldNames<S>, value: any) => void`,}
			            },
			            /** Form sections. */
			            'sections': {
			                label: 'Form sections',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {typeSuffix: `<S>`,schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSectionSchema,}
			            },
			            /** Footer. */
			            'footer': {
			                label: 'Footer',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema,}
			            },
			    }
		}

		interface FormEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardHeader {
			
				/** Title. */
				'title'?: string | undefined | null
				/** Subtitle. */
				'subtitle'?: string | undefined | null
				/** Alt title. */
				'altTitle'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader>) | undefined | null
				/** Icon. */
				'icon'?: ("accesibility" | "add" | "address_book" | "administrator" | "airbrush" | "airplane" | "alarm" | "alien" | "american_express" | "analysis" | "analysis_1" | "archive" | "art_palette" | "artificial_intelligence" | "artificial_intelligence_1" | "at" | "atm" | "attachment" | "audio" | "audio_knob" | "auricular_phone" | "back" | "backup" | "balance" | "band_aid" | "bank" | "barcode" | "basketball" | "battery" | "beer" | "bell" | "bicycle" | "bill" | "binoculars" | "birthday" | "bitcoin" | "blog" | "bluetooth" | "bomb" | "book" | "bookmark" | "box" | "brain" | "brainstorm" | "briefcase" | "briefcase_money" | "broken_heart" | "broken_link" | "brush_tip" | "bus" | "cake" | "calculator" | "calendar" | "car" | "cat" | "certificate" | "champagne" | "chat" | "chat_1" | "check" | "check_1" | "chip" | "cirrus" | "city" | "city_1" | "citybank" | "clicker" | "clip" | "clipboard" | "clock" | "cloud" | "cloud_1" | "cloud_computing" | "cloud_computing_1" | "cloudy" | "cocktail" | "code" | "coffee_cup" | "coin_dollar" | "coin_pound" | "coins" | "coinstack" | "collaboration" | "command" | "company" | "compass" | "compose" | "computer_graphics" | "connection" | "contract" | "contract_1" | "contrast" | "control" | "control_game" | "copy" | "costumer" | "coupon" | "crash" | "creative" | "credit_card" | "credit_card1" | "credit_card_2" | "cross" | "cursor" | "dashboard" | "database" | "delete" | "dentistry" | "diary" | "diet" | "digital_campaing" | "digital_key" | "diners_club" | "disc" | "discount" | "dish" | "dish_1" | "dislike" | "divider" | "doctor" | "dog" | "dollar_coin" | "dollar_sign" | "dowload" | "down_arrow" | "download" | "edit" | "edit_file" | "editor" | "education" | "eject" | "emergency" | "employed" | "encrypted_database" | "encrypted_folder" | "encrypted_internet_conection" | "encrypted_mail" | "encryption" | "encypted_terminal" | "enterprice" | "equal" | "erase_file" | "erase_sabe" | "error_database" | "error_search" | "error_terminal" | "euro_sign" | "exit" | "external_link" | "facebook" | "feedback" | "file" | "fill" | "finger_print" | "firewall" | "flag" | "flash" | "flash_auto" | "flash_red_eye" | "flashlight" | "folder_gallery" | "folder" | "football" | "forbidden" | "french_fries" | "funnel" | "gallery" | "game_control" | "games_card_clubs" | "games_card_diamonds" | "games_card_hearts" | "games_card_spades" | "gift" | "girl" | "gmail" | "gold" | "graduated" | "group" | "hamburguer" | "hand" | "hand_note" | "hand_point" | "hand_shake" | "headphones" | "heart" | "heart_1" | "help" | "hide" | "high_five" | "hold" | "home" | "homework" | "hotel" | "hourglass" | "house" | "icon" | "id_card" | "idea" | "infinity" | "info" | "information" | "innovation" | "instagram" | "internet" | "internet_1" | "internet_error" | "key" | "key_1" | "kiss" | "lamp" | "laptop" | "layers" | "layers_1" | "layout" | "left_arrow" | "light_bulb" | "like" | "like_1" | "line_chart" | "link" | "linkeding" | "list" | "local_network" | "location" | "locked" | "magazine" | "magic_wand" | "magnet" | "mail" | "mail_account" | "mail_error" | "map_location" | "maps" | "marker" | "master_data" | "mastercard" | "medicine" | "menu" | "mic" | "microphone" | "microphone_1" | "microscope" | "money_bag" | "money" | "money_1" | "money_report" | "money_report_1" | "monitor" | "more" | "multiple_user" | "multiple_users" | "music_library" | "music_player" | "music_volume_high" | "music_volume_low" | "music_volume_medium" | "music_volume_mute" | "musical_note" | "mute_mic" | "network" | "newspaper" | "note" | "notebook" | "notification" | "old_phone" | "online_pay" | "open_book" | "open_box" | "open_hand" | "p2p" | "pallete" | "paper_plane" | "paper_plane_1" | "passage_of_time" | "pause" | "payment" | "paypal" | "pen_drive" | "perspective" | "pet_paw_print" | "phone_book" | "phone_receiver" | "photo_camera" | "picture" | "pie_chart" | "piggy_bank" | "pinterest" | "piracy" | "pizza" | "placeholder" | "plan" | "plane" | "play_buttom" | "plus" | "police_car" | "power_on_off" | "presentation" | "preview" | "preview_1" | "previous" | "price_tag" | "print_fax" | "project_management" | "project_management_1" | "promotion" | "purse" | "quality" | "radar" | "radioactive" | "rainy" | "rating" | "receipt" | "recluitment" | "recognition" | "record" | "recycle" | "red_eye" | "reload" | "reload_1" | "repair" | "report" | "research" | "responsive" | "restaurant" | "resume" | "reunion" | "right_arrow" | "risk" | "rotate" | "route" | "runner_man" | "sabe" | "sabe_error" | "safety_box_open" | "satellite" | "school" | "scissors" | "screw" | "search" | "send" | "send_file" | "send_file_1" | "send_money" | "send_package" | "server" | "settings" | "settings_1" | "share" | "shield" | "ship" | "shipped" | "shop" | "shopping" | "shopping_bag" | "shopping_car" | "shuffle" | "sign" | "sketch" | "sketch_1" | "skip" | "smartphone" | "snapchat" | "sniffer" | "social_media" | "spam" | "speech_bubble" | "spray" | "star" | "start_up" | "stats_line_chart" | "stethoscope" | "stop" | "stop_watch" | "storage" | "street" | "student" | "study" | "sun_glasses" | "suppport" | "switch" | "tablet" | "tabs" | "tap_gesture" | "target" | "telephone_call" | "television" | "terminal" | "terminal_2" | "think" | "toast" | "toast_1" | "tools" | "traffic_light" | "transfer_data" | "trash" | "treasure_chest" | "trojan" | "twitter" | "two_players" | "university" | "unlock" | "up_arrow" | "upload" | "vector" | "view" | "vintage_phone" | "visa" | "volume_control" | "wallet" | "wallet_1" | "warning" | "warning_briefcase" | "warning_chemistry" | "warning_database" | "warning_dowload" | "warning_folder" | "warning_location" | "warning_mail" | "warning_package" | "warning_search" | "warning_shipped" | "warning_terminal" | "warning_trash" | "web_design" | "web_domain_registration" | "web_search" | "web_search_1" | "website" | "weight" | "whatsapp" | "wheelchair" | "wifi" | "windows" | "wine_cup" | "wordpress" | "worldwide" | "youtube" | "zcash" | "zipped_folder" | "zoom_in" | "zoom_out" | "loading") | undefined | null
				/** Image. The absolute url to any image you want shown in the header. */
				'image'?: string | undefined | null
				/** Image size. How should the header image be rendered */
				'imageSize'?: ("cover" | "contain") | undefined | null
				/** Form. */
				'form'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any> | undefined | null
				/** Close handler. Meant for use inside React components directly. */
				'closeHandler'?: (() => Promise<void> | void) | undefined | null
		}

		interface CardHeaderSchema extends SpruceSchema.Schema {
			id: 'cardHeader',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Title. */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                options: undefined
			            },
			            /** Subtitle. */
			            'subtitle': {
			                label: 'Subtitle',
			                type: 'text',
			                options: undefined
			            },
			            /** Alt title. */
			            'altTitle': {
			                label: 'Alt title',
			                type: 'text',
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader>`,}
			            },
			            /** Icon. */
			            'icon': {
			                label: 'Icon',
			                type: 'select',
			                options: {choices: [{"value":"accesibility","label":"accesibility"},{"value":"add","label":"add"},{"value":"address_book","label":"address_book"},{"value":"administrator","label":"administrator"},{"value":"airbrush","label":"airbrush"},{"value":"airplane","label":"airplane"},{"value":"alarm","label":"alarm"},{"value":"alien","label":"alien"},{"value":"american_express","label":"american_express"},{"value":"analysis","label":"analysis"},{"value":"analysis_1","label":"analysis_1"},{"value":"archive","label":"archive"},{"value":"art_palette","label":"art_palette"},{"value":"artificial_intelligence","label":"artificial_intelligence"},{"value":"artificial_intelligence_1","label":"artificial_intelligence_1"},{"value":"at","label":"at"},{"value":"atm","label":"atm"},{"value":"attachment","label":"attachment"},{"value":"audio","label":"audio"},{"value":"audio_knob","label":"audio_knob"},{"value":"auricular_phone","label":"auricular_phone"},{"value":"back","label":"back"},{"value":"backup","label":"backup"},{"value":"balance","label":"balance"},{"value":"band_aid","label":"band_aid"},{"value":"bank","label":"bank"},{"value":"barcode","label":"barcode"},{"value":"basketball","label":"basketball"},{"value":"battery","label":"battery"},{"value":"beer","label":"beer"},{"value":"bell","label":"bell"},{"value":"bicycle","label":"bicycle"},{"value":"bill","label":"bill"},{"value":"binoculars","label":"binoculars"},{"value":"birthday","label":"birthday"},{"value":"bitcoin","label":"bitcoin"},{"value":"blog","label":"blog"},{"value":"bluetooth","label":"bluetooth"},{"value":"bomb","label":"bomb"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"box","label":"box"},{"value":"brain","label":"brain"},{"value":"brainstorm","label":"brainstorm"},{"value":"briefcase","label":"briefcase"},{"value":"briefcase_money","label":"briefcase_money"},{"value":"broken_heart","label":"broken_heart"},{"value":"broken_link","label":"broken_link"},{"value":"brush_tip","label":"brush_tip"},{"value":"bus","label":"bus"},{"value":"cake","label":"cake"},{"value":"calculator","label":"calculator"},{"value":"calendar","label":"calendar"},{"value":"car","label":"car"},{"value":"cat","label":"cat"},{"value":"certificate","label":"certificate"},{"value":"champagne","label":"champagne"},{"value":"chat","label":"chat"},{"value":"chat_1","label":"chat_1"},{"value":"check","label":"check"},{"value":"check_1","label":"check_1"},{"value":"chip","label":"chip"},{"value":"cirrus","label":"cirrus"},{"value":"city","label":"city"},{"value":"city_1","label":"city_1"},{"value":"citybank","label":"citybank"},{"value":"clicker","label":"clicker"},{"value":"clip","label":"clip"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"cloud","label":"cloud"},{"value":"cloud_1","label":"cloud_1"},{"value":"cloud_computing","label":"cloud_computing"},{"value":"cloud_computing_1","label":"cloud_computing_1"},{"value":"cloudy","label":"cloudy"},{"value":"cocktail","label":"cocktail"},{"value":"code","label":"code"},{"value":"coffee_cup","label":"coffee_cup"},{"value":"coin_dollar","label":"coin_dollar"},{"value":"coin_pound","label":"coin_pound"},{"value":"coins","label":"coins"},{"value":"coinstack","label":"coinstack"},{"value":"collaboration","label":"collaboration"},{"value":"command","label":"command"},{"value":"company","label":"company"},{"value":"compass","label":"compass"},{"value":"compose","label":"compose"},{"value":"computer_graphics","label":"computer_graphics"},{"value":"connection","label":"connection"},{"value":"contract","label":"contract"},{"value":"contract_1","label":"contract_1"},{"value":"contrast","label":"contrast"},{"value":"control","label":"control"},{"value":"control_game","label":"control_game"},{"value":"copy","label":"copy"},{"value":"costumer","label":"costumer"},{"value":"coupon","label":"coupon"},{"value":"crash","label":"crash"},{"value":"creative","label":"creative"},{"value":"credit_card","label":"credit_card"},{"value":"credit_card1","label":"credit_card1"},{"value":"credit_card_2","label":"credit_card_2"},{"value":"cross","label":"cross"},{"value":"cursor","label":"cursor"},{"value":"dashboard","label":"dashboard"},{"value":"database","label":"database"},{"value":"delete","label":"delete"},{"value":"dentistry","label":"dentistry"},{"value":"diary","label":"diary"},{"value":"diet","label":"diet"},{"value":"digital_campaing","label":"digital_campaing"},{"value":"digital_key","label":"digital_key"},{"value":"diners_club","label":"diners_club"},{"value":"disc","label":"disc"},{"value":"discount","label":"discount"},{"value":"dish","label":"dish"},{"value":"dish_1","label":"dish_1"},{"value":"dislike","label":"dislike"},{"value":"divider","label":"divider"},{"value":"doctor","label":"doctor"},{"value":"dog","label":"dog"},{"value":"dollar_coin","label":"dollar_coin"},{"value":"dollar_sign","label":"dollar_sign"},{"value":"dowload","label":"dowload"},{"value":"down_arrow","label":"down_arrow"},{"value":"download","label":"download"},{"value":"edit","label":"edit"},{"value":"edit_file","label":"edit_file"},{"value":"editor","label":"editor"},{"value":"education","label":"education"},{"value":"eject","label":"eject"},{"value":"emergency","label":"emergency"},{"value":"employed","label":"employed"},{"value":"encrypted_database","label":"encrypted_database"},{"value":"encrypted_folder","label":"encrypted_folder"},{"value":"encrypted_internet_conection","label":"encrypted_internet_conection"},{"value":"encrypted_mail","label":"encrypted_mail"},{"value":"encryption","label":"encryption"},{"value":"encypted_terminal","label":"encypted_terminal"},{"value":"enterprice","label":"enterprice"},{"value":"equal","label":"equal"},{"value":"erase_file","label":"erase_file"},{"value":"erase_sabe","label":"erase_sabe"},{"value":"error_database","label":"error_database"},{"value":"error_search","label":"error_search"},{"value":"error_terminal","label":"error_terminal"},{"value":"euro_sign","label":"euro_sign"},{"value":"exit","label":"exit"},{"value":"external_link","label":"external_link"},{"value":"facebook","label":"facebook"},{"value":"feedback","label":"feedback"},{"value":"file","label":"file"},{"value":"fill","label":"fill"},{"value":"finger_print","label":"finger_print"},{"value":"firewall","label":"firewall"},{"value":"flag","label":"flag"},{"value":"flash","label":"flash"},{"value":"flash_auto","label":"flash_auto"},{"value":"flash_red_eye","label":"flash_red_eye"},{"value":"flashlight","label":"flashlight"},{"value":"folder_gallery","label":"folder_gallery"},{"value":"folder","label":"folder"},{"value":"football","label":"football"},{"value":"forbidden","label":"forbidden"},{"value":"french_fries","label":"french_fries"},{"value":"funnel","label":"funnel"},{"value":"gallery","label":"gallery"},{"value":"game_control","label":"game_control"},{"value":"games_card_clubs","label":"games_card_clubs"},{"value":"games_card_diamonds","label":"games_card_diamonds"},{"value":"games_card_hearts","label":"games_card_hearts"},{"value":"games_card_spades","label":"games_card_spades"},{"value":"gift","label":"gift"},{"value":"girl","label":"girl"},{"value":"gmail","label":"gmail"},{"value":"gold","label":"gold"},{"value":"graduated","label":"graduated"},{"value":"group","label":"group"},{"value":"hamburguer","label":"hamburguer"},{"value":"hand","label":"hand"},{"value":"hand_note","label":"hand_note"},{"value":"hand_point","label":"hand_point"},{"value":"hand_shake","label":"hand_shake"},{"value":"headphones","label":"headphones"},{"value":"heart","label":"heart"},{"value":"heart_1","label":"heart_1"},{"value":"help","label":"help"},{"value":"hide","label":"hide"},{"value":"high_five","label":"high_five"},{"value":"hold","label":"hold"},{"value":"home","label":"home"},{"value":"homework","label":"homework"},{"value":"hotel","label":"hotel"},{"value":"hourglass","label":"hourglass"},{"value":"house","label":"house"},{"value":"icon","label":"icon"},{"value":"id_card","label":"id_card"},{"value":"idea","label":"idea"},{"value":"infinity","label":"infinity"},{"value":"info","label":"info"},{"value":"information","label":"information"},{"value":"innovation","label":"innovation"},{"value":"instagram","label":"instagram"},{"value":"internet","label":"internet"},{"value":"internet_1","label":"internet_1"},{"value":"internet_error","label":"internet_error"},{"value":"key","label":"key"},{"value":"key_1","label":"key_1"},{"value":"kiss","label":"kiss"},{"value":"lamp","label":"lamp"},{"value":"laptop","label":"laptop"},{"value":"layers","label":"layers"},{"value":"layers_1","label":"layers_1"},{"value":"layout","label":"layout"},{"value":"left_arrow","label":"left_arrow"},{"value":"light_bulb","label":"light_bulb"},{"value":"like","label":"like"},{"value":"like_1","label":"like_1"},{"value":"line_chart","label":"line_chart"},{"value":"link","label":"link"},{"value":"linkeding","label":"linkeding"},{"value":"list","label":"list"},{"value":"local_network","label":"local_network"},{"value":"location","label":"location"},{"value":"locked","label":"locked"},{"value":"magazine","label":"magazine"},{"value":"magic_wand","label":"magic_wand"},{"value":"magnet","label":"magnet"},{"value":"mail","label":"mail"},{"value":"mail_account","label":"mail_account"},{"value":"mail_error","label":"mail_error"},{"value":"map_location","label":"map_location"},{"value":"maps","label":"maps"},{"value":"marker","label":"marker"},{"value":"master_data","label":"master_data"},{"value":"mastercard","label":"mastercard"},{"value":"medicine","label":"medicine"},{"value":"menu","label":"menu"},{"value":"mic","label":"mic"},{"value":"microphone","label":"microphone"},{"value":"microphone_1","label":"microphone_1"},{"value":"microscope","label":"microscope"},{"value":"money_bag","label":"money_bag"},{"value":"money","label":"money"},{"value":"money_1","label":"money_1"},{"value":"money_report","label":"money_report"},{"value":"money_report_1","label":"money_report_1"},{"value":"monitor","label":"monitor"},{"value":"more","label":"more"},{"value":"multiple_user","label":"multiple_user"},{"value":"multiple_users","label":"multiple_users"},{"value":"music_library","label":"music_library"},{"value":"music_player","label":"music_player"},{"value":"music_volume_high","label":"music_volume_high"},{"value":"music_volume_low","label":"music_volume_low"},{"value":"music_volume_medium","label":"music_volume_medium"},{"value":"music_volume_mute","label":"music_volume_mute"},{"value":"musical_note","label":"musical_note"},{"value":"mute_mic","label":"mute_mic"},{"value":"network","label":"network"},{"value":"newspaper","label":"newspaper"},{"value":"note","label":"note"},{"value":"notebook","label":"notebook"},{"value":"notification","label":"notification"},{"value":"old_phone","label":"old_phone"},{"value":"online_pay","label":"online_pay"},{"value":"open_book","label":"open_book"},{"value":"open_box","label":"open_box"},{"value":"open_hand","label":"open_hand"},{"value":"p2p","label":"p2p"},{"value":"pallete","label":"pallete"},{"value":"paper_plane","label":"paper_plane"},{"value":"paper_plane_1","label":"paper_plane_1"},{"value":"passage_of_time","label":"passage_of_time"},{"value":"pause","label":"pause"},{"value":"payment","label":"payment"},{"value":"paypal","label":"paypal"},{"value":"pen_drive","label":"pen_drive"},{"value":"perspective","label":"perspective"},{"value":"pet_paw_print","label":"pet_paw_print"},{"value":"phone_book","label":"phone_book"},{"value":"phone_receiver","label":"phone_receiver"},{"value":"photo_camera","label":"photo_camera"},{"value":"picture","label":"picture"},{"value":"pie_chart","label":"pie_chart"},{"value":"piggy_bank","label":"piggy_bank"},{"value":"pinterest","label":"pinterest"},{"value":"piracy","label":"piracy"},{"value":"pizza","label":"pizza"},{"value":"placeholder","label":"placeholder"},{"value":"plan","label":"plan"},{"value":"plane","label":"plane"},{"value":"play_buttom","label":"play_buttom"},{"value":"plus","label":"plus"},{"value":"police_car","label":"police_car"},{"value":"power_on_off","label":"power_on_off"},{"value":"presentation","label":"presentation"},{"value":"preview","label":"preview"},{"value":"preview_1","label":"preview_1"},{"value":"previous","label":"previous"},{"value":"price_tag","label":"price_tag"},{"value":"print_fax","label":"print_fax"},{"value":"project_management","label":"project_management"},{"value":"project_management_1","label":"project_management_1"},{"value":"promotion","label":"promotion"},{"value":"purse","label":"purse"},{"value":"quality","label":"quality"},{"value":"radar","label":"radar"},{"value":"radioactive","label":"radioactive"},{"value":"rainy","label":"rainy"},{"value":"rating","label":"rating"},{"value":"receipt","label":"receipt"},{"value":"recluitment","label":"recluitment"},{"value":"recognition","label":"recognition"},{"value":"record","label":"record"},{"value":"recycle","label":"recycle"},{"value":"red_eye","label":"red_eye"},{"value":"reload","label":"reload"},{"value":"reload_1","label":"reload_1"},{"value":"repair","label":"repair"},{"value":"report","label":"report"},{"value":"research","label":"research"},{"value":"responsive","label":"responsive"},{"value":"restaurant","label":"restaurant"},{"value":"resume","label":"resume"},{"value":"reunion","label":"reunion"},{"value":"right_arrow","label":"right_arrow"},{"value":"risk","label":"risk"},{"value":"rotate","label":"rotate"},{"value":"route","label":"route"},{"value":"runner_man","label":"runner_man"},{"value":"sabe","label":"sabe"},{"value":"sabe_error","label":"sabe_error"},{"value":"safety_box_open","label":"safety_box_open"},{"value":"satellite","label":"satellite"},{"value":"school","label":"school"},{"value":"scissors","label":"scissors"},{"value":"screw","label":"screw"},{"value":"search","label":"search"},{"value":"send","label":"send"},{"value":"send_file","label":"send_file"},{"value":"send_file_1","label":"send_file_1"},{"value":"send_money","label":"send_money"},{"value":"send_package","label":"send_package"},{"value":"server","label":"server"},{"value":"settings","label":"settings"},{"value":"settings_1","label":"settings_1"},{"value":"share","label":"share"},{"value":"shield","label":"shield"},{"value":"ship","label":"ship"},{"value":"shipped","label":"shipped"},{"value":"shop","label":"shop"},{"value":"shopping","label":"shopping"},{"value":"shopping_bag","label":"shopping_bag"},{"value":"shopping_car","label":"shopping_car"},{"value":"shuffle","label":"shuffle"},{"value":"sign","label":"sign"},{"value":"sketch","label":"sketch"},{"value":"sketch_1","label":"sketch_1"},{"value":"skip","label":"skip"},{"value":"smartphone","label":"smartphone"},{"value":"snapchat","label":"snapchat"},{"value":"sniffer","label":"sniffer"},{"value":"social_media","label":"social_media"},{"value":"spam","label":"spam"},{"value":"speech_bubble","label":"speech_bubble"},{"value":"spray","label":"spray"},{"value":"star","label":"star"},{"value":"start_up","label":"start_up"},{"value":"stats_line_chart","label":"stats_line_chart"},{"value":"stethoscope","label":"stethoscope"},{"value":"stop","label":"stop"},{"value":"stop_watch","label":"stop_watch"},{"value":"storage","label":"storage"},{"value":"street","label":"street"},{"value":"student","label":"student"},{"value":"study","label":"study"},{"value":"sun_glasses","label":"sun_glasses"},{"value":"suppport","label":"suppport"},{"value":"switch","label":"switch"},{"value":"tablet","label":"tablet"},{"value":"tabs","label":"tabs"},{"value":"tap_gesture","label":"tap_gesture"},{"value":"target","label":"target"},{"value":"telephone_call","label":"telephone_call"},{"value":"television","label":"television"},{"value":"terminal","label":"terminal"},{"value":"terminal_2","label":"terminal_2"},{"value":"think","label":"think"},{"value":"toast","label":"toast"},{"value":"toast_1","label":"toast_1"},{"value":"tools","label":"tools"},{"value":"traffic_light","label":"traffic_light"},{"value":"transfer_data","label":"transfer_data"},{"value":"trash","label":"trash"},{"value":"treasure_chest","label":"treasure_chest"},{"value":"trojan","label":"trojan"},{"value":"twitter","label":"twitter"},{"value":"two_players","label":"two_players"},{"value":"university","label":"university"},{"value":"unlock","label":"unlock"},{"value":"up_arrow","label":"up_arrow"},{"value":"upload","label":"upload"},{"value":"vector","label":"vector"},{"value":"view","label":"view"},{"value":"vintage_phone","label":"vintage_phone"},{"value":"visa","label":"visa"},{"value":"volume_control","label":"volume_control"},{"value":"wallet","label":"wallet"},{"value":"wallet_1","label":"wallet_1"},{"value":"warning","label":"warning"},{"value":"warning_briefcase","label":"warning_briefcase"},{"value":"warning_chemistry","label":"warning_chemistry"},{"value":"warning_database","label":"warning_database"},{"value":"warning_dowload","label":"warning_dowload"},{"value":"warning_folder","label":"warning_folder"},{"value":"warning_location","label":"warning_location"},{"value":"warning_mail","label":"warning_mail"},{"value":"warning_package","label":"warning_package"},{"value":"warning_search","label":"warning_search"},{"value":"warning_shipped","label":"warning_shipped"},{"value":"warning_terminal","label":"warning_terminal"},{"value":"warning_trash","label":"warning_trash"},{"value":"web_design","label":"web_design"},{"value":"web_domain_registration","label":"web_domain_registration"},{"value":"web_search","label":"web_search"},{"value":"web_search_1","label":"web_search_1"},{"value":"website","label":"website"},{"value":"weight","label":"weight"},{"value":"whatsapp","label":"whatsapp"},{"value":"wheelchair","label":"wheelchair"},{"value":"wifi","label":"wifi"},{"value":"windows","label":"windows"},{"value":"wine_cup","label":"wine_cup"},{"value":"wordpress","label":"wordpress"},{"value":"worldwide","label":"worldwide"},{"value":"youtube","label":"youtube"},{"value":"zcash","label":"zcash"},{"value":"zipped_folder","label":"zipped_folder"},{"value":"zoom_in","label":"zoom_in"},{"value":"zoom_out","label":"zoom_out"},{"value":"loading","label":"loading"}],}
			            },
			            /** Image. The absolute url to any image you want shown in the header. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                hint: 'The absolute url to any image you want shown in the header.',
			                options: undefined
			            },
			            /** Image size. How should the header image be rendered */
			            'imageSize': {
			                label: 'Image size',
			                type: 'select',
			                hint: 'How should the header image be rendered',
			                defaultValue: "cover",
			                options: {choices: [{"value":"cover","label":"Cover"},{"value":"contain","label":"Contain"}],}
			            },
			            /** Form. */
			            'form': {
			                label: 'Form',
			                type: 'schema',
			                options: {typeSuffix: `<any>`,schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSchema,}
			            },
			            /** Close handler. Meant for use inside React components directly. */
			            'closeHandler': {
			                label: 'Close handler',
			                type: 'raw',
			                isPrivate: true,
			                hint: 'Meant for use inside React components directly.',
			                options: {valueType: `() => Promise<void> | void`,}
			            },
			    }
		}

		interface CardHeaderEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeaderSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Pager {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Pager>) | undefined | null
				
				'id'?: string | undefined | null
				
				'totalPages'?: number | undefined | null
				
				'currentPage'?: number | undefined | null
				
				'onChangePage'?: ((page: number) => Promise<any> | any) | undefined | null
				
				'setCurrentPage': ((page: number) => Promise<any> | any)
		}

		interface PagerSchema extends SpruceSchema.Schema {
			id: 'pager',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Pager',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Pager>`,}
			            },
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'totalPages': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'currentPage': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'onChangePage': {
			                type: 'raw',
			                options: {valueType: `(page: number) => Promise<any> | any`,}
			            },
			            /** . */
			            'setCurrentPage': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `(page: number) => Promise<any> | any`,}
			            },
			    }
		}

		interface PagerEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PagerSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardFooterButton {
			
				
				'id'?: string | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean | undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean | undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any) | undefined | null
				
				'hint'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "tertiary" | "destructive") | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
				'selectedLineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Line icon position. */
				'lineIconPosition'?: ("left" | "bottom") | undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Style. */
				'style'?: ("button" | "link") | undefined | null
		}

		interface CardFooterButtonSchema extends SpruceSchema.Schema {
			id: 'cardFooterButton',
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
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonController`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Add to fade-in queue.. Fade in effect could change. */
			            'shouldQueueShow': {
			                label: 'Add to fade-in queue.',
			                type: 'boolean',
			                hint: 'Fade in effect could change.',
			                options: undefined
			            },
			            /** Show hint icon. */
			            'shouldShowHintIcon': {
			                label: 'Show hint icon',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Click handler for hint icon. */
			            'onClickHintIcon': {
			                label: 'Click handler for hint icon',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** . */
			            'hint': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"tertiary","label":"Tertiary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
			            'selectedLineIcon': {
			                label: 'Selected line icon',
			                type: 'select',
			                hint: 'Only applies when the button is selected. Will override line icon if one is set.',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Line icon position. */
			            'lineIconPosition': {
			                label: 'Line icon position',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"bottom","label":"Bottom"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"button","label":"Button"},{"value":"link","label":"Link"}],}
			            },
			    }
		}

		interface CardFooterButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardFooter {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter>) | undefined | null
				/** Buttons. */
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterButton[] | undefined | null
				/** Loading. */
				'isBusy'?: boolean | undefined | null
				/** Sticky. */
				'isSticky'?: boolean | undefined | null
				/** Loading. */
				'isEnabled'?: boolean | undefined | null
				/** Pager. */
				'pager'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Pager | undefined | null
				/** Show border. */
				'shouldRenderBorder'?: boolean | undefined | null
				/** Horizontal alignment. */
				'hAlignment'?: ("left" | "center" | "right") | undefined | null
				/** Layout. */
				'layout'?: ("vertical" | "horizontal") | undefined | null
		}

		interface CardFooterSchema extends SpruceSchema.Schema {
			id: 'cardFooter',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter>`,}
			            },
			            /** Buttons. */
			            'buttons': {
			                label: 'Buttons',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterButtonSchema,}
			            },
			            /** Loading. */
			            'isBusy': {
			                label: 'Loading',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Sticky. */
			            'isSticky': {
			                label: 'Sticky',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Loading. */
			            'isEnabled': {
			                label: 'Loading',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Pager. */
			            'pager': {
			                label: 'Pager',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PagerSchema,}
			            },
			            /** Show border. */
			            'shouldRenderBorder': {
			                label: 'Show border',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Horizontal alignment. */
			            'hAlignment': {
			                label: 'Horizontal alignment',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"center","label":"Center"},{"value":"right","label":"Right"}],}
			            },
			            /** Layout. */
			            'layout': {
			                label: 'Layout',
			                type: 'select',
			                options: {choices: [{"value":"vertical","label":"Vertical"},{"value":"horizontal","label":"Horizontal"}],}
			            },
			    }
		}

		interface CardFooterEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListRow {
			
				/** Column widths. */
				'columnWidths'?: (number | 'fill' | 'content')[] | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ListRowViewController) | undefined | null
				/** Row height. */
				'height'?: ("standard" | "tall" | "content") | undefined | null
				/** Enabled. */
				'isEnabled'?: boolean | undefined | null
				/** Id. */
				'id': string
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Style. */
				'style'?: ("standard" | "warning" | "critical") | undefined | null
				/** Cells. */
				'cells': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCell[]
		}

		interface ListRowSchema extends SpruceSchema.Schema {
			id: 'listRow',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Column widths. */
			            'columnWidths': {
			                label: 'Column widths',
			                type: 'raw',
			                isArray: true,
			                options: {valueType: `number | 'fill' | 'content'`,}
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ListRowViewController`,}
			            },
			            /** Row height. */
			            'height': {
			                label: 'Row height',
			                type: 'select',
			                options: {choices: [{"label":"Standard","value":"standard"},{"label":"Tall","value":"tall"},{"label":"Content","value":"content"}],}
			            },
			            /** Enabled. */
			            'isEnabled': {
			                label: 'Enabled',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Id. */
			            'id': {
			                label: 'Id',
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"standard","label":"Standard"},{"value":"warning","label":"Warning"},{"value":"critical","label":"Critical"}],}
			            },
			            /** Cells. */
			            'cells': {
			                label: 'Cells',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellSchema,}
			            },
			    }
		}

		interface ListRowEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRowSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface List {
			
				
				'id'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ListViewController) | undefined | null
				/** Render row dividers. */
				'shouldRenderRowDividers'?: boolean | undefined | null
				/** Allow drag and drop sorting. */
				'shouldAllowDragAndDropSorting'?: boolean | undefined | null
				/** Drag and drop sort handler. */
				'onDragAndDropSort'?: ((rowIds: string[]) => boolean | Promise<boolean | void> | void) | undefined | null
				/** Column widths. */
				'columnWidths'?: (number | 'fill' | 'content')[] | undefined | null
				/** Row height. */
				'defaultRowHeight'?: ("standard" | "tall" | "content") | undefined | null
				/** Rows. */
				'rows': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRow[]
		}

		interface ListSchema extends SpruceSchema.Schema {
			id: 'list',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'list',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ListViewController`,}
			            },
			            /** Render row dividers. */
			            'shouldRenderRowDividers': {
			                label: 'Render row dividers',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Allow drag and drop sorting. */
			            'shouldAllowDragAndDropSorting': {
			                label: 'Allow drag and drop sorting',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Drag and drop sort handler. */
			            'onDragAndDropSort': {
			                label: 'Drag and drop sort handler',
			                type: 'raw',
			                options: {valueType: `(rowIds: string[]) => boolean | Promise<boolean | void> | void`,}
			            },
			            /** Column widths. */
			            'columnWidths': {
			                label: 'Column widths',
			                type: 'raw',
			                isArray: true,
			                options: {valueType: `number | 'fill' | 'content'`,}
			            },
			            /** Row height. */
			            'defaultRowHeight': {
			                label: 'Row height',
			                type: 'select',
			                options: {choices: [{"label":"Standard","value":"standard"},{"label":"Tall","value":"tall"},{"label":"Content","value":"content"}],}
			            },
			            /** Rows. */
			            'rows': {
			                label: 'Rows',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRowSchema,}
			            },
			    }
		}

		interface ListEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface BigFormSection<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'id'?: string | undefined | null
				
				'className'?: string | undefined | null
				/** Title. */
				'title'?: string | undefined | null
				/** Text. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Grid. */
				'shouldRenderAsGrid'?: boolean | undefined | null
				/** List. */
				'list'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List | undefined | null
				/** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
				'fields'?: (SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>)[] | undefined | null
				
				'shouldRenderSubmitButton'?: boolean | undefined | null
		}

		interface BigFormSectionSchema extends SpruceSchema.Schema {
			id: 'bigFormSection',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Title. */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                options: undefined
			            },
			            /** Text. */
			            'text': {
			                label: 'Text',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Grid. */
			            'shouldRenderAsGrid': {
			                label: 'Grid',
			                type: 'boolean',
			                options: undefined
			            },
			            /** List. */
			            'list': {
			                label: 'List',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSchema,}
			            },
			            /** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
			            'fields': {
			                label: 'Form fields',
			                type: 'raw',
			                hint: 'Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name.',
			                isArray: true,
			                options: {valueType: `SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>`,}
			            },
			            /** . */
			            'shouldRenderSubmitButton': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		interface BigFormSectionEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSectionSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FormSection<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'id'?: string | undefined | null
				
				'className'?: string | undefined | null
				/** Title. */
				'title'?: string | undefined | null
				/** Text. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Grid. */
				'shouldRenderAsGrid'?: boolean | undefined | null
				/** List. */
				'list'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List | undefined | null
				/** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
				'fields'?: (SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>)[] | undefined | null
		}

		interface FormSectionSchema extends SpruceSchema.Schema {
			id: 'formSection',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Title. */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                options: undefined
			            },
			            /** Text. */
			            'text': {
			                label: 'Text',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Grid. */
			            'shouldRenderAsGrid': {
			                label: 'Grid',
			                type: 'boolean',
			                options: undefined
			            },
			            /** List. */
			            'list': {
			                label: 'List',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSchema,}
			            },
			            /** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
			            'fields': {
			                label: 'Form fields',
			                type: 'raw',
			                hint: 'Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name.',
			                isArray: true,
			                options: {valueType: `SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>`,}
			            },
			    }
		}

		interface FormSectionEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSectionSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface StatusIndicator {
			
				/** Status. */
				'status': (1 | 2 | 3 | 4 | 5)
				/** Hint. */
				'hint'?: string | undefined | null
		}

		interface StatusIndicatorSchema extends SpruceSchema.Schema {
			id: 'statusIndicator',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Status indicator',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Status. */
			            'status': {
			                label: 'Status',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":1,"label":"Status 1"},{"value":2,"label":"Status 2"},{"value":3,"label":"Status 3"},{"value":4,"label":"Status 4"},{"value":5,"label":"Status 5"}],}
			            },
			            /** Hint. */
			            'hint': {
			                label: 'Hint',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface StatusIndicatorEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListRatingsInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: number | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: number) => any | Promise<any>) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Can be changed. */
				'canBeChanged'?: boolean | undefined | null
				/** Steps. How many choices does a person have? Defaults to 5. */
				'steps'?: number | undefined | null
				/** Left Label. The label on the left side of the ratings. Usually assocatiated with the lowest rating. */
				'leftLabel'?: string | undefined | null
				/** Right Label. The label on the right side of the ratings. Usually associated with the highest rating. */
				'rightLabel'?: string | undefined | null
				/** Middle Label. The label in the middle of the ratings. Something neutral like "average" or "ok" is pretty common. */
				'middleLabel'?: string | undefined | null
				/** Style. How should I render the ratings? Defaults to 'Star'. */
				'icon'?: ("star" | "radio") | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings>) | undefined | null
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>) | undefined | null
				
				'setValue'?: ((name: string, value: number) => Promise<any> | any) | undefined | null
		}

		interface ListRatingsInputSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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

		interface ListRatingsInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListToggleInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: boolean | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: boolean) => void | boolean | Promise<void | boolean>) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>) | undefined | null
				
				'setValue'?: ((name: string, value: boolean) => Promise<any> | any) | undefined | null
		}

		interface ListToggleInputSchema extends SpruceSchema.Schema {
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
			                options: {valueType: `(value: boolean) => void | boolean | Promise<void | boolean>`,}
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			                options: {valueType: `(name: string, value: boolean) => Promise<any> | any`,}
			            },
			    }
		}

		interface ListToggleInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SelectInputChoice {
			
				
				'value': (string | number)
				
				'label': string
		}

		interface SelectInputChoiceSchema extends SpruceSchema.Schema {
			id: 'selectInputChoice',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'value': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `string | number`,}
			            },
			            /** . */
			            'label': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface SelectInputChoiceEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoiceSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListSelectInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: (any) | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Placeholder. */
				'placeholder'?: string | undefined | null
				
				'choices': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoice[]
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>) | undefined | null
				
				'setValue'?: ((name: string, value: string) => Promise<any> | any) | undefined | null
		}

		interface ListSelectInputSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoiceSchema,}
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
			                options: {valueType: `(name: string, value: string) => Promise<any> | any`,}
			            },
			    }
		}

		interface ListSelectInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListDateInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: string | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Placeholder. */
				'placeholder'?: string | undefined | null
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>) | undefined | null
				
				'setValue'?: ((name: string, value: number) => Promise<any> | any) | undefined | null
		}

		interface ListDateInputSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			                options: {valueType: `(options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>`,}
			            },
			            /** . */
			            'setValue': {
			                type: 'raw',
			                options: {valueType: `(name: string, value: number) => Promise<any> | any`,}
			            },
			    }
		}

		interface ListDateInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListDateInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListTextInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: string | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Placeholder. */
				'placeholder'?: string | undefined | null
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>) | undefined | null
				
				'setValue'?: ((name: string, value: string) => Promise<any> | any) | undefined | null
		}

		interface ListTextInputSchema extends SpruceSchema.Schema {
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
			            /** . */
			            'rightButtons': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			                options: {valueType: `(options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>`,}
			            },
			            /** . */
			            'setValue': {
			                type: 'raw',
			                options: {valueType: `(name: string, value: string) => Promise<any> | any`,}
			            },
			    }
		}

		interface ListTextInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListCellButton {
			
				
				'id'?: string | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean | undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean | undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any) | undefined | null
				
				'hint'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "tertiary" | "destructive") | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
				'selectedLineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Line icon position. */
				'lineIconPosition'?: ("left" | "bottom") | undefined | null
				/** Cell button click handler. */
				'onClick'?: ((options: { rowVc: HeartwoodTypes.ListRowViewController }) => any | Promise<any>) | undefined | null
				/** Style. */
				'style'?: ("button" | "link") | undefined | null
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>) | undefined | null
				/** Dropdown. */
				'dropdown'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dropdown | undefined | null
		}

		interface ListCellButtonSchema extends SpruceSchema.Schema {
			id: 'listCellButton',
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
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonController`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Add to fade-in queue.. Fade in effect could change. */
			            'shouldQueueShow': {
			                label: 'Add to fade-in queue.',
			                type: 'boolean',
			                hint: 'Fade in effect could change.',
			                options: undefined
			            },
			            /** Show hint icon. */
			            'shouldShowHintIcon': {
			                label: 'Show hint icon',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Click handler for hint icon. */
			            'onClickHintIcon': {
			                label: 'Click handler for hint icon',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** . */
			            'hint': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"tertiary","label":"Tertiary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
			            'selectedLineIcon': {
			                label: 'Selected line icon',
			                type: 'select',
			                hint: 'Only applies when the button is selected. Will override line icon if one is set.',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Line icon position. */
			            'lineIconPosition': {
			                label: 'Line icon position',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"bottom","label":"Bottom"}],}
			            },
			            /** Cell button click handler. */
			            'onClick': {
			                label: 'Cell button click handler',
			                type: 'raw',
			                options: {valueType: `(options: { rowVc: HeartwoodTypes.ListRowViewController }) => any | Promise<any>`,}
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"button","label":"Button"},{"value":"link","label":"Link"}],}
			            },
			            /** Cell button key down handler. */
			            'onKeyDown': {
			                label: 'Cell button key down handler',
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.CellInputKeyDownOptions) => any | Promise<any>`,}
			            },
			            /** Dropdown. */
			            'dropdown': {
			                label: 'Dropdown',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownSchema,}
			            },
			    }
		}

		interface ListCellButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Video {
			
				/** Source URL. */
				'src': string
				/** MIME type. e.g. video/mp4, video/webm */
				'type'?: string | undefined | null
				/** Poster URL. */
				'posterUrl'?: string | undefined | null
				/** Preload. */
				'preload'?: ("none" | "metadata" | "auto") | undefined | null
				/** Autoplay. */
				'shouldAutoPlay'?: boolean | undefined | null
				/** Muted. */
				'isMuted'?: boolean | undefined | null
				/** Loop video. */
				'shouldLoop'?: boolean | undefined | null
				/** Restart on buffer (non-standard). */
				'shouldRestartOnBuffer'?: boolean | undefined | null
				/** Show controls. */
				'hasControls'?: boolean | undefined | null
				/** Play inline. Use inline playback on mobile (playsInline) */
				'shouldPlayInline'?: boolean | undefined | null
				/** Start time (s). */
				'startTime'?: number | undefined | null
				/** End time (s). */
				'endTime'?: number | undefined | null
		}

		interface VideoSchema extends SpruceSchema.Schema {
			id: 'video',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Video',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Source URL. */
			            'src': {
			                label: 'Source URL',
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** MIME type. e.g. video/mp4, video/webm */
			            'type': {
			                label: 'MIME type',
			                type: 'text',
			                hint: 'e.g. video/mp4, video/webm',
			                options: undefined
			            },
			            /** Poster URL. */
			            'posterUrl': {
			                label: 'Poster URL',
			                type: 'text',
			                options: undefined
			            },
			            /** Preload. */
			            'preload': {
			                label: 'Preload',
			                type: 'select',
			                options: {choices: [{"value":"none","label":"None"},{"value":"metadata","label":"Metadata"},{"value":"auto","label":"Auto"}],}
			            },
			            /** Autoplay. */
			            'shouldAutoPlay': {
			                label: 'Autoplay',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Muted. */
			            'isMuted': {
			                label: 'Muted',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Loop video. */
			            'shouldLoop': {
			                label: 'Loop video',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Restart on buffer (non-standard). */
			            'shouldRestartOnBuffer': {
			                label: 'Restart on buffer (non-standard)',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Show controls. */
			            'hasControls': {
			                label: 'Show controls',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Play inline. Use inline playback on mobile (playsInline) */
			            'shouldPlayInline': {
			                label: 'Play inline',
			                type: 'boolean',
			                hint: 'Use inline playback on mobile (playsInline)',
			                options: undefined
			            },
			            /** Start time (s). */
			            'startTime': {
			                label: 'Start time (s)',
			                type: 'number',
			                options: undefined
			            },
			            /** End time (s). */
			            'endTime': {
			                label: 'End time (s)',
			                type: 'number',
			                options: undefined
			            },
			    }
		}

		interface VideoEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.VideoSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListCell {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ListCellViewController) | undefined | null
				
				'id'?: string | undefined | null
				/** Text. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Subtext. */
				'subText'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Image url. */
				'image'?: string | undefined | null
				
				'video'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Video | undefined | null
				/** Avatars. */
				'avatars'?: (string | null | undefined)[] | undefined | null
				/** Button. */
				'button'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellButton | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				
				'calendar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar | undefined | null
				
				'buttonBar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar | undefined | null
				/** Text input. */
				'textInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInput | undefined | null
				/** Date input. */
				'dateInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListDateInput | undefined | null
				/** Select input. */
				'selectInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInput | undefined | null
				/** Toggle input. */
				'toggleInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInput | undefined | null
				/** Checkbox input. */
				'checkboxInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInput | undefined | null
				/** Ratings input. */
				'ratingsInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInput | undefined | null
				/** Status indicator. */
				'statusIndicator'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicator | undefined | null
				/** Vertical alignment. */
				'vAlignment'?: ("top" | "bottom" | "center") | undefined | null
				/** Horizontal alignment. */
				'hAlignment'?: ("left" | "center" | "right") | undefined | null
		}

		interface ListCellSchema extends SpruceSchema.Schema {
			id: 'listCell',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'List Cell',
			importsWhenRemote: ['import * as HeartwoodTypes from \'@sprucelabs/heartwood-view-controllers\'',],
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ListCellViewController`,}
			            },
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Text. */
			            'text': {
			                label: 'Text',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Subtext. */
			            'subText': {
			                label: 'Subtext',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Image url. */
			            'image': {
			                label: 'Image url',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'video': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.VideoSchema,}
			            },
			            /** Avatars. */
			            'avatars': {
			                label: 'Avatars',
			                type: 'raw',
			                isArray: true,
			                options: {valueType: `string | null | undefined`,}
			            },
			            /** Button. */
			            'button': {
			                label: 'Button',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellButtonSchema,}
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** . */
			            'calendar': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSchema,}
			            },
			            /** . */
			            'buttonBar': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarSchema,}
			            },
			            /** Text input. */
			            'textInput': {
			                label: 'Text input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInputSchema,}
			            },
			            /** Date input. */
			            'dateInput': {
			                label: 'Date input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListDateInputSchema,}
			            },
			            /** Select input. */
			            'selectInput': {
			                label: 'Select input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInputSchema,}
			            },
			            /** Toggle input. */
			            'toggleInput': {
			                label: 'Toggle input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInputSchema,}
			            },
			            /** Checkbox input. */
			            'checkboxInput': {
			                label: 'Checkbox input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInputSchema,}
			            },
			            /** Ratings input. */
			            'ratingsInput': {
			                label: 'Ratings input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInputSchema,}
			            },
			            /** Status indicator. */
			            'statusIndicator': {
			                label: 'Status indicator',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatusIndicatorSchema,}
			            },
			            /** Vertical alignment. */
			            'vAlignment': {
			                label: 'Vertical alignment',
			                type: 'select',
			                options: {choices: [{"value":"top","label":"Top"},{"value":"bottom","label":"Bottom"},{"value":"center","label":"Center"}],}
			            },
			            /** Horizontal alignment. */
			            'hAlignment': {
			                label: 'Horizontal alignment',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"center","label":"Center"},{"value":"right","label":"Right"}],}
			            },
			    }
		}

		interface ListCellEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CountdownTimer {
			
				
				'id'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ViewController<HeartwoodTypes.CountdownTimer>) | undefined | null
				
				'onComplete'?: (() => void | Promise<void>) | undefined | null
				
				'endDateMs'?: SpruceSchema.DateTimeFieldValue | undefined | null
				
				'setStartHandler': ((handler: (to: number) => void) => void)
				
				'setStopHandler': ((handler: () => void) => void)
		}

		interface CountdownTimerSchema extends SpruceSchema.Schema {
			id: 'countdownTimer',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Countdown Timer',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<HeartwoodTypes.CountdownTimer>`,}
			            },
			            /** . */
			            'onComplete': {
			                type: 'raw',
			                options: {valueType: `() => void | Promise<void>`,}
			            },
			            /** . */
			            'endDateMs': {
			                type: 'dateTime',
			                options: undefined
			            },
			            /** . */
			            'setStartHandler': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `(handler: (to: number) => void) => void`,}
			            },
			            /** . */
			            'setStopHandler': {
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `(handler: () => void) => void`,}
			            },
			    }
		}

		interface CountdownTimerEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CountdownTimerSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarEventColors {
			
				/** Draft foreground color. */
				'draftForegroundColor'?: string | undefined | null
				/** Draft background color. */
				'draftBackgroundColor'?: string | undefined | null
				/** Tentative foreground color. */
				'tentativeForegroundColor'?: string | undefined | null
				/** Tentative background color. */
				'tentativeBackgroundColor'?: string | undefined | null
				/** Upcoming foreground color. */
				'upcomingForegroundColor'?: string | undefined | null
				/** Upcoming background color. */
				'upcomingBackgroundColor'?: string | undefined | null
				/** Unavailable foreground color. */
				'unavailableForegroundColor'?: string | undefined | null
				/** Unavailable background color. */
				'unavailableBackgroundColor'?: string | undefined | null
				/** Blocked foreground color. */
				'blockedForegroundColor'?: string | undefined | null
				/** Blocked background color. */
				'blockedBackgroundColor'?: string | undefined | null
				/** Active foreground color. */
				'activeForegroundColor'?: string | undefined | null
				/** Active background color. */
				'activeBackgroundColor'?: string | undefined | null
				/** Past foreground color. */
				'pastForegroundColor'?: string | undefined | null
				/** Past background color. */
				'pastBackgroundColor'?: string | undefined | null
				/** Warning foreground color. */
				'warnForegroundColor'?: string | undefined | null
				/** Warning background color. */
				'warnBackgroundColor'?: string | undefined | null
				/** Critical foreground color. */
				'criticalForegroundColor'?: string | undefined | null
				/** Critical background color. */
				'criticalBackgroundColor'?: string | undefined | null
		}

		interface CalendarEventColorsSchema extends SpruceSchema.Schema {
			id: 'calendarEventColors',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'calendarEventColors',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Draft foreground color. */
			            'draftForegroundColor': {
			                label: 'Draft foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Draft background color. */
			            'draftBackgroundColor': {
			                label: 'Draft background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Tentative foreground color. */
			            'tentativeForegroundColor': {
			                label: 'Tentative foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Tentative background color. */
			            'tentativeBackgroundColor': {
			                label: 'Tentative background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Upcoming foreground color. */
			            'upcomingForegroundColor': {
			                label: 'Upcoming foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Upcoming background color. */
			            'upcomingBackgroundColor': {
			                label: 'Upcoming background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Unavailable foreground color. */
			            'unavailableForegroundColor': {
			                label: 'Unavailable foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Unavailable background color. */
			            'unavailableBackgroundColor': {
			                label: 'Unavailable background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Blocked foreground color. */
			            'blockedForegroundColor': {
			                label: 'Blocked foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Blocked background color. */
			            'blockedBackgroundColor': {
			                label: 'Blocked background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Active foreground color. */
			            'activeForegroundColor': {
			                label: 'Active foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Active background color. */
			            'activeBackgroundColor': {
			                label: 'Active background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Past foreground color. */
			            'pastForegroundColor': {
			                label: 'Past foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Past background color. */
			            'pastBackgroundColor': {
			                label: 'Past background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Warning foreground color. */
			            'warnForegroundColor': {
			                label: 'Warning foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Warning background color. */
			            'warnBackgroundColor': {
			                label: 'Warning background color',
			                type: 'text',
			                options: undefined
			            },
			            /** Critical foreground color. */
			            'criticalForegroundColor': {
			                label: 'Critical foreground color',
			                type: 'text',
			                options: undefined
			            },
			            /** Critical background color. */
			            'criticalBackgroundColor': {
			                label: 'Critical background color',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface CalendarEventColorsEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorsSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarShift {
			
				
				'startDateTimeMs': SpruceSchema.DateFieldValue
				
				'endDateTimeMs': SpruceSchema.DateFieldValue
				
				'id': string
				
				'personId': string
		}

		interface CalendarShiftSchema extends SpruceSchema.Schema {
			id: 'calendarShift',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'startDateTimeMs': {
			                type: 'date',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'endDateTimeMs': {
			                type: 'date',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'id': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'personId': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface CalendarShiftEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarShiftSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarSelectedDate {
			
				
				'day': number
				
				'month': number
				
				'year': number
		}

		interface CalendarSelectedDateSchema extends SpruceSchema.Schema {
			id: 'calendarSelectedDate',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'calendar selected date',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'day': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'month': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'year': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface CalendarSelectedDateEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDateSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Calendar {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar>) | undefined | null
				/** People. */
				'people'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson[] | undefined | null
				/** Minimum time. The earliest time to show in the calendar. */
				'minTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime | undefined | null
				/** Maximum time. The latest time to show in the calendar. */
				'maxTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime | undefined | null
				/** date. The date the calendar will start on. First of month or first of week. Is in ms from epoch. */
				'startDate'?: SpruceSchema.DateTimeFieldValue | undefined | null
				/** Default start time. Any time before this will be dimmed out. Only applies if people have no schedules. */
				'defaultStartTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime | undefined | null
				/** Default end time. Any time after this will be dimmed out. Only applies if people have no schedules. */
				'defaultEndTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime | undefined | null
				
				'events': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent[]
				
				'selectedEvent'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent | undefined | null
				
				'selectedDates'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDate[] | undefined | null
				/** Timezone offset. In milliseconds */
				'timezoneOffsetMs'?: number | undefined | null
				/** Enable animations. */
				'shouldEnableAnimations'?: boolean | undefined | null
				/** View. */
				'view'?: ("day" | "month") | undefined | null
				/** Render header. */
				'shouldRenderHeader'?: boolean | undefined | null
				
				'onChangeStartDate'?: ((date: number) => void | Promise<void>) | undefined | null
				
				'onClickView'?: ((options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>) | undefined | null
				
				'onLongPressViewDrop'?: ((options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>) | undefined | null
				
				'onTapView'?: ((options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>) | undefined | null
				
				'onClickEvent'?: ((options: HeartwoodTypes.ClickEventOptions) => void | Promise<void>) | undefined | null
				
				'onLongPressEvent'?: ((options: HeartwoodTypes.ClickEventOptions) => void | Promise<void>) | undefined | null
				
				'onDropEvent'?: ((options: HeartwoodTypes.DropEventOptions) => void | boolean | Promise<void | boolean>) | undefined | null
				
				'onDeselectEvent'?: ((options: HeartwoodTypes.CalendarEvent) => void | Promise<void>) | undefined | null
				
				'onSelectEvent'?: ((options: HeartwoodTypes.CalendarEvent) => void | Promise<void>) | undefined | null
				
				'onLongPressView'?: (() => void | boolean) | undefined | null
				
				'shifts'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarShift[] | undefined | null
				/** . Enable the ability to swipe to change days. Only works when viewing a single person. */
				'shouldEnableSwipeNav'?: boolean | undefined | null
				
				'onSwipe'?: ((options: HeartwoodTypes.SwipeOptions) => void | Promise<void>) | undefined | null
				
				'enabledDays'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDate[] | undefined | null
		}

		interface CalendarSchema extends SpruceSchema.Schema {
			id: 'calendar',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Calendar',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar>`,}
			            },
			            /** People. */
			            'people': {
			                label: 'People',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPersonSchema,}
			            },
			            /** Minimum time. The earliest time to show in the calendar. */
			            'minTime': {
			                label: 'Minimum time',
			                type: 'schema',
			                hint: 'The earliest time to show in the calendar.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema,}
			            },
			            /** Maximum time. The latest time to show in the calendar. */
			            'maxTime': {
			                label: 'Maximum time',
			                type: 'schema',
			                hint: 'The latest time to show in the calendar.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema,}
			            },
			            /** date. The date the calendar will start on. First of month or first of week. Is in ms from epoch. */
			            'startDate': {
			                label: 'date',
			                type: 'dateTime',
			                hint: 'The date the calendar will start on. First of month or first of week. Is in ms from epoch.',
			                options: undefined
			            },
			            /** Default start time. Any time before this will be dimmed out. Only applies if people have no schedules. */
			            'defaultStartTime': {
			                label: 'Default start time',
			                type: 'schema',
			                hint: 'Any time before this will be dimmed out. Only applies if people have no schedules.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema,}
			            },
			            /** Default end time. Any time after this will be dimmed out. Only applies if people have no schedules. */
			            'defaultEndTime': {
			                label: 'Default end time',
			                type: 'schema',
			                hint: 'Any time after this will be dimmed out. Only applies if people have no schedules.',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema,}
			            },
			            /** . */
			            'events': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventSchema,}
			            },
			            /** . */
			            'selectedEvent': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventSchema,}
			            },
			            /** . */
			            'selectedDates': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDateSchema,}
			            },
			            /** Timezone offset. In milliseconds */
			            'timezoneOffsetMs': {
			                label: 'Timezone offset',
			                type: 'number',
			                hint: 'In milliseconds',
			                options: undefined
			            },
			            /** Enable animations. */
			            'shouldEnableAnimations': {
			                label: 'Enable animations',
			                type: 'boolean',
			                options: undefined
			            },
			            /** View. */
			            'view': {
			                label: 'View',
			                type: 'select',
			                defaultValue: "day",
			                options: {choices: [{"label":"Day","value":"day"},{"label":"Month","value":"month"}],}
			            },
			            /** Render header. */
			            'shouldRenderHeader': {
			                label: 'Render header',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** . */
			            'onChangeStartDate': {
			                type: 'raw',
			                options: {valueType: `(date: number) => void | Promise<void>`,}
			            },
			            /** . */
			            'onClickView': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'onLongPressViewDrop': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'onTapView': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'onClickEvent': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.ClickEventOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'onLongPressEvent': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.ClickEventOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'onDropEvent': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.DropEventOptions) => void | boolean | Promise<void | boolean>`,}
			            },
			            /** . */
			            'onDeselectEvent': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.CalendarEvent) => void | Promise<void>`,}
			            },
			            /** . */
			            'onSelectEvent': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.CalendarEvent) => void | Promise<void>`,}
			            },
			            /** . */
			            'onLongPressView': {
			                type: 'raw',
			                options: {valueType: `() => void | boolean`,}
			            },
			            /** . */
			            'shifts': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarShiftSchema,}
			            },
			            /** . Enable the ability to swipe to change days. Only works when viewing a single person. */
			            'shouldEnableSwipeNav': {
			                type: 'boolean',
			                hint: 'Enable the ability to swipe to change days. Only works when viewing a single person.',
			                options: undefined
			            },
			            /** . */
			            'onSwipe': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.SwipeOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'enabledDays': {
			                type: 'schema',
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSelectedDateSchema,}
			            },
			    }
		}

		interface CalendarEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarEventColorOverride {
			
				
				'backgroundColor'?: string | undefined | null
				
				'foregroundColor'?: string | undefined | null
		}

		interface CalendarEventColorOverrideSchema extends SpruceSchema.Schema {
			id: 'calendarEventColorOverride',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'backgroundColor': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'foregroundColor': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		interface CalendarEventColorOverrideEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorOverrideSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarEvent {
			
				
				'id': string
				
				'target': SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTarget
				
				'calendarId': string
				
				'eventTypeSlug'?: string | undefined | null
				
				'startDateTimeMs': SpruceSchema.DateTimeFieldValue
				
				'isBusy'?: boolean | undefined | null
				
				'isResizeable'?: boolean | undefined | null
				
				'style'?: ("draft" | "tentative" | "upcoming" | "unavailable" | "blocked" | "active" | "past" | "warn" | "critical") | undefined | null
				
				'groupId'?: string | undefined | null
				
				'timeBlocks': SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock[]
				
				'repeats'?: ("weekly" | "monthly" | "daily") | undefined | null
				
				'daysOfWeek'?: ("sun" | "mon" | "tue" | "wed" | "thur" | "fri" | "sat")[] | undefined | null
				
				'daysOfMonth'?: ("1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15" | "16" | "17" | "18" | "19" | "20" | "21" | "22" | "23" | "24" | "25" | "26" | "27" | "28" | "29" | "30" | "31")[] | undefined | null
				
				'repeatsUntil'?: SpruceSchema.DateTimeFieldValue | undefined | null
				
				'occurrences'?: number | undefined | null
				
				'interval'?: number | undefined | null
				
				'nthOccurrences'?: number[] | undefined | null
				
				'activeUntilDate'?: SpruceSchema.DateTimeFieldValue | undefined | null
				
				'exclusionDates'?: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDate[] | undefined | null
				
				'nthInRepeating'?: number | undefined | null
				
				'totalInRepeating'?: number | undefined | null
				
				'meta'?: (Record<string, any>) | undefined | null
				
				'error'?: (Error) | undefined | null
				
				'isSelected'?: boolean | undefined | null
				
				'colors'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorOverride | undefined | null
				
				'controller'?: (HeartwoodTypes.CalendarEventViewController) | undefined | null
		}

		interface CalendarEventSchema extends SpruceSchema.Schema {
			id: 'calendarEvent',
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
			            'target': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTargetSchema,}
			            },
			            /** . */
			            'calendarId': {
			                type: 'id',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'eventTypeSlug': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'startDateTimeMs': {
			                type: 'dateTime',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'isBusy': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'isResizeable': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'style': {
			                type: 'select',
			                options: {choices: [{"value":"draft","label":"Draft"},{"value":"tentative","label":"Tentative"},{"value":"upcoming","label":"Upcoming"},{"value":"unavailable","label":"Unavailable"},{"value":"blocked","label":"Blocked"},{"value":"active","label":"Active"},{"value":"past","label":"Past"},{"value":"warn","label":"Warning"},{"value":"critical","label":"Critical"}],}
			            },
			            /** . */
			            'groupId': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'timeBlocks': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 1,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlockSchema,}
			            },
			            /** . */
			            'repeats': {
			                type: 'select',
			                options: {choices: [{"value":"weekly","label":"Weekly"},{"value":"monthly","label":"Monthly"},{"value":"daily","label":"Daily"}],}
			            },
			            /** . */
			            'daysOfWeek': {
			                type: 'select',
			                isArray: true,
			                options: {choices: [{"value":"sun","label":"Sunday"},{"value":"mon","label":"Monday"},{"value":"tue","label":"Tuesday"},{"value":"wed","label":"Wednesday"},{"value":"thur","label":"Thursday"},{"value":"fri","label":"Friday"},{"value":"sat","label":"Saturday"}],}
			            },
			            /** . */
			            'daysOfMonth': {
			                type: 'select',
			                isArray: true,
			                options: {choices: [{"value":"1","label":"1"},{"value":"2","label":"2"},{"value":"3","label":"3"},{"value":"4","label":"4"},{"value":"5","label":"5"},{"value":"6","label":"6"},{"value":"7","label":"7"},{"value":"8","label":"8"},{"value":"9","label":"9"},{"value":"10","label":"10"},{"value":"11","label":"11"},{"value":"12","label":"12"},{"value":"13","label":"13"},{"value":"14","label":"14"},{"value":"15","label":"15"},{"value":"16","label":"16"},{"value":"17","label":"17"},{"value":"18","label":"18"},{"value":"19","label":"19"},{"value":"20","label":"20"},{"value":"21","label":"21"},{"value":"22","label":"22"},{"value":"23","label":"23"},{"value":"24","label":"24"},{"value":"25","label":"25"},{"value":"26","label":"26"},{"value":"27","label":"27"},{"value":"28","label":"28"},{"value":"29","label":"29"},{"value":"30","label":"30"},{"value":"31","label":"31"}],}
			            },
			            /** . */
			            'repeatsUntil': {
			                type: 'dateTime',
			                options: undefined
			            },
			            /** . */
			            'occurrences': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'interval': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'nthOccurrences': {
			                type: 'number',
			                isArray: true,
			                options: undefined
			            },
			            /** . */
			            'activeUntilDate': {
			                type: 'dateTime',
			                options: undefined
			            },
			            /** . */
			            'exclusionDates': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDateSchema,}
			            },
			            /** . */
			            'nthInRepeating': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'totalInRepeating': {
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'meta': {
			                type: 'raw',
			                options: {valueType: `Record<string, any>`,}
			            },
			            /** . */
			            'error': {
			                type: 'raw',
			                options: {valueType: `Error`,}
			            },
			            /** . */
			            'isSelected': {
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'colors': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventColorOverrideSchema,}
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.CalendarEventViewController`,}
			            },
			    }
		}

		interface CalendarEventEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarTime {
			
				
				'hour': number
				
				'minute': number
		}

		interface CalendarTimeSchema extends SpruceSchema.Schema {
			id: 'calendarTime',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'hour': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'minute': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface CalendarTimeEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarPerson {
			
				
				'id': string
				
				'casualName': string
				/** Avatar src. */
				'avatar'?: SpruceSchema.ImageFieldValue | undefined | null
		}

		interface CalendarPersonSchema extends SpruceSchema.Schema {
			id: 'calendarPerson',
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
			            'casualName': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** Avatar src. */
			            'avatar': {
			                label: 'Avatar src',
			                type: 'image',
			                options: {requiredSizes: ["*"],}
			            },
			    }
		}

		interface CalendarPersonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPersonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ButtonBar {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ButtonBarViewController) | undefined | null
				/** Buttons. */
				'buttons': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarButton[]
		}

		interface ButtonBarSchema extends SpruceSchema.Schema {
			id: 'buttonBar',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Button bar',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonBarViewController`,}
			            },
			            /** Buttons. */
			            'buttons': {
			                label: 'Buttons',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarButtonSchema,}
			            },
			    }
		}

		interface ButtonBarEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Text {
			
				/** Text. */
				'content'?: string | undefined | null
				/** Html. */
				'html'?: string | undefined | null
				/** Markdown. */
				'markdown'?: string | undefined | null
				/** Align. */
				'align'?: ("left" | "right" | "center") | undefined | null
		}

		interface TextSchema extends SpruceSchema.Schema {
			id: 'text',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Text',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Text. */
			            'content': {
			                label: 'Text',
			                type: 'text',
			                options: undefined
			            },
			            /** Html. */
			            'html': {
			                label: 'Html',
			                type: 'text',
			                options: undefined
			            },
			            /** Markdown. */
			            'markdown': {
			                label: 'Markdown',
			                type: 'text',
			                options: undefined
			            },
			            /** Align. */
			            'align': {
			                label: 'Align',
			                type: 'select',
			                defaultValue: "left",
			                options: {choices: [{"value":"left","label":"Left"},{"value":"right","label":"Right"},{"value":"center","label":"Center"}],}
			            },
			    }
		}

		interface TextEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ButtonBarButton {
			
				
				'id': string
				/** Label. */
				'label'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean | undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean | undefined | null
				
				'hint'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "tertiary" | "destructive") | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
				'selectedLineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Line icon position. */
				'lineIconPosition'?: ("left" | "bottom") | undefined | null
		}

		interface ButtonBarButtonSchema extends SpruceSchema.Schema {
			id: 'buttonBarButton',
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
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonController`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Add to fade-in queue.. Fade in effect could change. */
			            'shouldQueueShow': {
			                label: 'Add to fade-in queue.',
			                type: 'boolean',
			                hint: 'Fade in effect could change.',
			                options: undefined
			            },
			            /** Show hint icon. */
			            'shouldShowHintIcon': {
			                label: 'Show hint icon',
			                type: 'boolean',
			                options: undefined
			            },
			            /** . */
			            'hint': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"tertiary","label":"Tertiary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
			            'selectedLineIcon': {
			                label: 'Selected line icon',
			                type: 'select',
			                hint: 'Only applies when the button is selected. Will override line icon if one is set.',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Line icon position. */
			            'lineIconPosition': {
			                label: 'Line icon position',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"bottom","label":"Bottom"}],}
			            },
			    }
		}

		interface ButtonBarButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Button {
			
				
				'id'?: string | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean | undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean | undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any) | undefined | null
				
				'hint'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "tertiary" | "destructive") | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
				'selectedLineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Line icon position. */
				'lineIconPosition'?: ("left" | "bottom") | undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any) | undefined | null
				/** Style. */
				'style'?: ("button" | "link") | undefined | null
				/** Dropdown. */
				'dropdown'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dropdown | undefined | null
		}

		interface ButtonSchema extends SpruceSchema.Schema {
			id: 'button',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Button',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonController`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Add to fade-in queue.. Fade in effect could change. */
			            'shouldQueueShow': {
			                label: 'Add to fade-in queue.',
			                type: 'boolean',
			                hint: 'Fade in effect could change.',
			                options: undefined
			            },
			            /** Show hint icon. */
			            'shouldShowHintIcon': {
			                label: 'Show hint icon',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Click handler for hint icon. */
			            'onClickHintIcon': {
			                label: 'Click handler for hint icon',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** . */
			            'hint': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"tertiary","label":"Tertiary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
			            'selectedLineIcon': {
			                label: 'Selected line icon',
			                type: 'select',
			                hint: 'Only applies when the button is selected. Will override line icon if one is set.',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Line icon position. */
			            'lineIconPosition': {
			                label: 'Line icon position',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"bottom","label":"Bottom"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"button","label":"Button"},{"value":"link","label":"Link"}],}
			            },
			            /** Dropdown. */
			            'dropdown': {
			                label: 'Dropdown',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownSchema,}
			            },
			    }
		}

		interface ButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface DropdownButton {
			
				
				'id'?: string | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController) | undefined | null
				/** Selected. */
				'isSelected'?: boolean | undefined | null
				/** Selected. */
				'isEnabled'?: boolean | undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean | undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean | undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any) | undefined | null
				
				'hint'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text | undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "tertiary" | "destructive") | undefined | null
				/** Image. */
				'image'?: string | undefined | null
				/** Avatar. */
				'avatar'?: string | undefined | null
				/** Line icon. */
				'lineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
				'selectedLineIcon'?: ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out") | undefined | null
				/** Line icon position. */
				'lineIconPosition'?: ("left" | "bottom") | undefined | null
				/** Click handler. */
				'onClick'?: ((dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void) | undefined | null
				/** Style. */
				'style'?: ("button" | "link") | undefined | null
		}

		interface DropdownButtonSchema extends SpruceSchema.Schema {
			id: 'dropdownButton',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Dropdown button',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** Label. */
			            'label': {
			                label: 'Label',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ButtonController`,}
			            },
			            /** Selected. */
			            'isSelected': {
			                label: 'Selected',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Selected. */
			            'isEnabled': {
			                label: 'Selected',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Add to fade-in queue.. Fade in effect could change. */
			            'shouldQueueShow': {
			                label: 'Add to fade-in queue.',
			                type: 'boolean',
			                hint: 'Fade in effect could change.',
			                options: undefined
			            },
			            /** Show hint icon. */
			            'shouldShowHintIcon': {
			                label: 'Show hint icon',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Click handler for hint icon. */
			            'onClickHintIcon': {
			                label: 'Click handler for hint icon',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** . */
			            'hint': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
			            },
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"tertiary","label":"Tertiary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Avatar. */
			            'avatar': {
			                label: 'Avatar',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Selected line icon. Only applies when the button is selected. Will override line icon if one is set. */
			            'selectedLineIcon': {
			                label: 'Selected line icon',
			                type: 'select',
			                hint: 'Only applies when the button is selected. Will override line icon if one is set.',
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Line icon position. */
			            'lineIconPosition': {
			                label: 'Line icon position',
			                type: 'select',
			                options: {choices: [{"value":"left","label":"Left"},{"value":"bottom","label":"Bottom"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `(dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void`,}
			            },
			            /** Style. */
			            'style': {
			                label: 'Style',
			                type: 'select',
			                options: {choices: [{"value":"button","label":"Button"},{"value":"link","label":"Link"}],}
			            },
			    }
		}

		interface DropdownButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Dropdown {
			
				/** Position. */
				'position'?: ("top" | "right" | "bottom" | "left") | undefined | null
				
				'items'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownButton[] | undefined | null
				
				'card'?: (HeartwoodTypes.Card) | undefined | null
		}

		interface DropdownSchema extends SpruceSchema.Schema {
			id: 'dropdown',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Dropdown',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Position. */
			            'position': {
			                label: 'Position',
			                type: 'select',
			                options: {choices: [{"label":"Top","value":"top"},{"label":"Right","value":"right"},{"label":"Bottom","value":"bottom"},{"label":"Left","value":"left"}],}
			            },
			            /** . */
			            'items': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownButtonSchema,}
			            },
			            /** . */
			            'card': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.Card`,}
			            },
			    }
		}

		interface DropdownEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface BarChart {
			
				
				'id'?: string | undefined | null
				
				'controller'?: (HeartwoodTypes.ChartViewController<HeartwoodTypes.BarChart>) | undefined | null
				
				'dataSets': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSet[]
		}

		interface BarChartSchema extends SpruceSchema.Schema {
			id: 'barChart',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Bar chart',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'id': {
			                type: 'id',
			                options: undefined
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ChartViewController<HeartwoodTypes.BarChart>`,}
			            },
			            /** . */
			            'dataSets': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSetSchema,}
			            },
			    }
		}

		interface BarChartEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BarChartSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ChartDataPoint {
			
				
				'label'?: string | undefined | null
				
				'value': number
		}

		interface ChartDataPointSchema extends SpruceSchema.Schema {
			id: 'chartDataPoint',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'label': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'value': {
			                type: 'number',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		interface ChartDataPointEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataPointSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ChartDataSet {
			
				
				'label'?: string | undefined | null
				
				'dataPoints': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataPoint[]
		}

		interface ChartDataSetSchema extends SpruceSchema.Schema {
			id: 'chartDataSet',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Chart data set',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** . */
			            'label': {
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'dataPoints': {
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                minArrayLength: 0,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataPointSchema,}
			            },
			    }
		}

		interface ChartDataSetEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ChartDataSetSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface AutocompleteSuggestion {
			
				
				'id': string
				
				'label': string
				/** On click handler. */
				'onClick'?: ((id: string) => void | Promise<void>) | undefined | null
		}

		interface AutocompleteSuggestionSchema extends SpruceSchema.Schema {
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

		interface AutocompleteSuggestionEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteSuggestionSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface InputButton {
			
				
				'id'?: string | undefined | null
				/** Line icon. */
				'lineIcon': ("add-circle" | "add-square" | "add" | "alarm" | "arrow-back" | "arrow-down-circle" | "arrow-down" | "arrow-next" | "arrow-up-circle" | "arrow-up" | "attachment" | "award-badge" | "binoculars" | "bolt" | "book-open" | "book" | "bookmark" | "calendar-add" | "calendar" | "camera" | "cellphone" | "checkmark" | "chevron-down" | "chevron-left" | "chevron-right" | "chevron-up" | "clipboard" | "clock" | "close-circle" | "close-square" | "close" | "code" | "coffee" | "command" | "corner-down-left" | "corner-down-right" | "corner-left-down" | "corner-left-up" | "corner-right-down" | "corner-right-up" | "corner-up-left" | "corner-up-right" | "crop" | "cube" | "delete" | "document-blank" | "document-new" | "document-text" | "download-cloud" | "download" | "edit-box" | "edit-line" | "email" | "emoji-happy" | "emoji-sad" | "external-link" | "fav-heart" | "flag" | "flip-01" | "flip-02" | "folder" | "globe" | "hash-tag" | "headphones" | "help-buoy" | "help-circle" | "home" | "info" | "jump" | "layers" | "bar-graph" | "link-angle" | "link-flat" | "loader" | "location-pin" | "lock" | "logout" | "map" | "message-circle" | "message-square" | "mic-off" | "mic-on" | "minus-circle" | "minus-square" | "money-sign" | "more-horizontal" | "more-vertical" | "notification-off" | "notification-on" | "object" | "pause-circle" | "phone-unavailable" | "phone" | "photo" | "picked" | "pie-chart" | "play-circle" | "present" | "refresh-circle" | "refresh" | "repeat" | "restricted" | "rotate" | "search-no" | "search" | "selector-checked" | "selector-circle-filled" | "selector-circle" | "send" | "settings-filled" | "settings" | "share" | "shopping-bag" | "shopping-cart" | "sort-filter-down" | "sort-filter-up" | "sound-off" | "sound-on" | "sprucebot" | "star-filled" | "star" | "sun" | "tag" | "time" | "tool" | "trending-down" | "trending-up" | "triangle" | "unlock" | "upload-cloud" | "upload" | "user-add" | "user-delete" | "user" | "users" | "video-off" | "video" | "warning" | "wifi" | "zoom-in" | "zoom-out")
				/** Click handler. */
				'onClick': (() => Promise<any> | any)
		}

		interface InputButtonSchema extends SpruceSchema.Schema {
			id: 'inputButton',
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
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                isRequired: true,
			                options: {choices: [{"value":"add-circle","label":"add-circle"},{"value":"add-square","label":"add-square"},{"value":"add","label":"add"},{"value":"alarm","label":"alarm"},{"value":"arrow-back","label":"arrow-back"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"arrow-down","label":"arrow-down"},{"value":"arrow-next","label":"arrow-next"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"arrow-up","label":"arrow-up"},{"value":"attachment","label":"attachment"},{"value":"award-badge","label":"award-badge"},{"value":"binoculars","label":"binoculars"},{"value":"bolt","label":"bolt"},{"value":"book-open","label":"book-open"},{"value":"book","label":"book"},{"value":"bookmark","label":"bookmark"},{"value":"calendar-add","label":"calendar-add"},{"value":"calendar","label":"calendar"},{"value":"camera","label":"camera"},{"value":"cellphone","label":"cellphone"},{"value":"checkmark","label":"checkmark"},{"value":"chevron-down","label":"chevron-down"},{"value":"chevron-left","label":"chevron-left"},{"value":"chevron-right","label":"chevron-right"},{"value":"chevron-up","label":"chevron-up"},{"value":"clipboard","label":"clipboard"},{"value":"clock","label":"clock"},{"value":"close-circle","label":"close-circle"},{"value":"close-square","label":"close-square"},{"value":"close","label":"close"},{"value":"code","label":"code"},{"value":"coffee","label":"coffee"},{"value":"command","label":"command"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"crop","label":"crop"},{"value":"cube","label":"cube"},{"value":"delete","label":"delete"},{"value":"document-blank","label":"document-blank"},{"value":"document-new","label":"document-new"},{"value":"document-text","label":"document-text"},{"value":"download-cloud","label":"download-cloud"},{"value":"download","label":"download"},{"value":"edit-box","label":"edit-box"},{"value":"edit-line","label":"edit-line"},{"value":"email","label":"email"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"external-link","label":"external-link"},{"value":"fav-heart","label":"fav-heart"},{"value":"flag","label":"flag"},{"value":"flip-01","label":"flip-01"},{"value":"flip-02","label":"flip-02"},{"value":"folder","label":"folder"},{"value":"globe","label":"globe"},{"value":"hash-tag","label":"hash-tag"},{"value":"headphones","label":"headphones"},{"value":"help-buoy","label":"help-buoy"},{"value":"help-circle","label":"help-circle"},{"value":"home","label":"home"},{"value":"info","label":"info"},{"value":"jump","label":"jump"},{"value":"layers","label":"layers"},{"value":"bar-graph","label":"bar-graph"},{"value":"link-angle","label":"link-angle"},{"value":"link-flat","label":"link-flat"},{"value":"loader","label":"loader"},{"value":"location-pin","label":"location-pin"},{"value":"lock","label":"lock"},{"value":"logout","label":"logout"},{"value":"map","label":"map"},{"value":"message-circle","label":"message-circle"},{"value":"message-square","label":"message-square"},{"value":"mic-off","label":"mic-off"},{"value":"mic-on","label":"mic-on"},{"value":"minus-circle","label":"minus-circle"},{"value":"minus-square","label":"minus-square"},{"value":"money-sign","label":"money-sign"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"more-vertical","label":"more-vertical"},{"value":"notification-off","label":"notification-off"},{"value":"notification-on","label":"notification-on"},{"value":"object","label":"object"},{"value":"pause-circle","label":"pause-circle"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"phone","label":"phone"},{"value":"photo","label":"photo"},{"value":"picked","label":"picked"},{"value":"pie-chart","label":"pie-chart"},{"value":"play-circle","label":"play-circle"},{"value":"present","label":"present"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"refresh","label":"refresh"},{"value":"repeat","label":"repeat"},{"value":"restricted","label":"restricted"},{"value":"rotate","label":"rotate"},{"value":"search-no","label":"search-no"},{"value":"search","label":"search"},{"value":"selector-checked","label":"selector-checked"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"selector-circle","label":"selector-circle"},{"value":"send","label":"send"},{"value":"settings-filled","label":"settings-filled"},{"value":"settings","label":"settings"},{"value":"share","label":"share"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"sound-off","label":"sound-off"},{"value":"sound-on","label":"sound-on"},{"value":"sprucebot","label":"sprucebot"},{"value":"star-filled","label":"star-filled"},{"value":"star","label":"star"},{"value":"sun","label":"sun"},{"value":"tag","label":"tag"},{"value":"time","label":"time"},{"value":"tool","label":"tool"},{"value":"trending-down","label":"trending-down"},{"value":"trending-up","label":"trending-up"},{"value":"triangle","label":"triangle"},{"value":"unlock","label":"unlock"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"upload","label":"upload"},{"value":"user-add","label":"user-add"},{"value":"user-delete","label":"user-delete"},{"value":"user","label":"user"},{"value":"users","label":"users"},{"value":"video-off","label":"video-off"},{"value":"video","label":"video"},{"value":"warning","label":"warning"},{"value":"wifi","label":"wifi"},{"value":"zoom-in","label":"zoom-in"},{"value":"zoom-out","label":"zoom-out"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                isRequired: true,
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			    }
		}

		interface InputButtonEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface AutocompleteInput {
			
				
				'id'?: string | undefined | null
				
				'value'?: string | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
				/** Placeholder. */
				'placeholder'?: string | undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.FormInputViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInput>) | undefined | null
				
				'suggestions'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteSuggestion[] | undefined | null
		}

		interface AutocompleteInputSchema extends SpruceSchema.Schema {
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteSuggestionSchema,}
			            },
			    }
		}

		interface AutocompleteInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AutocompleteInputSchema> {}

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface AddressInput {
			
				
				'id'?: string | undefined | null
				
				'name': string
				
				'value'?: (any) | undefined | null
				/** . If you need the text input to render a value other than what is stored (a person's name vs. their id). */
				'renderedValue'?: (any) | undefined | null
				/** Label. */
				'label'?: string | undefined | null
				/** Hint. */
				'hint'?: string | undefined | null
				/** Required. */
				'isRequired'?: boolean | undefined | null
				
				'isInteractive'?: boolean | undefined | null
				/** On change handler. */
				'onChange'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On changed rendered value handler. */
				'onChangeRenderedValue'?: ((value: any) => void | Promise<void | boolean> | boolean) | undefined | null
				/** On focus handler. */
				'onFocus'?: (() => void | Promise<void>) | undefined | null
				/** On blur handler. */
				'onBlur'?: (() => void | Promise<void>) | undefined | null
				
				'rightButtons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButton[] | undefined | null
		}

		interface AddressInputSchema extends SpruceSchema.Schema {
			id: 'addressInput',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Address input',
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
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputButtonSchema,}
			            },
			    }
		}

		interface AddressInputEntity extends SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AddressInputSchema> {}

	}

}
