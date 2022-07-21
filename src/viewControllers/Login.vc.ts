import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { Schema, SchemaPartialValues } from '@sprucelabs/schema'
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

type ViewModel = SpruceSchemas.HeartwoodViewControllers.v2021_02_11.Card
type Section<S extends Schema> =
	SpruceSchemas.HeartwoodViewControllers.v2021_02_11.BigFormSection<S>

type LoginHandler = (options: OnLoginOptions) => Promise<void> | void

export interface LoginViewControllerOptions {
	onLogin?: LoginHandler
	onLoginFailed?: (err: Error) => void
	id?: string | null
}

const loginSchema = {
	id: 'loginSchema',
	fields: {
		phone: {
			type: 'phone',
			isRequired: true,
			label: 'Phone',
			hint: "I'm gonna send you a pin. Texting rates may apply.",
		},
		code: {
			type: 'text',
			isRequired: true,
			label: 'Pin',
			options: {
				autoComplete: 'one-time-code',
			},
		},
	},
} as const

type LoginSchema = typeof loginSchema

export interface OnLoginOptions {
	person: SpruceSchemas.Spruce.v2020_07_22.Person
}

export default class LoginViewController
	extends AbstractViewController<ViewModel>
	implements ViewController<ViewModel>
{
	private sections: Section<LoginSchema>[]
	private static _id = 0
	private _id: string
	private loginHandler?: LoginHandler
	private currentSlide = 0
	private loginForm: BigFormViewController<LoginSchema>
	private userChallenge?: string
	private loginFailedHandler?: (err: Error) => void

	public constructor(
		options: LoginViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this._id = options.id ?? `${LoginViewController._id}`
		LoginViewController._id++

		this.sections = [
			{
				title: randomUtil.rand([
					'What is your cell?',
					'Gimme a number to text.',
					'What is your number 👇',
				]),
				fields: ['phone'],
			},
			{
				title: randomUtil.rand([
					'Now the pin! 👇',
					'The pin is next!',
					'Time for pin.',
				]),
				fields: [{ name: 'code', renderAs: 'number' }],
				shouldShowSubmitButton: false,
			},
		]

		this.loginHandler = options.onLogin
		this.loginFailedHandler = options.onLoginFailed
		this.loginForm = this.Controller(
			'bigForm',
			buildBigForm({
				onChange: this.handleOnChange.bind(this),
				onSubmitSlide: this.handleSubmitSlide.bind(this),
				isBusy: false,
				id: this._id,
				schema: loginSchema,
				sections: this.sections,
			})
		) as any
	}

	private async handleSubmitSlide({
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

	private async handleOnChange(options: FormOnChangeOptions<LoginSchema>) {
		if (options.values.code?.length === 4) {
			await this.loginForm.submit()
		}
	}

	private async handleSubmitPhone(phone: string) {
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

	public render(): ViewModel {
		return {
			//@ts-ignore
			controller: this,
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

	public getLoginForm() {
		return this.loginForm
	}
}
