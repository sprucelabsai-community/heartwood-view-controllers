import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { buildSchema, Schema, SchemaPartialValues } from '@sprucelabs/schema'
import { randomUtil } from '@sprucelabs/spruce-skill-utils'
import Authenticator from '../auth/Authenticator'
import buildBigForm from '../builders/buildBigForm'
import {
    BigFormViewController,
    FormOnChangeOptions,
    ViewController,
    ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

export default class LoginCardViewController
    extends AbstractViewController<ViewModel>
    implements ViewController<ViewModel>
{
    private static _id = 0

    protected loginForm: BigFormViewController<LoginSchema>

    private sections: Section<LoginSchema>[]
    private _id: string
    private loginHandler?: LoginHandler
    private currentSlide = 0
    private userChallenge?: string
    private loginFailedHandler?: (err: Error) => void

    public constructor(
        options: LoginCardViewControllerOptions & ViewControllerOptions
    ) {
        super(options)

        this._id = options.id ?? `${LoginCardViewController._id}`
        LoginCardViewController._id++

        const { onLogin, onLoginFailed, smsDisclaimer } = options

        this.sections = [
            {
                title: randomUtil.rand([
                    'What is your cell?',
                    'Gimme a number to text.',
                    'What is your number 👇',
                ]),
                fields: [
                    {
                        name: 'phone',
                        hint: smsDisclaimer ?? loginSchema.fields.phone.hint,
                    },
                ],
            },
            {
                title: randomUtil.rand([
                    'Now the pin! 👇',
                    'The pin is next!',
                    'Time for pin.',
                ]),
                fields: [{ name: 'code', renderAs: 'number' }],
                shouldRenderSubmitButton: false,
            },
        ]

        this.loginHandler = onLogin
        this.loginFailedHandler = onLoginFailed
        this.loginForm = this.BigForm()

        this.device.sendCommand('attemptingLogin')
    }

    private BigForm(): BigFormViewController<LoginSchema> {
        return this.Controller(
            'big-form',
            buildBigForm({
                onChange: this.handleOnChange.bind(this),
                onSubmitSlide: this.handleSubmitSlide.bind(this),
                isBusy: false,
                id: this._id,
                schema: loginSchema,
                sections: this.sections,
            })
        )
    }

    protected async handleSubmitSlide({
        values,
        presentSlide,
    }: {
        values: SchemaPartialValues<LoginSchema>
        presentSlide: number
    }) {
        this.loginForm.setIsBusy(true)

        let response = true

        if (presentSlide === 0 && values.phone) {
            response = await this.handleSubmitPhone(values.phone)
        } else if (presentSlide === 1 && values.code) {
            await this.handleSubmitPin(values.code)
            response = false
        }

        this.loginForm.setIsBusy(false)

        return response
    }

    protected async handleOnChange(options: FormOnChangeOptions<LoginSchema>) {
        if (options.values.code?.length === 4) {
            await this.loginForm.submit()
        }
    }

    protected async handleSubmitPhone(phone: string) {
        try {
            await this.loginForm.resetField('code')

            const client = await this.connectToApi()
            const [{ challenge }] = await client.emitAndFlattenResponses(
                'request-pin::v2020_12_25',
                {
                    payload: {
                        phone,
                    },
                }
            )

            this.userChallenge = challenge
        } catch (err: any) {
            this.loginForm.setErrors([
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
        return this.loginForm.getIsBusy()
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
            this.loginForm.setErrors([
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
        this.loginForm.setIsBusy(isBusy)
    }

    public getLoginForm() {
        return this.loginForm
    }

    public render(): ViewModel {
        return {
            //@ts-ignore
            controller: this,
            id: this._id,
            header: {
                title:
                    this.currentSlide === 0
                        ? randomUtil.rand([
                              'Get started',
                              `Time to log in!`,
                              `Let's do this! 💪`,
                          ])
                        : randomUtil.rand([
                              'Almost there!',
                              'Enter your pin below!',
                              'Last step!',
                          ]),
                subtitle:
                    this.currentSlide === 0
                        ? randomUtil.rand([
                              'Login or signup below!',
                              "One text and one pin and you're in!",
                              "I'm so excited!",
                          ])
                        : randomUtil.rand([
                              'Last step!',
                              `So close I can taste it!`,
                              `You got this!`,
                          ]),
            },
            body: {
                sections: [
                    {
                        bigForm: this.loginForm.render() as any,
                    },
                ],
            },
        }
    }
}

type ViewModel = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
type Section<S extends Schema> =
    SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSection<S>

export type LoginHandler = (options: OnLoginOptions) => Promise<void> | void

export interface LoginCardViewControllerOptions {
    onLogin?: LoginHandler
    onLoginFailed?: (err: Error) => void
    id?: string | null
    smsDisclaimer?: string | null
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
