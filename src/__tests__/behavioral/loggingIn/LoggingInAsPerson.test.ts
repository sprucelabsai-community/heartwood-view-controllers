import { Person } from '@sprucelabs/spruce-core-schemas'
import { test, suite, assert, generateId } from '@sprucelabs/test-utils'
import { errorAssert } from '@sprucelabs/test-utils'
import Authenticator from '../../../auth/Authenticator'
import AuthenticatorImpl from '../../../auth/Authenticator'
import AbstractViewControllerTest from '../../../tests/AbstractViewControllerTest'
import { DEMO_NUMBER } from '../../../tests/constants'
import SpyDevice from '../../../tests/SpyDevice'
import StubStorage from '../../../tests/StubStorage'
import buttonAssert from '../../../tests/utilities/buttonAssert'
import formAssert from '../../../tests/utilities/formAssert'
import interactor from '../../../tests/utilities/interactor'
import LoginCardViewController, {
    LoginCardViewControllerOptions,
} from '../../../viewControllers/LoginCard.vc'
import { RequestPinTargetAndPayload } from '../../support/EventFaker'

@suite()
export default class AuthenticatorTest extends AbstractViewControllerTest {
    protected controllerMap: Record<string, any> = {}
    private storage!: StubStorage
    private loginVc!: SpyLogin
    private smsDisclaimer = generateId()
    private shouldAllowEmailLogin = true

    private loginCardTitles = [
        'Get started',
        `Time to log in!`,
        `Let's do this! 💪`,
    ]

    private loginCardSubtitles = [
        'Login or signup below!',
        "I'll send you a pin and you're in!",
        "I'm so excited!",
    ]

    private pinCardTitles = [
        'Almost there!',
        'Enter your pin below!',
        'Last step!',
    ]

    private pinCardSubtitles = [
        'Last step!',
        `So close I can taste it!`,
        `You got this!`,
    ]

    private phoneSlideTitles = [
        'What is your cell?',
        'Gimme a number to text.',
        'What is your number 👇',
    ]

    private pinSlideTitles = [
        'Now the pin! 👇',
        'The pin is next!',
        'Time for pin.',
    ]

    private emailSlideTitles = [
        'What is your email?',
        'Gimme an email to send to.',
        'What is your email 👇',
    ]

    private readonly person = {
        casualName: 'friend',
        id: '1234',
        dateCreated: 123,
    }
    private lastRequestPinPayload?: RequestPinTargetAndPayload['payload']
    private shouldAllowPhoneLogin?: boolean

    protected async beforeEach() {
        await super.beforeEach()

        this.storage = new StubStorage()

        Authenticator.reset()
        Authenticator.setStorage(this.storage)

        await this.eventFaker.fakeRequestPin(({ payload }) => {
            this.lastRequestPinPayload = payload
        })
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
    protected async knowsIfStorageIsSet() {
        AuthenticatorImpl.setStorage(null)
        assert.isFalse(
            AuthenticatorImpl.hasStorage(),
            'Expected not to have storage'
        )

        AuthenticatorImpl.setStorage(this.storage)
        assert.isTrue(
            AuthenticatorImpl.hasStorage(),
            'Expected to have storage'
        )
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
        this.setupWithDisclaimer()
        this.assertRendersDisclaimer()
    }

    @test()
    protected async rendersDisclaimerWhenGoingToEmailAndBack() {
        this.setupWithDisclaimer()
        await this.clickLoginWithEmail()
        await this.clickLoginWithPhone()
        this.assertRendersDisclaimer()
    }

    @test()
    protected async passingNullSmsDisclaimerLeavesOriginal() {
        this.loginVc = this.LoginVc({
            smsDisclaimer: null,
        })

        this.assertRendersDefaultPhoneHint()
    }

    @test()
    protected async entering4DigitPinTriggersSubmit() {
        const login = this.LoginVc()

        //@ts-ignore
        const form = login.bigFormVc
        await form.setValue('phone', DEMO_NUMBER)

        await form.submit()

        const slide = form.getPresentSlide()
        assert.isEqual(slide, 1, 'Did not move to pin slide')

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

    @test()
    protected async cardTitlesRendersOneOfExpectedForPhoneSlide() {
        this.assertRendersLoginTitles()
    }

    @test()
    protected async pinSlideRendersPinTitles() {
        await this.enterPhoneAndSubmit()
        this.assertRendersPinTitles()
    }

    @test()
    protected async goingBackAfterEnteringPhoneRendersPhoneTitle() {
        this.renderCardTitle()
        await this.enterPhoneAndSubmit()
        await this.clickBack()
        this.assertRendersLoginTitles()
    }

    @test()
    protected async rendersExpectedSlideTitles() {
        const model = this.render(this.bigFormVc)

        this.assertRendersPhoneSlideTitle()

        assert.doesInclude(
            this.pinSlideTitles,
            model.sections[1].title,
            'Pin slide title not one of expected'
        )
    }

    @test()
    protected async clickingLoginWithEmailRendersEmailField() {
        await this.clickLoginWithEmail()
        this.assertRendersEmailField()
    }

    @test()
    protected async doesNotRenderEmailButtonIfOptionIsNotSet() {
        this.shouldAllowEmailLogin = false
        this.loginVc = this.LoginVc()
        this.assertDoesNotRenderButton('login-with-email')
    }

    @test()
    protected async clickingLoginWithEmailSetsExpectedSectionTitle() {
        await this.clickLoginWithEmail()
        this.assertRendersEmailSlideTitles()
    }

    @test()
    protected async clickingLoginWithEmailRendersLoginWithPhoneButton() {
        await this.clickLoginWithEmail()
        this.assertRendersButton('login-with-phone')
        this.assertDoesNotRenderButton('login-with-email')
    }

    @test()
    protected async clickingEmailThenPhoneRendersEmailButton() {
        await this.clickLoginWithEmail()
        await this.clickLoginWithPhone()
        this.assertRendersLoginWithEmail()
        this.assertDoesNotRenderButton('login-with-phone')
        await this.clickLoginWithEmail()
        this.assertRendersButton('login-with-phone')
    }

    @test()
    protected async clickingBackToPhoneRendersPhoneField() {
        await this.clickLoginWithEmail()
        await this.clickLoginWithPhone()
        this.assertRendersPhoneField()
        this.assertRendersPhoneSlideTitle()
    }

    @test('can request pin with email test@test.com', 'test@test.com')
    @test('can request pin with email test2@test.com', 'test2@ing.com')
    protected async submittingEmailSendsEmailToRequestPin(email: string) {
        await this.clickLoginWithEmail()
        await this.fillOutEmail(email)
        await this.submit()
        assert.isEqualDeep(this.lastRequestPinPayload, {
            email,
            phone: undefined,
        })
    }

    @test()
    protected async doesNotRequestPinIfSubmittingPin() {
        await this.clickLoginWithEmail()
        await this.fillOutEmail('taco@bell.com')
        await this.submit()
        delete this.lastRequestPinPayload
        await this.bigFormVc.setValue('code', '1111')
        assert.isFalsy(
            this.lastRequestPinPayload,
            'Should not have requested pin again'
        )
    }

    @test()
    protected async disablingPhoneLoginWithoutEnablingEmailThrows() {
        this.shouldAllowEmailLogin = false
        this.shouldAllowPhoneLogin = false
        const err = assert.doesThrow(() => this.LoginVc({}))
        errorAssert.assertError(err, 'INVALID_LOGIN_CONFIGURATION')
    }

    @test()
    protected async disablingPhoneLoginWorksAndDoesNotRenderLoginWithEmailButton() {
        this.setupWithEmailOnlyLogin()
        this.assertDoesNotRenderButton('login-with-email')
    }

    @test()
    protected async loginWithEmailOnlyRendersEmailFieldRightAway() {
        this.setupWithEmailOnlyLogin()
        this.assertDoesNotRenderPhone()
        this.assertRendersEmailSlideTitles()
    }

    @test()
    protected async enteringPhoneHidesLoginWithEmailButton() {
        this.assertRendersLoginWithEmail()
        await this.fillOutPhoneAndSubmit()
        this.assertDoesNotRenderButton('login-with-email')
    }

    @test()
    protected async dropsBackInEmailButtonWhenGoingBackToPhoneSlide() {
        await this.fillOutPhoneAndSubmit()
        await this.clickBack()
        this.assertRendersLoginWithEmail()
    }

    @test()
    protected async rendersCheckboxForSmsOptInWhenOptionIsSet() {
        this.setupWithSmsCheckbox()
        this.assertRendersPhoneField()
        formAssert.formRendersField(this.bigFormVc, 'smsOptIn')
    }

    @test()
    protected async formIsDisabledUntilSmsOptInChecked() {
        this.setupWithSmsCheckbox()

        await this.fillOutPhone()

        this.assertFirstSlideNotValid()

        await this.setSmsOptIn(true)

        this.assertFirstSlideValid()

        await this.setSmsOptIn(false)

        this.assertFirstSlideNotValid()
    }

    @test()
    protected async smsDisclaimRendersUnderSmsOptInCheckbox() {
        this.loginVc = this.LoginVc({
            shouldRequireCheckboxForSmsOptIn: true,
            smsDisclaimer: this.smsDisclaimer,
        })

        this.assertHintForFieldEquals(0, null)
        this.assertHintForFieldEquals(1, this.smsDisclaimer)
    }

    private assertFirstSlideValid() {
        assert.isTrue(
            this.isFirstSlideValid,
            'Form should be valid when checkbox is checked'
        )
    }

    private assertFirstSlideNotValid() {
        assert.isFalse(
            this.isFirstSlideValid,
            'Form should be invalid when checkbox not checked'
        )
    }

    private async setSmsOptIn(value: boolean) {
        await this.formVc.setValue('smsOptIn', value)
    }

    private get isFirstSlideValid() {
        return this.bigFormVc.isSlideValid(0)
    }

    private setupWithSmsCheckbox() {
        this.loginVc = this.LoginVc({
            shouldRequireCheckboxForSmsOptIn: true,
        })
    }

    private assertRendersLoginWithEmail() {
        this.assertRendersButton('login-with-email')
    }

    private async fillOutPhoneAndSubmit() {
        await this.fillOutPhone()
        await this.submit()
    }

    private assertRendersEmailSlideTitles() {
        const model = this.render(this.bigFormVc)
        assert.doesInclude(
            this.emailSlideTitles,
            model.sections[0].title,
            'Email slide title not one of expected'
        )
    }

    private assertDoesNotRenderPhone() {
        formAssert.formDoesNotRenderField(this.bigFormVc, 'phone')
    }

    private setupWithEmailOnlyLogin() {
        this.shouldAllowPhoneLogin = false
        this.shouldAllowEmailLogin = true
        this.loginVc = this.LoginVc()
    }

    private async fillOutEmail(email: string) {
        await this.formVc.setValue('email', email)
    }

    private assertRendersDefaultPhoneHint() {
        this.assertHintForFieldEquals(
            0,
            "I'm gonna send you a pin. By entering your number, you agree to receive mobile messages at the phone number provided. Messages frequency varies. Message and data rates may apply.",
            false
        )
    }

    private assertRendersPhoneField() {
        formAssert.formRendersField(this.bigFormVc, 'phone')
    }

    private assertRendersDisclaimer() {
        const fieldIdx = 0
        const expected = this.smsDisclaimer
        this.assertHintForFieldEquals(fieldIdx, expected)
    }

    private assertHintForFieldEquals(
        fieldIdx: number,
        expected: string | null,
        shouldBeMarkdown = true
    ) {
        const model = this.render(this.bigFormVc)

        //@ts-ignore
        let hint = model.sections[0]?.fields?.[fieldIdx]?.hint

        if (hint && typeof hint === 'object' && shouldBeMarkdown) {
            hint = hint.markdown
        }

        assert.isEqual(
            hint,
            expected,
            `Disclaimer not rendered correctly for field index ${fieldIdx}`
        )
    }

    private setupWithDisclaimer() {
        this.loginVc = this.LoginVc({
            smsDisclaimer: this.smsDisclaimer,
        })
    }

    private assertRendersPhoneSlideTitle() {
        assert.doesInclude(
            this.phoneSlideTitles,
            this.render(this.bigFormVc).sections[0].title,
            'Phone slide title not one of expected'
        )
    }

    private async clickLoginWithPhone() {
        await this.clickButton('login-with-phone')
    }

    private assertRendersButton(button: string) {
        buttonAssert.cardRendersButton(this.loginVc, button)
    }

    private assertDoesNotRenderButton(button: string) {
        buttonAssert.cardDoesNotRenderButton(this.loginVc, button)
    }

    private async clickLoginWithEmail() {
        await this.clickButton('login-with-email')
    }

    private async clickButton(button: string) {
        await interactor.clickButton(this.loginVc, button)
    }

    private assertRendersPinTitles() {
        const title = this.renderCardTitle()
        assert.doesInclude(
            this.pinCardTitles,
            title,
            `Pin titles should be one of: ${this.pinCardTitles.join(', ')}`
        )

        const subtitle = this.renderCardSubtitle()
        assert.doesInclude(
            this.pinCardSubtitles,
            subtitle,
            `Pin Subtitle should be one of: ${this.pinCardSubtitles.join(', ')}`
        )
    }

    private assertRendersLoginTitles() {
        const title = this.renderCardTitle()
        assert.doesInclude(
            this.loginCardTitles,
            title,
            `Login Title should be one of: ${this.loginCardTitles.join(', ')}`
        )

        const subtitle = this.renderCardSubtitle()
        assert.doesInclude(
            this.loginCardSubtitles,
            subtitle,
            `Login Subtitle should be one of: ${this.loginCardSubtitles.join(', ')}`
        )
    }

    private async clickBack() {
        await this.bigFormVc.goBack()
    }

    private renderCardSubtitle() {
        return this.renderHeader()?.subtitle
    }

    private get bigFormVc() {
        return this.loginVc.getLoginForm()
    }

    private async enterPhoneAndSubmit() {
        await this.fillOutPhone(DEMO_NUMBER)
        await this.submit()
    }

    private renderCardTitle() {
        return this.renderHeader()?.title
    }

    private renderHeader() {
        return this.render(this.loginVc).header
    }

    private async fillOutPhone(value: string = DEMO_NUMBER) {
        await this.formVc.setValue('phone', value)
    }

    private async submit() {
        await interactor.submitBigFormSlide(this.bigFormVc)
    }

    private get formVc() {
        return this.loginVc.getLoginForm()
    }

    private get auth() {
        return Authenticator.getInstance()
    }

    private assertRendersEmailField() {
        formAssert.formRendersField(this.bigFormVc, 'email')
    }

    private LoginVc(options?: LoginCardViewControllerOptions) {
        const factory = this.Factory()
        factory.setController('login-card', SpyLogin)
        const login = factory.Controller('login-card', {
            shouldAllowEmailLogin: this.shouldAllowEmailLogin,
            shouldAllowPhoneLogin: this.shouldAllowPhoneLogin,
            ...options,
        })
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
