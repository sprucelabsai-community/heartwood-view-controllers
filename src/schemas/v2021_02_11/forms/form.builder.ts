import { buildSchema } from '@sprucelabs/schema'
import { defaultSubmitButtonLabel } from '../../../constants'
import {
	buildLocalTypesImport,
	buildRemoteTypesImport,
} from '../../../utilities/importBuilder'
import cardFooterBuilder from '../cards/cardFooter.builder'
import formSectionBuilder from '../formSection.builder'

export default buildSchema({
	id: 'form',
	name: 'Form',
	importsWhenLocal: buildLocalTypesImport(),
	importsWhenRemote: buildRemoteTypesImport(),
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	fields: {
		id: {
			type: 'text',
			isRequired: true,
		},
		className: {
			type: 'text',
			isPrivate: true,
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.FormViewController<S>',
			},
		},
		schema: {
			type: 'raw',
			isRequired: true,
			options: {
				valueType: 'S',
			},
		},
		onSubmit: {
			type: 'raw',
			label: 'Submit handler',
			options: {
				valueType: 'HeartwoodTypes.SubmitHandler<S>',
			},
		},
		onCancel: {
			type: 'raw',
			label: 'Cancel handler',
			options: {
				valueType: '() => void | Promise<void>',
			},
		},
		onChange: {
			type: 'raw',
			label: 'Change handler',
			options: {
				valueType:
					'(options: HeartwoodTypes.FormOnChangeOptions<S>) => Promise<void> | void',
			},
		},
		values: {
			type: 'raw',
			label: 'Values',
			hint: 'The values you want the form to have. Control is given to the FormViewController after render.',
			options: {
				valueType: 'SpruceSchema.SchemaPartialValues<S>',
			},
		},
		errorsByField: {
			type: 'raw',
			label: 'Errors by field',
			options: {
				valueType: 'HeartwoodTypes.FormErrorsByField<S>',
			},
		},
		shouldShowSubmitControls: {
			type: 'boolean',
			label: 'Show submit controls',
			defaultValue: true,
		},
		shouldShowCancelButton: {
			type: 'boolean',
			label: 'Show cancel button',
			defaultValue: true,
		},
		submitButtonLabel: {
			type: 'text',
			label: 'Submit button label',
			defaultValue: defaultSubmitButtonLabel,
		},
		isBusy: {
			type: 'boolean',
			label: 'Busy',
		},
		setValue: {
			type: 'raw',
			label: 'Set value handler',
			isPrivate: true,
			isRequired: true,
			options: {
				valueType:
					'(name: SpruceSchema.SchemaFieldNames<S>, value: any) => void',
			},
		},
		sections: {
			type: 'schema',
			label: 'Form sections',
			isRequired: true,
			isArray: true,
			options: {
				typeSuffix: '<S>',
				schema: formSectionBuilder,
			},
		},
		footer: {
			type: 'schema',
			label: 'Footer',
			options: {
				schema: cardFooterBuilder,
			},
		},
	},
})
