import { buildSchema } from '@sprucelabs/schema'
import { test, assert, generateId, errorAssert } from '@sprucelabs/test-utils'
import buildForm from '../../../builders/buildForm'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import FormViewController from '../../../viewControllers/form/Form.vc'

export default class RenderingInputsTest extends AbstractViewControllerTest {
	private static vc: FormViewController<FormSchema>

	protected static async beforeEach() {
		await super.beforeEach()

		this.vc = this.Controller(
			'form',
			buildForm({
				schema: formSchema,
				sections: [
					{
						id: 'section1',
						fields: ['firstName', 'lastName'],
					},
					{
						id: 'section2',
						fields: ['phone'],
					},
				],
			})
		)
	}

	@test()
	protected static async throwsWhenSettingRenderForBadField() {
		const err = assert.doesThrow(() => this.setTriggerRender(generateId()))

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['fieldName'],
		})
	}

	@test()
	protected static async setsForValidField() {
		this.setTriggerRender('firstName')
		this.setTriggerRender('lastName')
	}

	@test()
	protected static async throwsWhenGettingRenderForBadField() {
		const err = assert.doesThrow(() => this.getTriggerRender(generateId()))

		errorAssert.assertError(err, 'INVALID_PARAMETERS', {
			parameters: ['fieldName'],
		})
	}

	@test()
	protected static canGetRenderCallbackForInput() {
		this.assertSettingTriggerRenderGetsIt('firstName')
		this.assertSettingTriggerRenderGetsIt('lastName')
		const cb1 = this.getTriggerRender('firstName')
		const cb2 = this.getTriggerRender('lastName')
		assert.isNotEqual(cb1, cb2)
	}

	@test('triggers render for firstName', 'firstName')
	@test('triggers render for lastName', 'lastName')
	protected static async settingValueTriggersRenderOnTheFieldOnly(
		fieldName: any
	) {
		let wasHit = false

		this.setTriggerRender(fieldName, () => {
			wasHit = true
		})
		assert.isFalse(wasHit)

		await this.vc.setValue(fieldName, generateId())

		assert.isTrue(wasHit)
	}

	private static assertSettingTriggerRenderGetsIt(name: string) {
		const cb = () => {}
		this.setTriggerRender(name, cb)
		const actual = this.getTriggerRender(name)
		assert.isEqual(actual, cb)
	}

	private static setTriggerRender(name: string, cb?: () => void) {
		this.vc.setTriggerRenderForInput(name as any, cb ?? (() => {}))
	}

	private static getTriggerRender(name: string) {
		//@ts-ignore
		return this.vc.getTriggerRenderForInput(name as any)
	}
}

const formSchema = buildSchema({
	id: 'renderForm',
	fields: {
		firstName: {
			type: 'text',
		},
		lastName: {
			type: 'text',
		},
		phone: {
			type: 'phone',
		},
	},
})

type FormSchema = typeof formSchema
