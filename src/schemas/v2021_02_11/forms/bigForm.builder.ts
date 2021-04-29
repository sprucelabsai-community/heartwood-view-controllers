import { buildSchema } from '@sprucelabs/schema'
import { buildLocalFormImports } from '../../../utilities/buildLocalFormImports'
import formBuilder from './form.builder'

export default buildSchema({
	id: 'bigForm',
	name: 'Big form',
	importsWhenLocal: buildLocalFormImports(),
	typeSuffix: '<S extends SpruceSchema.Schema = SpruceSchema.Schema>',
	fields: {
		...formBuilder.fields,
		controller: {
			type: 'raw',
			label: 'Controller',
			options: {
				valueType: 'HeartwoodTypes.BigFormViewController<S>',
			},
		},
		currentSlide: {
			type: 'number',
			label: 'Current slide',
			defaultValue: 0,
		},
		onSubmitSlide: {
			type: 'raw',
			label: 'Submit handler',
			options: {
				valueType: 'HeartwoodTypes.SubmitHandler<S, { currentSlide: number }>',
			},
		},
	},
})
