/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-redeclare */

export { SpruceSchemas } from '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types'

import { default as SchemaEntity } from '@sprucelabs/schema'



import * as SpruceSchema from '@sprucelabs/schema'

import * as HeartwoodTypes from '../../'

declare module '@sprucelabs/spruce-core-schemas/build/.spruce/schemas/core.schemas.types' {


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToggleInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: boolean| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: boolean) => void | boolean | Promise<void | boolean>)| undefined | null
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
			                options: {valueType: `(value: boolean) => void | boolean | Promise<void | boolean>`,}
			            },
			    }
		}

		type ToggleInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToggleInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface TextInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
				/** Placeholder. */
				'placeholder'?: string| undefined | null
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
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
			            },
			            /** Placeholder. */
			            'placeholder': {
			                label: 'Placeholder',
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		type TextInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface RatingsInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: number| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: number) => any | Promise<any>)| undefined | null
				/** Can be changed. */
				'canBeChanged'?: boolean| undefined | null
				/** Stars or Smilies. */
				'renderAs'?: ("stars" | "smilies")| undefined | null
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
			                options: {valueType: `(value: number) => any | Promise<any>`,}
			            },
			            /** Can be changed. */
			            'canBeChanged': {
			                label: 'Can be changed',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Stars or Smilies. */
			            'renderAs': {
			                label: 'Stars or Smilies',
			                type: 'select',
			                options: {choices: [{"value":"stars","label":"Stars"},{"value":"smilies","label":"Smilies"}],}
			            },
			    }
		}

		type RatingsInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface PhoneInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: (any)| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
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
			            /** On change handler. */
			            'onChange': {
			                label: 'On change handler',
			                type: 'raw',
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
			            },
			    }
		}

		type PhoneInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.PhoneInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		/** Wraps all inputs in form with things like labels, hints, and error messages. */
		interface Input {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: (any)| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
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
			            /** On change handler. */
			            'onChange': {
			                label: 'On change handler',
			                type: 'raw',
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
			            },
			    }
		}

		type InputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.InputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToolBeltTool {
			
				/** Id. */
				'id': string
				/** Icon. */
				'lineIcon': ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")
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
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
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

		type ToolBeltToolEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltToolSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ToolBelt {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ToolBeltViewController)| undefined | null
				/** Icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
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
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
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

		type ToolBeltEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ToolBeltSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ThemeProps {
			
				/** Color 1. Used to color anything overlayed on the background (color1Inverse or color1InverseGradient). */
				'color1'?: string| undefined | null
				/** Color 1 (inverse). Background color of the view if color1InverseGradient is not set */
				'color1Inverse'?: string| undefined | null
				/** Color 1 Gradient (inverse). Background griedent applied to view. */
				'color1InverseGradient'?: string| undefined | null
				/** Color 2. The color of anything overlayed on the background of a card (color2Inverse) */
				'color2'?: string| undefined | null
				/** Color 2. The color of overlays ontop of a card. */
				'color2Transparent'?: string| undefined | null
				/** Color. Background color of cards. */
				'color2Inverse'?: string| undefined | null
				/** Color 2 (inverse with transparency). Background color used when some transparency is needed for context. */
				'color2InverseTransparent'?: string| undefined | null
				/** Color 3. Titles of cards. */
				'color3'?: string| undefined | null
				/** Color 3 (compliment). Subtitles of cards. */
				'color3Compliment'?: string| undefined | null
				/** Color 3 (inverse). Background for headers of cards. */
				'color3Inverse'?: string| undefined | null
				/** Color 4. Foreground for buttons and menu items. */
				'color4'?: string| undefined | null
				/** Color 4 (compliment). Borders for buttons and menu items. */
				'color4Compliment'?: string| undefined | null
				/** Color 4 (compliment, transparent). Lighter version of borders, outlines, and highlights */
				'color4ComplimentTransparent'?: string| undefined | null
				/** Color 4 (inverse). Background for buttons and menu items. */
				'color4Inverse'?: string| undefined | null
				/** Color (inverse, compliment). Background for buttons and menu items */
				'color4InverseCompliment'?: string| undefined | null
				/** Control bar color 1. The foreground color of the control bar. */
				'controlBarColor1'?: string| undefined | null
				/** Control bar color 2. The background color of the control bar. */
				'controlBarColor2'?: string| undefined | null
				/** Tool belt color 2. The background color of the tool belts. */
				'toolBeltColor2'?: string| undefined | null
				/** Color. Errors overlayed on a background colored with errorColor1Inverse. */
				'errorColor1'?: string| undefined | null
				/** Color. The background used when rendering errors. */
				'errorColor1Inverse'?: string| undefined | null
		}

		interface ThemePropsSchema extends SpruceSchema.Schema {
			id: 'themeProps',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
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
			            /** Color 2. The color of anything overlayed on the background of a card (color2Inverse) */
			            'color2': {
			                label: 'Color 2',
			                type: 'text',
			                hint: 'The color of anything overlayed on the background of a card (color2Inverse)',
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
			            /** Color (inverse, compliment). Background for buttons and menu items */
			            'color4InverseCompliment': {
			                label: 'Color (inverse, compliment)',
			                type: 'text',
			                hint: 'Background for buttons and menu items',
			                options: undefined
			            },
			            /** Control bar color 1. The foreground color of the control bar. */
			            'controlBarColor1': {
			                label: 'Control bar color 1',
			                type: 'text',
			                hint: 'The foreground color of the control bar.',
			                options: undefined
			            },
			            /** Control bar color 2. The background color of the control bar. */
			            'controlBarColor2': {
			                label: 'Control bar color 2',
			                type: 'text',
			                hint: 'The background color of the control bar.',
			                options: undefined
			            },
			            /** Tool belt color 2. The background color of the tool belts. */
			            'toolBeltColor2': {
			                label: 'Tool belt color 2',
			                type: 'text',
			                hint: 'The background color of the tool belts.',
			                options: undefined
			            },
			            /** Color. Errors overlayed on a background colored with errorColor1Inverse. */
			            'errorColor1': {
			                label: 'Color',
			                type: 'text',
			                hint: 'Errors overlayed on a background colored with errorColor1Inverse.',
			                options: undefined
			            },
			            /** Color. The background used when rendering errors. */
			            'errorColor1Inverse': {
			                label: 'Color',
			                type: 'text',
			                hint: 'The background used when rendering errors.',
			                options: undefined
			            },
			    }
		}

		type ThemePropsEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemePropsSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Theme {
			
				
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
			            'props': {
			                type: 'schema',
			                isRequired: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemePropsSchema,}
			            },
			    }
		}

		type ThemeEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ThemeSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SprucebotTypedMessage {
			
				/** Sentences. Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold) */
				'sentences': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentence[]
				/** Default avatar. How should Sprucebot be rendered by default */
				'avatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatar| undefined | null
				/** Start delay. How long should I wait before starting to type? */
				'startDelay'?: SpruceSchema.DurationFieldValue| undefined | null
				/** Loop. */
				'shouldLoop'?: boolean| undefined | null
				/** Size. */
				'size'?: ("small" | "medium" | "large")| undefined | null
				/** Paused. */
				'isPaused'?: boolean| undefined | null
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
			            /** Paused. */
			            'isPaused': {
			                label: 'Paused',
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type SprucebotTypedMessageEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SelectInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: (any)| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
				/** Placeholder. */
				'placeholder'?: string| undefined | null
				
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
			            /** On change handler. */
			            'onChange': {
			                label: 'On change handler',
			                type: 'raw',
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
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

		type SelectInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface LineIcon {
			
				/** Name. */
				'name': ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")
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
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			    }
		}

		type LineIconEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LineIconSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Layout {
			
				/** Card. Will render a card in this section */
				'cards'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card[]| undefined | null
				
				'className'?: string| undefined | null
				/** Grid. Will force cards to render as grid. */
				'shouldRenderAsGrid'?: boolean| undefined | null
				/** Width. */
				'width'?: ("wide" | "tight" | "full")| undefined | null
		}

		interface LayoutSchema extends SpruceSchema.Schema {
			id: 'layout',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Layout',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Card. Will render a card in this section */
			            'cards': {
			                label: 'Card',
			                type: 'schema',
			                hint: 'Will render a card in this section',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			            /** . */
			            'className': {
			                type: 'text',
			                isPrivate: true,
			                options: undefined
			            },
			            /** Grid. Will force cards to render as grid. */
			            'shouldRenderAsGrid': {
			                label: 'Grid',
			                type: 'boolean',
			                hint: 'Will force cards to render as grid.',
			                options: undefined
			            },
			            /** Width. */
			            'width': {
			                label: 'Width',
			                type: 'select',
			                defaultValue: "tight",
			                options: {choices: [{"value":"wide","label":"Wide"},{"value":"tight","label":"Tight"},{"value":"full","label":"Full width"}],}
			            },
			    }
		}

		type LayoutEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LayoutSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SkillView {
			
				
				'id'?: string| undefined | null
				/** Center vertically. */
				'shouldCenterVertically'?: boolean| undefined | null
				/** Full screen. */
				'isFullScreen'?: boolean| undefined | null
				/** Layout. */
				'layouts': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Layout[]
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
			            /** Layout. */
			            'layouts': {
			                label: 'Layout',
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.LayoutSchema,}
			            },
			    }
		}

		type SkillViewEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SkillViewSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface BuilderImportExportPage {
			
				/** Page title. */
				'title': string
				/** Schema. */
				'schema': (SpruceSchema.Schema)
				/** Sections. */
				'sections': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection[]
		}

		interface BuilderImportExportPageSchema extends SpruceSchema.Schema {
			id: 'builderImportExportPage',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: '',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
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
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSectionSchema,}
			            },
			    }
		}

		type BuilderImportExportPageEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BuilderImportExportPageSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FormBuilderImportExportObject {
			
				/** Title. */
				'title': string
				/** Subtitle. */
				'subtitle'?: string| undefined | null
				/** Pages. */
				'pages': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BuilderImportExportPage[]
		}

		interface FormBuilderImportExportObjectSchema extends SpruceSchema.Schema {
			id: 'formBuilderImportExportObject',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'form builder import export object',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
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
			                type: 'schema',
			                isRequired: true,
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BuilderImportExportPageSchema,}
			            },
			    }
		}

		type FormBuilderImportExportObjectEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormBuilderImportExportObjectSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FancyIcon {
			
				/** Name. */
				'name': ("accesibility" | "add" | "address_book" | "administrator" | "airbrush" | "airplane" | "alarm" | "alien" | "american_express" | "analysis" | "analysis_1" | "archive" | "art_palette" | "artificial_intelligence" | "artificial_intelligence_1" | "at" | "atm" | "attachment" | "audio" | "audio_knob" | "auricular_phone" | "back" | "backup" | "balance" | "band_aid" | "bank" | "barcode" | "basketball" | "battery" | "beer" | "bell" | "bicycle" | "bill" | "binoculars" | "birthday" | "bitcoin" | "blog" | "bluetooth" | "bomb" | "book" | "bookmark" | "box" | "brain" | "brainstorm" | "briefcase" | "briefcase_money" | "broken_heart" | "broken_link" | "brush_tip" | "bus" | "cake" | "calculator" | "calendar" | "car" | "cat" | "certificate" | "champagne" | "chat" | "chat_1" | "check" | "check_1" | "chip" | "cirrus" | "city" | "city_1" | "citybank" | "clicker" | "clip" | "clipboard" | "clock" | "cloud" | "cloud_1" | "cloud_computing" | "cloud_computing_1" | "cloudy" | "cocktail" | "code" | "coffee_cup" | "coin_dollar" | "coin_pound" | "coins" | "coinstack" | "collaboration" | "command" | "company" | "compass" | "compose" | "computer_graphics" | "connection" | "contract" | "contract_1" | "contrast" | "control" | "control_game" | "copy" | "costumer" | "coupon" | "crash" | "creative" | "credit_card" | "credit_card1" | "credit_card_2" | "cross" | "cursor" | "dashboard" | "database" | "delete" | "dentistry" | "diary" | "diet" | "digital_campaing" | "digital_key" | "diners_club" | "disc" | "discount" | "dish" | "dish_1" | "dislike" | "divider" | "doctor" | "dog" | "dollar_coin" | "dollar_sign" | "dowload" | "down_arrow" | "download" | "edit" | "edit_file" | "editor" | "education" | "eject" | "emergency" | "employed" | "encrypted_database" | "encrypted_folder" | "encrypted_internet_conection" | "encrypted_mail" | "encryption" | "encypted_terminal" | "enterprice" | "equal" | "erase_file" | "erase_sabe" | "error_database" | "error_search" | "error_terminal" | "euro_sign" | "exit" | "external_link" | "facebook" | "feedback" | "file" | "fill" | "finger_print" | "firewall" | "flag" | "flash" | "flash_auto" | "flash_red_eye" | "flashlight" | "folder_gallery" | "folder" | "football" | "forbidden" | "french_fries" | "funnel" | "gallery" | "game_control" | "games_card_clubs" | "games_card_diamonds" | "games_card_hearts" | "games_card_spades" | "gift" | "girl" | "gmail" | "gold" | "graduated" | "group" | "hamburguer" | "hand" | "hand_note" | "hand_point" | "hand_shake" | "headphones" | "heart" | "heart_1" | "help" | "hide" | "high_five" | "hold" | "home" | "homework" | "hotel" | "hourglass" | "house" | "icon" | "id_card" | "idea" | "infinity" | "info" | "information" | "innovation" | "instagram" | "internet" | "internet_1" | "internet_error" | "key" | "key_1" | "kiss" | "lamp" | "laptop" | "layers" | "layers_1" | "layout" | "left_arrow" | "light_bulb" | "like" | "like_1" | "line_chart" | "link" | "linkeding" | "list" | "local_network" | "location" | "locked" | "magazine" | "magic_wand" | "magnet" | "mail" | "mail_account" | "mail_error" | "map_location" | "maps" | "marker" | "master_data" | "mastercard" | "medicine" | "menu" | "mic" | "microphone" | "microphone_1" | "microscope" | "money_bag" | "money" | "money_1" | "money_report" | "money_report_1" | "monitor" | "more" | "multiple_user" | "multiple_users" | "music_library" | "music_player" | "music_volume_high" | "music_volume_low" | "music_volume_medium" | "music_volume_mute" | "musical_note" | "mute_mic" | "network" | "newspaper" | "note" | "notebook" | "notification" | "old_phone" | "online_pay" | "open_book" | "open_box" | "open_hand" | "p2p" | "pallete" | "paper_plane" | "paper_plane_1" | "passage_of_time" | "pause" | "payment" | "paypal" | "pen_drive" | "perspective" | "pet_paw_print" | "phone_book" | "phone_receiver" | "photo_camera" | "picture" | "pie_chart" | "piggy_bank" | "pinterest" | "piracy" | "pizza" | "placeholder" | "plan" | "plane" | "play_buttom" | "plus" | "police_car" | "power_on_off" | "presentation" | "preview" | "preview_1" | "previous" | "price_tag" | "print_fax" | "project_management" | "project_management_1" | "promotion" | "purse" | "quality" | "radar" | "radioactive" | "rainy" | "rating" | "receipt" | "recluitment" | "recognition" | "record" | "recycle" | "red_eye" | "reload" | "reload_1" | "repair" | "report" | "research" | "responsive" | "restaurant" | "resume" | "reunion" | "right_arrow" | "risk" | "rotate" | "route" | "runner_man" | "sabe" | "sabe_error" | "safety_box_open" | "satellite" | "school" | "scissors" | "screw" | "search" | "send" | "send_file" | "send_file_1" | "send_money" | "send_package" | "server" | "settings" | "settings_1" | "share" | "shield" | "ship" | "shipped" | "shop" | "shopping" | "shopping_bag" | "shopping_car" | "shuffle" | "sign" | "sketch" | "sketch_1" | "skip" | "smartphone" | "snapchat" | "sniffer" | "social_media" | "spam" | "speech_bubble" | "spray" | "star" | "start_up" | "stats_line_chart" | "stethoscope" | "stop" | "stop_watch" | "storage" | "street" | "student" | "study" | "sun_glasses" | "suppport" | "switch" | "tablet" | "tabs" | "tap_gesture" | "target" | "telephone_call" | "television" | "terminal" | "terminal_2" | "think" | "toast" | "toast_1" | "tools" | "traffic_light" | "transfer_data" | "trash" | "treasure_chest" | "trojan" | "twitter" | "two_players" | "university" | "unlock" | "up_arrow" | "upload" | "vector" | "view" | "vintage_phone" | "visa" | "volume_control" | "wallet" | "wallet_1" | "warning" | "warning_briefcase" | "warning_chemistry" | "warning_database" | "warning_dowload" | "warning_folder" | "warning_location" | "warning_mail" | "warning_package" | "warning_search" | "warning_shipped" | "warning_terminal" | "warning_trash" | "web_design" | "web_domain_registration" | "web_search" | "web_search_1" | "website" | "weight" | "whatsapp" | "wheelchair" | "wifi" | "windows" | "wine_cup" | "wordpress" | "worldwide" | "youtube" | "zcash" | "zipped_folder" | "zoom_in" | "zoom_out" | "loading")
				/** Size. */
				'size'?: ("medium" | "extraLarge")| undefined | null
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

		type FancyIconEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FancyIconSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardBody {
			
				/** Show section separators. This will make each section render with a border. */
				'shouldShowSectionSeparators'?: boolean| undefined | null
				/** Busy. */
				'isBusy'?: boolean| undefined | null
				/** Swipe controller. */
				'swipeController'?: ((controller: HeartwoodTypes.SwipeController) => void)| undefined | null
				/** Swipe. */
				'shouldEnableSectionSwiping'?: boolean| undefined | null
				/** Select slide title handler. */
				'onSelectSlideTitle'?: ((id: number) => void)| undefined | null
				/** Slide change callback. */
				'onChangeSlide'?: ((slide: number) => void)| undefined | null
				/** Sections. */
				'sections'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection[]| undefined | null
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
			            /** Sections. */
			            'sections': {
			                label: 'Sections',
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSectionSchema,}
			            },
			    }
		}

		type CardBodyEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBodySchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Dialog {
			
				
				'id'?: string| undefined | null
				
				'className'?: string| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dialog>)| undefined | null
				/** Header. */
				'header'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader| undefined | null
				/** Critical error. */
				'criticalError'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError| undefined | null
				/** Fade in. */
				'shouldFadeIn'?: boolean| undefined | null
				/** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
				'body'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody| undefined | null
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter| undefined | null
				/** Visible. */
				'isVisible'?: boolean| undefined | null
				/** Show close button. */
				'shouldShowCloseButton'?: boolean| undefined | null
				/** Card controller. */
				'cardController'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>)| undefined | null
				/** Close callback. */
				'onClose'?: (() => Promise<void | boolean> | void | boolean)| undefined | null
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
			            /** Card controller. */
			            'cardController': {
			                label: 'Card controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card>`,}
			            },
			            /** Close callback. */
			            'onClose': {
			                label: 'Close callback',
			                type: 'raw',
			                options: {valueType: `() => Promise<void | boolean> | void | boolean`,}
			            },
			    }
		}

		type DialogEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DialogSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Ratings {
			
				/** Value. A number between 0-1. */
				'value'?: number| undefined | null
				/** Can be changed. */
				'canBeChanged'?: boolean| undefined | null
				/** Callback. */
				'onChange'?: ((value: number) => any)| undefined | null
				/** Stars or Smilies. */
				'renderAs'?: ("stars" | "smilies")| undefined | null
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
			            /** Stars or Smilies. */
			            'renderAs': {
			                label: 'Stars or Smilies',
			                type: 'select',
			                options: {choices: [{"value":"stars","label":"Stars"},{"value":"smilies","label":"Smilies"}],}
			            },
			    }
		}

		type RatingsEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.RatingsSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Progress {
			
				/** Title. Rendered in the center of the circle indicator! */
				'title'?: string| undefined | null
				/** Percent complete. A number from zero to 1 */
				'percentComplete'?: number| undefined | null
		}

		interface ProgressSchema extends SpruceSchema.Schema {
			id: 'progress',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Progress',
			moduleToImportFromWhenRemote: '@sprucelabs/heartwood-view-controllers',
			    fields: {
			            /** Title. Rendered in the center of the circle indicator! */
			            'title': {
			                label: 'Title',
			                type: 'text',
			                hint: 'Rendered in the center of the circle indicator!',
			                options: undefined
			            },
			            /** Percent complete. A number from zero to 1 */
			            'percentComplete': {
			                label: 'Percent complete',
			                type: 'number',
			                hint: 'A number from zero to 1',
			                options: undefined
			            },
			    }
		}

		type ProgressEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ProgressSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardSection {
			
				/** Title. */
				'title'?: string| undefined | null
				/** Complete. When being rendered as a slide, this will signify the step is complete. */
				'isComplete'?: boolean| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSection>)| undefined | null
				/** Padding. */
				'shouldBePadded'?: boolean| undefined | null
				/** Center content. */
				'shouldContentBeCentered'?: boolean| undefined | null
				/** Card section item. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text| undefined | null
				/** Image. */
				'image'?: string| undefined | null
				/** Form. */
				'form'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Form<any>| undefined | null
				/** Talking Sprucebot. */
				'talkingSprucebot'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebot| undefined | null
				/** Big form. */
				'bigForm'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigForm<any>| undefined | null
				/** Buttons. */
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]| undefined | null
				/** Button bar. */
				'buttonBar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBar| undefined | null
				/** List. */
				'list'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List| undefined | null
				/** Calendar. */
				'calendar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar| undefined | null
				/** Stats. */
				'stats'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Stats| undefined | null
				/** Progress. */
				'progress'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Progress| undefined | null
				/** Ratings. */
				'ratings'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Ratings| undefined | null
				/** Grid. */
				'shouldRenderContentsAsGrid'?: boolean| undefined | null
				/** Alignment. */
				'alignment'?: ("left" | "center" | "right")| undefined | null
		}

		interface CardSectionSchema extends SpruceSchema.Schema {
			id: 'cardSection',
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
			            /** Grid. */
			            'shouldRenderContentsAsGrid': {
			                label: 'Grid',
			                type: 'boolean',
			                defaultValue: false,
			                options: undefined
			            },
			            /** Alignment. */
			            'alignment': {
			                label: 'Alignment',
			                type: 'select',
			                defaultValue: "left",
			                options: {choices: [{"value":"left","label":"Left"},{"value":"center","label":"Center"},{"value":"right","label":"Right"}],}
			            },
			    }
		}

		type CardSectionEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSectionSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface StatsStat {
			
				
				'value'?: number| undefined | null
				
				'label'?: string| undefined | null
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
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'label': {
			                type: 'text',
			                options: undefined
			            },
			    }
		}

		type StatsStatEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsStatSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Stats {
			
				/** Prefix. Will be rendered before the value. Could be a $ or something else. */
				'valuePrefix'?: string| undefined | null
				/** Format values. Add commas to numbers. */
				'shouldFormatValues'?: boolean| undefined | null
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

		type StatsEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.StatsSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface BigFormSection<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'className'?: string| undefined | null
				/** Title. */
				'title'?: string| undefined | null
				/** Text. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text| undefined | null
				/** Grid. */
				'shouldRenderAsGrid'?: boolean| undefined | null
				/** List. */
				'list'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List| undefined | null
				/** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
				'fields'?: (SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>)[]| undefined | null
				
				'shouldShowSubmitButton'?: boolean| undefined | null
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
			            'shouldShowSubmitButton': {
			                type: 'boolean',
			                options: undefined
			            },
			    }
		}

		type BigFormSectionEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSectionSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface BigForm<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'id': string
				
				'className'?: string| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.BigFormViewController<S>)| undefined | null
				
				'schema': (S)
				/** Submit handler. */
				'onSubmit'?: (HeartwoodTypes.SubmitHandler<S>)| undefined | null
				/** Cancel handler. */
				'onCancel'?: (() => void | Promise<void>)| undefined | null
				/** Will change handler. */
				'onWillChange'?: ((options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined)| undefined | null
				/** Change handler. */
				'onChange'?: ((options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void)| undefined | null
				/** Values. The values you want the form to have. Control is given to the FormViewController after render. */
				'values'?: (SpruceSchema.SchemaPartialValues<S>)| undefined | null
				/** Errors by field. */
				'errorsByField'?: (HeartwoodTypes.FormErrorsByField<S>)| undefined | null
				/** Show submit controls. */
				'shouldShowSubmitControls'?: boolean| undefined | null
				/** Show cancel button. */
				'shouldShowCancelButton'?: boolean| undefined | null
				/** Submit button label. */
				'submitButtonLabel'?: string| undefined | null
				/** Busy. */
				'isBusy'?: boolean| undefined | null
				/** Enabled. */
				'isEnabled'?: boolean| undefined | null
				/** Set value handler. */
				'setValue': ((name: SpruceSchema.SchemaFieldNames<S>, value: any) => void)
				/** Form sections. */
				'sections': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSection<S>[]
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter| undefined | null
				/** Present slide. The slide showing now! */
				'presentSlide'?: number| undefined | null
				/** Submit handler. */
				'onSubmitSlide'?: (HeartwoodTypes.SubmitHandler<S, { presentSlide: number }>)| undefined | null
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
			                options: {valueType: `(options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined`,}
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
			            'shouldShowSubmitControls': {
			                label: 'Show submit controls',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Show cancel button. */
			            'shouldShowCancelButton': {
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
			                options: {valueType: `HeartwoodTypes.SubmitHandler<S, { presentSlide: number }>`,}
			            },
			    }
		}

		type BigFormEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		/** Avatar that makes size optional for use with the Sprucebot Typed Message component */
		interface SprucebotTypedMessageAvatar {
			
				/** Size. */
				'size'?: ("small" | "medium" | "large")| undefined | null
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

		type SprucebotTypedMessageAvatarEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatarSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface TalkingSprucebot {
			
				/** Sentences. Sprucebot will type out these sentences one at a time preserving what is similar between each one (in bold) */
				'sentences': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentence[]
				/** Default avatar. How should Sprucebot be rendered by default */
				'avatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageAvatar| undefined | null
				/** Start delay. How long should I wait before starting to type? */
				'startDelay'?: SpruceSchema.DurationFieldValue| undefined | null
				/** Loop. */
				'shouldLoop'?: boolean| undefined | null
				/** Size. */
				'size'?: ("small" | "medium" | "large")| undefined | null
				/** Paused. */
				'isPaused'?: boolean| undefined | null
				/** Completion handler. */
				'onComplete'?: (() => Promise<void> | void)| undefined | null
		}

		interface TalkingSprucebotSchema extends SpruceSchema.Schema {
			id: 'talkingSprucebot',
			version: 'v2021_02_11',
			namespace: 'HeartwoodViewControllers',
			name: 'Talking sprucebot',
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
			            /** Paused. */
			            'isPaused': {
			                label: 'Paused',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Completion handler. */
			            'onComplete': {
			                label: 'Completion handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<void> | void`,}
			            },
			    }
		}

		type TalkingSprucebotEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TalkingSprucebotSchema>

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

		type SprucebotAvatarEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatarSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SprucebotTypedMessageSentence {
			
				/** . A way to override the Sprucebot avatar for this sentence */
				'avatar'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotAvatar| undefined | null
				/** Words. The words being typed out */
				'words': string
				/** End delay. How long should I hold on this sentence after it's typed? */
				'endDelay'?: SpruceSchema.DurationFieldValue| undefined | null
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

		type SprucebotTypedMessageSentenceEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SprucebotTypedMessageSentenceSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardFooterButton {
			
				
				'id'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController)| undefined | null
				/** Selected. */
				'isSelected'?: boolean| undefined | null
				/** Selected. */
				'isEnabled'?: boolean| undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean| undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean| undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any)| undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "destructive")| undefined | null
				/** Image. */
				'image'?: string| undefined | null
				/** Line icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any)| undefined | null
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
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			    }
		}

		type CardFooterButtonEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterButtonSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardFooter {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter>)| undefined | null
				/** Buttons. */
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterButton[]| undefined | null
				/** Loading. */
				'isBusy'?: boolean| undefined | null
				/** Loading. */
				'isEnabled'?: boolean| undefined | null
				/** Show border. */
				'shouldRenderBorder'?: boolean| undefined | null
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
			            /** Loading. */
			            'isEnabled': {
			                label: 'Loading',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Show border. */
			            'shouldRenderBorder': {
			                label: 'Show border',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			    }
		}

		type CardFooterEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooterSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface FormSection<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'className'?: string| undefined | null
				/** Title. */
				'title'?: string| undefined | null
				/** Text. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text| undefined | null
				/** Grid. */
				'shouldRenderAsGrid'?: boolean| undefined | null
				/** List. */
				'list'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.List| undefined | null
				/** Form fields. Put any fields from the schema you provided to be shown in this section. Can be array of field names or objects with a key of name. */
				'fields'?: (SpruceSchema.SchemaFieldNames<S> | HeartwoodTypes.FieldRenderOptions<S>)[]| undefined | null
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

		type FormSectionEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSectionSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Form<S extends SpruceSchema.Schema = SpruceSchema.Schema> {
			
				
				'id': string
				
				'className'?: string| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.FormViewController<S>)| undefined | null
				
				'schema': (S)
				/** Submit handler. */
				'onSubmit'?: (HeartwoodTypes.SubmitHandler<S>)| undefined | null
				/** Cancel handler. */
				'onCancel'?: (() => void | Promise<void>)| undefined | null
				/** Will change handler. */
				'onWillChange'?: ((options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined)| undefined | null
				/** Change handler. */
				'onChange'?: ((options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void)| undefined | null
				/** Values. The values you want the form to have. Control is given to the FormViewController after render. */
				'values'?: (SpruceSchema.SchemaPartialValues<S>)| undefined | null
				/** Errors by field. */
				'errorsByField'?: (HeartwoodTypes.FormErrorsByField<S>)| undefined | null
				/** Show submit controls. */
				'shouldShowSubmitControls'?: boolean| undefined | null
				/** Show cancel button. */
				'shouldShowCancelButton'?: boolean| undefined | null
				/** Submit button label. */
				'submitButtonLabel'?: string| undefined | null
				/** Busy. */
				'isBusy'?: boolean| undefined | null
				/** Enabled. */
				'isEnabled'?: boolean| undefined | null
				/** Set value handler. */
				'setValue': ((name: SpruceSchema.SchemaFieldNames<S>, value: any) => void)
				/** Form sections. */
				'sections': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSection<S>[]
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter| undefined | null
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
			                options: {valueType: `(options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<boolean | void | undefined> | boolean | void | undefined`,}
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
			            'shouldShowSubmitControls': {
			                label: 'Show submit controls',
			                type: 'boolean',
			                defaultValue: true,
			                options: undefined
			            },
			            /** Show cancel button. */
			            'shouldShowCancelButton': {
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

		type FormEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.FormSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListRow {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ListRowViewController)| undefined | null
				/** Row height. */
				'height'?: ("standard" | "tall" | "content")| undefined | null
				/** Id. */
				'id': string
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any)| undefined | null
				/** Selected. */
				'isSelected'?: boolean| undefined | null
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

		type ListRowEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRowSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface List {
			
				
				'id'?: string| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ListViewController)| undefined | null
				/** Render row dividers. */
				'shouldRenderRowDividers'?: boolean| undefined | null
				/** Column widths. */
				'columnWidths'?: (number | 'fill' | 'content')[]| undefined | null
				/** Row height. */
				'defaultRowHeight'?: ("standard" | "tall" | "content")| undefined | null
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

		type ListEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListRatingsInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: number| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: number) => any | Promise<any>)| undefined | null
				/** Can be changed. */
				'canBeChanged'?: boolean| undefined | null
				/** Stars or Smilies. */
				'renderAs'?: ("stars" | "smilies")| undefined | null
				
				'setValue'?: ((name: string, value: number) => Promise<any> | any)| undefined | null
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
			                options: {valueType: `(value: number) => any | Promise<any>`,}
			            },
			            /** Can be changed. */
			            'canBeChanged': {
			                label: 'Can be changed',
			                type: 'boolean',
			                options: undefined
			            },
			            /** Stars or Smilies. */
			            'renderAs': {
			                label: 'Stars or Smilies',
			                type: 'select',
			                options: {choices: [{"value":"stars","label":"Stars"},{"value":"smilies","label":"Smilies"}],}
			            },
			            /** . */
			            'setValue': {
			                type: 'raw',
			                options: {valueType: `(name: string, value: number) => Promise<any> | any`,}
			            },
			    }
		}

		type ListRatingsInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListToggleInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: boolean| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: boolean) => void | boolean | Promise<void | boolean>)| undefined | null
				
				'setValue'?: ((name: string, value: boolean) => Promise<any> | any)| undefined | null
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
			                options: {valueType: `(value: boolean) => void | boolean | Promise<void | boolean>`,}
			            },
			            /** . */
			            'setValue': {
			                type: 'raw',
			                options: {valueType: `(name: string, value: boolean) => Promise<any> | any`,}
			            },
			    }
		}

		type ListToggleInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface SelectInputChoice {
			
				
				'value': string
				
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
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			            /** . */
			            'label': {
			                type: 'text',
			                isRequired: true,
			                options: undefined
			            },
			    }
		}

		type SelectInputChoiceEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoiceSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListSelectInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: (any)| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
				/** Placeholder. */
				'placeholder'?: string| undefined | null
				
				'choices': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.SelectInputChoice[]
				
				'setValue'?: ((name: string, value: string) => Promise<any> | any)| undefined | null
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
			            /** On change handler. */
			            'onChange': {
			                label: 'On change handler',
			                type: 'raw',
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
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
			            /** . */
			            'setValue': {
			                type: 'raw',
			                options: {valueType: `(name: string, value: string) => Promise<any> | any`,}
			            },
			    }
		}

		type ListSelectInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListTextInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
				/** Placeholder. */
				'placeholder'?: string| undefined | null
				
				'setValue'?: ((name: string, value: string) => Promise<any> | any)| undefined | null
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
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
			            },
			            /** Placeholder. */
			            'placeholder': {
			                label: 'Placeholder',
			                type: 'text',
			                options: undefined
			            },
			            /** . */
			            'setValue': {
			                type: 'raw',
			                options: {valueType: `(name: string, value: string) => Promise<any> | any`,}
			            },
			    }
		}

		type ListTextInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInputSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListCellButton {
			
				
				'id'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController)| undefined | null
				/** Selected. */
				'isSelected'?: boolean| undefined | null
				/** Selected. */
				'isEnabled'?: boolean| undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean| undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean| undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any)| undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "destructive")| undefined | null
				/** Image. */
				'image'?: string| undefined | null
				/** Line icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
				/** Cell button click handler. */
				'onClick'?: ((options: { rowVc: HeartwoodTypes.ListRowViewController }) => any | Promise<any>)| undefined | null
				/** Cell button key down handler. */
				'onKeyDown'?: ((options: { rowVc: HeartwoodTypes.ListRowViewController, key: HeartwoodTypes.KeyboardKey }) => any | Promise<any>)| undefined | null
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
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** Cell button click handler. */
			            'onClick': {
			                label: 'Cell button click handler',
			                type: 'raw',
			                options: {valueType: `(options: { rowVc: HeartwoodTypes.ListRowViewController }) => any | Promise<any>`,}
			            },
			            /** Cell button key down handler. */
			            'onKeyDown': {
			                label: 'Cell button key down handler',
			                type: 'raw',
			                options: {valueType: `(options: { rowVc: HeartwoodTypes.ListRowViewController, key: HeartwoodTypes.KeyboardKey }) => any | Promise<any>`,}
			            },
			    }
		}

		type ListCellButtonEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellButtonSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Text {
			
				/** Text. */
				'content'?: string| undefined | null
				/** Html. */
				'html'?: string| undefined | null
				/** Align. */
				'align'?: ("left" | "right")| undefined | null
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
			            /** Align. */
			            'align': {
			                label: 'Align',
			                type: 'select',
			                defaultValue: "left",
			                options: {choices: [{"value":"left","label":"Left"},{"value":"right","label":"Right"}],}
			            },
			    }
		}

		type TextEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ListCell {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ListCellViewController)| undefined | null
				/** Text. */
				'text'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text| undefined | null
				/** Subtext. */
				'subText'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Text| undefined | null
				/** Image url. */
				'image'?: string| undefined | null
				/** Button. */
				'button'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellButton| undefined | null
				/** Line icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
				/** Text input. */
				'textInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInput| undefined | null
				/** Select input. */
				'selectInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListSelectInput| undefined | null
				/** Toggle input. */
				'toggleInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListToggleInput| undefined | null
				/** Ratings input. */
				'ratingsInput'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInput| undefined | null
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
			            /** Text. */
			            'text': {
			                label: 'Text',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.TextSchema,}
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
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** Text input. */
			            'textInput': {
			                label: 'Text input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListTextInputSchema,}
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
			            /** Ratings input. */
			            'ratingsInput': {
			                label: 'Ratings input',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListRatingsInputSchema,}
			            },
			    }
		}

		type ListCellEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ListCellSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CriticalError {
			
				
				'title'?: string| undefined | null
				
				'message'?: string| undefined | null
				
				'buttons'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Button[]| undefined | null
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

		type CriticalErrorEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalErrorSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CardHeader {
			
				/** Title. */
				'title'?: string| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader>)| undefined | null
				/** Subtitle. */
				'subtitle'?: string| undefined | null
				/** Icon. */
				'icon'?: ("accesibility" | "add" | "address_book" | "administrator" | "airbrush" | "airplane" | "alarm" | "alien" | "american_express" | "analysis" | "analysis_1" | "archive" | "art_palette" | "artificial_intelligence" | "artificial_intelligence_1" | "at" | "atm" | "attachment" | "audio" | "audio_knob" | "auricular_phone" | "back" | "backup" | "balance" | "band_aid" | "bank" | "barcode" | "basketball" | "battery" | "beer" | "bell" | "bicycle" | "bill" | "binoculars" | "birthday" | "bitcoin" | "blog" | "bluetooth" | "bomb" | "book" | "bookmark" | "box" | "brain" | "brainstorm" | "briefcase" | "briefcase_money" | "broken_heart" | "broken_link" | "brush_tip" | "bus" | "cake" | "calculator" | "calendar" | "car" | "cat" | "certificate" | "champagne" | "chat" | "chat_1" | "check" | "check_1" | "chip" | "cirrus" | "city" | "city_1" | "citybank" | "clicker" | "clip" | "clipboard" | "clock" | "cloud" | "cloud_1" | "cloud_computing" | "cloud_computing_1" | "cloudy" | "cocktail" | "code" | "coffee_cup" | "coin_dollar" | "coin_pound" | "coins" | "coinstack" | "collaboration" | "command" | "company" | "compass" | "compose" | "computer_graphics" | "connection" | "contract" | "contract_1" | "contrast" | "control" | "control_game" | "copy" | "costumer" | "coupon" | "crash" | "creative" | "credit_card" | "credit_card1" | "credit_card_2" | "cross" | "cursor" | "dashboard" | "database" | "delete" | "dentistry" | "diary" | "diet" | "digital_campaing" | "digital_key" | "diners_club" | "disc" | "discount" | "dish" | "dish_1" | "dislike" | "divider" | "doctor" | "dog" | "dollar_coin" | "dollar_sign" | "dowload" | "down_arrow" | "download" | "edit" | "edit_file" | "editor" | "education" | "eject" | "emergency" | "employed" | "encrypted_database" | "encrypted_folder" | "encrypted_internet_conection" | "encrypted_mail" | "encryption" | "encypted_terminal" | "enterprice" | "equal" | "erase_file" | "erase_sabe" | "error_database" | "error_search" | "error_terminal" | "euro_sign" | "exit" | "external_link" | "facebook" | "feedback" | "file" | "fill" | "finger_print" | "firewall" | "flag" | "flash" | "flash_auto" | "flash_red_eye" | "flashlight" | "folder_gallery" | "folder" | "football" | "forbidden" | "french_fries" | "funnel" | "gallery" | "game_control" | "games_card_clubs" | "games_card_diamonds" | "games_card_hearts" | "games_card_spades" | "gift" | "girl" | "gmail" | "gold" | "graduated" | "group" | "hamburguer" | "hand" | "hand_note" | "hand_point" | "hand_shake" | "headphones" | "heart" | "heart_1" | "help" | "hide" | "high_five" | "hold" | "home" | "homework" | "hotel" | "hourglass" | "house" | "icon" | "id_card" | "idea" | "infinity" | "info" | "information" | "innovation" | "instagram" | "internet" | "internet_1" | "internet_error" | "key" | "key_1" | "kiss" | "lamp" | "laptop" | "layers" | "layers_1" | "layout" | "left_arrow" | "light_bulb" | "like" | "like_1" | "line_chart" | "link" | "linkeding" | "list" | "local_network" | "location" | "locked" | "magazine" | "magic_wand" | "magnet" | "mail" | "mail_account" | "mail_error" | "map_location" | "maps" | "marker" | "master_data" | "mastercard" | "medicine" | "menu" | "mic" | "microphone" | "microphone_1" | "microscope" | "money_bag" | "money" | "money_1" | "money_report" | "money_report_1" | "monitor" | "more" | "multiple_user" | "multiple_users" | "music_library" | "music_player" | "music_volume_high" | "music_volume_low" | "music_volume_medium" | "music_volume_mute" | "musical_note" | "mute_mic" | "network" | "newspaper" | "note" | "notebook" | "notification" | "old_phone" | "online_pay" | "open_book" | "open_box" | "open_hand" | "p2p" | "pallete" | "paper_plane" | "paper_plane_1" | "passage_of_time" | "pause" | "payment" | "paypal" | "pen_drive" | "perspective" | "pet_paw_print" | "phone_book" | "phone_receiver" | "photo_camera" | "picture" | "pie_chart" | "piggy_bank" | "pinterest" | "piracy" | "pizza" | "placeholder" | "plan" | "plane" | "play_buttom" | "plus" | "police_car" | "power_on_off" | "presentation" | "preview" | "preview_1" | "previous" | "price_tag" | "print_fax" | "project_management" | "project_management_1" | "promotion" | "purse" | "quality" | "radar" | "radioactive" | "rainy" | "rating" | "receipt" | "recluitment" | "recognition" | "record" | "recycle" | "red_eye" | "reload" | "reload_1" | "repair" | "report" | "research" | "responsive" | "restaurant" | "resume" | "reunion" | "right_arrow" | "risk" | "rotate" | "route" | "runner_man" | "sabe" | "sabe_error" | "safety_box_open" | "satellite" | "school" | "scissors" | "screw" | "search" | "send" | "send_file" | "send_file_1" | "send_money" | "send_package" | "server" | "settings" | "settings_1" | "share" | "shield" | "ship" | "shipped" | "shop" | "shopping" | "shopping_bag" | "shopping_car" | "shuffle" | "sign" | "sketch" | "sketch_1" | "skip" | "smartphone" | "snapchat" | "sniffer" | "social_media" | "spam" | "speech_bubble" | "spray" | "star" | "start_up" | "stats_line_chart" | "stethoscope" | "stop" | "stop_watch" | "storage" | "street" | "student" | "study" | "sun_glasses" | "suppport" | "switch" | "tablet" | "tabs" | "tap_gesture" | "target" | "telephone_call" | "television" | "terminal" | "terminal_2" | "think" | "toast" | "toast_1" | "tools" | "traffic_light" | "transfer_data" | "trash" | "treasure_chest" | "trojan" | "twitter" | "two_players" | "university" | "unlock" | "up_arrow" | "upload" | "vector" | "view" | "vintage_phone" | "visa" | "volume_control" | "wallet" | "wallet_1" | "warning" | "warning_briefcase" | "warning_chemistry" | "warning_database" | "warning_dowload" | "warning_folder" | "warning_location" | "warning_mail" | "warning_package" | "warning_search" | "warning_shipped" | "warning_terminal" | "warning_trash" | "web_design" | "web_domain_registration" | "web_search" | "web_search_1" | "website" | "weight" | "whatsapp" | "wheelchair" | "wifi" | "windows" | "wine_cup" | "wordpress" | "worldwide" | "youtube" | "zcash" | "zipped_folder" | "zoom_in" | "zoom_out" | "loading")| undefined | null
				/** Image. The absolute url to any image you want shown in the header. */
				'image'?: string| undefined | null
				/** Image size. How should the header image be rendered */
				'imageSize'?: ("cover" | "contain")| undefined | null
				/** Close handler. Meant for use inside React components directly. */
				'closeHandler'?: (() => Promise<void> | void)| undefined | null
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
			            /** Controller. */
			            'controller': {
			                label: 'Controller',
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader>`,}
			            },
			            /** Subtitle. */
			            'subtitle': {
			                label: 'Subtitle',
			                type: 'text',
			                options: undefined
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

		type CardHeaderEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeaderSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarEvent {
			
				
				'id': string
				
				'target': SpruceSchemas.CalendarUtils.v2021_05_19.CalendarEventTarget
				
				'calendarId': string
				
				'eventTypeSlug'?: string| undefined | null
				
				'startDateTimeMs': number
				
				'isBusy'?: boolean| undefined | null
				
				'isResizeable'?: boolean| undefined | null
				
				'style'?: ("tentative" | "upcoming" | "unavailable" | "blocked" | "active" | "past" | "warn" | "critical" | "draft")| undefined | null
				
				'groupId'?: string| undefined | null
				
				'timeBlocks': SpruceSchemas.CalendarUtils.v2021_05_19.EventTimeBlock[]
				
				'repeats'?: ("weekly" | "monthly" | "daily")| undefined | null
				
				'daysOfWeek'?: ("sun" | "mon" | "tue" | "wed" | "thur" | "fri" | "sat")[]| undefined | null
				
				'repeatsUntil'?: number| undefined | null
				
				'occurrences'?: number| undefined | null
				
				'interval'?: number| undefined | null
				
				'nthOccurrences'?: number[]| undefined | null
				
				'activeUntilDate'?: number| undefined | null
				
				'exclusionDates'?: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDate[]| undefined | null
				
				'controller'?: (HeartwoodTypes.CalendarEventViewController)| undefined | null
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
			                type: 'number',
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
			                options: {choices: [{"value":"tentative","label":"tentative"},{"value":"upcoming","label":"upcoming"},{"value":"unavailable","label":"unavailable"},{"value":"blocked","label":"blocked"},{"value":"active","label":"active"},{"value":"past","label":"past"},{"value":"warn","label":"warn"},{"value":"critical","label":"critical"},{"value":"draft","label":"draft"}],}
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
			            'repeatsUntil': {
			                type: 'number',
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
			                type: 'number',
			                options: undefined
			            },
			            /** . */
			            'exclusionDates': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.CalendarUtils.v2021_05_19.EventExclusionDateSchema,}
			            },
			            /** . */
			            'controller': {
			                type: 'raw',
			                options: {valueType: `HeartwoodTypes.CalendarEventViewController`,}
			            },
			    }
		}

		type CalendarEventEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEventSchema>

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

		type CalendarTimeEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTimeSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface CalendarPerson {
			
				
				'id': string
				
				'casualName': string
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
			    }
		}

		type CalendarPersonEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPersonSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Calendar {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ViewController<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Calendar>)| undefined | null
				/** People. */
				'people'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarPerson[]| undefined | null
				/** Minimum time. The earliest time to show in the calendar. */
				'minTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime| undefined | null
				/** Maximum time. The latest time to show in the calendar. */
				'maxTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime| undefined | null
				/** date. The date the calendar will start on. First of month or first of week. */
				'startDate'?: number| undefined | null
				/** Default start time. Any time before this will be dimmed out. Only applies if people have no schedules. */
				'defaultStartTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime| undefined | null
				/** Default end time. Any time after this will be dimmed out. Only applies if people have no schedules. */
				'defaultEndTime'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarTime| undefined | null
				
				'events': SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent[]
				
				'selectedEvent'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarEvent| undefined | null
				/** Timezone offset. In milliseconds */
				'timezoneOffsetMs'?: number| undefined | null
				/** View. */
				'view'?: ("day" | "month")| undefined | null
				/** Render header. */
				'shouldRenderHeader'?: boolean| undefined | null
				
				'onClick'?: ((options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>)| undefined | null
				
				'onClickEvent'?: ((options: HeartwoodTypes.ClickEventOptions) => void | Promise<void>)| undefined | null
				
				'onDropEvent'?: ((options: HeartwoodTypes.DropEventOptions) => void | boolean | Promise<void | boolean>)| undefined | null
				
				'onDeselectEvent'?: ((options: HeartwoodTypes.CalendarEvent) => void | Promise<void>)| undefined | null
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
			            /** date. The date the calendar will start on. First of month or first of week. */
			            'startDate': {
			                label: 'date',
			                type: 'number',
			                hint: 'The date the calendar will start on. First of month or first of week.',
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
			            /** Timezone offset. In milliseconds */
			            'timezoneOffsetMs': {
			                label: 'Timezone offset',
			                type: 'number',
			                hint: 'In milliseconds',
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
			            'onClick': {
			                type: 'raw',
			                options: {valueType: `(options: HeartwoodTypes.ClickCalendarViewOptions) => void | Promise<void>`,}
			            },
			            /** . */
			            'onClickEvent': {
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
			    }
		}

		type CalendarEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CalendarSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ButtonBarButton {
			
				
				'id'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController)| undefined | null
				/** Selected. */
				'isSelected'?: boolean| undefined | null
				/** Selected. */
				'isEnabled'?: boolean| undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean| undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean| undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any)| undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "destructive")| undefined | null
				/** Image. */
				'image'?: string| undefined | null
				/** Line icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any)| undefined | null
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
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			    }
		}

		type ButtonBarButtonEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarButtonSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface ButtonBar {
			
				/** Controller. */
				'controller'?: (HeartwoodTypes.ButtonBarViewController)| undefined | null
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

		type ButtonBarEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonBarSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Button {
			
				
				'id'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController)| undefined | null
				/** Selected. */
				'isSelected'?: boolean| undefined | null
				/** Selected. */
				'isEnabled'?: boolean| undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean| undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean| undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any)| undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "destructive")| undefined | null
				/** Image. */
				'image'?: string| undefined | null
				/** Line icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
				/** Click handler. */
				'onClick'?: (() => Promise<any> | any)| undefined | null
				/** Dropdown. */
				'dropdown'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Dropdown| undefined | null
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
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `() => Promise<any> | any`,}
			            },
			            /** Dropdown. */
			            'dropdown': {
			                label: 'Dropdown',
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownSchema,}
			            },
			    }
		}

		type ButtonEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.ButtonSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Card {
			
				
				'id'?: string| undefined | null
				
				'className'?: string| undefined | null
				/** Controller. */
				'controller'?: (HeartwoodTypes.CardViewController)| undefined | null
				/** Header. */
				'header'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardHeader| undefined | null
				/** Critical error. */
				'criticalError'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CriticalError| undefined | null
				/** Fade in. */
				'shouldFadeIn'?: boolean| undefined | null
				/** Body. Card bodies are comprised of sections. You will want at least 1 to get started. */
				'body'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardBody| undefined | null
				/** Footer. */
				'footer'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardFooter| undefined | null
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

		type CardEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface DropdownButton {
			
				
				'id'?: string| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				
				'controller'?: (HeartwoodTypes.ButtonController)| undefined | null
				/** Selected. */
				'isSelected'?: boolean| undefined | null
				/** Selected. */
				'isEnabled'?: boolean| undefined | null
				/** Add to fade-in queue.. Fade in effect could change. */
				'shouldQueueShow'?: boolean| undefined | null
				/** Show hint icon. */
				'shouldShowHintIcon'?: boolean| undefined | null
				/** Click handler for hint icon. */
				'onClickHintIcon'?: (() => Promise<any> | any)| undefined | null
				/** Type. */
				'type'?: ("primary" | "secondary" | "destructive")| undefined | null
				/** Image. */
				'image'?: string| undefined | null
				/** Line icon. */
				'lineIcon'?: ("sprucebot" | "add-circle" | "chevron-left" | "document-text" | "link-angle" | "play-circle" | "star" | "add-square" | "chevron-right" | "download-cloud" | "link-flat" | "present" | "sun" | "add" | "chevron-up" | "download" | "loader" | "refresh-circle" | "tag" | "alarm" | "clipboard" | "edit-box" | "location-pin" | "refresh" | "time" | "arrow-back" | "clock" | "edit-line" | "lock" | "repeat" | "tool" | "arrow-down-circle" | "close-circle" | "email" | "map" | "restricted" | "trending-down" | "arrow-down" | "close-square" | "emoji-happy" | "message-circle" | "rotate" | "trending-up" | "arrow-next" | "close" | "emoji-sad" | "message-square" | "search-no" | "triangle" | "arrow-up-circle" | "code" | "external-link" | "mic-off" | "search" | "unlock" | "arrow-up" | "coffee" | "fav-heart" | "mic-on" | "selector-checked" | "upload-cloud" | "attachment" | "command" | "flag" | "minus-circle" | "selector-circle-filled" | "upload" | "award-badge" | "corner-down-left" | "flip-01" | "minus-square" | "selector-circle" | "user-add" | "binoculars" | "corner-down-right" | "flip-02" | "money-sign" | "send" | "user-delete" | "bolt" | "corner-left-down" | "folder" | "more-horizontal" | "settings-filled" | "user" | "book-open" | "corner-left-up" | "globe" | "more-vertical" | "settings" | "users" | "book" | "corner-right-down" | "hash-tag" | "notification-off" | "share" | "video-off" | "bookmark" | "corner-right-up" | "headphones" | "notification-on" | "shopping-bag" | "video" | "calendar-add" | "corner-up-left" | "help-buoy" | "object" | "shopping-cart" | "warning" | "calendar" | "corner-up-right" | "help-circle" | "pause-circle" | "sort-filter-down" | "wifi" | "camera" | "crop" | "home" | "phone-unavailable" | "sort-filter-up" | "zoom-in" | "cellphone" | "delete" | "info" | "phone" | "sound-off" | "zoom-out" | "checkmark" | "document-blank" | "jump" | "photo" | "sound-on" | "chevron-down" | "document-new" | "layers" | "picked" | "star-filled")| undefined | null
				/** Click handler. */
				'onClick'?: ((dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void)| undefined | null
		}

		interface DropdownButtonSchema extends SpruceSchema.Schema {
			id: 'dropdownButton',
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
			            /** Type. */
			            'type': {
			                label: 'Type',
			                type: 'select',
			                defaultValue: "secondary",
			                options: {choices: [{"value":"primary","label":"Primary"},{"value":"secondary","label":"Secondary"},{"value":"destructive","label":"Destructive"}],}
			            },
			            /** Image. */
			            'image': {
			                label: 'Image',
			                type: 'text',
			                options: undefined
			            },
			            /** Line icon. */
			            'lineIcon': {
			                label: 'Line icon',
			                type: 'select',
			                options: {choices: [{"value":"sprucebot","label":"sprucebot"},{"value":"add-circle","label":"add-circle"},{"value":"chevron-left","label":"chevron-left"},{"value":"document-text","label":"document-text"},{"value":"link-angle","label":"link-angle"},{"value":"play-circle","label":"play-circle"},{"value":"star","label":"star"},{"value":"add-square","label":"add-square"},{"value":"chevron-right","label":"chevron-right"},{"value":"download-cloud","label":"download-cloud"},{"value":"link-flat","label":"link-flat"},{"value":"present","label":"present"},{"value":"sun","label":"sun"},{"value":"add","label":"add"},{"value":"chevron-up","label":"chevron-up"},{"value":"download","label":"download"},{"value":"loader","label":"loader"},{"value":"refresh-circle","label":"refresh-circle"},{"value":"tag","label":"tag"},{"value":"alarm","label":"alarm"},{"value":"clipboard","label":"clipboard"},{"value":"edit-box","label":"edit-box"},{"value":"location-pin","label":"location-pin"},{"value":"refresh","label":"refresh"},{"value":"time","label":"time"},{"value":"arrow-back","label":"arrow-back"},{"value":"clock","label":"clock"},{"value":"edit-line","label":"edit-line"},{"value":"lock","label":"lock"},{"value":"repeat","label":"repeat"},{"value":"tool","label":"tool"},{"value":"arrow-down-circle","label":"arrow-down-circle"},{"value":"close-circle","label":"close-circle"},{"value":"email","label":"email"},{"value":"map","label":"map"},{"value":"restricted","label":"restricted"},{"value":"trending-down","label":"trending-down"},{"value":"arrow-down","label":"arrow-down"},{"value":"close-square","label":"close-square"},{"value":"emoji-happy","label":"emoji-happy"},{"value":"message-circle","label":"message-circle"},{"value":"rotate","label":"rotate"},{"value":"trending-up","label":"trending-up"},{"value":"arrow-next","label":"arrow-next"},{"value":"close","label":"close"},{"value":"emoji-sad","label":"emoji-sad"},{"value":"message-square","label":"message-square"},{"value":"search-no","label":"search-no"},{"value":"triangle","label":"triangle"},{"value":"arrow-up-circle","label":"arrow-up-circle"},{"value":"code","label":"code"},{"value":"external-link","label":"external-link"},{"value":"mic-off","label":"mic-off"},{"value":"search","label":"search"},{"value":"unlock","label":"unlock"},{"value":"arrow-up","label":"arrow-up"},{"value":"coffee","label":"coffee"},{"value":"fav-heart","label":"fav-heart"},{"value":"mic-on","label":"mic-on"},{"value":"selector-checked","label":"selector-checked"},{"value":"upload-cloud","label":"upload-cloud"},{"value":"attachment","label":"attachment"},{"value":"command","label":"command"},{"value":"flag","label":"flag"},{"value":"minus-circle","label":"minus-circle"},{"value":"selector-circle-filled","label":"selector-circle-filled"},{"value":"upload","label":"upload"},{"value":"award-badge","label":"award-badge"},{"value":"corner-down-left","label":"corner-down-left"},{"value":"flip-01","label":"flip-01"},{"value":"minus-square","label":"minus-square"},{"value":"selector-circle","label":"selector-circle"},{"value":"user-add","label":"user-add"},{"value":"binoculars","label":"binoculars"},{"value":"corner-down-right","label":"corner-down-right"},{"value":"flip-02","label":"flip-02"},{"value":"money-sign","label":"money-sign"},{"value":"send","label":"send"},{"value":"user-delete","label":"user-delete"},{"value":"bolt","label":"bolt"},{"value":"corner-left-down","label":"corner-left-down"},{"value":"folder","label":"folder"},{"value":"more-horizontal","label":"more-horizontal"},{"value":"settings-filled","label":"settings-filled"},{"value":"user","label":"user"},{"value":"book-open","label":"book-open"},{"value":"corner-left-up","label":"corner-left-up"},{"value":"globe","label":"globe"},{"value":"more-vertical","label":"more-vertical"},{"value":"settings","label":"settings"},{"value":"users","label":"users"},{"value":"book","label":"book"},{"value":"corner-right-down","label":"corner-right-down"},{"value":"hash-tag","label":"hash-tag"},{"value":"notification-off","label":"notification-off"},{"value":"share","label":"share"},{"value":"video-off","label":"video-off"},{"value":"bookmark","label":"bookmark"},{"value":"corner-right-up","label":"corner-right-up"},{"value":"headphones","label":"headphones"},{"value":"notification-on","label":"notification-on"},{"value":"shopping-bag","label":"shopping-bag"},{"value":"video","label":"video"},{"value":"calendar-add","label":"calendar-add"},{"value":"corner-up-left","label":"corner-up-left"},{"value":"help-buoy","label":"help-buoy"},{"value":"object","label":"object"},{"value":"shopping-cart","label":"shopping-cart"},{"value":"warning","label":"warning"},{"value":"calendar","label":"calendar"},{"value":"corner-up-right","label":"corner-up-right"},{"value":"help-circle","label":"help-circle"},{"value":"pause-circle","label":"pause-circle"},{"value":"sort-filter-down","label":"sort-filter-down"},{"value":"wifi","label":"wifi"},{"value":"camera","label":"camera"},{"value":"crop","label":"crop"},{"value":"home","label":"home"},{"value":"phone-unavailable","label":"phone-unavailable"},{"value":"sort-filter-up","label":"sort-filter-up"},{"value":"zoom-in","label":"zoom-in"},{"value":"cellphone","label":"cellphone"},{"value":"delete","label":"delete"},{"value":"info","label":"info"},{"value":"phone","label":"phone"},{"value":"sound-off","label":"sound-off"},{"value":"zoom-out","label":"zoom-out"},{"value":"checkmark","label":"checkmark"},{"value":"document-blank","label":"document-blank"},{"value":"jump","label":"jump"},{"value":"photo","label":"photo"},{"value":"sound-on","label":"sound-on"},{"value":"chevron-down","label":"chevron-down"},{"value":"document-new","label":"document-new"},{"value":"layers","label":"layers"},{"value":"picked","label":"picked"},{"value":"star-filled","label":"star-filled"}],}
			            },
			            /** Click handler. */
			            'onClick': {
			                label: 'Click handler',
			                type: 'raw',
			                options: {valueType: `(dropdown: HeartwoodTypes.DropdownController ) => Promise<void> | void`,}
			            },
			    }
		}

		type DropdownButtonEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownButtonSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface Dropdown {
			
				/** Position. */
				'position'?: ("bottom" | "top" | "right")| undefined | null
				
				'items'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownButton[]| undefined | null
				
				'card'?: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card| undefined | null
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
			                options: {choices: [{"label":"Bottom","value":"bottom"},{"label":"Top","value":"top"},{"label":"Right","value":"right"}],}
			            },
			            /** . */
			            'items': {
			                type: 'schema',
			                isArray: true,
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownButtonSchema,}
			            },
			            /** . */
			            'card': {
			                type: 'schema',
			                options: {schema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.CardSchema,}
			            },
			    }
		}

		type DropdownEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.DropdownSchema>

	}


	namespace SpruceSchemas.HeartwoodViewControllers.v2021_02_11 {

		
		interface AddressInput {
			
				
				'id'?: string| undefined | null
				
				'name': string
				
				'value'?: (any)| undefined | null
				/** Label. */
				'label'?: string| undefined | null
				/** Hint. */
				'hint'?: string| undefined | null
				/** Required. */
				'isRequired'?: boolean| undefined | null
				/** On change handler. */
				'onChange'?: ((value: string) => void | boolean | Promise<void | boolean>)| undefined | null
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
			            /** On change handler. */
			            'onChange': {
			                label: 'On change handler',
			                type: 'raw',
			                options: {valueType: `(value: string) => void | boolean | Promise<void | boolean>`,}
			            },
			    }
		}

		type AddressInputEntity = SchemaEntity<SpruceSchemas.HeartwoodViewControllers.v2021_02_11.AddressInputSchema>

	}

}
