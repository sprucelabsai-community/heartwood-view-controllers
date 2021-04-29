import { SchemaRegistry } from '@sprucelabs/schema'
import { SpruceSchemas } from '../../schemas.types'

import formSectionSchema from '#spruce/schemas/heartwood/v2021_02_11/formSection.schema'

const bigFormSchema: SpruceSchemas.Heartwood.v2021_02_11.BigFormSchema  = {
	id: 'bigForm',
	version: 'v2021_02_11',
	namespace: 'Heartwood',
	name: 'Big form',
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
	            /** Busy. */
	            'isBusy': {
	                label: 'Busy',
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
	                options: {typeSuffix: `<S>`,schema: formSectionSchema,}
	            },
	            /** Current slide. */
	            'currentSlide': {
	                label: 'Current slide',
	                type: 'number',
	                defaultValue: 0,
	                options: undefined
	            },
	            /** Submit handler. */
	            'onSubmitSlide': {
	                label: 'Submit handler',
	                type: 'raw',
	                options: {valueType: `HeartwoodTypes.SubmitHandler<S, { currentSlide: number }>`,}
	            },
	    }
}

SchemaRegistry.getInstance().trackSchema(bigFormSchema)

export default bigFormSchema
