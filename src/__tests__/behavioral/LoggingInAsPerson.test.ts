import { test, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import Authenticator from '../../auth/Authenticator'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../tests/constants'
import StubStorage from '../../tests/StubStorage'

export default class AuthenticatorTest extends AbstractViewControllerTest {
	protected static controllerMap: Record<string, any> = {}
	private static storage: StubStorage

	private static readonly person = {
		casualName: 'friend',
		id: '1234',
		dateCreated: 123,
	}

	protected static async beforeEach() {
		await super.beforeEach()

		this.storage = new StubStorage()

		Authenticator.reset()
		Authenticator.setStorage(this.storage)

		await this.eventFaker.fakeRequestPin()
		await this.eventFaker.fakeConfirmPin()
	}

	@test()
	protected static cantGetInstanceWithoutStorageBeingSet() {
		Authenticator.setStorage(null)

		const err = assert.doesThrow(() => Authenticator.getInstance())
		errorAssert.assertError(err, 'MISSING_STORAGE')
	}

	@test()
	protected static async canGetAuthenticatorInstance() {
		const authenticator = Authenticator.getInstance()
		assert.isTruthy(authenticator)
	}

	@test()
	protected static async authenticatorInstanceTheSameOne() {
		const auth = this.Auth()
		//@ts-ignore
		auth.__patched = true
		const auth2 = Authenticator.getInstance()
		//@ts-ignore
		assert.isTrue(auth2.__patched)
	}

	private static Auth() {
		return Authenticator.getInstance()
	}

	@test()
	protected static async tokenAndPersonEmptyToStart() {
		assert.isFalsy(this.Auth().getSessionToken())
		assert.isFalsy(this.Auth().getPerson())
	}

	@test()
	protected static async canSetToken() {
		const auth = this.Auth()

		auth.setSessionToken('1234abc', this.person)

		const token = auth.getSessionToken()

		assert.isEqual(token, '1234abc')
		assert.isEqualDeep(this.person, auth.getPerson())
	}

	@test()
	protected static async setsLocalStorage() {
		const auth = this.Auth()
		auth.setSessionToken('123abc', this.person)

		const token = this.storage.getItem('sessionToken')
		assert.isEqual(token, '123abc')
	}

	@test()
	protected static isLoggedInIsFalseToStart() {
		assert.isFalse(this.Auth().isLoggedIn())
	}

	@test()
	protected static isLoggedInIsTrueAfterTokenSet() {
		const auth = this.Auth()
		auth.setSessionToken('abc123', this.person)

		assert.isTrue(auth.isLoggedIn())
	}

	@test()
	protected static canClearToken() {
		const auth = this.Auth()

		auth.setSessionToken('123abc', this.person)

		assert.isTrue(auth.isLoggedIn())

		auth.clearSession()

		assert.isFalse(auth.isLoggedIn())
		assert.isFalsy(auth.getPerson())
	}

	@test()
	protected static emitsOnLoginWhenSettingToken() {
		const auth = this.Auth()

		let hit = false
		let t
		let p

		auth.addEventListener('did-login', ({ token, person }) => {
			hit = true
			t = token
			p = person
		})

		auth.setSessionToken('123abc', this.person)

		assert.isTrue(hit)
		assert.isEqual(t, '123abc')
		assert.isEqualDeep(p, this.person)
	}

	@test()
	protected static emitsOnLogOut() {
		const auth = this.Auth()
		let hit = false
		let p

		auth.addEventListener('did-logout', ({ person }) => {
			hit = true
			p = person
		})

		auth.setSessionToken('123abc', this.person)
		assert.isFalse(hit)

		auth.clearSession()

		assert.isTrue(hit)

		assert.isEqualDeep(p, this.person)
	}

	@test()
	protected static canBuildLoginVc() {
		const factory = this.Factory()
		const login = factory.Controller('login', {})
		assert.isTruthy(login)
	}

	@test()
	protected static async passesTHroughId() {
		const id = generateId()
		const vc = this.Factory().Controller('login', { id })
		assert.isEqual(this.render(vc).id, id)
	}

	@test()
	protected static async entering4DigitPinTriggersSubmit() {
		const factory = this.Factory()
		const login = factory.Controller('login', {})

		//@ts-ignore
		const form = login.loginForm
		await form.setValue('phone', DEMO_NUMBER)

		await form.submit()

		const slide = form.getPresentSlide()
		assert.isEqual(slide, 1)

		let wasHit = false

		//@ts-ignore
		form.submit = () => {
			wasHit = true
		}

		await form.setValue('code', '11')
		assert.isFalse(wasHit)

		await form.setValue('code', '111')
		assert.isFalse(wasHit)

		await form.setValue('code', '1111')
		assert.isTrue(wasHit)
	}

	@test()
	protected static async loginVcClearsPinWhenSubmittingPhone() {
		const login = this.LoginVc()

		const form = login.getLoginForm()

		await form.setValue('phone', DEMO_NUMBER)
		await form.setValue('code', '0123')

		const { code } = form.getValues()
		assert.isUndefined(code)

		const errors = form.getErrorsByField()

		//@ts-ignore
		assert.isEqualDeep(errors, {})
	}

	@test()
	protected static async loginShowsAsBusyWhileSubmitting() {
		const loginVc = this.LoginVc()

		//@ts-ignore
		loginVc.handleSubmitPin = async () => {
			await new Promise((resolve) => setTimeout(resolve, 10))
		}

		const formVc = loginVc.getLoginForm()

		await formVc.setValue('phone', DEMO_NUMBER)

		let promise = formVc.submit()

		assert.isTrue(loginVc.getIsBusy())

		await promise

		assert.isFalse(loginVc.getIsBusy())

		promise = formVc.setValue('code', '1111')

		await this.wait(1)

		assert.isTrue(loginVc.getIsBusy())

		await promise

		assert.isFalse(loginVc.getIsBusy())
	}

	@test()
	protected static async anErrorReturnsFalseOnSubmit() {
		await this.client.on('request-pin::v2020_12_25', (() =>
			assert.fail('throw')) as any)

		const vc = this.LoginVc()
		const formVc = vc.getLoginForm()

		let wasHit = false
		formVc.goForward = async () => {
			wasHit = true
		}
		await formVc.setValue('phone', DEMO_NUMBER)
		await formVc.submit()

		assert.isFalse(wasHit)
	}

	private static LoginVc() {
		const factory = this.Factory()
		const login = factory.Controller('login-card', {})
		return login
	}
}
