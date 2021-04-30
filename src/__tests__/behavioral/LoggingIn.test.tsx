import { test, assert } from '@sprucelabs/test'
import { mount } from 'enzyme'
import React from 'react'
import { Authenticator } from '../../auth/Authenticator'
import Card from '../../components/cards/Card'
import Form from '../../components/forms/Form'
import AbstractViewControllerTest, {
	DEMO_NUMBER,
} from '../../tests/AbstractViewControllerTest'
import LoginViewController from '../../viewControllers/Login.vc'

export default class LoggingInTest extends AbstractViewControllerTest {
	private static vc: LoginViewController
	protected static controllerMap = {}

	protected static async beforeEach() {
		await super.beforeAll()
		const factory = this.Factory()
		this.vc = factory.Controller('login', {})
	}

	@test()
	protected static async canCreateUsingALoginViewController() {
		assert.isTruthy(this.vc)
	}

	@test()
	protected static async startsWithPhoneEntryWithDisabledNextButton() {
		const loginWrapper = await this.mount()

		const phone = loginWrapper.find(
			'.form__section.present .input[name="phone"]'
		)

		assert.isEqual(phone.length, 1)

		const submitButton = loginWrapper.find('.card__footer .enabled')
		assert.isEqual(submitButton.length, 0)

		const loadingFooter = loginWrapper.find('.card__footer.loading')
		assert.isEqual(loadingFooter.length, 0)
	}

	private static async mount(vc?: LoginViewController) {
		const thisVc = vc ?? this.vc
		const loginWrapper = mount(<Card {...thisVc.render()} />)

		//give wrapper time to async load body
		await this.wait(100)
		loginWrapper.update()

		return loginWrapper
	}

	@test()
	protected static async enteringBadPhoneStaysBlocked() {
		const loginWrapper = await this.mount()
		const phone = loginWrapper.find(
			'.form__section.present .input[name="phone"]'
		)

		assert.isEqual(phone.length, 1)

		phone.simulate('change', { target: { value: '123' } })

		const submitButton = loginWrapper.find('.card__footer .enabled')

		assert.isEqual(submitButton.length, 0)
	}

	@test()
	protected static async enteringGoodPhoneStaysEnablesNextStep() {
		const loginWrapper = await this.mount()
		const phone = loginWrapper.find(
			'.form__section.present .input[name="phone"]'
		)

		assert.isEqual(phone.length, 1)

		phone.simulate('change', { target: { value: DEMO_NUMBER } })

		loginWrapper.update()

		const submitButton = loginWrapper.find('.card__footer .enabled')

		assert.isEqual(submitButton.length, 1)
	}

	@test()
	protected static async handlesBeingDisconnectedWhenSubmittingPhone() {
		const wrapper = await this.mount()
		//@ts-ignore
		const client = await this.vc.connectToApi()
		await client.disconnect()

		this.setPhone(wrapper, DEMO_NUMBER)

		await this.submitForm(wrapper)

		wrapper.update()

		const errorInput = wrapper.find('.has_errors')
		assert.isEqual(errorInput.length, 1)
	}

	private static async submitForm(wrapper: any) {
		const bigFormWrapper = wrapper.find(Form)
		bigFormWrapper.simulate('submit')

		await this.wait(5000)

		wrapper.update()
	}

	@test()
	protected static async submittingPhoneGoesToPinButDoesNotValidatePinField() {
		const loginWrapper = await this.submitPhone()

		const pin = loginWrapper.find('.form__section.present .input[name="code"]')
		assert.isEqual(pin.length, 1)

		const error = loginWrapper.find('.missing_required')
		assert.isEqual(error.length, 0)
	}

	@test()
	protected static async enteringBadPinShowsError() {
		const loginWrapper = await this.submitPhone('555-999-9999')

		const pin = loginWrapper.find('.form__section.present .input[name="code"]')
		pin.simulate('change', { target: { value: 'ABC123' } })

		const submitButton = loginWrapper.find('[type="submit"]')
		assert.isFalse(submitButton.prop('disabled'))

		await this.submitForm(loginWrapper)

		const error = loginWrapper.find('.invalid_value')
		assert.isEqual(error.length, 1)
	}

	@test()
	protected static async enteringGoodPinInvokesSuccessCallback() {
		const factory = this.Factory()
		let wasHit = false
		this.vc = factory.Controller('login', {
			onLogin: ({ person }) => {
				assert.isTruthy(person)
				wasHit = true
			},
		})
		const loginWrapper = await this.submitPhone()
		await this.submitPin(loginWrapper)

		assert.isTrue(wasHit)
	}

	private static async submitPin(loginWrapper: any) {
		const pin = loginWrapper.find('.form__section.present .input[name="code"]')
		pin.simulate('change', { target: { value: DEMO_NUMBER.substr(-4) } })

		const submitButton = loginWrapper.find('[type="submit"]')
		assert.isFalse(submitButton.prop('disabled'))

		await this.submitForm(loginWrapper)

		await this.wait(5000)
	}

	@test()
	protected static async logsInSuccessfully() {
		const factory = this.Factory()
		let p: any

		this.vc = factory.Controller('login', {
			onLogin: ({ person }) => {
				p = person
			},
		})

		const loginWrapper = await this.submitPhone()
		await this.submitPin(loginWrapper)

		assert.isTruthy(p)
		assert.isEqual(p.phone, '+1 ' + DEMO_NUMBER)

		assert.isTruthy(Authenticator.getInstance().getToken())
	}

	private static async submitPhone(phone = DEMO_NUMBER) {
		const loginWrapper = await this.mount()
		const phoneNumber = phone

		this.setPhone(loginWrapper, phoneNumber)

		const bigFormWrapper = loginWrapper.find(Form)
		bigFormWrapper.simulate('submit')

		await this.wait(10)
		bigFormWrapper.update()

		const submitButton = loginWrapper.find('[type="submit"]')
		assert.isTrue(submitButton.prop('disabled'))

		await this.wait(5000)

		bigFormWrapper.update()

		return loginWrapper
	}

	private static setPhone(loginWrapper: any, phoneNumber: string) {
		const phone = loginWrapper.find(
			'.form__section.present .input[name="phone"]'
		)

		phone.simulate('change', { target: { value: phoneNumber } })
	}
}
