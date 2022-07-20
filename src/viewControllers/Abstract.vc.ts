import { DateUtil } from '@sprucelabs/calendar-utils'
import SpruceError from '../errors/SpruceError'
import {
	Client,
	ConfirmHandler,
	RenderInDialogHandler,
	ViewController,
	ViewControllerOptions,
	ConfirmOptions,
	ViewControllerId,
	ViewControllerMap,
	ControllerOptions,
	VoteHandler,
	VoteOptions,
	Device,
	MapUtil,
} from '../types/heartwood.types'
import { DialogViewControllerOptions } from './Dialog.vc'
import ViewControllerFactory from './ViewControllerFactory'

export interface AlertOptions {
	title?: string
	message: string
	style?: 'info' | 'error' | 'success'
}

export default abstract class AbstractViewController<ViewModel>
	implements ViewController<ViewModel>
{
	private vcFactory: ViewControllerFactory
	private renderInDialogHandler: RenderInDialogHandler
	private confirmHandler: ConfirmHandler
	private wasDestroyed = false

	private activeDialog?: any
	protected connectToApi: () => Promise<Client>
	protected dates: DateUtil
	protected maps: MapUtil
	private voteHandler: VoteHandler
	private device: Device
	private children: ViewController<any>[] = []
	private _suspendedRender?: () => void

	public constructor(options: ViewControllerOptions) {
		this.vcFactory = options.vcFactory
		this.renderInDialogHandler = options.renderInDialogHandler
		this.confirmHandler = options.confirmHandler
		this.connectToApi = options.connectToApi
		this.voteHandler = options.voteHandler
		this.device = options.device
		this.dates = options.dates
		this.maps = options.maps
	}

	public abstract render(): ViewModel
	public triggerRender() {}

	protected getVcFactory() {
		return this.vcFactory
	}

	protected mixinControllers(map: Record<string, any>) {
		this.vcFactory.mixinControllers(map as any)
	}

	public Controller<N extends ViewControllerId, O extends ControllerOptions<N>>(
		name: N,
		options: O
	): ViewControllerMap[N] {
		const vc = this.vcFactory.Controller(name, options)

		if (vc) {
			//@ts-ignore
			vc.getParent = () => this
		}

		this.children.push(vc as any)

		return vc
	}

	protected renderInDialog(dialog: DialogViewControllerOptions) {
		const controller = this.Controller('dialog', {
			...dialog,
			isVisible: true,
		})

		this.renderInDialogHandler(controller.render())

		this.activeDialog = controller

		return controller
	}

	protected async hideDialog() {
		await this.activeDialog?.hide()
	}

	protected async askForAVote(options: VoteOptions) {
		await this.voteHandler(options)
	}

	private suspendRendering() {
		this._suspendedRender = this.triggerRender.bind(this)
		this.triggerRender = () => {}
	}

	private restoreRendering() {
		if (this._suspendedRender) {
			this.triggerRender = this._suspendedRender
		}
	}

	public async renderOnce(cb: () => any | Promise<any>) {
		this.suspendRendering()

		await cb()

		this.restoreRendering()
		this.triggerRender()
	}

	public async destroy() {
		if (this.wasDestroyed) {
			//@ts-ignore
			throw new SpruceError({ code: 'VIEW_ALREADY_DESTROYED', viewId: this.id })
		}
		await Promise.all(this.children.map((c) => c.destroy?.()))
		this.wasDestroyed = true
	}

	protected async alert(options: AlertOptions) {
		const { title = 'Alert! 🌲🤖' } = options

		const header = {
			title,
		}

		const dlg = this.renderInDialog({
			header,
			body: {
				sections: [
					{
						text: {
							content: options.message,
						},
					},
				],
			},
			footer: {
				buttons: [
					{
						label: 'Ok',
						type: this.styleToButtonType(options.style),
						onClick: () => {
							void dlg.hide()
						},
					},
				],
			},
		})

		this.device.vibrate()
		await dlg.wait()
	}

	private styleToButtonType(
		style: AlertOptions['style']
	): 'primary' | 'secondary' | 'destructive' {
		switch (style) {
			case 'error':
			case undefined:
				return 'destructive'
			case 'success':
				return 'primary'
			default:
				return 'secondary'
		}
	}

	protected async confirm(options: ConfirmOptions) {
		return this.confirmHandler(options)
	}

	protected async waitForRender() {
		await new Promise<void>((resolve) => setTimeout(resolve, 0))
	}

	protected getDevice() {
		return this.device
	}
}
