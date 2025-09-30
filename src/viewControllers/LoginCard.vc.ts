import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { buildSchema, SchemaPartialValues } from '@sprucelabs/schema'
import { randomUtil } from '@sprucelabs/spruce-skill-utils'
import Authenticator from '../auth/Authenticator'
import buildBigForm from '../builders/buildBigForm'
import SpruceError from '../errors/SpruceError'
import {
    BigFormSlideChangeOptions,
    BigFormViewController,
    Button,
    Card,
    CardFooter,
    FormOnChangeOptions,
    FormSection,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'
import CardViewController from './card/Card.vc'

export default class LoginCardViewController extends AbstractViewController<Card> {
    private static _id = 0
    protected bigFormVc: BigFormViewController<LoginSchema>
    private _id: string
    private loginHandler?: LoginHandler
    private userChallenge?: string
    private loginFailedHandler?: (err: Error) => void
    private cardVc: CardViewController
    private shouldAllowEmailLogin: boolean
    private shouldAllowPhoneLogin: boolean
    private smsDisclaimer?: string | null

    public constructor(
        options: LoginCardViewControllerOptions & ViewControllerOptions
    ) {
        super(options)

        const {
            id,
            onLogin,
            onLoginFailed,
            smsDisclaimer,
            shouldAllowEmailLogin,
            shouldAllowPhoneLogin = true,
        } = options

        this._id = id ?? `${LoginCardViewController._id}`
        LoginCardViewController._id++

        if (!shouldAllowPhoneLogin && !shouldAllowEmailLogin) {
            throw new SpruceError({
                code: 'INVALID_LOGIN_CONFIGURATION',
            })
        }

        this.shouldAllowPhoneLogin = shouldAllowPhoneLogin
        this.shouldAllowEmailLogin = shouldAllowEmailLogin ?? false
        this.loginHandler = onLogin
        this.loginFailedHandler = onLoginFailed
        this.smsDisclaimer = smsDisclaimer
        this.bigFormVc = this.BigForm()
        this.cardVc = this.CardVc()

        this.device.sendCommand('attemptingLogin')
    }

    private CardVc() {
        return this.Controller('card', {
            id: this._id,
            header: {
                title: this.renderLoginTitle(),
                subtitle: this.renderLoginSubtitle(),
            },
            body: {
                sections: [
                    {
                        bigForm: this.bigFormVc.render(),
                    },
                ],
            },
        })
    }

    private renderLoginWithEmailButton(): Button {
        return {
            id: 'login-with-email',
            label: 'Use Email Instead',
            style: 'link',
            onClick: this.handleClickLoginWithEmail.bind(this),
        }
    }

    private async handleClickLoginWithEmail() {
        this.bigFormVc.updateSection(0, this.renderEmailSection())

        this.bigFormVc.setFooter({
            buttons: [this.renderLoginWithPhoneButton()],
        })
    }

    private renderEmailSection(): FormSection<LoginSchema> {
        return {
            title: this.renderEmailSlideTitle(),
            fields: ['email'],
        }
    }

    private renderLoginWithPhoneButton(): Button {
        return {
            id: 'login-with-phone',
            label: 'Back to Phone',
            style: 'link',
            onClick: this.handleClickLoginWithPhone.bind(this),
        }
    }

    private async handleClickLoginWithPhone() {
        this.bigFormVc.updateSection(0, this.renderPhoneSection())
        this.bigFormVc.setFooter({
            buttons: [this.renderLoginWithEmailButton()],
        })
    }

    private renderEmailSlideTitle() {
        return randomUtil.rand([
            'What is your email?',
            'Gimme an email to send to.',
            'What is your email 👇',
        ])
    }

    private renderLoginSubtitle() {
        return randomUtil.rand([
            'Login or signup below!',
            "I'll send you a pin and you're in!",
            "I'm so excited!",
        ])
    }

    private renderLoginTitle() {
        return randomUtil.rand([
            'Get started',
            `Time to log in!`,
            `Let's do this! 💪`,
        ])
    }

    private BigForm(): BigFormViewController<LoginSchema> {
        return this.Controller(
            'big-form',
            buildBigForm({
                onChange: this.handleOnChangeBigForm.bind(this),
                onSubmitSlide: this.handleSubmitSlide.bind(this),
                isBusy: false,
                id: this._id,
                schema: loginSchema,
                onSlideChange: this.handleSlideChange.bind(this),
                sections: [this.renderFirstSection(), this.renderPinSection()],
                footer: this.renderFooter(),
            })
        )
    }

    private renderFirstSection() {
        if (!this.shouldAllowPhoneLogin) {
            return this.renderEmailSection()
        }

        return this.renderPhoneSection()
    }

    private renderPinSection(): FormSection<LoginSchema> {
        return {
            title: randomUtil.rand([
                'Now the pin! 👇',
                'The pin is next!',
                'Time for pin.',
            ]),
            fields: [{ name: 'code', renderAs: 'number' }],
        }
    }

    private renderFooter(): CardFooter | null {
        return this.shouldAllowEmailLogin && this.shouldAllowPhoneLogin
            ? {
                  buttons: [this.renderLoginWithEmailButton()],
              }
            : null
    }

    private renderPhoneSection(): FormSection<LoginSchema> {
        return {
            title: this.renderPhoneSlideTitle(),
            fields: [
                {
                    name: 'phone',
                    hint: this.smsDisclaimer ?? loginSchema.fields.phone.hint,
                },
            ],
        }
    }

    private renderPhoneSlideTitle(): string | null | undefined {
        return randomUtil.rand([
            'What is your cell?',
            'Gimme a number to text.',
            'What is your number 👇',
        ])
    }

    private handleSlideChange(options: BigFormSlideChangeOptions) {
        const { toSlide: to } = options
        if (to === 0) {
            this.cardVc.setHeaderTitle(this.renderLoginTitle())
            this.cardVc.setHeaderSubtitle(this.renderLoginSubtitle())
        } else {
            this.cardVc.setHeaderTitle(this.renderPinTitle())
            this.cardVc.setHeaderSubtitle(this.renderPinSubitle())
        }
    }

    protected async handleSubmitSlide({
        values,
        presentSlide,
    }: {
        values: SchemaPartialValues<LoginSchema>
        presentSlide: number
    }) {
        this.bigFormVc.setIsBusy(true)

        const { phone, email, code } = values

        let response = true

        if (presentSlide === 0 && (phone || email)) {
            response = await this.requestPin({ phone, email })
        } else if (presentSlide === 1 && code) {
            await this.handleSubmitPin(code)
            response = false
        }

        this.bigFormVc.setIsBusy(false)

        return response
    }

    private renderPinSubitle(): string {
        return randomUtil.rand([
            'Last step!',
            `So close I can taste it!`,
            `You got this!`,
        ])
    }

    private renderPinTitle() {
        return randomUtil.rand([
            'Almost there!',
            'Enter your pin below!',
            'Last step!',
        ])
    }

    protected async handleOnChangeBigForm(
        options: FormOnChangeOptions<LoginSchema>
    ) {
        const { values } = options
        const { code } = values
        if (code?.length === 4) {
            await this.bigFormVc.submit()
        }
    }

    protected async requestPin(values: {
        phone?: string | null
        email?: string | null
    }) {
        try {
            await this.bigFormVc.resetField('code')

            const client = await this.connectToApi()
            const [{ challenge }] = await client.emitAndFlattenResponses(
                'request-pin::v2020_12_25',
                {
                    payload: values,
                }
            )

            this.userChallenge = challenge
        } catch (err: any) {
            this.bigFormVc.setErrors([
                {
                    code: 'INVALID_PARAMETER',
                    name: 'phone',
                    friendlyMessage: err.message,
                },
            ])

            return false
        }

        return true
    }

    public getIsBusy() {
        return this.bigFormVc.getIsBusy()
    }

    private async handleSubmitPin(pin: string) {
        this.setIsBusy(true)

        try {
            const client = await this.connectToApi()
            const [{ person, token }] = await client.emitAndFlattenResponses(
                'confirm-pin::v2020_12_25',
                {
                    payload: {
                        challenge: this.userChallenge as string,
                        pin,
                    },
                }
            )

            Authenticator.getInstance().setSessionToken(token, person)

            await this.loginHandler?.({ person })
        } catch (err: any) {
            this.bigFormVc.setErrors([
                {
                    code: 'INVALID_PARAMETER',
                    name: 'code',
                    friendlyMessage: "That pin doesn't look right, try again!",
                },
            ])

            this.loginFailedHandler?.(err)
        }

        this.setIsBusy(false)
    }

    private setIsBusy(isBusy: boolean) {
        this.bigFormVc.setIsBusy(isBusy)
    }

    public getLoginForm() {
        return this.bigFormVc
    }

    public render(): Card {
        return this.cardVc.render()
    }
}

export type LoginHandler = (options: OnLoginOptions) => Promise<void> | void

export interface LoginCardViewControllerOptions {
    onLogin?: LoginHandler
    onLoginFailed?: (err: Error) => void
    id?: string | null
    smsDisclaimer?: string | null
    shouldAllowEmailLogin?: boolean
    shouldAllowPhoneLogin?: boolean
}

const loginSchema = buildSchema({
    id: 'loginSchema',
    fields: {
        phone: {
            type: 'phone',
            isRequired: true,
            label: 'Phone',
            hint: "I'm gonna send you a pin. By entering your number, you agree to receive mobile messages at the phone number provided. Messages frequency varies. Message and data rates may apply.",
        },
        email: {
            type: 'email',
            isRequired: true,
            label: 'Email',
        },
        code: {
            type: 'text',
            isRequired: true,
            label: 'Pin',
            options: {},
        },
    },
})

type LoginSchema = typeof loginSchema

export interface OnLoginOptions {
    person: SpruceSchemas.Spruce.v2020_07_22.Person
}
