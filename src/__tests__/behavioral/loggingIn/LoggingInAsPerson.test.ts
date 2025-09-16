import { Person } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import Authenticator from '../../../auth/Authenticator'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../../tests/constants'
import SpyDevice from '../../../tests/SpyDevice'
import StubStorage from '../../../tests/StubStorage'
import buttonAssert from '../../../tests/utilities/buttonAssert'
import LoginCardViewController, {
    LoginCardViewControllerOptions,
} from '../../../viewControllers/LoginCard.vc'

@suite()
export default class AuthenticatorTest extends AbstractViewControllerTest {
    protected controllerMap: Record<string, any> = {}
    private storage!: StubStorage
    private loginVc!: SpyLogin

    private readonly person = {
        casualName: 'friend',
        id: '1234',
        dateCreated: 123,
    }

    protected async beforeEach() {
        await super.beforeEach()

        this.storage = new StubStorage()

        Authenticator.reset()
        Authenticator.setStorage(this.storage)

        await this.eventFaker.fakeRequestPin()
        await this.eventFaker.fakeConfirmPin()

        this.loginVc = this.LoginVc()
    }

    @test()
    protected cantGetInstanceWithoutStorageBeingSet() {
        Authenticator.setStorage(null)

        const err = assert.doesThrow(() => Authenticator.getInstance())
        errorAssert.assertError(err, 'MISSING_STORAGE')
    }

    @test()
    protected async canGetAuthenticatorInstance() {
        const authenticator = Authenticator.getInstance()
        assert.isTruthy(authenticator)
    }

    @test()
    protected async authenticatorInstanceTheSameOne() {
        const auth = this.auth
        //@ts-ignore
        auth.__patched = true
        const auth2 = Authenticator.getInstance()
        //@ts-ignore
        assert.isTrue(auth2.__patched)
    }

    @test()
    protected async tokenAndPersonEmptyToStart() {
        assert.isFalsy(this.auth.getSessionToken())
        assert.isFalsy(this.auth.getPerson())
    }

    @test()
    protected async canSetToken() {
        this.auth.setSessionToken('1234abc', this.person)

        const token = this.auth.getSessionToken()

        assert.isEqual(token, '1234abc')
        assert.isEqualDeep(this.person, this.auth.getPerson())
    }

    @test()
    protected async setsLocalStorage() {
        const auth = this.auth
        auth.setSessionToken('123abc', this.person)

        const token = this.storage.getItem('sessionToken')
        assert.isEqual(token, '123abc')
    }

    @test()
    protected isLoggedInIsFalseToStart() {
        assert.isFalse(this.auth.isLoggedIn())
    }

    @test()
    protected isLoggedInIsTrueAfterTokenSet() {
        const auth = this.auth
        auth.setSessionToken('abc123', this.person)

        assert.isTrue(auth.isLoggedIn())
    }

    @test()
    protected async canClearToken() {
        const auth = this.auth

        auth.setSessionToken('123abc', this.person)

        assert.isTrue(auth.isLoggedIn())

        await auth.clearSession()

        assert.isFalse(auth.isLoggedIn())
        assert.isFalsy(auth.getPerson())
    }

    @test()
    protected async emitsOnLoginWhenSettingToken() {
        const auth = this.auth

        let hit = false
        let t
        let p

        await auth.addEventListener('did-login', ({ token, person }) => {
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
    protected async emitsOnLogOut() {
        const auth = this.auth
        let passedPerson: Person | undefined

        await auth.addEventListener('did-logout', ({ person }) => {
            passedPerson = person
        })

        auth.setSessionToken('123abc', this.person)
        assert.isFalsy(passedPerson)

        await auth.clearSession()

        assert.isEqualDeep(passedPerson, this.person)
    }

    @test()
    protected async emitsWillLogoutBeforeActuallyClearingSession() {
        const auth = this.auth
        const token = generateId()

        auth.setSessionToken(token, this.person)

        let passedPerson: Person | undefined

        await auth.addEventListener('will-logout', ({ person }) => {
            passedPerson = person
            assert.isEqual(
                auth.getSessionToken(),
                token,
                `Token should still be set`
            )
        })

        await auth.clearSession()
        assert.isEqualDeep(passedPerson, this.person)
    }

    @test()
    protected async passesThroughViewId() {
        const id = generateId()
        const vc = this.LoginVc({ id })
        assert.isEqual(this.render(vc).id, id)
    }

    @test()
    protected async canPassThroughSmsDisclaimer() {
        const smsDisclaimer = generateId()
        const vc = this.LoginVc({
            smsDisclaimer,
        })

        const formVc = vc.getBigForm()
        const model = this.render(formVc)
        //@ts-ignore
        assert.isEqual(model.sections[0]?.fields?.[0]?.hint, smsDisclaimer)
    }

    @test()
    protected async passingNullSmsDisclaimerLeavesOriginal() {
        const vc = this.LoginVc({
            smsDisclaimer: null,
        })

        const formVc = vc.getBigForm()
        const model = this.render(formVc)
        assert.isEqual(
            //@ts-ignore
            model.sections[0]?.fields?.[0]?.hint,
            "I'm gonna send you a pin. By entering your number, you agree to receive mobile messages at the phone number provided. Messages frequency varies. Message and data rates may apply."
        )
    }

    @test()
    protected async entering4DigitPinTriggersSubmit() {
        const login = this.LoginVc()

        //@ts-ignore
        const form = login.bigFormVc
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
    protected async loginVcClearsPinWhenSubmittingPhone() {
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
    protected async loginShowsAsBusyWhileSubmitting() {
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
    protected async anErrorReturnsFalseOnSubmit() {
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

    @test()
    protected async doesNotEmitLogoutEventsIfClearingSessionAndNotLoggedIn() {
        let wasHit = false
        await this.auth.addEventListener('will-logout', () => {
            wasHit = true
        })
        await this.auth.clearSession()
        assert.isFalse(wasHit, 'Should not emit logout events if not logged in')
    }

    @test()
    protected async sendsAttemptingLoginCommandToDevice() {
        const login = this.LoginVc()
        const device = login.getDevice() as SpyDevice
        assert.isEqual(device.lastCommand, 'attemptingLogin')
    }

    @test()
    protected async rendersLoginWithEmailButton() {
        buttonAssert.cardRendersButton(this.loginVc, 'login-with-email')
    }

    private get auth() {
        return Authenticator.getInstance()
    }

    private LoginVc(options?: LoginCardViewControllerOptions) {
        const factory = this.Factory()
        factory.setController('login-card', SpyLogin)
        const login = factory.Controller('login-card', { ...options })
        return login as SpyLogin
    }
}

class SpyLogin extends LoginCardViewController {
    public getDevice() {
        return this.device
    }

    public getBigForm() {
        return this.bigFormVc
    }
}
