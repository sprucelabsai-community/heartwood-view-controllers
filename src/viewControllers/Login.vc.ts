import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { Schema, SchemaPartialValues } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
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

interface OnLoginOptions {
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

		this._id = `${LoginViewController._id}`
		LoginViewController._id++

		this.sections = [
			{
				title: 'What is your cell?',
				fields: ['phone'],
			},
			{
				title: 'Now the pin! 👇',
				fields: [{ name: 'code', renderAs: 'number' }],
				shouldShowSubmitButton: false,
			},
		]

		this.loginHandler = options.onLogin
		this.loginFailedHandler = options.onLoginFailed
		this.loginForm = this.vcFactory.Controller(
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
			await this.handleSubmitPhone(values.phone)
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
			this.loginForm.resetField('code')

			const client = await this.connectToApi()
			const pinResults = await client.emit('request-pin::v2020_12_25', {
				payload: {
					phone,
				},
			})

			const { challenge } =
				eventResponseUtil.getFirstResponseOrThrow(pinResults)

			this.userChallenge = challenge
		} catch (err) {
			this.loginForm.setErrors([
				{
					code: 'invalid_value',
					name: 'phone',
					friendlyMessage: err.message,
				},
			])
		}
	}

	public getIsBusy() {
		return this.loginForm.getIsBusy()
	}

	private async handleSubmitPin(pin: string) {
		this.setIsBusy(true)

		const client = await this.connectToApi()

		const confirmResults = await client.emit('confirm-pin::v2020_12_25', {
			payload: {
				challenge: this.userChallenge as string,
				pin,
			},
		})

		try {
			const { person, token } =
				eventResponseUtil.getFirstResponseOrThrow(confirmResults)

			Authenticator.getInstance().setSessionToken(token, person)

			await this.loginHandler?.({ person })
		} catch (err) {
			this.loginForm.setErrors([
				{
					code: 'invalid_value',
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
				title: this.currentSlide === 0 ? 'Get started' : 'Almost there!',
				subtitle:
					this.currentSlide === 0 ? 'Login or signup below!' : 'Last step!',
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
