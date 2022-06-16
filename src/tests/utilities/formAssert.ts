import { buildSchema } from '@sprucelabs/schema'
import { assert } from '@sprucelabs/test'
import { generateId } from '@sprucelabs/test-utils'
import buildForm from '../../builders/buildForm'
import {
	FormInputViewController,
	FormViewController,
} from '../../types/heartwood.types'
import ViewControllerFactory from '../../viewControllers/ViewControllerFactory'

type SimpleFactory = Pick<ViewControllerFactory, 'Controller'>

const formAssert = {
	views: {} as SimpleFactory,
	_setVcFactory(views: SimpleFactory) {
		this.views = views
	},

	async inputVcIsValid(inputVc: FormInputViewController) {
		assert.isFunction(
			inputVc.getValue,
			`You gotta create a 'getValue()' method on your input! Or consider having your vc extend AbstractFormInputViewContorller and be done! 💪`
		)

		assert.isFunction(
			inputVc.setValue,
			`You gotta create a 'setValue()' method on your input!`
		)

		const formVc = FormVc(this.views, inputVc)
		let value = generateId()

		await formVc.setValue('field', value)

		assert.isEqual(
			inputVc.getValue(),
			value,
			`You need to make sure 'getValue()' returns the 'this.model.value' from your input.`
		)

		assert.isFunction(
			inputVc.getRenderedValue,
			`You need to implement 'getRenderedValue(...)' on your input!`
		)

		assert.isFunction(
			inputVc.setRenderedValue,
			`You need to implement 'setRenderedValue(...)' on your input!`
		)
	},
}

function FormVc(
	views: SimpleFactory,
	inputVc: FormInputViewController
): FormViewController<FormSchema> {
	return views.Controller(
		'form',
		buildForm({
			schema: formSchema,
			sections: [
				{
					fields: [
						{
							name: 'field',
							vc: inputVc,
						},
					],
				},
			],
		})
	)
}

type FormAssert = Pick<typeof formAssert, 'inputVcIsValid'>

export default formAssert as FormAssert

const formSchema = buildSchema({
	id: 'formAssertTest',
	fields: {
		field: {
			type: 'text',
		},
	},
})

type FormSchema = typeof formSchema
