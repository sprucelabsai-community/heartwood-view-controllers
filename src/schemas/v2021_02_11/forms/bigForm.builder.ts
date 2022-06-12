import { buildSchema } from '@sprucelabs/schema'
import {
	buildLocalTypesImport,
	buildRemoteTypesImport,
} from '../../../utilities/importBuilder'
import formSectionBuilder from '../formSection.builder'
import formBuilder from './form.builder'

export default buildSchema({
	id: 'bigForm',
	name: 'Big form',
	importsWhenLocal: buildLocalTypesImport(),
	importsWhenRemote: buildRemoteTypesImport(),
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	fields: {
		...formBuilder.fields,
		sections: {
			...formBuilder.fields.sections,
			options: {
				...formBuilder.fields.sections.options,
				schema: {
					...formSectionBuilder,
					id: 'bigFormSection',
					fields: {
						...formSectionBuilder.fields,
						shouldShowSubmitButton: {
							type: 'boolean',
						},
					},
				},
			},
		},
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.BigFormViewController<S>',
			},
		},
		presentSlide: {
			type: 'number',
			label: 'Present slide',
			hint: 'The slide showing now!',
			defaultValue: 0,
		},
		onSubmitSlide: {
			type: 'raw',
			label: 'Submit handler',
			options: {
				valueType: 'HeartwoodTypes.SubmitSlideHandler<S>',
			},
		},
	},
})
