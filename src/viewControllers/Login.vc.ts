import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { buildSchema, Schema } from '@sprucelabs/schema'
import { eventResponseUtil } from '@sprucelabs/spruce-event-utils'
import Authenticator from '../auth/Authenticator'
import buildBigForm from '../builders/buildBigForm'
import {
	BigFormViewController,
	ViewController,
	ViewControllerOptions,
} from '../types/heartwood.types'
import AbstractViewController from './Abstract.vc'

type ViewModel = SpruceSchemas.Heartwood.v2021_02_11.Card
type Section<S extends Schema> =
	SpruceSchemas.Heartwood.v2021_02_11.FormSection<S>

type LoginHandler = (options: OnLoginOptions) => Promise<void> | void

export interface LoginViewControllerOptions {
	onLogin?: LoginHandler
}

const loginSchema = buildSchema({
	id: 'loginSchema',
	fields: {
		phone: {
			type: 'phone',
			isRequired: true,
			label: 'Phone',
			hint: "I'm gonna send you a pin. Texting rates may apply. Legal speak below: 👇 🤓",
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
})

type LoginSchema = typeof loginSchema

interface OnLoginOptions {
	person: SpruceSchemas.Spruce.v2020_07_22.Person
}

export default class LoginViewController
	extends AbstractViewController<ViewModel>
	implements ViewController<ViewModel>
{
	private sections: Section<LoginSchema>[]
	private static id = 0
	private id: string
	private loginHandler?: LoginHandler
	private currentSlide = 0
	private loginForm: BigFormViewController<LoginSchema>
	private userChallenge?: string

	public constructor(
		options: LoginViewControllerOptions & ViewControllerOptions
	) {
		super(options)

		this.id = `${LoginViewController.id}`
		LoginViewController.id++

		this.sections = [
			{
				title: 'What is your cell?',
				fields: ['phone'],
			},
			{
				title: 'Now the pin! 👇',
				fields: ['code'],
			},
		]

		this.loginHandler = options.onLogin
		this.loginForm = this.vcFactory.Controller(
			'bigForm',
			buildBigForm({
				onSubmitSlide: async ({ values, currentSlide }) => {
					if (currentSlide === 0 && values.phone) {
						void this.handleSubmitPhone(values.phone)
					} else if (currentSlide === 1 && values.code) {
						void this.handleSubmitPin(values.code)
						return false
					}

					return true
				},
				isBusy: false,
				id: this.id,
				schema: loginSchema,
				sections: this.sections,
			})
		) as any
	}

	private async handleSubmitPhone(phone: string) {
		try {
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

			Authenticator.getInstance().setToken(token, person)

			await this.loginHandler?.({ person })
		} catch (err) {
			this.loginForm.setErrors([
				{
					code: 'invalid_value',
					name: 'code',
					friendlyMessage: "That pin doesn't look right, try again!",
				},
			])
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
}
