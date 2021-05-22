import { test, assert } from '@sprucelabs/test'
import { errorAssertUtil } from '@sprucelabs/test-utils'
import Authenticator from '../../auth/Authenticator'
import AbstractViewControllerTest from '../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../tests/constants'
import { MockStorage } from '../../tests/MockStorage'

export default class AuthenticatorTest extends AbstractViewControllerTest {
	protected static controllerMap: Record<string, any> = {}
	private static storage: MockStorage

	private static readonly person = {
		casualName: 'friend',
		id: '1234',
		dateCreated: 123,
	}

	protected static async beforeEach() {
		await super.beforeEach()

		this.storage = new MockStorage()

		Authenticator.reset()
		Authenticator.setStorage(this.storage)
	}

	@test()
	protected static cantGetInstanceWithoutStorageBeingSet() {
		Authenticator.setStorage(null)

		const err = assert.doesThrow(() => Authenticator.getInstance())
		errorAssertUtil.assertError(err, 'MISSING_STORAGE')
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
	protected static async tokenEmptyToStart() {
		assert.isFalsy(this.Auth().getToken())
	}

	@test()
	protected static async canSetToken() {
		const auth = this.Auth()

		auth.setToken('1234abc', this.person)

		const token = auth.getToken()

		assert.isEqual(token, '1234abc')
	}

	@test()
	protected static async setsLocalStorage() {
		const auth = this.Auth()
		auth.setToken('123abc', this.person)

		const token = this.storage.getItem('token')
		assert.isEqual(token, '123abc')
	}

	@test()
	protected static isLoggedInIsFalseToStart() {
		assert.isFalse(this.Auth().isLoggedIn())
	}

	@test()
	protected static isLoggedInIsTrueAfterTokenSet() {
		const auth = this.Auth()
		auth.setToken('abc123', this.person)

		assert.isTrue(auth.isLoggedIn())
	}

	@test()
	protected static canClearToken() {
		const auth = this.Auth()

		auth.setToken('123abc', this.person)

		assert.isTrue(auth.isLoggedIn())

		auth.clearToken()

		assert.isFalse(auth.isLoggedIn())
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

		auth.setToken('123abc', this.person)

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

		auth.setToken('123abc', this.person)
		assert.isFalse(hit)

		auth.clearToken()

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
	protected static async entering4DigitPinTriggersSubmit() {
		const factory = this.Factory()
		const login = factory.Controller('login', {})

		//@ts-ignore
		const form = login.loginForm
		form.setValue('phone', DEMO_NUMBER)

		await form.handleSubmit()

		const slide = form.getPresentSlide()
		assert.isEqual(slide, 1)

		let wasHit = false

		//@ts-ignore
		form.handleSubmit = () => {
			wasHit = true
		}

		form.setValue('code', '11')
		assert.isFalse(wasHit)

		form.setValue('code', '111')
		assert.isFalse(wasHit)

		form.setValue('code', '1111')
		assert.isTrue(wasHit)
	}

	@test()
	protected static async loginVcClearsPinWhenSubmittingPhone() {
		const factory = this.Factory()
		const login = factory.Controller('login', {})

		//@ts-ignore
		const form = login.loginForm

		form.setValue('phone', DEMO_NUMBER)
		form.setValue('code', '0123')

		const { code } = form.getValues()
		assert.isUndefined(code)

		const errors = form.getErrorsByField()
		//@ts-ignore
		assert.isEqualDeep(errors, {})
	}
}
