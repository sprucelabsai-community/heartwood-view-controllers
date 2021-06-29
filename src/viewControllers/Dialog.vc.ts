import { SpruceSchemas } from '@sprucelabs/mercury-types'
import { ViewControllerOptions } from '../types/heartwood.types'
import CardViewController from './Card.vc'

export type DialogOptions = SpruceSchemas.Heartwood.v2021_02_11.Card &
	SpruceSchemas.Heartwood.v2021_02_11.Dialog & {
		closeHandler?: () => void
	}

export type Dialog = DialogOptions
export type DialogViewControllerOptions = Omit<Dialog, 'closeHandler'>

export default class DialogViewController<
	D extends Dialog = Dialog
> extends CardViewController<D> {
	private closeResolver?: () => void
	private closePromise?: Promise<unknown>
	private onClose?: D['onClose']
	private transitionOut?: () => Promise<void>
	private isVisible = false

	public constructor(options: ViewControllerOptions & Omit<D, 'closeHandler'>) {
		//@ts-ignore
		super(options)
		this.onClose = options.onClose
		this.isVisible = !!options.isVisible
	}

	public render(): D {
		return {
			...this.model,
			controller: this,
			isVisible: this.isVisible,
			closeHandler:
				this.model.shouldShowCloseButton !== false
					? this.handleClose.bind(this)
					: undefined,
		}
	}

	protected async handleClose() {
		await this.hide()
	}

	public show() {
		this.isVisible = true
		this.triggerRender()
	}

	public getIsVisible() {
		return this.isVisible
	}

	public async hide() {
		const results = await this.onClose?.()

		if (results === false) {
			return
		}

		await this.transitionOut?.()

		this.isVisible = false

		this.closeResolver?.()
		this.triggerRender()
	}

	public async wait() {
		if (!this.closeResolver) {
			this.closePromise = new Promise((resolve) => {
				this.closeResolver = resolve as any
			})
		}

		await this.closePromise
	}
}
