import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import bigFormSectionSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/bigFormSection.schema'
import cardFooterSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/cardFooter.schema'
import sprucebotAvatarSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/sprucebotAvatar.schema'
import talkingSprucebotSchema_v2021_02_11 from '#spruce/schemas/heartwoodViewControllers/v2021_02_11/talkingSprucebot.schema'

const bigFormSchema: SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSchema  = {
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
	                options: {typeSuffix: `<S>`,schema: bigFormSectionSchema_v2021_02_11,}
	            },
	            /** Footer. */
	            'footer': {
	                label: 'Footer',
	                type: 'schema',
	                options: {schema: cardFooterSchema_v2021_02_11,}
	            },
	            /** . */
	            'sprucebotAvatar': {
	                type: 'schema',
	                options: {schema: sprucebotAvatarSchema_v2021_02_11,}
	            },
	            /** . */
	            'shouldRenderFirstFieldsLabel': {
	                type: 'boolean',
	                options: undefined
	            },
	            /** . */
	            'talkingSprucebot': {
	                type: 'schema',
	                options: {schema: talkingSprucebotSchema_v2021_02_11,}
	            },
	            /** . Where should the status render? By default it is at the top of each slide. */
	            'labelRenderPosition': {
	                type: 'select',
	                hint: 'Where should the status render? By default it is at the top of each slide.',
	                defaultValue: "topOfSlide",
	                options: {choices: [{"value":"topOfSlide","label":"Top of slide"},{"value":"headerAltTitle","label":"Header alternative title"}],}
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

SchemaRegistry.getInstance().trackSchema(bigFormSchema)

export default bigFormSchema
